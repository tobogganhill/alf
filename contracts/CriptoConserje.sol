pragma solidity ^0.4.24;

import "./TradeableERC721Token.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

/**
 * @title CriptoConserje
 * CriptoConserje - a contract for my non-fungible art.
 */

contract CriptoConserje is TradeableERC721Token {
    constructor(address _proxyRegistryAddress) public TradeableERC721Token("Cripto Conserje", "CSRJ", _proxyRegistryAddress) {}
}
