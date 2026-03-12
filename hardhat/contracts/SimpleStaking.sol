// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title SimpleStaking
 * @dev A simple staking contract using the ERC-4626 Tokenized Vault Standard.
 * Users can deposit an underlying ERC20 asset and receive "shares" (the yield-bearing ERC20).
 * Yield can be added to the vault by direct transfers, increasing the value of shares.
 * 
 * Security: Implements a virtual offset to mitigate inflation attacks.
 */
contract SimpleStaking is ERC4626 {
    /**
     * @dev Sets the underlying asset and the vault token details.
     * @param asset_ The address of the ERC20 token to be staked.
     * @param name_ The name of the yield-bearing token.
     * @param symbol_ The symbol of the yield-bearing token.
     */
    constructor(
        IERC20 asset_,
        string memory name_,
        string memory symbol_
    ) ERC4626(asset_) ERC20(name_, symbol_) {}

    /**
     * @dev Implementation of the virtual offset to protect against inflation attacks.
     * This increases the precision of shares relative to assets, making it unprofitable
     * for an attacker to manipulate the exchange rate of an empty vault.
     */
    function _decimalsOffset() internal view virtual override returns (uint8) {
        return 3;
    }
}

