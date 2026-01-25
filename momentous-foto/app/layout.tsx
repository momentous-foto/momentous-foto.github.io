import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Momentous Foto - Photography Portfolio',
  description: 'Professional wedding and event photography with a unique blacky/fade grading aesthetic. Capturing your precious moments since 2021.',
  keywords: ['photography', 'wedding photography', 'event photography', 'Malaysia photographer', 'pre-wedding', 'maternity photography'],
  icons: {
    icon: '/images/logo/logo-simple.jpeg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
