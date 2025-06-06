import { Fira_Code } from 'next/font/google';
import '../components/styles/main.css';

const firaCode = Fira_Code({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap'
});

export const metadata = {
  title: 'Forbidden Ramen | Next-Gen Noodle Configurator',
  description: 'Create your perfect ramen bowl with our futuristic digital configurator. AI-powered development meets culinary creativity.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={firaCode.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
