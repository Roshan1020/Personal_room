const hre = require("hardhat");
require("dotenv").config();

// run: npx hardhat run scripts/mintNapproveToken.js --network matic
async function main() {
  const signers = await hre.ethers.getSigners();

  const SuperTokenABI = [
    "function mint(address, uint256, bytes)",
    "function transfer(address, uint256)",
    "function balanceOf(address) view returns(uint256)",
    "function approve(address, uint256) external returns(bool)",
  ];

  const superTokenContract = new hre.ethers.Contract(
    process.env.TOKEN_ADDR,
    SuperTokenABI,
    signers[0]
  );
  const amount = hre.ethers.utils.parseEther("1000000000");
  const mintTx = await superTokenContract.mint(process.env.PUB_KEY, amount, 0x0);

  const approveAmount = hre.ethers.utils.parseEther("10000000000000000000000000");
  await superTokenContract.approve(process.env.PUB_KEY, approveAmount);
  await superTokenContract.approve(process.env.CONTRACT_ADDR, approveAmount);

  await mintTx.wait();
  const userBalance = await superTokenContract.balanceOf(process.env.PUB_KEY);
  console.log(`\nUser Balance= ${userBalance}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});