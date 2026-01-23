import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const services = [
  { id: 1, name: 'Second Shooter', slug: 'second-shooter' },
  { id: 2, name: 'Wedding', slug: 'wedding' },
  { id: 3, name: 'Prepost-wedding', slug: 'prepost-wedding' },
  { id: 5, name: 'Event', slug: 'event' },
  { id: 6, name: 'Convocation', slug: 'convocation' },
  { id: 7, name: 'Maternity', slug: 'maternity' },
];

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Determine the directory to look for images
  // We check 'public/images/services/{slug}' folder first
  let publicDir = path.join(process.cwd(), 'public');
  // Fallback if running in a context where public is inside frontend
  if (!fs.existsSync(publicDir) && fs.existsSync(path.join(process.cwd(), 'frontend', 'public'))) {
    publicDir = path.join(process.cwd(), 'frontend', 'public');
  }

  const serviceDir = path.join(publicDir, 'images', 'services', slug);
  const legacyFile = path.join(publicDir, 'images', 'services', `${slug}.png`);

  let images: string[] = [];

  // Logic: 
  // 1. Check if a folder exists for this service (e.g. /services/convocation/)
  // 2. If yes, read all valid images from it.
  // 3. If no, check for a single file (e.g. /services/convocation.png)

  if (fs.existsSync(serviceDir) && fs.lstatSync(serviceDir).isDirectory()) {
    try {
      const files = fs.readdirSync(serviceDir);
      images = files
        .filter(file => /\.(png|jpg|jpeg|webp)$/i.test(file))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })) // Smart sort (1.png, 2.png, 10.png)
        .map(file => `/images/services/${slug}/${file}`);
    } catch (err) {
      console.error("Error reading service directory:", err);
    }
  }

  if (images.length === 0 && fs.existsSync(legacyFile)) {
    images = [`/images/services/${slug}.png`];
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 text-white">
      <div className="container mx-auto px-4 mb-6 text-center">
        <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2">
          {service.name}
        </h1>
        <p className="text-gray-400 uppercase tracking-widest text-sm">Moodboard</p>
      </div>

      <div className="w-full bg-zinc-900 border-y border-zinc-800">
        {images.length > 0 ? (
          <div className="flex flex-col w-full px-[2%]">
            {images.map((imgSrc, index) => (
              <div key={index} className="relative w-full">
                {/* Full width image, auto height to maintain aspect ratio */}
                <img
                  src={imgSrc}
                  alt={`${service.name} Moodboard ${index + 1}`}
                  className="w-full h-auto block"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="min-h-[50vh] flex items-center justify-center text-gray-500">
            <p>Moodboard coming soon for {service.name}</p>
          </div>
        )}
      </div>

      <div className="text-center mt-8">
        <Link href="/services" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-widest">
          &larr; Back to Services
        </Link>
      </div>
    </div>
  );
}