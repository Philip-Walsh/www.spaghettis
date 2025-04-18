import Link from 'next/link';
import styles from './Home.module.css';

export default function HomePage() {
  return (
    <div className={styles.heroWrap}>
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
            <Link href="/ramen" className={styles.ctaButton}>Start Your Order</Link>
            <Link href="/about" className={styles.secondaryButton}>Learn More</Link>
          </div>
        </div>
        <div className={styles.heroBoxes}>
          <div className={styles.noodleBox + ' ' + styles.box1}>🍜</div>
          <div className={styles.noodleBox + ' ' + styles.box2}>🥡</div>
          <div className={styles.noodleBox + ' ' + styles.box3}>🍥</div>
        </div>
      </section>
    </div>
  );
}
