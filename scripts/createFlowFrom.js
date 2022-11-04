const hre = require("hardhat");
const { ethers } = require("hardhat");
require("dotenv").config();
const sfRouterABI = require("../artifacts/contracts/SFRouter.sol/SFRouter.json").abi;

// run: npx hardhat run scripts/createFlowFrom.js --network matic
async function main() {
  const sfRouterAddress = process.env.CONTRACT_ADDR;
  const receiver = process.env.RECEIVER;
  const provider = new hre.ethers.providers.JsonRpcProvider(process.env.MATIC_URL);

  const sfRouter = new ethers.Contract(sfRouterAddress, sfRouterABI, provider);
  const wallet = new ethers.Wallet(process.env.PRI_KEY, provider);
  
  await sfRouter.connect(wallet).createFlowFromContract(process.env.TOKEN_ADDR, receiver, "3858024691358020").then(function (tx) {
    console.log(`\n\nFlow successfully created. Tx Hash: ${tx.hash}\n`)
  })
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});