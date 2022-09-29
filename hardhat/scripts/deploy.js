const { ethers } = require("hardhat");
const { WST_NFT_CONTRACT_ADDRESS } = require("../constants");

async function main() {
  console.log("Deploy started");
  const FakeNftMarketPlace = await ethers.getContractFactory(
    "FakeNFTMarketPlace"
  );
  console.log("MPlace Get Factory done");
  const fakeNftMarketplace = await FakeNftMarketPlace.deploy();
  console.log("MPlace deploy");
  await fakeNftMarketplace.deployed();
  console.log("Mplace deployed");

  console.log("Fake Nft Market Address:", fakeNftMarketplace.address);

  const WSTDAO = await ethers.getContractFactory("WSTDAO");
  console.log("WSTDAO Get Factory done");
  const WstDao = await WSTDAO.deploy(
    fakeNftMarketplace.address,
    WST_NFT_CONTRACT_ADDRESS,
    {
      // This assumes your account has at least 1 ETH in it's account
      // Change this value as you want
      value: ethers.utils.parseEther("0.001"),
    }
  );
  console.log("MPlace Deploy started");
  await WstDao.deployed();

  console.log("WST DAO Address:", WstDao.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
