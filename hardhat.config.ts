import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-solhint";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy";
import './tasks';

import * as dotenv from "dotenv";
dotenv.config();

const privateKey = process.env.PRIVATE_KEY? process.env.PRIVATE_KEY: ""
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY? process.env.ETHERSCAN_API_KEY: ""
const SNOWTRACE_API_KEY = process.env.SNOWTRACE_API_KEY? process.env.SNOWTRACE_API_KEY: ""
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY? process.env.POLYGONSCAN_API_KEY: ""


require("./tasks/mint");

/** @type import('hardhat/config').HardhatUserConfig */
const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    local: {
      chainId: 1337, // We set 1337 to make interacting with MetaMask simpler
      url: "http://localhost:8545",
    },
    "goerli": {
      chainId: 5,
      url: "https://goerli.infura.io/v3/e558ada833174869b035ae269bf2d107",
      accounts: [privateKey],
    },
    "fuji": {
        chainId: 43113,
        url: "https://avalanche-fuji.infura.io/v3/e558ada833174869b035ae269bf2d107",
        accounts: [privateKey],
    },
    "mumbai": {
        chainId: 80001,
        url: "https://polygon-mumbai.g.alchemy.com/v2/2I1o8wWbxZhgAY62REaTqbNd9JYwQiva",
        accounts: [privateKey],
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN_API_KEY,
      avalancheFujiTestnet: SNOWTRACE_API_KEY,
      polygonMumbai: POLYGONSCAN_API_KEY,
    },
  }
};

export default config;