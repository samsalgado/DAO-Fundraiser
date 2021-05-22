// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "../contracts/Library.sol";

contract Fundraiser is Library {
    struct Funding{
        uint256 id;
        string name;
        uint256 amount;
        address payable recipient;
    }
    mapping(uint256 => Funding) public funding;
    mapping(address => uint256) public funds;
    mapping(address => uint256) balances;
    uint256 public totalFunds;
    uint256 public availableFunds;
    
    function contribute() payable public{
        balances[msg.sender] += msg.value;
    }
    function withdraw() payable public {
if(balances[msg.sender]== 0){
    revert();
}
balances[msg.sender]=0;
payable (msg.sender).transfer(balances[msg.sender]);

} 
    function getFunds() public view returns(uint) {
        return address(this).balance;
    }
    function redeemFunds(uint256 amount) onlyOwner payable external {
        require(funds[msg.sender]>= amount);
        require(availableFunds>= amount);
        funds[msg.sender]-= amount;
        availableFunds -= amount;
        payable(msg.sender).transfer(amount);
    }
}