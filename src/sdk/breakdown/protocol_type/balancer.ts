import { Hex, getContract } from "viem";
import { BeefyViemClient } from "../../viemClient";
import { BeefyVaultV7Abi } from "../../../abi/BeefyVaultV7Abi";
import { BalancerPoolAbi } from "../../../abi/BalancerPoolAbi";
import { BalancerVaultAbi } from "../../../abi/BalancerVaultAbi";
import { BeefyVault, BlockSpec, BeefyVaultBreakdown } from "../../types";

export const getBalancerAuraVaultBreakdown = async (
  client: BeefyViemClient,
  blockSpec: BlockSpec,
  vault: BeefyVault
): Promise<BeefyVaultBreakdown> => {
  const vaultContract = getContract({
    client,
    address: vault.vault_address,
    abi: BeefyVaultV7Abi,
  });
  const balancerPoolContract = getContract({
    client,
    address: vault.undelying_lp_address,
    abi: BalancerPoolAbi,
  });

  const [
    balance,
    vaultTotalSupply,
    balancerVaultAddress,
    balancerPoolId,
    balancerTotalSupply,
  ] = await Promise.all([
    vaultContract.read.balance({ ...blockSpec }),
    vaultContract.read.totalSupply({ ...blockSpec }),
    balancerPoolContract.read.getVault({ ...blockSpec }),
    balancerPoolContract.read.getPoolId({ ...blockSpec }),
    balancerPoolContract.read.getActualSupply({ ...blockSpec }),
  ]);

  const balancerVaultContract = getContract({
    client,
    address: balancerVaultAddress,
    abi: BalancerVaultAbi,
  });
  const poolTokensRes = await balancerVaultContract.read.getPoolTokens([
    balancerPoolId,
  ]);
  const poolTokens = poolTokensRes[0];
  const poolBalances = poolTokensRes[1];

  return {
    vault,
    blockSpec,
    vaultTotalSupply,
    balances: poolTokens.map((token, i) => ({
      tokenAddress: token.toLocaleLowerCase() as Hex,
      vaultBalance: (poolBalances[i] * balance) / balancerTotalSupply,
    })),
  };
};
