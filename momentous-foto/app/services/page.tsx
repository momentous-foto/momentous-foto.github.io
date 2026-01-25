import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

const services = [
  { id: 1, name: 'Second Shooter (Wedding)', slug: 'second-shooter' },
  { id: 3, name: 'Pre / Post wedding', slug: 'prepost-wedding' },
  { id: 5, name: 'Maternity', slug: 'maternity' },
  { id: 6, name: 'Convocation', slug: 'convocation' },
  { id: 7, name: 'Event', slug: 'event' },
];

async function getServicesWithImages() {
  const servicesDir = path.join(process.cwd(), 'public', 'images', 'services');

  return services.map(service => {
    let image = '/images/placeholder.svg';

    try {
      const servicePath = path.join(servicesDir, service.slug);
      if (fs.existsSync(servicePath)) {
        const files = fs.readdirSync(servicePath);
        const validImage = files.find(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
        if (validImage) {
          image = `/images/services/${service.slug}/${validImage}`;
        }
      }
    } catch (e) {
      console.error(`Error reading service folder ${service.slug}:`, e);
    }

    return { ...service, image };
  });
}

export default async function Services() {
  const servicesWithImages = await getServicesWithImages();

  return (
    <div className="min-h-screen pt-20">
      <section className="relative h-[25vh] flex items-center justify-center bg-gradient-to-b from-[#1A1A1A] to-[#0F0F0F]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 text-white">Our Services</h1>
          <p className="text-base md:text-lg text-[#6B6B6B]">Capturing every moment that matters</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesWithImages.map((service, idx) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group relative aspect-[16/9] overflow-hidden rounded-lg cursor-pointer"
              >
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={idx < 2}
                  loading={idx < 2 ? "eager" : "lazy"}
                  quality={85}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl md:text-3xl font-bold text-center px-4 drop-shadow-lg">
                    {service.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
