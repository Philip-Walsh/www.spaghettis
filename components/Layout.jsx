import Navigation from './Navigation';
import Footer from './Footer';
import styles from './Layout.module.css';

export default function Layout({ children }) {
    return (
        <div className={styles.layout}>
            <Navigation />
            <main className={styles.main}>
                {children}
            </main>
            <Footer />
        </div>
    );
} 