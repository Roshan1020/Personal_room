const hre = require("hardhat");
const { ethers } = require("hardhat");
require("dotenv").config();
const SFRouterABI = require("../artifacts/contracts/SFRouter.sol/SFRouter.json").abi;

// fake coin = fDAIx
// run: npx hardhat run scripts/depositSum.js --network matic
async function main() {
  const SFRouterAddress = process.env.CONTRACT_ADDR;
  const provider = new hre.ethers.providers.JsonRpcProvider(process.env.MATIC_URL);

  // const signers = await hre.ethers.getSigners();
  const sfRouter = new ethers.Contract(SFRouterAddress, SFRouterABI, provider);
  const wallet = new ethers.Wallet(process.env.PRI_KEY, provider);
  
  // ARGS: ISuperfluidToken token, address receiver, int96 flowRate
  await sfRouter.connect(wallet).sendLumpSumToContract(process.env.TOKEN_ADDR, ethers.utils.parseEther("10000.0")).then(function (tx) {
    console.log(`\n\nFunds successfully sent to SF router. Tx Hash: ${tx.hash}\n`)
  })
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});