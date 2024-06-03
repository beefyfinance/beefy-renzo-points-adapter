import { Hex, getContract } from "viem";
import { BeefyViemClient } from "../../viemClient";
import { PendleMarketAbi } from "../../../abi/PendleMarket";
import { PendleSyTokenAbi } from "../../../abi/PendleSyToken";
import { BeefyVaultV7Abi } from "../../../abi/BeefyVaultV7Abi";
import {
  BeefyVault,
  BeefyVaultBreakdown,
  BeefyChain,
  BlockSpec,
} from "../../types";

const PENDLE_ROUTER_ADDRESS: {
  [chain in BeefyChain]?: Hex;
} = {
  arbitrum: "0x00000000005BBB0EF59571E58418F9a4357b68A0",
};

export const getPendleEquilibriaVaultBreakdown = async (
  client: BeefyViemClient,
  blockSpec: BlockSpec,
  vault: BeefyVault
): Promise<BeefyVaultBreakdown> => {
  const vaultContract = getContract({
    client,
    address: vault.vault_address,
    abi: BeefyVaultV7Abi,
  });
  const pendleMarketContract = getContract({
    client,
    address: vault.undelying_lp_address,
    abi: PendleMarketAbi,
  });

  const routerAddress = PENDLE_ROUTER_ADDRESS[vault.chain];
  if (!routerAddress) {
    throw new Error(`Unknown chain ${vault.chain}`);
  }

  const [balance, vaultTotalSupply, tokenAddresses, pendleState] =
    await Promise.all([
      vaultContract.read.balance({ ...blockSpec }),
      vaultContract.read.totalSupply({ ...blockSpec }),
      pendleMarketContract.read.readTokens({ ...blockSpec }),
      pendleMarketContract.read.readState([routerAddress], {
        ...blockSpec,
      }),
    ]);

  const syTokenContract = getContract({
    client,
    address: tokenAddresses[0],
    abi: PendleSyTokenAbi,
  });
  const syUnderlyingAddress = await syTokenContract.read.yieldToken({
    ...blockSpec,
  });

  return {
    vault,
    blockSpec,
    vaultTotalSupply: vaultTotalSupply,
    balances: [
      {
        tokenAddress: syUnderlyingAddress.toLocaleLowerCase() as Hex,
        vaultBalance: (pendleState.totalSy * balance) / pendleState.totalLp,
      },
    ],
  };
};
