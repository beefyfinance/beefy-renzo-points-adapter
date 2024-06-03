import { BeefyChain } from "./sdk/types";

export const BEEFY_VAULT_API = "https://api.beefy.finance/vaults";

export const RPC_URLS: {
  [chainId in BeefyChain]: string[];
} = {
  arbitrum: (
    process.env.ARBITRUM_RPC_URLS ??
    "https://rpc.ankr.com/arbitrum,https://1rpc.io/arb"
  ).split(","),
  base: (
    process.env.BASE_RPC_URLS ??
    "https://mainnet.base.org,https://base.llamarpc.com"
  ).split(","),
  ethereum: (
    process.env.ETHEREUM_RPC_URLS ??
    "https://eth.llamarpc.com,https://rpc.ankr.com/eth,https://1rpc.io/eth"
  ).split(","),
  linea: (
    process.env.LINEA_RPC_URLS ??
    "https://rpc.linea.build,https://rpc.linea.build"
  ).split(","),
  mode: (
    process.env.MODE_RPC_URLS ??
    "https://1rpc.io/mode,https://mainnet.mode.network"
  ).split(","),
};
