import { memoize } from "lodash";
import { Hex } from "viem";
import { BEEFY_VAULT_API } from "../../config";
import { BeefyProtocolType, BeefyVault, BeefyChain } from "../types";

type ApiPlatformId =
  | "gamma"
  | "ichi"
  | "lynex"
  | "mendi"
  | "nile"
  | "equilibria"
  | "aura"
  | "aerodrome"
  | "velodrome";

type ApiVault = {
  id: string;
  status: "active" | "eol";
  earnedTokenAddress: Hex;
  chain: BeefyChain;
  platformId: ApiPlatformId;
  tokenAddress: Hex;
  earningPoints?: boolean;
  assets?: string[];
};

const protocol_map: Record<ApiPlatformId, BeefyProtocolType> = {
  gamma: "gamma",
  ichi: "ichi",
  lynex: "solidly",
  aerodrome: "solidly",
  mendi: "mendi",
  nile: "solidly",
  equilibria: "pendle_equilibria",
  aura: "balancer_aura",
  velodrome: "solidly",
};

export const getBeefyVaultConfig = memoize(async (): Promise<BeefyVault[]> => {
  const response = await fetch(BEEFY_VAULT_API);
  const data = await response.json();

  const vaults = data
    //.filter((vault: ApiVault) => vault.earningPoints === true)
    .filter((vault: ApiVault) =>
      (vault.assets ?? []).some((asset) => asset === "ezETH")
    )
    .map((vault: ApiVault): BeefyVault => {
      let protocol_type = protocol_map[vault.platformId];
      if (!protocol_type) {
        throw new Error(`Unknown platformId ${vault.platformId}`);
      }
      return {
        id: vault.id,
        vault_address: vault.earnedTokenAddress.toLocaleLowerCase() as Hex,
        chain: vault.chain,
        protocol_type,
        undelying_lp_address: vault.tokenAddress.toLocaleLowerCase() as Hex,
      };
    });

  return vaults;
});
