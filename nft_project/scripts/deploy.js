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
