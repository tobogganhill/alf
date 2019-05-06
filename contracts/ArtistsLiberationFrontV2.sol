pragma solidity ^0.4.24;

import "./TradeableERC721Token.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

/**
 * @title ArtistsLiberationFrontV2
 * JohnnyDapp - a contract for my non-fungible art.
 */

contract ArtistsLiberationFrontV2 is TradeableERC721Token {
    constructor(address _proxyRegistryAddress) public TradeableERC721Token("Artists' Liberation Front V2", "ALFv2", _proxyRegistryAddress) {}
}
