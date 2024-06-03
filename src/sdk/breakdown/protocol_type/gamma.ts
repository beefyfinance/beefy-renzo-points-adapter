import { Hex, getContract } from "viem";
import { BeefyViemClient } from "../../viemClient";
import { BeefyVaultV7Abi } from "../../../abi/BeefyVaultV7Abi";
import { GammaHypervisorAbi } from "../../../abi/GammaHypervisorAbi";
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
  const hypervisorContract = getContract({
    client,
    address: vault.undelying_lp_address,
    abi: GammaHypervisorAbi,
  });

  const [balance, vaultTotalSupply, totalSupply, totalAmounts, token0, token1] =
    await Promise.all([
      vaultContract.read.balance({ ...blockSpec }),
      vaultContract.read.totalSupply({ ...blockSpec }),
      hypervisorContract.read.totalSupply({ ...blockSpec }),
      hypervisorContract.read.getTotalAmounts({ ...blockSpec }),
      hypervisorContract.read.token0({ ...blockSpec }),
      hypervisorContract.read.token1({ ...blockSpec }),
    ]);

  return {
    vault,
    blockSpec,
    vaultTotalSupply,
    balances: [
      {
        tokenAddress: token0.toLocaleLowerCase() as Hex,
        vaultBalance: (totalAmounts[0] * balance) / totalSupply,
      },
      {
        tokenAddress: token1.toLocaleLowerCase() as Hex,
        vaultBalance: (totalAmounts[1] * balance) / totalSupply,
      },
    ],
  };
};
