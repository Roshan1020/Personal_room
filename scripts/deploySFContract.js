const hre = require("hardhat");
const { Framework } = require("@superfluid-finance/sdk-core");
require('dotenv').config();

const owner = process.env.PUB_KEY;

// run: npx hardhat run scripts/deploySFContract.js --network matic
async function main() {
  const provider = new hre.ethers.providers.JsonRpcProvider(process.env.MATIC_URL);
  const semaphorAddr = "0x7a9aBb8C43916a9Ddcf9307e0664aC37A822a0Aa";

  const sf = await Framework.create({
    chainId: (await provider.getNetwork()).chainId,
    provider,
    customSubgraphQueriesEndpoint: "",
    dataMode: "WEB3_ONLY"
  });

  const Router = await hre.ethers.getContractFactory("SFRouter");
  const sfRouter = await Router.deploy(sf.settings.config.hostAddress, owner, semaphorAddr);

  await sfRouter.deployed();

  console.log(`\n\ncontract deployed at: ${sfRouter.address}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
