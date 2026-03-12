// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SimpleStaking
 * @dev A simple staking contract using the ERC-4626 Tokenized Vault Standard.
 * Users can deposit an underlying ERC20 asset and receive "shares" (the yield-bearing ERC20).
 * Yield can be added to the vault by the owner or external protocols, increasing the value of shares.
 */
contract SimpleStaking is ERC4626, Ownable {
    using SafeERC20 for IERC20;

    event YieldDistributed(address indexed provider, uint256 amount);
    
    /**
     * @dev Sets the underlying asset and the vault token details.
     * @param asset The address of the ERC20 token to be staked.
     * @param name The name of the yield-bearing token.
     * @param symbol The symbol of the yield-bearing token.
     */
    constructor(
        IERC20 asset,
        string memory name,
        string memory symbol
    ) ERC4626(asset) ERC20(name, symbol) Ownable(msg.sender) {}

    /**
     * @dev Function to simulate/add yield to the vault.
     * In a real-world scenario, this might come from trading fees, lending interest, etc.
     * Here, the owner can manually transfer assets to the contract to increase the share price.
     * @param amount The amount of underlying assets added as yield.
     */
    function distributeYield(uint256 amount) external onlyOwner {
        IERC20(asset()).safeTransferFrom(msg.sender, address(this), amount);
        emit YieldDistributed(msg.sender, amount);
    }

    /**
     * @dev Returns the total amount of the underlying asset that is "managed" by the vault.
     * Overriding if there's custom logic, but ERC4626 default is fine for simple cases.
     */
    function totalAssets() public view virtual override returns (uint256) {
        return IERC20(asset()).balanceOf(address(this));
    }
}
