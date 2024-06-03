import { getBeefyVaultConfig } from "./sdk/vault/getBeefyVaultConfig";
import { getVaultBreakdowns } from "./sdk/breakdown/getVaultBreakdown";
import { BeefyChain, BlockSpec } from "./sdk/types";

type OutputDataSchemaRow = {
  block_spec: BlockSpec;
  vault_address: string;
  chain: BeefyChain;
  token_address: string;
  token_balance: bigint;
};

export const getRenzoVaultsBreakdown = async (
  blockSpec: BlockSpec
): Promise<OutputDataSchemaRow[]> => {
  const vaultConfigs = await getBeefyVaultConfig();
  console.table(vaultConfigs);
  const breakdowns = await getVaultBreakdowns(blockSpec, vaultConfigs);

  return breakdowns
    .map((breakdown) =>
      breakdown.balances.map((bal) => ({
        block_spec: blockSpec,
        chain: breakdown.vault.chain,
        vault_address: breakdown.vault.vault_address,
        token_address: bal.tokenAddress,
        token_balance: bal.vaultBalance,
      }))
    )
    .flat();
};

getRenzoVaultsBreakdown({ blockTag: "latest" })
  .then(console.table)
  .catch(console.error);
