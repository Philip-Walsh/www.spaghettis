import Link from 'next/link';
import styles from './Home.module.css';

export default function HomePage() {
  return (
    <div className={styles.heroFullScreen}>
      <div className={styles.heroBgGlow}></div>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.ramenIcon}>🍜</span>
            Forbidden Ramen
          </h1>
          <p className={styles.heroSubtitle}>
            Build your perfect bowl of ramen
          </p>
          <div className={styles.heroActions}>
            <Link href="/ramen" className={styles.ctaButton}>
              Start Building
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
