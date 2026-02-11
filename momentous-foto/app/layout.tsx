import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Suspense } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import { organizationSchema, websiteSchema } from './schema';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

const baseUrl = 'https://momentous-foto.github.io';

export const metadata: Metadata = {
  title: 'Momentous Foto - Photography Portfolio',
  description: 'Professional wedding and event photography with a unique blacky/fade grading aesthetic. Capturing your precious moments since 2021.',
  keywords: ['photography', 'wedding photography', 'event photography', 'Malaysia photographer', 'pre-wedding', 'maternity photography'],
  icons: {
    icon: '/images/logo/logo-simple.jpeg',
    apple: '/images/logo/logo-simple.jpeg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_MY',
    url: baseUrl,
    siteName: 'Momentous Foto',
    title: 'Momentous Foto | Professional Wedding Photographer in Malaysia',
    description: 'Professional wedding & event photographer in Kuala Lumpur, Malaysia. Capturing your precious moments with unique blacky/fade grading aesthetic since 2021.',
    images: [
      {
        url: `${baseUrl}/images/logo/logo-simple.jpeg`,
        width: 1200,
        height: 630,
        alt: 'Momentous Foto - Professional Wedding Photographer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Momentous Foto | Professional Wedding Photographer',
    description: 'Professional wedding & event photographer in Kuala Lumpur, Malaysia',
    images: [`${baseUrl}/images/logo/logo-simple.jpeg`],
    creator: '@momentousfoto',
  },
  alternates: {
    canonical: baseUrl,
  },
  verification: {
    google: 'your-google-verification-code', // Add this after setting up Google Search Console
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
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
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
