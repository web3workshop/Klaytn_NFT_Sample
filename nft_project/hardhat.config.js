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
