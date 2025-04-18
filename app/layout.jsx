import '../styles/globals.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Head from 'next/head';

export const metadata = {
    title: {
        default: 'Forbidden Ramen',
        template: '%s | Forbidden Ramen',
    },
    description: 'The next generation of noodles',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <body className="grid grid-rows-[auto_1fr_auto] h-screen font-neon antialiased text-white bg-blue-900">
        <header className="grid-row-1">
          <Nav />
        </header>
        <main className="grid-row-2">
          <div className="flex flex-col min-h-screen px-6 bg-noise sm:px-12">
            <div className="flex flex-col w-full max-w-5xl mx-auto grow">
              {children}
            </div>
          </div>
        </main>
        <Footer className="grid-row-3" />
      </body>
    </html>
  );
}
