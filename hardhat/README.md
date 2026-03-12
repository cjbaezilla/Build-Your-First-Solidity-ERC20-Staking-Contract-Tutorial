# Simple Staking Contract (ERC-4626)

This project implements a robust, standard-compliant staking mechanism using the **ERC-4626 Tokenized Vault Standard**. It allows users to deposit an underlying ERC20 token and receive yield-bearing shares in return.

## 🚀 Overview

The staking system is built on top of OpenZeppelin's implementation of ERC-4626. This standard is the industry benchmark for yield-bearing vaults, ensuring compatibility with various DeFi protocols.

### Key Features
- **ERC-4626 Compliant**: Follows the Ethereum standard for tokenized vaults.
- **Yield Distribution**: Includes a mechanism for the owner to distribute yield to stakers.
- **Auto-Compounding Logic**: Shares naturally increase in value as yield is added to the vault.
- **OpenZeppelin Security**: Leveragesbattle-tested libraries for `Ownable` and `SafeERC20`.

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
2. **Yield Distribution**: Verifying that the value of shares increases correctly after yield is distributed by the owner.

Run tests with:
```bash
npx hardhat test
```

## 📂 Project Structure

- `contracts/SimpleStaking.sol`: The main ERC-4626 staking vault.
- `contracts/ERC20Mock.sol`: A mock token used for testing purposes.
- `test/SimpleStaking.test.js`: Comprehensive test suite using Chai and Ethers.js.
- `hardhat.config.js`: Configuration for compilation and EVM targets.

## 📄 License
This project is licensed under the MIT License.
