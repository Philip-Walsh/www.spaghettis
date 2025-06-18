import '../styles/globals.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ErrorBoundaryWrapper from '../components/ErrorBoundaryWrapper';
import ClientLayout from '../components/ClientLayout';

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
      <body className="grid grid-rows-[auto_1fr_auto] h-screen antialiased text-white bg-blue-900">
        <header className="grid-row-1">
          <Nav />
        </header>
        <main className="grid-row-2">
          <div className="flex flex-col min-h-screen px-6 bg-noise sm:px-12">
            <div className="flex flex-col w-full max-w-5xl mx-auto grow">
              <ErrorBoundaryWrapper>
                <ClientLayout>
                  {children}
                </ClientLayout>
              </ErrorBoundaryWrapper>
            </div>
          </div>
        </main>
        <Footer className="grid-row-3" />
      </body>
    </html>
  );
}
