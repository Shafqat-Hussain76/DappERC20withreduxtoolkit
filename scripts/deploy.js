
const hre = require("hardhat");

async function main() {

  const MYERC20 = await hre.ethers.getContractFactory("MYERC20");
  const mYERC20 = await MYERC20.deploy();
  await mYERC20.deployed();

  console.log("MYERC20 deployed to:", mYERC20.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
