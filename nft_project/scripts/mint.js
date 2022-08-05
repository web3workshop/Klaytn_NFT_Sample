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
