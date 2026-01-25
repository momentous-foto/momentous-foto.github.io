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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
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
