import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { yellow, green } from "cli-color"

import Token from "../artifacts/contracts/Token.sol/Token.json";
/* eslint-disable @typescript-eslint/no-var-requires */
const {
  predictContractConstant,
  deployContractConstant,
} = require("@axelar-network/axelar-gmp-sdk-solidity");

const deploy: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployer } = await hre.getNamedAccounts();

  console.log(`[${hre.network.name}]: Deployer address ${deployer}`);

  const signer = await hre.ethers.getSigner(deployer);

  // network dependent contracts
  const constAddressDeployer = "0x98b2920d53612483f91f12ed7754e51b4a77919e"; //Testnet


  const contractSalt = "example";
  const contractAddress = await predictContractConstant(
    constAddressDeployer,
    signer,
    Token,
    contractSalt,
    [],
  );

  const alreadyDeployed: boolean = (await hre.ethers.provider.getCode(contractAddress)) != "0x";
  console.log(`[${hre.network.name}]: Token already deployed: ${alreadyDeployed}`);
  console.log(`[${hre.network.name}]: Token address ${contractAddress}`);

  // deploy multicall
  if (!alreadyDeployed) {
    console.log(`[${hre.network.name}]: Deploying Token ...`);
    console.log(`[${hre.network.name}]: Using Salt: ${contractSalt}`);
    const multicall = await deployContractConstant(
      constAddressDeployer,
      signer,
      Token,
      contractSalt,
      [],
    );
    console.log(green(`[${hre.network.name}]: "Token" deployed at ${multicall.address}`));
  } else {
    console.log(yellow(`[${hre.network.name}]: reusing Token at ${contractAddress}`));
    console.log(yellow(`[${hre.network.name}]: current Token salt "${contractSalt}"`));
    console.log(
      yellow(
        `[${hre.network.name}]: If you want to force deployment change the constAddressDeployer salt`,
      ),
    );
  }
  //delay before verify
  new Promise(resolve => setTimeout(resolve, 6000));

  await hre
    .run("verify:verify", {
      address: contractAddress,
      constructorArguments: [],
    })
    .catch(e => console.log(e.message));
};

deploy.tags = ["TokenConst"];

export default deploy;
