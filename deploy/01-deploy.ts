import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { yellow, green } from "cli-color"


const deploy: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log(yellow(`[${hre.network.name}]: Deployer address ${deployer}`));
  

  const signer = await hre.ethers.getSigner(deployer);
  const args = [];
  await deploy("Token", {
    from: deployer,
    args: args,
    log: true,
  });
  const contract = await deployments.get("Token");
  console.log(green(`[${hre.network.name}]: "Token" deployed at ${contract.address}`));
  //delay before verify
  new Promise(resolve => setTimeout(resolve, 6000));

  if (hre.network.name != "local") {
    await hre
      .run("verify:verify", {
        address: contract.address,
        constructorArguments: args,
      })
      .catch(e => console.log(e.message));
  }
};

deploy.tags = ["Token"];

export default deploy;
