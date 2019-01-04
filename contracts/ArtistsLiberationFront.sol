pragma solidity ^0.4.24;

import "./TradeableERC721Token.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

/**
 * @title ArtistsLiberationFront
 * JohnnyDapp - a contract for my non-fungible art.
 */

contract ArtistsLiberationFront is TradeableERC721Token {
    constructor(address _proxyRegistryAddress) public TradeableERC721Token("ArtistsUnleashed", "ALF", _proxyRegistryAddress) {}
}