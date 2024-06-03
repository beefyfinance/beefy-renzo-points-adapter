import { sample } from "lodash";
import {
  createPublicClient,
  http,
  PublicClient,
  Chain as ViemChain,
} from "viem";
import { arbitrum, base, linea, mainnet, mode } from "viem/chains";
import { RPC_URLS } from "../config";
import { BeefyChain } from "./types";

const chainMap: Record<BeefyChain, ViemChain> = {
  linea,
  mode: mode,
  arbitrum: arbitrum,
  base: base,
  ethereum: mainnet,
};

const clients: Record<BeefyChain, PublicClient[]> = Object.keys(
  RPC_URLS
).reduce((agg, chain) => {
  if (!agg[chain as BeefyChain]) {
    agg[chain as BeefyChain] = [];
  }

  const urls = RPC_URLS[chain as BeefyChain];

  agg[chain as BeefyChain] = urls.map((url) =>
    createPublicClient({
      chain: chainMap[chain as BeefyChain],
      transport: http(url),
      batch: {
        multicall: true,
      },
    })
  );

  return agg;
}, {} as Record<BeefyChain, PublicClient[]>);

export const getViemClient = (chain: BeefyChain): PublicClient => {
  return sample(clients[chain]) as PublicClient;
};

export type BeefyViemClient = PublicClient;
