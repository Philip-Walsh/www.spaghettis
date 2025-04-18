import '../styles/globals.css';
import { Header } from '../components/header';
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
      <body className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-noise font-neon antialiased text-white">
        <header className="row-start-1 row-end-2 z-30">
          <Header />
        </header>
        <main className="row-start-2 row-end-3 flex flex-col min-h-screen px-6 sm:px-12">
          <div className="flex flex-col w-full max-w-5xl mx-auto grow">
            {children}
          </div>
        </main>
        <Footer className="row-start-3 row-end-4" />
      </body>
    </html>
  );
}
