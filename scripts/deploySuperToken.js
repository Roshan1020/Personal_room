const hre = require("hardhat");
require("dotenv").config();

// run: npx hardhat run scripts/deploySuperToken.js --network matic
async function main() {
  const SuperToken = await hre.ethers.getContractFactory("EmerToken");
  const superToken = await SuperToken.deploy();

  await superToken.deployed();
  await superToken.initialize("EMERG","EMG",process.env.TOKEN_FACTORY);

  console.log(`\n\nSuperToken deployed to: ${superToken.address}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});