import { Hex, getContract } from "viem";
import { BeefyViemClient } from "../../viemClient";
import { BeefyVaultV7Abi } from "../../../abi/BeefyVaultV7Abi";
import { BeefyVault, BeefyVaultBreakdown, BlockSpec } from "../../types";

export const getMendiVaultBreakdown = async (
  client: BeefyViemClient,
  blockSpec: BlockSpec,
  vault: BeefyVault
): Promise<BeefyVaultBreakdown> => {
  const vaultContract = getContract({
    client,
    address: vault.vault_address,
    abi: BeefyVaultV7Abi,
  });

  const [balance, vaultTotalSupply] = await Promise.all([
    vaultContract.read.balance({ ...blockSpec }),
    vaultContract.read.totalSupply({ ...blockSpec }),
  ]);

  return {
    vault,
    blockSpec,
    vaultTotalSupply,
    balances: [
      {
        tokenAddress: vault.undelying_lp_address.toLocaleLowerCase() as Hex,
        vaultBalance: balance,
      },
    ],
  };
};
