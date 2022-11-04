const hre = require("hardhat");
const { ethers } = require("hardhat");
require("dotenv").config();
const sfRouterABI = require("../artifacts/contracts/SFRouter.sol/SFRouter.json").abi;

// run: npx hardhat run scripts/sendVerifyTx.js --network matic
async function main() {
  const sfRouterAddress = process.env.CONTRACT_ADDR;
  const provider = new hre.ethers.providers.JsonRpcProvider(process.env.MATIC_URL);

  const sfRouter = new ethers.Contract(sfRouterAddress, sfRouterABI, provider);
  const wallet = new ethers.Wallet(process.env.PRI_KEY, provider);

  for (let i=0; i<5; i++) {
    await sfRouter.connect(wallet).createRoom();
  }

    // uint256 groupdId, 
    // bytes32 signal, 
    // uint256 nullifierHash, 
    // uint256 externalNullifier, 
    // uint256[8] calldata proof, 
    // // bytes32 signedMessage, 
    // uint256 roomId
  
  await sfRouter.connect(wallet).sendTransaction(
    
  ).then(function (tx) {
    console.log(`\n\nFlow successfully created. Tx Hash: ${tx.hash}\n`)
  })
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});