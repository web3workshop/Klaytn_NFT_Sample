// SPDX-License-Identifier: UNLICENSED
// named NFTSample.sol
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NFTSample is ERC721Enumerable {
    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mint() public {
        _mint(msg.sender, totalSupply() + 1);
    }
}
