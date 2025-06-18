import '../styles/globals.css';
import '../styles/amazonq.css';
import '../styles/animations.css';
import '../styles/device-theme.css';
import NavWithTheme from '../components/NavWithTheme';
import Footer from '../components/Footer';
import ErrorBoundaryWrapper from '../components/ErrorBoundaryWrapper';
import ClientLayout from '../components/ClientLayout';
<<<<<<< HEAD
import AppProvider from '../components/shared/AppProvider';
=======
>>>>>>> bbfd2e2 (feat: add device optimization with edge functions and Amazon Q branding etc. [Built by Amazon Q])

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
<<<<<<< HEAD
        <AppProvider>
          <header className="grid-row-1">
            <NavWithTheme />
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
=======
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
>>>>>>> bbfd2e2 (feat: add device optimization with edge functions and Amazon Q branding etc. [Built by Amazon Q])
            </div>
          </main>
          <Footer className="grid-row-3" />
        </AppProvider>
      </body>
    </html>
  );
}
