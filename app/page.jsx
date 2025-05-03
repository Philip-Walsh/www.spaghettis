'use client';

import Link from 'next/link';
import styles from './Home.module.css';
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <main className={styles.main}>
      <div className={styles.backgroundEffect}></div>
      <section className={styles.hero}>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className={styles.heroEmoji}
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >🍜</motion.span>
          <h1 className={styles.heroTitle}>Forbidden Ramen</h1>
          <p className={styles.heroSubtitle}>
            Create your perfect bowl with the most <span className={styles.boldAccent}>next-gen</span> noodle configurator.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/ramen" className={styles.ctaLink}>
              <button className={styles.ctaBtn}>
                Start Building Your Ramen
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
      <section className={styles.patternSection}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className={styles.sectionTitle}>Urban Flavors. Bold Choices.</h2>
          <p className={styles.sectionDesc}>
            Mix, match, and customize every ingredient. Ramen, but make it street.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
