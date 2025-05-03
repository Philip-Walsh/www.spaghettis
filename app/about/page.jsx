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
              <span className={styles.highlight}>Forbidden Ramen</span> represents the future of AI-assisted web development. We're demonstrating how modern tools and workflows can create exceptional digital experiences, from concept to deployment.
            </p>
            <p className={styles.aboutText}>
              This project showcases the power of AI in modern web development, combining cutting-edge technology with best practices in accessibility, performance, and user experience. Every aspect, from the initial design to the final deployment, demonstrates how AI can enhance the development process.
            </p>
          </section>

          <section className={styles.aboutSection}>
            <h2 className={styles.sectionTitle}>Technical Architecture</h2>
            <p className={styles.aboutText}>
              Built on Next.js 14, our architecture leverages modern web development practices:
            </p>
            <ul className={styles.goalsList}>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>⚡</span>
                <span>Server-side rendering and static generation for optimal performance</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🎯</span>
                <span>Responsive design system with mobile-first approach</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🔍</span>
                <span>SEO optimization and metadata management</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🛠️</span>
                <span>Component-based architecture with reusable patterns</span>
              </li>
            </ul>
          </section>

          <section className={styles.aboutSection}>
            <h2 className={styles.sectionTitle}>Development Workflow</h2>
            <p className={styles.aboutText}>
              Our development process integrates AI assistance with professional engineering practices:
            </p>
            <ul className={styles.goalsList}>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🤖</span>
                <span>AI-assisted code generation and optimization</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🧪</span>
                <span>Comprehensive test coverage with Jest and Testing Library</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🔄</span>
                <span>Continuous Integration/Deployment with Netlify</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🔒</span>
                <span>Automated quality checks and performance monitoring</span>
              </li>
            </ul>
          </section>

          <section className={styles.aboutSection}>
            <h2 className={styles.sectionTitle}>Key Features</h2>
            <ul className={styles.goalsList}>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🍜</span>
                <span>Interactive ramen builder with real-time state management</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>♿</span>
                <span>WCAG-compliant accessibility implementation</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🎨</span>
                <span>Modern UI with glassmorphism and responsive design</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>⚡</span>
                <span>Optimized performance with code splitting and lazy loading</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🧪</span>
                <span>Comprehensive test coverage and automated testing</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🌙</span>
                <span>System-aware theme implementation with CSS Modules</span>
              </li>
            </ul>
          </section>

          <section className={styles.aboutSection}>
            <h2 className={styles.sectionTitle}>Tech Magic</h2>
            <p className={styles.aboutText}>
              We're using Next.js, the coolest framework in town! It's like having a super-powered kitchen that:
            </p>
            <ul className={styles.goalsList}>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>⚡</span>
                <span>Loads your pages faster than you can say "ramen"</span>
              </li>
              <li className={styles.goalIcon}>
                <span className={styles.goalIcon}>🎯</span>
                <span>Makes your site work perfectly on any device</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🔍</span>
                <span>Helps Google find us (because who doesn't want more ramen fans?)</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🛠️</span>
                <span>Gives us superpowers to build awesome features</span>
              </li>
            </ul>
          </section>

          <section className={styles.aboutSection}>
            <h2 className={styles.sectionTitle}>What Makes Us Special</h2>
            <ul className={styles.goalsList}>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🍜</span>
                <span>Build your perfect bowl with our interactive ramen builder</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>♿</span>
                <span>Designed for everyone - fully accessible and easy to use</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🎨</span>
                <span>Stunning design that looks great on any device</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>⚡</span>
                <span>Lightning-fast performance that keeps you in the flow</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🧪</span>
                <span>Rock-solid reliability with comprehensive testing</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🌙</span>
                <span>Your choice of light or dark mode - we've got you covered</span>
              </li>
            </ul>
          </section>

          <section className={styles.aboutSection}>
            <h2 className={styles.sectionTitle}>AI-Powered Development</h2>
            <p className={styles.aboutText}>
              We're using AI to push the boundaries of what's possible in web development:
            </p>
            <ul className={styles.goalsList}>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🤖</span>
                <span>Smart UI components that work for everyone</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🔍</span>
                <span>Complex features made simple with AI assistance</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🎯</span>
                <span>Thorough testing to keep everything running smoothly</span>
              </li>
              <li className={styles.goalItem}>
                <span className={styles.goalIcon}>🔄</span>
                <span>Continuous improvement through AI-powered iteration</span>
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
