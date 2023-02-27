import { Deployment } from 'hardhat-deploy/dist/types';
import { task } from 'hardhat/config';
import { ethers } from 'hardhat';
const Token = require('../artifacts/contracts/Token.sol/Token.json');
import { Artifact } from 'hardhat/types';

task('mint', 'mint tokens')
  .addParam('address', 'contract address')
  .addParam('amount', 'token amount to mint')
  .setAction(async (taskArgs, hre) => {
    const { deployments, getNamedAccounts, ethers } = hre;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.getSigner(deployer);


    const address = taskArgs.address;
    const amount = taskArgs.amount;
    const amountBN = ethers.utils.parseEther(amount);
    const token = new ethers.Contract(address, Token.abi, signer);
    const tx = await token["give"](amountBN);
    await tx.wait(1);
    console.log(`transaction hash: ${tx.hash}`);
    console.log(`minted ${amount} tokens to ${deployer}`);
  });
