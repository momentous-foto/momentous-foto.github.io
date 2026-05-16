import Header from "@/components/booking/Header";
import Footer from "@/components/booking/Footer";
import PackageCard from "@/components/booking/PackageCard";
import { usePackages } from "@/hooks/usePackages";
import { getImagePath } from '@/utils/imagePath';
import { useState, lazy, Suspense, useMemo } from 'react';

// Lazy load the lightbox component - only loads when user clicks an image
const ImageLightbox = lazy(() => import('@/components/ui/image-lightbox'));

const Packages = () => {
  const packages = usePackages();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = useMemo(() => [
    'IMG_6827.JPG.webp',
    'IMG_6829.JPG.webp',
    'IMG_6830.JPG.webp',
    'IMG_6831.JPG.webp',
    'IMG_6832.JPG.webp',
    'IMG_6833.JPG.webp',
    'IMG_6834.JPG.webp',
    'IMG_6923.JPG.webp',
    'IMG_6924.JPG.webp',
    'IMG_6925.JPG.webp',
    'IMG_6926.JPG.webp',
    'IMG_6928.JPG.webp',
    'IMG_6929.JPG.webp',
    'IMG_6930.JPG.webp',
    'IMG_6931.JPG.webp',
  ], []);

  const galleryImagePaths = useMemo(
    () => galleryImages.map(img => getImagePath(`images/sample/${img}`)),
    [galleryImages]
  );

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-[#415643]">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="booking-container animate-fade-in">
          {/* Package Card - Centered */}
          <div className="max-w-md mx-auto mb-8">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} featured={true} />
            ))}
          </div>

          {/* Gallery Section */}
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#fcfcfc] text-center mb-6 md:mb-8\">
              Sample Photos
            </h2>
            
            {/* Bento Grid Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[250px] gap-3 md:gap-4">
              {/* Image 1 - Large featured */}
              <button
                onClick={() => openLightbox(0)}
                className="col-span-2 row-span-2 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer touch-manipulation"
              >
                <img 
                  src={getImagePath(`images/sample/${galleryImages[0]}`)} 
                  alt="Setup 1" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </button>

              {/* Image 2 */}
              <button
                onClick={() => openLightbox(1)}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer touch-manipulation"
              >
                <img 
                  src={getImagePath(`images/sample/${galleryImages[1]}`)} 
                  alt="Setup 2" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </button>

              {/* Image 3 */}
              <button
                onClick={() => openLightbox(2)}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer touch-manipulation"
              >
                <img 
                  src={getImagePath(`images/sample/${galleryImages[2]}`)} 
                  alt="Setup 3" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </button>

              {/* Image 4 - Tall */}
              <button
                onClick={() => openLightbox(3)}
                className="row-span-2 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer touch-manipulation"
              >
                <img 
                  src={getImagePath(`images/sample/${galleryImages[3]}`)} 
                  alt="Setup 4" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </button>

              {/* Image 5 - Tall */}
              <button
                onClick={() => openLightbox(4)}
                className="row-span-2 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer touch-manipulation"
              >
                <img 
                  src={getImagePath(`images/sample/${galleryImages[4]}`)} 
                  alt="Setup 5" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </button>

              {/* Image 6 - Wide */}
              <button
                onClick={() => openLightbox(5)}
                className="col-span-2 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer touch-manipulation"
              >
                <img 
                  src={getImagePath(`images/sample/${galleryImages[5]}`)} 
                  alt="Setup 6" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </button>

              {/* Image 7 */}
              <button
                onClick={() => openLightbox(6)}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer touch-manipulation"
              >
                <img 
                  src={getImagePath(`images/sample/${galleryImages[6]}`)} 
                  alt="Setup 7" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </button>

              {/* Image 8 */}
              <button
                onClick={() => openLightbox(7)}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer touch-manipulation"
              >
                <img 
                  src={getImagePath(`images/sample/${galleryImages[7]}`)} 
                  alt="Setup 8" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </button>

              {/* Image 9 - Wide */}
              <button
                onClick={() => openLightbox(8)}
                className="col-span-2 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer touch-manipulation"
              >
                <img 
                  src={getImagePath(`images/sample/${galleryImages[8]}`)} 
                  alt="Setup 9" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </button>

              {/* Image 10 */}
              <button
                onClick={() => openLightbox(9)}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer touch-manipulation"
              >
                <img 
                  src={getImagePath(`images/sample/${galleryImages[9]}`)} 
                  alt="Setup 10" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </button>

              {/* Image 11 */}
              <button
                onClick={() => openLightbox(10)}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer touch-manipulation"
              >
                <img 
                  src={getImagePath(`images/sample/${galleryImages[10]}`)} 
                  alt="Setup 11" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </button>

              {/* Image 12 - Tall */}
              <button
                onClick={() => openLightbox(11)}
                className="row-span-2 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer touch-manipulation"
              >
                <img 
                  src={getImagePath(`images/sample/${galleryImages[11]}`)} 
                  alt="Setup 12" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </button>

              {/* Image 13 - Tall */}
              <button
                onClick={() => openLightbox(12)}
                className="row-span-2 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer touch-manipulation"
              >
                <img 
                  src={getImagePath(`images/sample/${galleryImages[12]}`)} 
                  alt="Setup 13" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </button>

              {/* Image 14 - Wide */}
              <button
                onClick={() => openLightbox(13)}
                className="col-span-2 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer touch-manipulation"
              >
                <img 
                  src={getImagePath(`images/sample/${galleryImages[13]}`)} 
                  alt="Setup 14" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </button>

              {/* Image 15 */}
              <button
                onClick={() => openLightbox(14)}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer touch-manipulation"
              >
                <img 
                  src={getImagePath(`images/sample/${galleryImages[14]}`)} 
                  alt="Setup 15" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Image Lightbox - Lazy loaded */}
      {lightboxOpen && (
        <Suspense fallback={<div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
          <ImageLightbox
            images={galleryImagePaths}
            currentIndex={currentImageIndex}
            onClose={closeLightbox}
            onNavigate={navigateToImage}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Packages;