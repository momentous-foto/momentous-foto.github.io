// Structured Data (JSON-LD) for SEO
// This helps Google understand your business better

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://momentous-foto.github.io',
  name: 'Momentous Foto',
  description: 'Professional wedding and event photography with a unique blacky/fade grading aesthetic. Capturing your precious moments since 2021 in Kuala Lumpur, Malaysia.',
  url: 'https://momentous-foto.github.io',
  logo: 'https://momentous-foto.github.io/images/logo/logo-simple.jpeg',
  image: 'https://momentous-foto.github.io/images/logo/logo-simple.jpeg',
  foundingDate: '2021',
  founder: {
    '@type': 'Person',
    name: 'Momentous Foto',
    jobTitle: 'Professional Photographer',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kuala Lumpur',
    addressRegion: 'Selangor',
    addressCountry: 'MY',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '3.139003',
    longitude: '101.686855',
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Kuala Lumpur',
    },
    {
      '@type': 'State',
      name: 'Selangor',
    },
    {
      '@type': 'Country',
      name: 'Malaysia',
    },
  ],
  priceRange: '$$',
  telephone: '+60-xxx-xxxxxxx', // Add your actual phone number
  email: 'info@momentousfoto.com', // Update with actual email
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  sameAs: [
    'https://www.instagram.com/momentous.foto', // Add your actual social media links
    'https://www.facebook.com/momentousfoto',
    'https://www.tiktok.com/@momentousfoto',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Photography Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Wedding Photography',
          description: 'Professional wedding photography services with unique blacky/fade grading aesthetic',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Pre-Wedding Photography',
          description: 'Romantic pre-wedding photoshoot sessions',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Maternity Photography',
          description: 'Beautiful maternity photoshoot sessions',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Convocation Photography',
          description: 'Graduation and convocation photography services',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Event Photography',
          description: 'Professional event photography coverage',
        },
      },
    ],
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Momentous Foto',
  url: 'https://momentous-foto.github.io',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://momentous-foto.github.io/services?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const photographSchema = (image: {
  url: string;
  title: string;
  description: string;
  datePublished: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Photograph',
  name: image.title,
  description: image.description,
  url: image.url,
  creator: {
    '@type': 'Person',
    name: 'Momentous Foto',
  },
  datePublished: image.datePublished,
  copyrightYear: new Date().getFullYear(),
  copyrightHolder: {
    '@type': 'Organization',
    name: 'Momentous Foto',
  },
});

export const imageGallerySchema = (images: string[], name: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name,
  description,
  image: images,
  creator: {
    '@type': 'Person',
    name: 'Momentous Foto',
  },
});

export const serviceSchema = (service: {
  name: string;
  description: string;
  url: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  description: service.description,
  url: service.url,
  provider: {
    '@type': 'ProfessionalService',
    name: 'Momentous Foto',
    url: 'https://momentous-foto.github.io',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Malaysia',
  },
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: 'https://momentous-foto.github.io/contact',
  },
});
