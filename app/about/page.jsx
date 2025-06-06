import Layout from '../../components/Layout';
import styles from './About.module.css';

export const metadata = {
  title: 'About | Forbidden Ramen',
  description: 'Learn about the Forbidden Ramen AI demo project, technologies, team, and our journey building with modern tools.'
};

export default function AboutPage() {
  return (
    <Layout>
      <div className={styles.aboutContainer}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                About Forbidden Ramen 🍜
              </h1>
              <p className={styles.heroSubtitle}>
                A demonstration of AI-powered development with modern web technologies,
                squircle designs, and glass morphism aesthetics.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content - Bento Grid Layout */}
        <section className={styles.mainContent}>
          <div className="container">
            <div className="bento-grid-3">

              {/* Project Vision */}
              <div className="bento-item bento-item-span-2">
                <div className={styles.iconHeader}>
                  <span className={styles.icon}>🎯</span>
                  <h2>Project Vision</h2>
                </div>
                <p>
                  <strong>Forbidden Ramen</strong> represents the future of AI-assisted web development.
                  We're demonstrating how modern tools and workflows can create exceptional digital experiences,
                  from concept to deployment.
                </p>
                <p>
                  This project showcases the power of AI in modern web development, combining cutting-edge
                  technology with best practices in accessibility, performance, and user experience. Every
                  aspect demonstrates how AI can enhance the development process while maintaining high
                  quality standards.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="bento-item">
                <div className={styles.statsCard}>
                  <h3>Built With</h3>
                  <div className={styles.statsList}>
                    <div className={styles.statItem}>
                      <span className={styles.statIcon}>⚡</span>
                      <span>Next.js 15</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statIcon}>🎨</span>
                      <span>CSS Modules</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statIcon}>🤖</span>
                      <span>AI Powered</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statIcon}>🚀</span>
                      <span>Netlify</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Architecture */}
              <div className="bento-item">
                <div className={styles.iconHeader}>
                  <span className={styles.icon}>🏗️</span>
                  <h3>Technical Architecture</h3>
                </div>
                <ul className={styles.featureList}>
                  <li>Server-side rendering with Next.js</li>
                  <li>Component-based architecture</li>
                  <li>Responsive design system</li>
                  <li>SEO optimization</li>
                  <li>Performance monitoring</li>
                </ul>
              </div>

              {/* Development Workflow */}
              <div className="bento-item">
                <div className={styles.iconHeader}>
                  <span className={styles.icon}>🔄</span>
                  <h3>Development Workflow</h3>
                </div>
                <ul className={styles.featureList}>
                  <li>AI-assisted code generation</li>
                  <li>Continuous integration/deployment</li>
                  <li>Automated quality checks</li>
                  <li>Performance optimization</li>
                  <li>Accessibility compliance</li>
                </ul>
              </div>

              {/* Design Philosophy */}
              <div className="bento-item bento-item-span-2">
                <div className={styles.iconHeader}>
                  <span className={styles.icon}>🎨</span>
                  <h2>Design Philosophy</h2>
                </div>
                <p>
                  Our design system embraces <strong>squircle aesthetics</strong> and <strong>glass morphism</strong>
                  to create a modern, accessible interface. We use bento box layouts for organized content presentation
                  and maintain consistency across all components.
                </p>
                <div className={styles.designShowcase}>
                  <div className={`${styles.demoCard} glass squircle-lg`}>
                    <span className={styles.demoIcon}>🍜</span>
                    <span>Glass Morphism</span>
                  </div>
                  <div className={`${styles.demoCard} glass squircle-md`}>
                    <span className={styles.demoIcon}>📱</span>
                    <span>Responsive</span>
                  </div>
                  <div className={`${styles.demoCard} glass squircle-sm`}>
                    <span className={styles.demoIcon}>♿</span>
                    <span>Accessible</span>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="bento-item bento-item-span-full">
                <div className={styles.iconHeader}>
                  <span className={styles.icon}>✨</span>
                  <h2>Key Features</h2>
                </div>
                <div className="bento-grid-4">
                  <div className={styles.featureCard}>
                    <span className={styles.featureIcon}>🍜</span>
                    <h4>Interactive Ramen Builder</h4>
                    <p>Real-time state management with visual feedback</p>
                  </div>
                  <div className={styles.featureCard}>
                    <span className={styles.featureIcon}>🎭</span>
                    <h4>NFT Showcase</h4>
                    <p>Satirical take on digital art with theme switching</p>
                  </div>
                  <div className={styles.featureCard}>
                    <span className={styles.featureIcon}>🌙</span>
                    <h4>Theme System</h4>
                    <p>System-aware dark/light mode implementation</p>
                  </div>
                  <div className={styles.featureCard}>
                    <span className={styles.featureIcon}>📱</span>
                    <h4>Mobile First</h4>
                    <p>Responsive design with touch optimizations</p>
                  </div>
                  <div className={styles.featureCard}>
                    <span className={styles.featureIcon}>🚀</span>
                    <h4>Innovation Gallery</h4>
                    <p>Breakthrough technologies and AI-powered solutions</p>
                  </div>
                </div>
              </div>

              {/* Team Credits */}
              <div className="bento-item bento-item-span-2">
                <div className={styles.iconHeader}>
                  <span className={styles.icon}>👥</span>
                  <h2>Development Team</h2>
                </div>
                <div className={styles.teamGrid}>
                  <div className={styles.teamMember}>
                    <div className={styles.memberAvatar}>
                      <span>🧑‍💻</span>
                    </div>
                    <div className={styles.memberInfo}>
                      <h4>Human Developer</h4>
                      <p className={styles.memberRole}>Project Vision & Direction</p>
                      <p className={styles.memberDescription}>
                        Guided the project vision, provided requirements, used multiple AI models for different aspects,
                        and ensured the final result met quality standards.
                      </p>
                    </div>
                  </div>
                  <div className={styles.teamMember}>
                    <div className={styles.memberAvatar}>
                      <span>🤖</span>
                    </div>
                    <div className={styles.memberInfo}>
                      <h4>Claude Sonnet 4</h4>
                      <p className={styles.memberRole}>AI Development Assistant</p>
                      <p className={styles.memberDescription}>
                        Latest AI assistant providing code generation, architectural guidance, design system
                        creation, and technical implementation. Part of a collaborative AI-human development process.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technologies Used */}
              <div className="bento-item">
                <div className={styles.iconHeader}>
                  <span className={styles.icon}>🛠️</span>
                  <h3>Technologies</h3>
                </div>
                <div className={styles.techStack}>
                  <span className={styles.techItem}>Next.js 15</span>
                  <span className={styles.techItem}>React 19</span>
                  <span className={styles.techItem}>CSS Modules</span>
                  <span className={styles.techItem}>Framer Motion</span>
                  <span className={styles.techItem}>Netlify</span>
                  <span className={styles.techItem}>AI Assistance</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaContent}>
              <h2>Ready to Explore?</h2>
              <p>Experience the future of AI-powered web development</p>
              <div className={styles.ctaButtons}>
                <a href="/ramen" className="btn-primary">
                  Build Your Ramen 🍜
                </a>
                <a href="/nft-showcase" className="btn-secondary">
                  View Innovation Gallery 🚀
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
