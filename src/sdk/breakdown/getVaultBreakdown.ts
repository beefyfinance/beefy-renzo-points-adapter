import { BeefyViemClient, getViemClient } from "../viemClient";
import { getSolidlyVaultBreakdown } from "./protocol_type/solidly";
import { getGammaVaultBreakdown } from "./protocol_type/gamma";
import { getMendiVaultBreakdown } from "./protocol_type/mendi";
import { getPendleEquilibriaVaultBreakdown } from "./protocol_type/pendle_equilibria";
import { getBalancerAuraVaultBreakdown } from "./protocol_type/balancer";
import {
  BeefyProtocolType,
  BeefyVault,
  BeefyVaultBreakdown,
  BlockSpec,
} from "../types";

type BreakdownMethod = (
  client: BeefyViemClient,
  blockSpec: BlockSpec,
  vault: BeefyVault
) => Promise<BeefyVaultBreakdown>;

const breakdownMethods: Record<BeefyProtocolType, BreakdownMethod> = {
  solidly: getSolidlyVaultBreakdown,
  mendi: getMendiVaultBreakdown,
  gamma: getGammaVaultBreakdown,
  ichi: getGammaVaultBreakdown,
  pendle_equilibria: getPendleEquilibriaVaultBreakdown,
  balancer_aura: getBalancerAuraVaultBreakdown,
};

export const getVaultBreakdowns = async (
  blockSpec: BlockSpec,
  vaults: BeefyVault[]
): Promise<BeefyVaultBreakdown[]> => {
  // group by protocol type
  const vaultsPerChainAndProtocol: Record<string, BeefyVault[]> = vaults.reduce(
    (acc, vault) => {
      const key = vault.protocol_type + "_" + vault.chain;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(vault);
      return acc;
    },
    {} as Record<string, BeefyVault[]>
  );

  return (
    await Promise.all(
      Object.values(vaultsPerChainAndProtocol).map(async (vaults) => {
        const protocolType = vaults[0].protocol_type;
        const chain = vaults[0].chain;
        const client = getViemClient(chain);
        const getBreakdown = breakdownMethods[protocolType];
        return await Promise.all(
          vaults.map((vault) => getBreakdown(client, blockSpec, vault))
        );
      })
    )
  ).flat();
};
