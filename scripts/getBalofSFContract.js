const hre = require("hardhat");
const { ethers } = require("hardhat");
require("dotenv").config();
const sfRouterABI = require("../artifacts/contracts/SFRouter.sol/SFRouter.json").abi;

// run: npx hardhat run scripts/getBalofSFContract.js --network matic
async function main() {
  const sfRouterAddress = process.env.CONTRACT_ADDR;
  const provider = new hre.ethers.providers.JsonRpcProvider(process.env.MATIC_URL);

  const SFbal = await provider.getBalance(sfRouterAddress);
  const ownerBal = await provider.getBalance(process.env.PUB_KEY);
  console.log(`\n${SFbal} \n${ownerBal}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});