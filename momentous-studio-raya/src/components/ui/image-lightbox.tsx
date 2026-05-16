import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const ImageLightbox = ({ images, currentIndex, onClose, onNavigate }: ImageLightboxProps) => {
  useEffect(() => {
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
    
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex]);

  const handlePrevious = () => {
    onNavigate(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    onNavigate(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[110] p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors touch-manipulation"
        aria-label="Close"
      >
        <X className="h-6 w-6 md:h-8 md:w-8" />
      </button>

      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        className="absolute left-2 md:left-4 z-[110] p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors touch-manipulation"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute right-2 md:right-4 z-[110] p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors touch-manipulation"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
      </button>

      {/* Image Container */}
      <div className="relative max-w-7xl max-h-[90vh] mx-auto px-4 md:px-8">
        <img
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg"
          loading="eager"
          decoding="async"
        />
        
        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Swipe hint for mobile */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs md:hidden">
        Swipe or tap arrows to navigate
      </div>
    </div>
  );
};

export default ImageLightbox;
