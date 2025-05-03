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
            <p className={styles.aboutText}>
              This project demonstrates how AI can assist in building modern web applications, from initial concept to production deployment, while maintaining high standards of accessibility, performance, and user experience.
            </p>
          </section>

          <section className={styles.aboutSection}>
            <h2 className={styles.sectionTitle}>Core Features</h2>
            <ul className={styles.goalsList}>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🍜</span>
                <span>Interactive Ramen Builder with real-time price calculation</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>♿</span>
                <span>Fully accessible UI with keyboard navigation and screen reader support</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🎨</span>
                <span>Responsive design with futuristic glassmorphism aesthetic</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>⚡</span>
                <span>Optimized performance with Next.js and CSS Modules</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🧪</span>
                <span>Comprehensive test coverage with Jest and Testing Library</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🌙</span>
                <span>Dark/Light theme support with system preference detection</span>
              </li>
            </ul>
          </section>

          <section className={styles.aboutSection}>
            <h2 className={styles.sectionTitle}>AI-Driven Development</h2>
            <p className={styles.aboutText}>
              This project was built using AI-assisted development workflows, demonstrating how AI can:
            </p>
            <ul className={styles.goalsList}>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🤖</span>
                <span>Generate and refine UI components with accessibility in mind</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🔍</span>
                <span>Implement complex state management and business logic</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🎯</span>
                <span>Write comprehensive tests and documentation</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🔄</span>
                <span>Iterate on design and user experience</span>
              </li>
            </ul>
          </section>

          <section className={styles.aboutSection}>
            <h2 className={styles.sectionTitle}>Current Limitations</h2>
            <p className={styles.aboutText}>
              As a demonstration project, Forbidden Ramen has some intentional limitations:
            </p>
            <ul className={styles.goalsList}>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>💾</span>
                <span>No persistent storage - selections are not saved between sessions</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🔒</span>
                <span>No user authentication or order history</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🛒</span>
                <span>No actual ordering functionality - this is a UI/UX demo</span>
              </li>
            </ul>
          </section>

          <section className={styles.aboutSection}>
            <h2 className={styles.sectionTitle}>Future Enhancements</h2>
            <p className={styles.aboutText}>
              Planned features and improvements:
            </p>
            <ul className={styles.goalsList}>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🗄️</span>
                <span>Database integration for order persistence</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>👥</span>
                <span>User accounts and order history</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🌍</span>
                <span>Internationalization and localization</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🤖</span>
                <span>AI-powered order recommendations</span>
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
