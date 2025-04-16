import '../styles/globals.css';
import Nav from '../components/Nav';

export const metadata = {
    title: {
        default: 'Spaghetti Codes',
        template: '%s | Spaghetti Codes',
    },
    description: 'The next generation of noodles',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
            </head>
            <body className="antialiased text-white bg-blue-900">
                <Nav />
                <div className="flex flex-col min-h-screen px-6 bg-noise sm:px-12">
                    <div className="flex flex-col w-full max-w-5xl mx-auto grow">
                        <main className="grow">{children}</main>
                    </div>
                </div>
            </body>
        </html>
    );
}
