import { BlockTag, Hex } from "viem";

export type BeefyChain = "arbitrum" | "base" | "ethereum" | "linea" | "mode";

export type BeefyVault = {
  id: string;
  vault_address: Hex;
  undelying_lp_address: Hex;
  chain: BeefyChain;
  protocol_type: BeefyProtocolType;
};

export type BeefyProtocolType =
  | "gamma"
  | "ichi"
  | "mendi"
  | "solidly"
  | "pendle_equilibria"
  | "balancer_aura";

export type BeefyVaultBreakdown = {
  vault: BeefyVault;
  blockSpec: BlockSpec;
  vaultTotalSupply: bigint;
  balances: {
    tokenAddress: Hex;
    vaultBalance: bigint;
  }[];
};

export type BlockSpec =
  | {
      /** The balance of the account at a block number. */
      blockNumber?: bigint | undefined;
      blockTag?: never | undefined;
    }
  | {
      blockNumber?: never | undefined;
      /**
       * The balance of the account at a block tag.
       * @default 'latest'
       */
      blockTag?: BlockTag | undefined;
    };
