'use client';

import Link from 'next/link';
import Layout from '../components/Layout';
import styles from './Home.module.css';
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <Layout>
      <div className={styles.home}>

        {/* Hero Section */}
        <section className={styles.hero}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className={styles.heroIcon}
              animate={{
                rotate: [0, -10, 10, 0],
                scale: [1, 1.1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🍜
            </motion.div>

            <h1 className={styles.heroTitle}>
              <span className={styles.titleMain}>Forbidden</span>
              <span className={styles.titleAccent}>Ramen</span>
            </h1>

            <p className={styles.heroDescription}>
              Craft the ultimate ramen experience with our next-gen digital configurator.
              <br />
              <span className={styles.adventureText}>Your culinary adventure starts here.</span>
            </p>

            <motion.div
              className={styles.ctaSection}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Link href="/ramen" className={styles.primaryCTA}>
                <motion.button
                  className={styles.ctaButton}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Start Your Journey</span>
                  <span className={styles.ctaIcon}>🚀</span>
                </motion.button>
              </Link>

              <Link href="/nft-showcase" className={styles.secondaryCTA}>
                Explore Innovation Gallery 🚀
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating Elements */}
          <div className={styles.floatingElements}>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.floatingElement}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + Math.sin(i) * 30}%`
                }}
              >
                {['🥢', '🍣', '🥟', '🌶️', '🧄', '🥬'][i]}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features Preview */}
        <section className={styles.features}>
          <motion.div
            className={styles.featuresContent}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <h2 className={styles.featuresTitle}>Choose Your Adventure</h2>

            <div className={styles.featureCards}>
              <motion.div
                className={styles.featureCard}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.cardIcon}>🍜</div>
                <h3>Build Your Bowl</h3>
                <p>Customize every ingredient with our interactive ramen builder</p>
                <Link href="/ramen" className={styles.cardLink}>Start Building →</Link>
              </motion.div>

              <motion.div
                className={styles.featureCard}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.cardIcon}>🚀</div>
                <h3>Innovation Gallery</h3>
                <p>Explore breakthrough technologies and AI innovations</p>
                <Link href="/nft-showcase" className={styles.cardLink}>View Gallery →</Link>
              </motion.div>

              <motion.div
                className={styles.featureCard}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.cardIcon}>🚀</div>
                <h3>About Project</h3>
                <p>Learn about our AI-powered development journey</p>
                <Link href="/about" className={styles.cardLink}>Learn More →</Link>
              </motion.div>
            </div>
          </motion.div>
        </section>

      </div>
    </Layout>
  );
}
