'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout';
import styles from './NFTShowcase.module.css';

// Toast Notification System
const showToast = (message, type = 'info', duration = 4000) => {
    const toast = document.createElement('div');
    toast.className = `${styles.toast} ${styles[`toast${type.charAt(0).toUpperCase() + type.slice(1)}`]}`;
    toast.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()">×</button>
  `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add(styles.toastShow);
    }, 10);

    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, duration);
};

// Innovation & Technology Showcase Data
const LIGHT_INNOVATIONS = [
    {
        id: 1,
        title: 'AI-Powered Development',
        creator: 'Claude & Human Collaboration',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&auto=format&fit=crop&q=60',
        impact: 'Revolutionary Efficiency',
        description: 'Demonstrating how AI assistants enhance human creativity in software development'
    },
    {
        id: 2,
        title: 'Holistic Design Systems',
        creator: 'Squircle UI Framework',
        image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=500&auto=format&fit=crop&q=60',
        impact: 'Unified Experience',
        description: 'Comprehensive design systems that bridge aesthetics and functionality'
    },
    {
        id: 3,
        title: 'Serverless Architecture',
        creator: 'Next.js + Netlify',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&auto=format&fit=crop&q=60',
        impact: 'Global Scale',
        description: 'Modern deployment strategies that scale effortlessly'
    },
    {
        id: 4,
        title: 'Accessibility-First',
        creator: 'Inclusive Design Team',
        image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=500&auto=format&fit=crop&q=60',
        impact: 'Universal Access',
        description: 'Building technology that works for everyone, everywhere'
    },
    {
        id: 5,
        title: 'Performance Optimization',
        creator: 'Speed & Efficiency Lab',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60',
        impact: 'Lightning Fast',
        description: 'Microsecond improvements that transform user experiences'
    },
    {
        id: 6,
        title: 'Sustainable Computing',
        creator: 'Green Tech Initiative',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&auto=format&fit=crop&q=60',
        impact: 'Earth Friendly',
        description: 'Technology solutions that protect our planet\'s future'
    }
];

const DARK_INNOVATIONS = [
    {
        id: 1,
        title: 'AI That Actually Helps',
        creator: 'Not Your Average Chatbot',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&auto=format&fit=crop&q=60',
        impact: 'Mind = Blown 🤯',
        description: 'Seriously though, when AI makes you better at your job instead of replacing you'
    },
    {
        id: 2,
        title: 'Design Systems That Don\'t Suck',
        creator: 'Reformed CSS Warrior',
        image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=500&auto=format&fit=crop&q=60',
        impact: 'Developer Happiness ↗️',
        description: 'Finally! A design system where components actually work together'
    },
    {
        id: 3,
        title: 'Deployment That Just Works',
        creator: 'Git Push Deploy Wizard',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&auto=format&fit=crop&q=60',
        impact: 'Zero Stress Mode',
        description: 'Remember when deployment meant 3AM panic attacks? Yeah, those days are over'
    },
    {
        id: 4,
        title: 'Accessibility = Superpowers',
        creator: 'Heroes of Inclusion',
        image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=500&auto=format&fit=crop&q=60',
        impact: 'World Changing',
        description: 'Making the web work for EVERYONE. Because that\'s what heroes do.'
    },
    {
        id: 5,
        title: 'Performance Obsession',
        creator: 'The Millisecond Police',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60',
        impact: 'Blazing Fast ⚡',
        description: 'We shaved 50ms off load time and users actually noticed. Success!'
    },
    {
        id: 6,
        title: 'Green Code Movement',
        creator: 'Planet-Saving Programmers',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&auto=format&fit=crop&q=60',
        impact: 'Eco-Warrior Status',
        description: 'Optimizing code to save the planet, one byte at a time 🌱'
    }
];

export default function InnovationShowcase() {
    const [isDark, setIsDark] = useState(false);
    const [innovations, setInnovations] = useState(LIGHT_INNOVATIONS);

    useEffect(() => {
        const checkTheme = () => {
            const darkMode = document.body.classList.contains('dark');
            setIsDark(darkMode);
            setInnovations(darkMode ? DARK_INNOVATIONS : LIGHT_INNOVATIONS);
        };

        checkTheme();

        // Watch for theme changes
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    const handleInnovationClick = (innovation) => {
        if (isDark) {
            const messages = [
                "Now THIS is the kind of innovation we need! 🚀",
                "Finally, technology that makes sense! 💡",
                "This is how we build the future, one commit at a time! ✨",
                "Real innovation beats buzzword bingo every time! 🎯",
                "Code with purpose > code for hype 💯"
            ];
            showToast(messages[Math.floor(Math.random() * messages.length)], 'success');
        } else {
            const messages = [
                `Exploring the impact of ${innovation.title} 🔬`,
                "This innovation showcases exceptional engineering vision ✨",
                "Consider how this advancement shapes our future 🚀",
                "Witness the power of thoughtful technology design 💡",
                "Innovation at the intersection of human needs and possibility 🌟"
            ];
            showToast(messages[Math.floor(Math.random() * messages.length)], 'info');
        }
    };

    return (
        <Layout>
            <div className={styles.showcase}>

                {/* Hero Section */}
                <section className={styles.hero}>
                    <motion.div
                        className={styles.heroContent}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className={styles.title}>
                            {isDark ? 'Innovation That Actually Matters' : 'Technology Innovation Gallery'}
                        </h1>
                        <p className={styles.subtitle}>
                            {isDark
                                ? 'Where brilliant minds build solutions that change the world 🌍'
                                : 'Showcasing breakthrough technologies that drive human progress ✨'
                            }
                        </p>
                        <motion.div
                            className={styles.heroBadge}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            {isDark ? '🚀 Real Innovation • No Hype' : '🔬 Research • Design • Impact'}
                        </motion.div>
                    </motion.div>
                </section>

                {/* Innovation Statement */}
                <section className={styles.statement}>
                    <motion.div
                        className={styles.statementContent}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <h2>
                            {isDark
                                ? 'Building Technology That Doesn\'t Suck'
                                : 'Advancing Human Potential Through Technology'
                            }
                        </h2>
                        <p>
                            {isDark
                                ? 'We believe in AI that amplifies human creativity, design systems that make developers happy, and innovation that solves real problems. No buzzwords, just results.'
                                : 'Our mission is to create holistic technology solutions that enhance human capabilities, foster inclusive experiences, and drive sustainable progress for all.'
                            }
                        </p>
                    </motion.div>
                </section>

                {/* Innovations Grid */}
                <section className={styles.collections}>
                    <motion.h2
                        className={styles.sectionTitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {isDark ? 'Innovations That Actually Work' : 'Breakthrough Technologies'}
                    </motion.h2>
                    <div className={styles.grid}>
                        {innovations.map((innovation, index) => (
                            <motion.div
                                key={innovation.id}
                                className={styles.card}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ scale: 1.02, y: -8 }}
                                onClick={() => handleInnovationClick(innovation)}
                            >
                                <div className={styles.imageWrapper}>
                                    <img
                                        src={innovation.image}
                                        alt={innovation.title}
                                        className={styles.image}
                                    />
                                    <div className={styles.overlay}>
                                        <span className={styles.exploreText}>
                                            {isDark ? 'Learn More 🔍' : 'Explore Innovation 🚀'}
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>{innovation.title}</h3>
                                    <p className={styles.creator}>by {innovation.creator}</p>
                                    <p className={styles.description}>{innovation.description}</p>
                                    <div className={styles.impact}>
                                        <span className={styles.impactLabel}>Impact:</span>
                                        <span className={styles.impactValue}>{innovation.impact}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className={styles.cta}>
                    <motion.div
                        className={styles.ctaContent}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2>
                            {isDark
                                ? 'Ready to Build Something Amazing?'
                                : 'Join the Innovation Revolution'
                            }
                        </h2>
                        <p>
                            {isDark
                                ? 'Let\'s create technology that makes people\'s lives genuinely better. No gimmicks, just great engineering.'
                                : 'Collaborate with visionary teams to develop next-generation solutions that shape our shared future.'
                            }
                        </p>
                        <div className={styles.ctaButtons}>
                            <motion.a
                                href="/ramen"
                                className="btn-primary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {isDark ? 'See Our Tech Demo 🍜' : 'Experience Innovation 🍜'}
                            </motion.a>
                            <motion.a
                                href="/about"
                                className="btn-secondary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {isDark ? 'How We Built This 🛠️' : 'Learn Our Process 🔬'}
                            </motion.a>
                        </div>
                    </motion.div>
                </section>

            </div>
        </Layout>
    );
} 