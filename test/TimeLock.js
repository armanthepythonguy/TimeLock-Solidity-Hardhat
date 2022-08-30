const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

const ether = tokens

describe("Time Lock Testing", ()=>{
    let deployer, token1Contract, token1, timeLockContract, timeLock, tokenERC721Contract, tokenERC721, tx;
    beforeEach(async()=>{
        let accounts = await ethers.getSigners()
        deployer = accounts[0]
        user = accounts[1]
        token1Contract = await ethers.getContractFactory("Token1")
        token1 = await token1Contract.deploy(1000)
        tokenERC721Contract = await ethers.getContractFactory("TokenERC721")
        tokenERC721 = await tokenERC721Contract.deploy()
        for(let i=0; i<10; i++){
            await tokenERC721.safeMint(deployer.address)
        }
        timeLockContract = await ethers.getContractFactory("TimeLock")
        timeLock = await timeLockContract.deploy()
        tx = await token1.approve(timeLock.address,200)
        for(let i=0; i<10; i++){
            await tokenERC721.approve(timeLock.address, i)
        }
        await tx.wait()
    })
    describe("Testing the working of the lock", async()=>{
        it("Trying with one token", async()=>{

            // Checking the balance of the deployer's and contract before creating timelock
            console.log(`Deployer's address before creating an ERC20 timelocks is :-  ${await token1.balanceOf(deployer.address)}`)
            console.log(`Contracts balance before creating an ERC20 timelock is :- ${await token1.balanceOf(timeLock.address)}`)
            // Creating 10 timelocks each of 10 tokens and 1sec of timelock
            for(let i=0; i<10; i++){
                await timeLock.createLockERC20(token1.address, 10, 1)
            }
            // Checking the balance of the deployer's and contract after creating timelock
            console.log(`Deployer's address after creating an ERC20 timelocks is :-  ${await token1.balanceOf(deployer.address)}`)
            console.log(`Contracts balance after creating an ERC20 timelock is :- ${await token1.balanceOf(timeLock.address)}`)

            // Breaking the 1st timelock 
            await timeLock.breakLockERC20(0)

            // Checking the balance of the deployer's and contract after breaking timelock
            console.log(`Deployer's address after breaking an ERC20 timelocks is :-  ${await token1.balanceOf(deployer.address)}`)
            console.log(`Contracts balance after breaking an ERC20 timelock is :- ${await token1.balanceOf(timeLock.address)}`)

            // Checking the balance of the deployer's and contract before creating timelock
            console.log(`Deployer's address before creating an ERC721 timelocks is :-  ${await tokenERC721.balanceOf(deployer.address)}`)
            console.log(`Contracts balance before creating an ERC721 timelock is :- ${await tokenERC721.balanceOf(timeLock.address)}`)

            // Creating 10 timelocks each of 10 tokens and 1sec of timelock
            for(let i=0; i<10; i++){
                await timeLock.createLockERC721(tokenERC721.address, i, 1)
            }

            // Checking the balance of the deployer's and contract after creating timelock
            console.log(`Deployer's address after creating an ERC721 timelocks is :-  ${await tokenERC721.balanceOf(deployer.address)}`)
            console.log(`Contracts balance after creating an ERC721 timelock is :- ${await tokenERC721.balanceOf(timeLock.address)}`)

            // Breaking the 1st timelock 
            await timeLock.breakLockERC721(10)
            // Checking the balance of the deployer's and contract after breaking timelock
            console.log(`Deployer's address after breaking an ERC721 timelocks is :-  ${await tokenERC721.balanceOf(deployer.address)}`)
            console.log(`Contracts balance after breaking an ERC721 timelock is :- ${await tokenERC721.balanceOf(timeLock.address)}`)

        })
    })
})