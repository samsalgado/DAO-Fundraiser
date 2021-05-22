// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Library{
    
    address owner;
    
    function isNotPositive(uint number) public pure returns (bool){
        if(number<=0){
            return true;
        }
        return false;
    }
    

    function destroy() payable public onlyOwner {
    }
    
    modifier onlyOwner {
        if(msg.sender != owner){
            revert();
        }
        _;
    }
    
    function initOwner() payable public{
        if(owner==address(0)){
            owner = msg.sender;
        }
        else{
            revert();
        }
    }
    
}