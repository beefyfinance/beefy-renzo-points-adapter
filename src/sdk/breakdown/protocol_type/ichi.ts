import { Hex, getContract } from "viem";
import { BeefyViemClient } from "../../viemClient";
import { BeefyVaultV7Abi } from "../../../abi/BeefyVaultV7Abi";
import { IchiAlmAbi } from "../../../abi/IchiAlmAbi";
import { BeefyVault, BeefyVaultBreakdown, BlockSpec } from "../../types";

export const getGammaVaultBreakdown = async (
  client: BeefyViemClient,
  blockSpec: BlockSpec,
  vault: BeefyVault
): Promise<BeefyVaultBreakdown> => {
  const vaultContract = getContract({
    client,
    address: vault.vault_address,
    abi: BeefyVaultV7Abi,
  });
  const almContract = getContract({
    client,
    address: vault.undelying_lp_address,
    abi: IchiAlmAbi,
  });

  const [
    balance,
    vaultTotalSupply,
    totalSupply,
    basePosition,
    limitPosition,
    token0,
    token1,
  ] = await Promise.all([
    vaultContract.read.balance({ ...blockSpec }),
    vaultContract.read.totalSupply({ ...blockSpec }),
    almContract.read.totalSupply({ ...blockSpec }),
    almContract.read.getBasePosition({ ...blockSpec }),
    almContract.read.getLimitPosition({ ...blockSpec }),
    almContract.read.token0({ ...blockSpec }),
    almContract.read.token1({ ...blockSpec }),
  ]);

  const position0 = basePosition[0] + limitPosition[0];
  const position1 = basePosition[1] + limitPosition[1];

  return {
    vault,
    blockSpec,
    vaultTotalSupply,
    balances: [
      {
        tokenAddress: token0.toLocaleLowerCase() as Hex,
        vaultBalance: (position0 * balance) / totalSupply,
      },
      {
        tokenAddress: token1.toLocaleLowerCase() as Hex,
        vaultBalance: (position1 * balance) / totalSupply,
      },
    ],
  };
};
