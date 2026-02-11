import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Suspense } from 'react';
import LoadingScreen from '../components/LoadingScreen';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Momentous Foto - Photography Portfolio',
  description: 'Momentous Foto is about capturing moments as they happen — real, honest, and full of feeling, preserving memories that stay with you forever.',
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
        <Suspense fallback={<LoadingScreen />}>
          <main>{children}</main>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
