const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const tokenERC20Contract = await hre.ethers.getContractFactory("Token1")
    const tokenERC20 = await tokenERC20Contract.deploy(1000)
    await tokenERC20.deployed()
    console.log(tokenERC20.address)
  }
  
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  