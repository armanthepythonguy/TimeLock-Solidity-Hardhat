const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const ether = tokens

describe("Time Lock Testing", ()=>{
    let deployer, token1Contract, token1, timeLockContract, timeLock, token2Contract, token2, tx;
    beforeEach(async()=>{
        let accounts = await ethers.getSigners()
        deployer = accounts[0]
        token1Contract = await ethers.getContractFactory("Token1")
        token1 = await token1Contract.deploy(1000)
        token2Contract = await ethers.getContractFactory("Token2")
        token2 = await token2Contract.deploy(1000)
        timeLockContract = await ethers.getContractFactory("TimeLock")
        timeLock = await timeLockContract.deploy()
        tx = await token1.approve(timeLock.address,200)
        await tx.wait()
    })
    describe("Testing the working of the lock", async()=>{
        it("Trying with one token", async()=>{

            // Checking the balance of the deployer's and contract before creating timelock
            console.log(`Deployer's address before creating timelocks is :-  ${await token1.balanceOf(deployer.address)}`)
            console.log(`Contracts balance before creating timelock is :- ${await token1.balanceOf(timeLock.address)}`)
            // Creating 10 timelocks each of 10 tokens and 1sec of timelock
            for(let i=0; i<10; i++){
                await timeLock.createLock(token1.address, 10, 1)
            }
            // Checking the balance of the deployer's and contract after creating timelock
            console.log(`Deployer's address after creating timelocks is :-  ${await token1.balanceOf(deployer.address)}`)
            console.log(`Contracts balance after creating timelock is :- ${await token1.balanceOf(timeLock.address)}`)

            // Breaking the 1st timelock 
            await timeLock.breakLock(0)

            // Checking the balance of the deployer's and contract after breaking timelock
            console.log(`Deployer's address after breaking timelocks is :-  ${await token1.balanceOf(deployer.address)}`)
            console.log(`Contracts balance after breaking timelock is :- ${await token1.balanceOf(timeLock.address)}`)

        })
    })
})