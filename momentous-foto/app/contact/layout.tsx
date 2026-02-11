import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Book Your Photography Session',
  description: 'Get in touch with Momentous Foto for wedding photography, pre-wedding shoots, maternity, and event photography in Kuala Lumpur, Malaysia. Book your session today!',
  keywords: [
    'contact Momentous Foto',
    'book photographer Malaysia',
    'wedding photography inquiry',
    'photography booking KL',
    'hire photographer Malaysia',
  ],
  openGraph: {
    title: 'Contact Momentous Foto | Book Your Photography Session',
    description: 'Book your photography session with Momentous Foto in Kuala Lumpur, Malaysia',
    url: 'https://momentous-foto.github.io/contact',
  },
  alternates: {
    canonical: 'https://momentous-foto.github.io/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
