# Simple Staking Contract (ERC-4626)

This project implements a robust, standard-compliant staking mechanism using the **ERC-4626 Tokenized Vault Standard**. It allows users to deposit an underlying ERC20 token and receive yield-bearing shares in return.

## 🚀 Overview

The staking system is built on top of OpenZeppelin's implementation of ERC-4626. This standard is the industry benchmark for yield-bearing vaults, ensuring compatibility with various DeFi protocols.

### Key Features
- **ERC-4626 Compliant**: Follows the Ethereum standard for tokenized vaults.
- **Yield via Transfers**: Shares naturally increase in value as external protocols or users transfer tokens directly to the vault.
- **Auto-Compounding Logic**: The exchange rate between assets and shares updates automatically based on the vault's balance.
- **OpenZeppelin Security**: Leverages battle-tested libraries for `SafeERC20` and `ERC4626`.

## 🏗️ Architecture

| Component | Description |
|-----------|-------------|
| **Asset** | The underlying ERC20 token that users stake. |
| **Shares** | The ERC20 tokens issued by the vault representing a user's stake. |
| **SimpleStaking** | The main vault contract managing the exchange rate between Assets and Shares. |

## 🛠️ Getting Started

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

## 🧪 Testing

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

## Project Structure


- `contracts/SimpleStaking.sol`: The main ERC-4626 staking vault.
- `contracts/ERC20Mock.sol`: A mock token used for testing purposes.
- `test/SimpleStaking.test.js`: Comprehensive test suite using Chai and Ethers.js.
- `hardhat.config.js`: Configuration for compilation and EVM targets.

## 📄 License
This project is licensed under the MIT License.
