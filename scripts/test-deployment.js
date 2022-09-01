const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const TimeLockContract = await hre.ethers.getContractAt("TimeLock","0xb918559563936073285633C1AE1eDf95c5Fb7602")
    const tokenERC20Contract = await hre.ethers.getContractAt("Token1","0xF60E2FB300DB40d1b3f4f4cC3c4Bc16024b89d0d")
    const tokenERC721Contract = await hre.ethers.getContractAt("TokenERC721","0xed88Dcee3507Eb30f61cED6C294959CEf63E2398")
    await tokenERC20Contract.approve(TimeLockContract.address, 200)
    await tokenERC721Contract.approve(TimeLockContract.address, 0)
    await TimeLockContract.createLockERC20(tokenERC20Contract.address, 10, 1)
    await TimeLockContract.createLockERC721(tokenERC721Contract.address, 0, 1)
    console.log("Succesfully created timelock")
    for(let i=0; i<3;i++){
        await TimeLockContract.createLockERC20(tokenERC20Contract.address, 10, 1) // Just for creating timelag
    }
    await TimeLockContract.breakLockERC20(0)
    await TimeLockContract.breakLockERC721(1)
    console.log("Successfully breaked the lock !!!!!")
  }
  
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });