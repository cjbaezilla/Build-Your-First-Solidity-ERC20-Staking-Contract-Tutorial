import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { formatUnits, parseUnits } from 'viem';
import { 
  ERC20_MOCK_ADDRESS, 
  ERC20_MOCK_ABI, 
  SIMPLE_STAKING_ADDRESS, 
  SIMPLE_STAKING_ABI 
} from '../constants/contracts';
import { useState, useEffect } from 'react';

export function useStaking() {
  const { address } = useAccount();
  const { writeContract, data: hash, error: writeError, isPending } = useWriteContract();
  
  const { isLoading: isWaitingForTransaction, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Fetch decimals
  const { data: assetDecimals } = useReadContract({
    address: ERC20_MOCK_ADDRESS,
    abi: ERC20_MOCK_ABI,
    functionName: 'decimals',
  });

  const { data: shareDecimals } = useReadContract({
    address: SIMPLE_STAKING_ADDRESS,
    abi: SIMPLE_STAKING_ABI,
    functionName: 'decimals',
  });

  const aDec = assetDecimals ?? 18;
  const sDec = shareDecimals ?? 18;

  // Fetch balances
  const { data: assetBalance, refetch: refetchAssetBalance } = useReadContract({
    address: ERC20_MOCK_ADDRESS,
    abi: ERC20_MOCK_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  });

  const { data: shareBalance, refetch: refetchShareBalance } = useReadContract({
    address: SIMPLE_STAKING_ADDRESS,
    abi: SIMPLE_STAKING_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: ERC20_MOCK_ADDRESS,
    abi: ERC20_MOCK_ABI,
    functionName: 'allowance',
    args: address ? [address, SIMPLE_STAKING_ADDRESS] : undefined,
    query: {
      enabled: !!address,
    }
  });

  const { data: totalAssets, refetch: refetchTotalAssets } = useReadContract({
    address: SIMPLE_STAKING_ADDRESS,
    abi: SIMPLE_STAKING_ABI,
    functionName: 'totalAssets',
  });

  // Preview redeem (how many assets for current shares)
  const { data: previewAssets } = useReadContract({
    address: SIMPLE_STAKING_ADDRESS,
    abi: SIMPLE_STAKING_ABI,
    functionName: 'convertToAssets',
    args: shareBalance ? [shareBalance] : undefined,
    query: {
      enabled: !!shareBalance,
    }
  });

  const refetchAll = () => {
    refetchAssetBalance();
    refetchShareBalance();
    refetchAllowance();
    refetchTotalAssets();
  };

  useEffect(() => {
    if (isSuccess) {
      refetchAll();
    }
  }, [isSuccess]);

  const approve = async (amount: string) => {
    const value = parseUnits(amount, aDec);
    writeContract({
      address: ERC20_MOCK_ADDRESS,
      abi: ERC20_MOCK_ABI,
      functionName: 'approve',
      args: [SIMPLE_STAKING_ADDRESS, value],
    });
  };

  const deposit = async (amount: string) => {
    if (!address) return;
    const value = parseUnits(amount, aDec);
    writeContract({
      address: SIMPLE_STAKING_ADDRESS,
      abi: SIMPLE_STAKING_ABI,
      functionName: 'deposit',
      args: [value, address],
    });
  };

  const redeem = async (amount: string) => {
    if (!address) return;
    const value = parseUnits(amount, sDec);
    writeContract({
      address: SIMPLE_STAKING_ADDRESS,
      abi: SIMPLE_STAKING_ABI,
      functionName: 'redeem',
      args: [value, address, address],
    });
  };

  const withdraw = async (amount: string) => {
    if (!address) return;
    const value = parseUnits(amount, aDec);
    writeContract({
      address: SIMPLE_STAKING_ADDRESS,
      abi: SIMPLE_STAKING_ABI,
      functionName: 'withdraw',
      args: [value, address, address],
    });
  };

  return {
    address,
    assetBalance: assetBalance ? formatUnits(assetBalance, aDec) : '0',
    shareBalance: shareBalance ? formatUnits(shareBalance, sDec) : '0',
    allowance: allowance ? formatUnits(allowance, aDec) : '0',
    totalAssets: totalAssets ? formatUnits(totalAssets, aDec) : '0',
    previewAssets: previewAssets ? formatUnits(previewAssets, aDec) : '0',
    approve,
    deposit,
    redeem,
    withdraw,
    isPending,
    isWaitingForTransaction,
    writeError,
    refetchAll
  };
}

