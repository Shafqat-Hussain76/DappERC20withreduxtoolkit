// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MYERC20 is ERC20("ERC20Token", "ERT") {
    uint public tokenPrice = 100;
    event BuyTokens(address indexed from, address indexed to, uint indexed amount);
    address owner;
    constructor(){
        _mint(_msgSender(), 1000 * 10 ** decimals());
        owner = _msgSender();
    }

    function buyTokens() external payable {
        uint tokens = msg.value * tokenPrice;
        uint bal = balanceOf(owner);
        require(bal >= tokens, " Not enogh Tokens");
        _transfer(owner, _msgSender(), tokens);
        emit BuyTokens(owner, _msgSender(), tokens);
    }

}