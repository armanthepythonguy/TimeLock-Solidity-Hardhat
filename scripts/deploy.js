const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const TimeLockContract = await hre.ethers.getContractFactory("TimeLock")
    const timeLock = await TimeLockContract.deploy()
    await timeLock.deployed()
    console.log(timeLock.address)
  }
  
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  