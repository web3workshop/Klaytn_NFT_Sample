# How to build a NFT project based on hardhat on Klaytn

## 1. install node.js
- pkg: go to https://nodejs.org/en/ (LTS version is recommended) then install
- tool: use nvm/brew to install node.js

## 2. project init
```shell
mkdir nft_project && cd nft_project
// init node.js project
npm init -f
// install hardhat
npm install --save-dev hardhat
// init hardhat project(Create a JavaScript project in this sample)
npx hardhat
```

## 3. configure Klaytn environment
- overwrite `hardhat.config.js` by below code
```js
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.9",
    networks: {
        klaytn: {
            url: "https://klaytn01.fandom.finance",
            accounts: ["ff11db829ed1fe9876fa13da611bcdfdf3d5dc350fd7d78b6401f132844d1462"],
            // if you want use mnemonic
            // accounts: {
            //   mnemonic: "test test test test test test test test test test test junk",
            //   path: "m/44'/60'/0'/0",
            //   initialIndex: 0,
            //   count: 20,
            //   passphrase: "",
            // }
            gasPrice: 250000000000
        },
        baobab: {
            url: "https://api.baobab.klaytn.net:8651",
            accounts: ["ff11db829ed1fe9876fa13da611bcdfdf3d5dc350fd7d78b6401f132844d1462"],
            // if you want use mnemonic
            // accounts: {
            //   mnemonic: "test test test test test test test test test test test junk",
            //   path: "m/44'/60'/0'/0",
            //   initialIndex: 0,
            //   count: 20,
            //   passphrase: "",
            // }
            gasPrice: 250000000000
        }
    }
};
```

## 4. code an NFT contract and compile
- install OpenZeppelin
```shell
npm i @openzeppelin/contracts
```

- code the contract(contract sample below) in `nft_project/contracts/`
```solidity
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
```

- compile the contract
```shell
npx hardhat compile
```

## 5. deploy the contract
- code deploy script file (overwrite `scripts/deploy.js` by below code)
```js
const hre = require("hardhat");

async function main() {

    const NFTSample = await hre.ethers.getContractFactory("NFTSample");
    const nftSample = await NFTSample.deploy("NFTSample","KNFT");

    await nftSample.deployed();

    console.log("NFTSample deployed to:", nftSample.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
```

- deploy the contract to baobab
```shell
npx hardhat run --network baobab scripts/deploy.js
```
- copy the address of contract in console
```
NFTSample deployed to: 0xeF984626f173035AdD026eE0c297547990dDf0Ac
```

## 6. interact with the contract(mint an NFT)
- code mint script file(new `scripts/mint.js` with the code below)
```js
const hre = require("hardhat");

async function main() {

    const NFTSample = await hre.ethers.getContractFactory("NFTSample");
    const nftSample = await NFTSample.attach("0xeF984626f173035AdD026eE0c297547990dDf0Ac")

    let tx = await nftSample.mint();

    console.log("NFTSample mint successfully", tx.hash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
```

- mint an NFT
```shell
npx hardhat run --network baobab scripts/mint.js
```
then copy tx.Hash to baobab Explorer to query
```
// 0xdad7b62162b513debab2ab19977d635a3126fd4a3da04e0f188d253a7f28a1d0 is tx.Hash
// go to https://baobab.scope.klaytn.com/tx/{tx.Hash}
// there will be an NFT Transfer at the bottom of the page
NFTSample mint successfully 0xdad7b62162b513debab2ab19977d635a3126fd4a3da04e0f188d253a7f28a1d0
```