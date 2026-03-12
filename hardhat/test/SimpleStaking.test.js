const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStaking (ERC-4626)", function () {
  let staking, asset, owner, user;
  const initialSupply = ethers.parseEther("1000");
  const stakeAmount = ethers.parseEther("100");

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    // Deploy a mock ERC20 token as the asset
    const MockToken = await ethers.getContractFactory("ERC20Mock");
    asset = await MockToken.deploy("Mock Token", "MTK", owner.address, initialSupply);
    await asset.waitForDeployment();

    // Deploy the staking vault
    const StakingVault = await ethers.getContractFactory("SimpleStaking");
    staking = await StakingVault.deploy(await asset.getAddress(), "Staked Mock Token", "sMTK");
    await staking.waitForDeployment();

    // Give some tokens to the user
    await asset.transfer(user.address, stakeAmount);
    await asset.connect(user).approve(await staking.getAddress(), stakeAmount);
  });

  it("Should allow users to stake and receive shares", async function () {
    await staking.connect(user).deposit(stakeAmount, user.address);
    
    expect(await staking.balanceOf(user.address)).to.equal(stakeAmount);
    expect(await staking.totalAssets()).to.equal(stakeAmount);
  });

  it("Should increase share value after yield distribution", async function () {
    await staking.connect(user).deposit(stakeAmount, user.address);
    
    // Distribute 10% yield
    const yieldAmount = ethers.parseEther("10");
    await asset.approve(await staking.getAddress(), yieldAmount);
    await staking.distributeYield(yieldAmount);

    // After yield, the same number of shares is worth more assets
    // assetPerShare = (stakeAmount + yieldAmount) / stakeAmount = 1.1
    const assetsForUser = await staking.convertToAssets(stakeAmount);
    expect(assetsForUser).to.be.closeTo(stakeAmount + yieldAmount, 1n);
  });
});

// Mock Token for testing
// I'll create a separate file for this or just include it if I were using a library.
// For this test, I'll create a small mock contract file.
