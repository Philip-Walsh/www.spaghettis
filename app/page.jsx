import Link from 'next/link';
import styles from './Home.module.css';

export default function HomePage() {
  return (
    <div className={styles.heroFullScreen}>
      <div className={styles.heroBgGlow}></div>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle + ' animated-gradient'}>
            <span className={styles.ramenIcon}>🍜</span>
            Forbidden Ramen
          </h1>
          <p className={styles.heroSubtitle + ' animated-gradient'}>
            The next generation of noodles. <br />
            <span className={styles.gradientText}>Vibe Coding with AI & Windsurf</span>
          </p>
          <div className={styles.heroActions}>
            <Link href="/ramen" className={styles.ctaButton + ' animated-gradient'}>Start Your Order</Link>
            <Link href="/ramen" className={styles.secondaryButton}>Go to Order</Link>
            <Link href="/about" className={styles.secondaryButton}>Learn More</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
