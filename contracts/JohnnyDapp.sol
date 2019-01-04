pragma solidity ^0.4.24;

import "./TradeableERC721Token.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

/**
 * @title JohnnyDapp
 * JohnnyDapp - a contract for my non-fungible art.
 */

contract JohnnyDapp is TradeableERC721Token {
    constructor(address _proxyRegistryAddress) public TradeableERC721Token("JohnnyDapp", "JDP", _proxyRegistryAddress) {}
}