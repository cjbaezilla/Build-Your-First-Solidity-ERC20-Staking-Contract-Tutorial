import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { StakingCard } from '../components/StakingCard';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>ERC4626 Staking Vault</title>
        <meta
          content="Premium Staking interface for ERC4626 Vaults"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>💎</span>
          <span>YieldVault</span>
        </div>
        <ConnectButton showBalance={false} chainStatus="icon" />
      </nav>

      <main className={styles.main}>
        <div className={styles.heroSection}>
          <h1 className={styles.heroTitle}>
            Maximize Your Yield with <span className={styles.gradientText}>ERC-4626</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Secure, transparent, and standard-compliant staking. 
            Deposit your DEMO tokens and earn YIELD shares automatically.
          </p>
        </div>

        <div className={styles.stakingContainer}>
          <StakingCard />
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>Standardized Yield-Bearing Vault &copy; 2026</p>
          <div className={styles.footerLinks}>
            <a href="https://github.com" target="_blank" rel="noreferrer">Github</a>
            <a href="https://etherscan.io" target="_blank" rel="noreferrer">Explorer</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
