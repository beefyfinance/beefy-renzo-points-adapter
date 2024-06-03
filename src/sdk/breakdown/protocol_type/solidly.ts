import { Hex, getContract } from "viem";
import { BeefyViemClient } from "../../viemClient";
import { BeefyVaultV7Abi } from "../../../abi/BeefyVaultV7Abi";
import { SolidlyPoolAbi } from "../../../abi/SolidlyPoolAbi";
import { BeefyVault, BeefyVaultBreakdown, BlockSpec } from "../../types";

export const getSolidlyVaultBreakdown = async (
  client: BeefyViemClient,
  blockSpec: BlockSpec,
  vault: BeefyVault
): Promise<BeefyVaultBreakdown> => {
  const vaultContract = getContract({
    client,
    address: vault.vault_address,
    abi: BeefyVaultV7Abi,
  });
  const poolContract = getContract({
    client,
    address: vault.undelying_lp_address,
    abi: SolidlyPoolAbi,
  });

  const [balance, vaultTotalSupply, totalSupply, poolMetadata] =
    await Promise.all([
      vaultContract.read.balance({ ...blockSpec }),
      vaultContract.read.totalSupply({ ...blockSpec }),
      poolContract.read.totalSupply({ ...blockSpec }),
      poolContract.read.metadata({ ...blockSpec }),
    ]);

  const t0 = poolMetadata[5];
  const t1 = poolMetadata[6];
  const r0 = poolMetadata[2];
  const r1 = poolMetadata[3];

  return {
    vault,
    blockSpec,
    vaultTotalSupply,
    balances: [
      {
        tokenAddress: t0.toLocaleLowerCase() as Hex,
        vaultBalance: (r0 * balance) / totalSupply,
      },
      {
        tokenAddress: t1.toLocaleLowerCase() as Hex,
        vaultBalance: (r1 * balance) / totalSupply,
      },
    ],
  };
};
