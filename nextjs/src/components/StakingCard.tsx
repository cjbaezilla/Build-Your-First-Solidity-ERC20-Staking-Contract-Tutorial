import { useState } from 'react';
import { useStaking } from '../hooks/useStaking';
import styles from '../styles/Staking.module.css';

export function StakingCard() {
  const {
    assetBalance,
    shareBalance,
    allowance,
    totalAssets,
    previewAssets,
    approve,
    deposit,
    withdraw,
    isPending,
    isWaitingForTransaction,
    address
  } = useStaking();

  const [amount, setAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'stake' | 'unstake'>('stake');

  const handleAction = async () => {
    if (!amount || isNaN(Number(amount))) return;

    if (activeTab === 'stake') {
      if (Number(allowance) < Number(amount)) {
        await approve(amount);
      } else {
        await deposit(amount);
      }
    } else {
      await withdraw(amount);
    }
  };

  if (!address) {
    return (
      <div className={styles.card}>
        <h2 className={styles.title}>Welcome to Staking</h2>
        <p className={styles.description}>Please connect your wallet to start earning yield.</p>
      </div>
    );
  }

  const isApproved = Number(allowance) >= Number(amount) && Number(amount) > 0;

  return (
    <div className={styles.card}>
      <div className={styles.tabs}>
        <button 
          className={activeTab === 'stake' ? styles.activeTab : styles.tab} 
          onClick={() => setActiveTab('stake')}
        >
          Stake
        </button>
        <button 
          className={activeTab === 'unstake' ? styles.activeTab : styles.tab} 
          onClick={() => setActiveTab('unstake')}
        >
          Unstake
        </button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Vault Assets</span>
          <span className={styles.statValue}>{Number(totalAssets).toLocaleString()} DEMO</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Your Staked Balance</span>
          <span className={styles.statValue}>{Number(previewAssets).toLocaleString()} DEMO</span>
          <span className={styles.statSubValue}>({Number(shareBalance).toLocaleString()} YIELD)</span>
        </div>
      </div>

      <div className={styles.inputContainer}>
        <div className={styles.inputHeader}>
          <span>Amount</span>
          <span>Balance: {activeTab === 'stake' ? assetBalance : previewAssets}</span>
        </div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.0"
          className={styles.input}
        />
        <div className={styles.maxButton} onClick={() => setAmount(activeTab === 'stake' ? assetBalance : previewAssets)}>
          MAX
        </div>
      </div>

      <button 
        className={styles.actionButton} 
        disabled={isPending || isWaitingForTransaction || !amount}
        onClick={handleAction}
      >
        {isPending || isWaitingForTransaction ? (
          <span className={styles.loader}></span>
        ) : (
          activeTab === 'stake' 
            ? (isApproved ? 'Stake DEMO' : 'Approve DEMO') 
            : 'Unstake DEMO'
        )}
      </button>


      {(isPending || isWaitingForTransaction) && (
        <p className={styles.statusText}>
          {isPending ? 'Confirm in wallet...' : 'Transaction pending...'}
        </p>
      )}
    </div>
  );
}
