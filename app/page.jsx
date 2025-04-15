import Link from 'next/link';

export default function Page() {
    return (
        <main className="hero">
            <h1 className="hero-title">Spaghetti Codes</h1>
            <p className="hero-subtitle">The next generation of noodles. Order your favorite now!</p>
            <Link href="/menu">
                <button className="btn-primary">Buy Noodles</button>
            </Link>
        </main>
    );
}
