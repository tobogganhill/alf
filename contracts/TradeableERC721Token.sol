pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Enumerable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Metadata.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721MetadataMintable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Pausable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./Strings.sol";


contract OwnableDelegateProxy {}


contract ProxyRegistry {
    mapping(address => OwnableDelegateProxy) public proxies;
}

/**
 * @title TradeableERC721Token
 * TradeableERC721Token - ERC721 contract that whitelists a trading address, and has minting functionality.
 */

contract TradeableERC721Token is ERC721MetadataMintable, ERC721Pausable, ERC721Enumerable, Ownable {
    using Strings for string;

    address public proxyRegistryAddress;

    constructor(string _name, string _symbol, address _proxyRegistryAddress) public ERC721Metadata(_name, _symbol) {
        proxyRegistryAddress = _proxyRegistryAddress;
    }

    /**
     * Override isApprovedForAll to whitelist user's OpenSea proxy accounts to enable gas-less listings.
     */
    function isApprovedForAll(
        address owner,
        address operator
    )
    public
    view
    returns (bool)
    {
        // Whitelist OpenSea proxy contract for easy trading.
        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        if (proxyRegistry.proxies(owner) == operator) {
            return true;
        }

        return super.isApprovedForAll(owner, operator);
    }

    function mint(
        address _to,
        string _tokenURI) public returns(bool) {
        return mintWithTokenURI(_to, _getNextTokenId(), _tokenURI);
    }

    /**
      * @dev calculates the next token ID based on totalSupply
      * @return uint256 for the next token ID
      */
    function _getNextTokenId() private view returns (uint256) {
        return totalSupply().add(1);
    }
}