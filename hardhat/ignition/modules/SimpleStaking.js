const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SimpleStakingModule", (m) => {
  const assetAddress = "0x22c26E2278Fb64bF367dE2121762e174ce02c4ED";
  const tokenName = "Staking Yield Token";
  const tokenSymbol = "YIELD";

  const simpleStaking = m.contract("SimpleStaking", [
    assetAddress,
    tokenName,
    tokenSymbol,
  ]);

  return { simpleStaking };
});
