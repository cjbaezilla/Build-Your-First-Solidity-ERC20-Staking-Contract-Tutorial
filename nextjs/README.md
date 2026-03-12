# ERC-4626 Staking Vault UI

A premium, standardized user interface for interacting with the **Simple Staking (ERC-4626)** vault. This application allows users to stake their **DEMO** tokens and earn **YIELD** bearing shares through a seamless, highly-polished web experience.

## ✨ Features

-   **Standardized Staking**: Full integration with the ERC-4626 Tokenized Vault Standard.
-   **Intelligent Logic**: One-click "Stake" button that automatically handles approvals if needed.
-   **Real-time Yield Tracking**: Visualizes total vault assets and user-specific staked balances.
-   **Premium UI/UX**: Modern dark-mode interface with glassmorphism, radial gradients, and smooth transitions.
-   **Abstracted Architecture**: Clean separation of concerns using custom hooks and modular components.

## 🛠 Tech Stack

-   **Frontend**: Next.js (Pages Router)
-   **Web3 Connectivity**: RainbowKit + Wagmi
-   **Contract Interaction**: Viem
-   **Styling**: Vanilla CSS Modules (Premium aesthetics)
-   **Language**: TypeScript (Strict typing for ABIs)

## 📁 Project Structure

```text
src/
├── components/
│   └── StakingCard.tsx     # The main interactive staking module
├── constants/
│   └── contracts.ts        # Centralized ABIs and contract addresses
├── hooks/
│   └── useStaking.ts       # logic abstraction (balances, allowance, txs)
├── pages/
│   ├── _app.tsx            # Wagmi/RainbowKit configuration
│   └── index.tsx           # Premium landing page layout
└── styles/
    ├── Staking.module.css  # Card-specific styles & glassmorphism
    ├── Home.module.css     # Layout & hero section styling
    └── globals.css         # Typography & global theme
```

## 🏗 Key Implementation Details

### 1. The `useStaking` Hook
Located at `src/hooks/useStaking.ts`, this hook serves as the "brain" of the application. It abstracts:
-   **Read Operations**: Fetches `balanceOf` (both Asset and Share), `allowance`, and `totalAssets`.
-   **Calculations**: Uses `convertToAssets` to show the real-time value of the user's stake in the underlying asset.
-   **Write Operations**: Handles `approve`, `deposit`, and `redeem` transactions with lifecycle management (`isPending`, `isWaitingForTransaction`).

### 2. Smart Contract Integration
Managed in `src/constants/contracts.ts`, providing full TypeScript type-safety for contract interactions.
-   **ERC20Mock (DEMO)**: `0x22c26E2278Fb64bF367dE2121762e174ce02c4ED`
-   **SimpleStaking (YIELD)**: `0x637a4de5e0068d1F0dfc91B3C00A1B7c92Ed3458`

### 3. Design System
The UI was built with a "Premium-First" approach:
-   **Dark Theme**: Uses `#0a0a0b` as base with complex radial gradients.
-   **Glassmorphism**: The `StakingCard` uses a high-blur backdrop filter and subtle border highlights.
-   **Typography**: Implements **Plus Jakarta Sans** for a modern, high-tech fintech feel.

## 🚀 Getting Started

### Prerequisites
-   Node.js & npm
-   A Web3 Wallet (MetaMask, Rainbow, etc.)

### Installation
1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Configure your RainbowKit Project ID in `src/wagmi.ts` (optional for local testing).

### Development
Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the vault.

## 🔐 Security & UX
-   **Protection**: UI interactions respect the contract's `_decimalsOffset` implementation, ensuring precision is handled correctly for the user.
-   **Status Guidance**: Informative states for "Confirming in Wallet" and "Transaction Pending" ensure users are never left guessing.
-   **Input Validation**: Max-balance shortcuts and numeric sanitization prevent invalid transaction attempts.

