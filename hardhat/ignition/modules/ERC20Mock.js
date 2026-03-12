const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const ERC20MockModule = buildModule("ERC20MockModule", (m) => {
  const name = "Demo Token Staking";
  const symbol = "DEMO";
  const initialAccount = m.getAccount(0);
  const initialBalance = BigInt(1000000) * BigInt(10) ** BigInt(18); // 1,000,000 tokens

  const erc20Mock = m.contract("ERC20Mock", [
    name,
    symbol,
    initialAccount,
    initialBalance,
  ]);

  return { erc20Mock };
});

module.exports = ERC20MockModule;
