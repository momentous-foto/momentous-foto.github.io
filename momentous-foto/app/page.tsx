import Image from "next/image";
import Link from "next/link";
import fs from 'fs';
import path from 'path';
import featuredConfig from '@/config/featured-clients.json';

// This function runs on the server to get featured clients for home page
async function getFeaturedClients() {
  const clientsDir = path.join(process.cwd(), 'public', 'images', 'clients');

  if (!fs.existsSync(clientsDir)) return [];

  const clients = featuredConfig.featured.map((featured, index) => {
    const folder = featured.slug;

    const name = folder
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' & ');

    // Use the featured image specified in config
    const folderPath = path.join(clientsDir, folder);
    let image = '/images/placeholder.svg'; // Fallback

    try {
      // Check if the featured image exists
      const featuredImagePath = path.join(folderPath, featured.featuredImage);
      if (fs.existsSync(featuredImagePath)) {
        image = `/images/clients/${folder}/${featured.featuredImage}`;
      } else {
        // Fallback to first image in folder if featured image doesn't exist
        const files = fs.readdirSync(folderPath);
        const validImage = files.find(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
        if (validImage) {
          image = `/images/clients/${folder}/${validImage}`;
        }
      }
    } catch (e) {
      console.error(`Error reading folder ${folder}:`, e);
    }

    return {
      id: index + 1,
      names: name,
      slug: folder,
      image,
    };
  });

  return clients;
}

export default async function Home() {
  const clients = await getFeaturedClients();

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}

      {/* Raya Special Banner */}
      <section className="px-4 pt-10 pb-4 max-w-[1400px] mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-[#F5EDD8] border border-[#6B4B9A]/20 shadow-2xl">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E85A5A] rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D94F8C] rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative px-8 py-12 md:py-16 text-center">
            <div className="inline-block mb-4">
              <span className="px-4 py-1.5 bg-[#6B4B9A]/10 border border-[#6B4B9A]/30 rounded-full text-[#6B4B9A] text-xs md:text-sm font-semibold uppercase tracking-wider">
                🌙 Limited Time Offer
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-[#6B4B9A] mb-4">
              Hari Raya Special Packages
            </h2>
            
            <p className="text-[#6B4B9A]/80 text-base md:text-lg mb-8 max-w-2xl mx-auto">
              Capture your festive moments with our exclusive Raya photography packages. 
              Limited slots available!
            </p>
            
            <a
              href="https://momentous-foto.github.io/momentous-studio-raya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#D94F8C] hover:bg-[#E85A5A] text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              View Raya Packages
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Recent Works / Clients Grid - 2 columns landscape */}
      <section className="px-4 py-4 color-secondary">
        <div className="flex flex-col items-center mb-12">
          <div className="w-12 h-[1px] bg-zinc-800 mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1400px] mx-auto">
          {clients.map((client) => (
            <Link
              key={client.id}
              href={`/client/${client.slug}`}
              className="group relative block aspect-[16/9] overflow-hidden bg-gray-200 cursor-pointer rounded-lg"
            >
              <Image
                src={client.image}
                alt={client.names}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="text-center text-white p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl font-serif italic">{client.names}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
