type VaultConfig = {
  id: string;
  platform: string;
  vaultAddress: string;
  boostAddresses?: string[];
};

const PLATFORM_PENDLE_EQUILIBRIA = "PendleEquilibria";
const PLATFORM_SOLIDLY = "Solidly";
const PLATFORM_BALANCER_AURA = "BalancerAura";
const PLATFORM_CURVE = "Curve";
const PLATFORM_AAVE = "Aave";
const PLATFORM_GAMMA = "Gamma";
const PLATFORM_MENDI_LEVERAGE = "MendiLeverage";

const vaultsByChain: { [key: string]: VaultConfig[] } = {
  "arbitrum-one": [
    {
      id: "equilibria-arb-eeth",
      platform: PLATFORM_PENDLE_EQUILIBRIA,
      vaultAddress: "0x245d1c493342464ba568BCfb058C1069dFdc07B5",
    },
    {
      id: "equilibria-arb-rseth",
      platform: PLATFORM_PENDLE_EQUILIBRIA,
      vaultAddress: "0x7975d9EcCe584aDcE00efd16520853Dad66a7775",
    },
    {
      id: "equilibria-arb-ezeth",
      platform: PLATFORM_PENDLE_EQUILIBRIA,
      vaultAddress: "0x8b479C22c5B33eA4E42395dC7360231B19AF8300",
    },
    {
      id: "equilibria-arb-ezeth-27jun24",
      platform: PLATFORM_PENDLE_EQUILIBRIA,
      vaultAddress: "0xdccb85017a996faF5242648B46940E80DE0A36a5",
    },
    {
      id: "equilibria-arb-rseth-27jun24",
      platform: PLATFORM_PENDLE_EQUILIBRIA,
      vaultAddress: "0x59D0C3f25cB3bD86E03D827C773892d247452227",
    },
    {
      id: "equilibria-arb-eeth-27jun24",
      platform: PLATFORM_PENDLE_EQUILIBRIA,
      vaultAddress: "0xDDf00Bb25A13e3ECd35a343B9165448cDd2228B6",
    },
    {
      id: "aura-arb-ezeth-wsteth",
      platform: PLATFORM_BALANCER_AURA,
      vaultAddress: "0xEFAd727469e7e4e410376986AB0af8B6F9559fDc",
    },
  ],
  base: [
    {
      id: "aerodrome-weth-bsdeth",
      platform: PLATFORM_SOLIDLY,
      vaultAddress: "0xB614A6E6c21202De79DceB95AE2dd4817DD7e14b",
    },
    {
      id: "aerodrome-ezeth-weth",
      platform: PLATFORM_SOLIDLY,
      vaultAddress: "0xAB7EeE0a368079D2fBfc83599eD0148a16d0Ea09",
    },
    {
      id: "aerodrome-ezeth-weth-s",
      platform: PLATFORM_SOLIDLY,
      vaultAddress: "0x90A7de0E16CA4521B1E4C3dBBA4edAA2354aB81B",
    },
    {
      id: "aerodrome-weth-wrseth",
      platform: PLATFORM_SOLIDLY,
      vaultAddress: "0xC5cD1A6d4918820201B8E4eeB6d2AdFD1CDF783d",
    },
    {
      id: "aerodrome-weeth-weth",
      platform: PLATFORM_SOLIDLY,
      vaultAddress: "0x47579C50c7AeDeA788D18927aed4c827Fe34996A",
    },
    {
      id: "aura-base-weeth-weth",
      platform: PLATFORM_BALANCER_AURA,
      vaultAddress: "0xc52393b27FeE4355Fe6a5DC92D25BC2Ed1B418Cb",
    },
  ],
  mainnet: [
    {
      id: "aura-ezeth-eth",
      platform: PLATFORM_BALANCER_AURA,
      vaultAddress: "0x3E1c2C604f60ef142AADAA51aa864f8438f2aaC1",
    },
    {
      id: "aura-weeth-reth",
      platform: PLATFORM_BALANCER_AURA,
      vaultAddress: "0x1153211f7E810C73cC45eE09FF9A0742fBB6b467",
    },
    {
      id: "aura-weeth-ezeth-rseth",
      platform: PLATFORM_BALANCER_AURA,
      vaultAddress: "0x5dA90BA82bED0AB701E6762D2bF44E08634d9776",
    },
    {
      id: "curve-veth",
      platform: PLATFORM_CURVE,
      vaultAddress: "0xAE0bFfc3110e69DA8993F11C1CBd9a6eA3d16daF",
      boostAddresses: ["0x9Db900bFD1D13112dE2239418eb3D8673B6F1878"],
    },
  ],
  linea: [
    {
      id: "mendi-linea-ezeth",
      platform: PLATFORM_AAVE,
      vaultAddress: "0xf711cdcDDa1C5F919c94573cC4E38b4cE2207750",
    },
    {
      id: "lynex-gamma-weeth-weth",
      platform: PLATFORM_GAMMA,
      vaultAddress: "0xb9A23E2569C262a92635D825142f310BEAfB0Be0",
    },
    {
      id: "nile-ezeth-weth",
      platform: PLATFORM_SOLIDLY,
      vaultAddress: "0x063091e4532eD93CE93347C6c8338dcA0832ddb0",
    },
    {
      id: "mendi-linea-lev-wsteth",
      platform: PLATFORM_MENDI_LEVERAGE,
      vaultAddress: "0xBF71FbCe0d4Fc460D36fa1d13B397a3cd5c45220",
    },
    {
      id: "mendi-linea-lev-weth",
      platform: PLATFORM_MENDI_LEVERAGE,
      vaultAddress: "0x23EC7f31a5c74D5Fe21aa386A7519028DBD6bA40",
    },
    {
      id: "mendi-linea-lev-usdc",
      platform: PLATFORM_MENDI_LEVERAGE,
      vaultAddress: "0x9ab545Ab024a8Da2302f5b0D016F4f5501e330d1",
    },
    {
      id: "mendi-linea-lev-usdt",
      platform: PLATFORM_MENDI_LEVERAGE,
      vaultAddress: "0xC3C757EA1429231C437736746Eb77A2344EAcb81",
    },
    {
      id: "mendi-linea-lev-wbtc",
      platform: PLATFORM_MENDI_LEVERAGE,
      vaultAddress: "0x639041dD8cD48B52C12414235d97E1313cbbceff",
    },
  ],
  optimism: [
    {
      id: "velodrome-v2-weth-wrseth",
      platform: PLATFORM_SOLIDLY,
      vaultAddress: "0xDbE946E16c4e0De9a44065B868265Ac05c437fB6",
    },
  ],
  bsc: [
    {
      id: "thena-gamma-weeth-eth-narrow",
      platform: PLATFORM_GAMMA,
      vaultAddress: "0xcCcDB0F6eCcd5f231d4737A00C554322167d814B",
    },
  ],
  "mode-mainnet": [
    {
      id: "velodrome-mode-ezeth-eth",
      platform: PLATFORM_SOLIDLY,
      vaultAddress: "0x94A3725124d2E71028Ee488b88566f1fb11A90C3",
    },
    {
      id: "velodrome-mode-weeth-eth",
      platform: PLATFORM_SOLIDLY,
      vaultAddress: "0x6Dd2abBBbbf494dd2454aEd67880B9533E2b3DA1",
    },
  ],
};
