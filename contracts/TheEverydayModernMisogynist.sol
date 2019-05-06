pragma solidity ^0.4.24;

import "./TradeableERC721Token.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

/**
 * @title TheEverydayModernMisogynist
 * TheEverydayModernMisogynist - a contract for my non-fungible art.
 */

contract TheEverydayModernMisogynist is TradeableERC721Token {
    constructor(address _proxyRegistryAddress) public TradeableERC721Token("The Everyday Modern Misogynist", "MAN", _proxyRegistryAddress) {}
}
