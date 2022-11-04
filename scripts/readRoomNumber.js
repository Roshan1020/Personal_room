const { ethers } = require('hardhat');
require('dotenv').config();

// ethers methods
const utils = ethers.utils;
const BigNumber = ethers.BigNumber;

// run: npx hardhat run scripts/readRoomNumber.js --network matic
async function main() {
  async function getUint(slot, contractAddress) {
    const paddedSlot = utils.hexZeroPad(slot, 32);
    const storageLocation = await ethers.provider.getStorageAt(contractAddress, paddedSlot);
    const storageValue = BigNumber.from(storageLocation);
    return storageValue;  
  }
  
  const rmNum = await getUint("0x1", process.env.CONTRACT_ADDR);
  console.log(rmNum);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});