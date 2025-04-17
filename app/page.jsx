import Link from 'next/link';
import styles from './Home.module.css';

export default function Page() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroBgDrip}></div>
        <div className={styles.heroContent}>
          <span className={styles.heroEmoji}>🍜</span>
          <h1 className={styles.heroTitle}>Forbidden Ramen</h1>
          <p className={styles.heroSubtitle}>Create your perfect bowl with the most <span className={styles.boldAccent}>next-gen</span> noodle configurator.</p>
          <Link href="/ramen" className={styles.ctaLink}>
            <button className={styles.ctaBtn}>
              Start Building Your Ramen
            </button>
          </Link>
        </div>
      </section>
      <section className={styles.patternSection}>
        <h2 className={styles.sectionTitle}>Urban Flavors. Bold Choices.</h2>
        <p className={styles.sectionDesc}>Mix, match, and customize every ingredient. Ramen, but make it street.</p>
      </section>
    </main>
  );
}
