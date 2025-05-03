import Footer from '../../components/Footer';
import styles from './About.module.css';

export const metadata = {
  title: 'About | Forbidden Ramen',
  description: 'Learn about the Forbidden Ramen AI demo project, technologies, and open source philosophy.'
};

export default function AboutPage() {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.glassPanel}>
        <h1 className={styles.aboutTitle}>About Forbidden Ramen</h1>
        <div className={styles.contentGrid}>
          <section className={styles.aboutSection}>
            <h2 className={styles.sectionTitle}>Project Vision</h2>
            <p className={styles.aboutText}>
              <span className={styles.highlight}>Forbidden Ramen</span> is a professional, fully accessible multi-step ramen/spaghetti order builder—built as a showcase for <span className={styles.accent}>Vibe Coding with AI</span> and <span className={styles.accent}>Windsurf</span>.
            </p>
          </section>

          <section className={styles.aboutSection}>
            <h2 className={styles.sectionTitle}>Project Goals</h2>
            <ul className={styles.goalsList}>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🚀</span>
                <span>Experiment with GenAI-powered coding workflows</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>💡</span>
                <span>Test the capabilities of Windsurf and AI assistants</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🔍</span>
                <span>Discover new utilities for AI-driven codebases</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>✨</span>
                <span>Demonstrate best practices in modern frontend engineering</span>
              </li>
            </ul>
          </section>

          <section className={styles.aboutSection}>
            <h2 className={styles.sectionTitle}>Tech Stack</h2>
            <div className={styles.techGrid}>
              <div className={styles.techCard}>
                <span className={styles.techIcon}>⚡</span>
                <span className={styles.techName}>Next.js 14</span>
              </div>
              <div className={styles.techCard}>
                <span className={styles.techIcon}>🌊</span>
                <span className={styles.techName}>Netlify</span>
              </div>
              <div className={styles.techCard}>
                <span className={styles.techIcon}>🧪</span>
                <span className={styles.techName}>Jest</span>
              </div>
              <div className={styles.techCard}>
                <span className={styles.techIcon}>🎬</span>
                <span className={styles.techName}>Framer Motion</span>
              </div>
              <div className={styles.techCard}>
                <span className={styles.techIcon}>🎨</span>
                <span className={styles.techName}>CSS Modules</span>
              </div>
              <div className={styles.techCard}>
                <span className={styles.techIcon}>🌪️</span>
                <span className={styles.techName}>Windsurf</span>
              </div>
            </div>
          </section>

          <section className={styles.aboutSection}>
            <h2 className={styles.sectionTitle}>Open Source</h2>
            <p className={styles.aboutText}>
              View the source code and contribute on GitHub:
            </p>
            <a
              href="https://github.com/Philip-Walsh/www.spaghettis"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubLink}
            >
              <span className={styles.githubIcon}>📦</span>
              <span>github.com/Philip-Walsh/www.spaghettis</span>
            </a>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
