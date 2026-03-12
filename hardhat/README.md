# Simple Staking Contract (ERC-4626)

This project implements a robust, standard-compliant staking mechanism using the **ERC-4626 Tokenized Vault Standard**. It allows users to deposit an underlying ERC20 token and receive yield-bearing shares in return.

## Overview

The staking system is built on top of OpenZeppelin's implementation of ERC-4626. This standard is the industry benchmark for yield-bearing vaults, ensuring compatibility with various DeFi protocols.

### Key Features
- **ERC-4626 Compliant**: Follows the Ethereum standard for tokenized vaults.
- **Yield via Transfers**: Shares naturally increase in value as external protocols or users transfer tokens directly to the vault.
- **Auto-Compounding Logic**: The exchange rate between assets and shares updates automatically based on the vault's balance.
- **OpenZeppelin Security**: Leverages battle-tested libraries for `SafeERC20` and `ERC4626`.

For more details on the standard, you can read the [OpenZeppelin ERC-4626 documentation](https://docs.openzeppelin.com/contracts/5.x/erc4626).

## Architecture

| Component | Description |
|-----------|-------------|
| **Asset** | The underlying ERC20 token that users stake. |
| **Shares** | The ERC20 tokens issued by the vault representing a user's stake. |
| **SimpleStaking** | The main vault contract managing the exchange rate between Assets and Shares. |

## Getting Started

### Prerequisites
- Node.js & npm
- Hardhat

### Installation
1. Clone the repository.
2. Install dependencies:
```bash
npm install
```

### Compilation
The project uses Solidity `0.8.28` and targets the `cancun` EVM version.
```bash
npx hardhat compile
```

## Testing

The project includes a comprehensive test suite that verifies:
1. **Staking/Unstaking**: Ensuring users can deposit assets and receive the correct amount of shares.
2. **Yield Tracking**: Verifying that the value of shares increases correctly after yield is added to the contract via direct transfers.

Run tests with:
```bash
npx hardhat test
```

## Deployments (Sepolia)

| Contract | Address | Transaction Hash |
|----------|---------|------------------|
| **ERC20Mock** | [`0x22c26E2278Fb64bF367dE2121762e174ce02c4ED`](https://sepolia.etherscan.io/address/0x22c26E2278Fb64bF367dE2121762e174ce02c4ED) | [`0xbe3dd6773d7b8b18b553293eaa7f90a72cc129fe3c9919587e3cb1da31f3d2e3`](https://sepolia.etherscan.io/tx/0xbe3dd6773d7b8b18b553293eaa7f90a72cc129fe3c9919587e3cb1da31f3d2e3) |
| **SimpleStaking** | [`0x637a4de5e0068d1F0dfc91B3C00A1B7c92Ed3458`](https://sepolia.etherscan.io/address/0x637a4de5e0068d1F0dfc91B3C00A1B7c92Ed3458) | [`0xb89c9a91d4e4a073205b6da9fdc6e1f12a7103372b590210881e30fca8518aef`](https://sepolia.etherscan.io/tx/0xb89c9a91d4e4a073205b6da9fdc6e1f12a7103372b590210881e30fca8518aef) |

### Asset Token Details (Underlying)

This is the base currency of the vault. Users deposit (stake) this token into the contract to begin earning yield.

| Property | Value |
|----------|-------|
| **Name** | Demo Token Staking |
| **Symbol** | DEMO |
| **Decimals** | 18 |

### Yield Token Details (Shares)

This token is issued to users when they stake their assets. It represents their ownership of a part of the vault's total assets. As the vault earns yield, each share becomes worth more of the underlying asset.

| Property | Value |
|----------|-------|
| **Name** | Staking Yield Token |
| **Symbol** | YIELD |
| **Decimals** | 18 |

## Security Analysis & Enhancements

Following the OpenZeppelin ERC-4626 standard guidelines and deeper structural analysis, the `SimpleStaking` contract has been optimized for both security and efficiency:

### 1. Inflation Attack Protection (Decimals Offset)

**The Vulnerability:** ERC-4626 vaults can be susceptible to "Inflation Attacks" where an attacker manipulates the exchange rate of an empty vault by "donating" tokens. This forces rounding errors that can steal Subsequent users' deposits.

**The Solution:** We implemented the `_decimalsOffset()` override returning `3`.
- This introduces "virtual assets" and "virtual shares" into the internal math.
- It increases the precision of shares relative to assets, making it orders of magnitude more expensive for an attacker to exploit the rounding logic.

### 2. OpenZeppelin Compliance Summary

| Feature | Status | Implementation |
| :--- | :--- | :--- |
| **ERC-4626 Standard** | ✅ Compliant | Full inheritance and standard implementation. |
| **Security Hardening** | ✅ Protected | `_decimalsOffset` implemented for inflation defense. |
| **Yield Tracking** | ✅ Automated | Tracking direct transfers via standard `totalAssets`. |
| **Code Hygiene** | ✅ Optimized | Removed unused imports and redundant overrides. |

## Project Structure

- `contracts/SimpleStaking.sol`: The main ERC-4626 staking vault.
- `contracts/ERC20Mock.sol`: A mock token used for testing purposes.
- `test/SimpleStaking.test.js`: Comprehensive test suite using Chai and Ethers.js.
- `hardhat.config.js`: Configuration for compilation and EVM targets.

## 📄 License
This project is licensed under the MIT License.
