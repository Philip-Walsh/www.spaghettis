import Footer from '../../components/Footer';
import CoverageBadge from '../../components/CoverageBadge';

export const metadata = {
    title: 'About | Forbidden Ramen',
    description: 'Learn about the Forbidden Ramen AI demo project, technologies, and open source philosophy.'
};

export default function AboutPage() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <main style={{ flex: 1, maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>
                <h1>About Forbidden Ramen</h1>
                <p>
                    <strong>Forbidden Ramen</strong> is a professional, fully accessible multi-step ramen/spaghetti
                    order builder—built as a showcase for <b>Vibe Coding with AI</b> and <b>Windsurf</b>.
                </p>
                <ul>
                    <li>Experiment with GenAI-powered coding workflows</li>
                    <li>
                        Test the capabilities of Windsurf and AI assistants for rapid prototyping, testing, and UI/UX
                        iteration
                    </li>
                    <li>Discover new utilities and use cases for AI-driven codebases and developer experience</li>
                    <li>Demonstrate best practices in Next.js, Netlify, and modern frontend engineering</li>
                </ul>

                <h2>Code Quality</h2>
                <p>
                    We maintain high code quality through comprehensive testing and continuous integration. Our test
                    coverage is monitored and displayed below:
                </p>
                <CoverageBadge />

                <h2>Technologies Used</h2>
                <ul>
                    <li>Next.js 14 (App Router)</li>
                    <li>Netlify Platform Starter</li>
                    <li>Jest + Testing Library</li>
                    <li>Framer Motion</li>
                    <li>CSS Modules</li>
                    <li>Tailwind CSS</li>
                    <li>Windsurf</li>
                </ul>

                <h2>Open Source</h2>
                <p>
                    View the source code and contribute on GitHub:
                    <br />
                    <a href="https://github.com/Philip-Walsh/www.spaghettis" target="_blank" rel="noopener noreferrer">
                        github.com/Philip-Walsh/www.spaghettis
                    </a>
                </p>
            </main>
            <Footer />
        </div>
    );
}
