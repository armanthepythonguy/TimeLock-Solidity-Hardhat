// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token.sol";

contract TimeLock{
    
    struct LockInstant {
        address owner;
        uint duration;
        uint starttime;
        uint amount;
        address contractAddress;
    }

    address owner;

    constructor(){
        owner = msg.sender;
    }

    LockInstant[] lockInstants;

    uint256 currentIndex = 0;

    function createLock(address _contractAddress, uint256 _amount, uint _duration) public {
        Token token = Token(_contractAddress);
        token.transferFrom(msg.sender, address(this), _amount);
        lockInstants.push(LockInstant(msg.sender, _duration, block.timestamp, _amount, _contractAddress));
        currentIndex++;
    }

    function breakLock(uint256 _index) public {
        require(msg.sender == lockInstants[_index].owner, "Only owner can open the lock");
        require(block.timestamp > lockInstants[_index].starttime + lockInstants[_index].duration, "Lock time not completed");
        Token token = Token(lockInstants[_index].contractAddress);
        token.transfer(msg.sender, lockInstants[_index].amount);
    }

    function getLock(uint256 _index) public view returns(LockInstant memory){
        return lockInstants[_index];
    }

    function getLocks() public view returns(LockInstant[] memory){
        return lockInstants;
    }

}