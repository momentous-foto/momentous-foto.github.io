import Header from "@/components/booking/Header";
import Footer from "@/components/booking/Footer";
import Hero from "@/components/booking/Hero";
import PackagesPreview from "@/components/booking/PackagesPreview";
import FloatingClouds from "@/components/decorations/FloatingClouds";
import GallerySection from "@/components/booking/GallerySection";
import { getImagePath } from '@/utils/imagePath';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <FloatingClouds density="heavy" />
      
      {/* Side Decorative Icons - Half Peeking */}
      {/* Left side icons */}
      <img 
        src={getImagePath('images/icons/icon (3).png')} 
        alt="" 
        loading="lazy"
        className="absolute left-0 top-[15%] w-32 md:w-40 lg:w-48 h-auto -translate-x-1/2 opacity-80 pointer-events-none z-10"
        style={{
          filter: 'drop-shadow(2px 2px 8px rgba(107, 75, 154, 0.2))'
        }}
      />
      <img 
        src={getImagePath('images/icons/icon (4).png')} 
        alt="" 
        loading="lazy"
        className="absolute left-0 top-[45%] w-36 md:w-44 lg:w-52 h-auto -translate-x-1/2 opacity-75 pointer-events-none z-10"
        style={{
          filter: 'drop-shadow(2px 2px 8px rgba(107, 75, 154, 0.2))'
        }}
      />
      <img 
        src={getImagePath('images/icons/icon (3).png')} 
        alt="" 
        loading="lazy"
        className="absolute left-0 top-[75%] w-28 md:w-36 lg:w-44 h-auto -translate-x-1/2 opacity-70 pointer-events-none z-10"
        style={{
          filter: 'drop-shadow(2px 2px 8px rgba(107, 75, 154, 0.2))'
        }}
      />
      
      {/* Right side icons */}
      <img 
        src={getImagePath('images/icons/icon (4).png')} 
        alt="" 
        loading="lazy"
        className="absolute right-0 top-[25%] w-32 md:w-40 lg:w-48 h-auto translate-x-1/2 opacity-80 pointer-events-none z-10"
        style={{
          filter: 'drop-shadow(-2px 2px 8px rgba(107, 75, 154, 0.2))'
        }}
      />
      <img 
        src={getImagePath('images/icons/icon (3).png')} 
        alt="" 
        loading="lazy"
        className="absolute right-0 top-[55%] w-36 md:w-44 lg:w-52 h-auto translate-x-1/2 opacity-75 pointer-events-none z-10"
        style={{
          filter: 'drop-shadow(-2px 2px 8px rgba(107, 75, 154, 0.2))'
        }}
      />
      <img 
        src={getImagePath('images/icons/icon (4).png')} 
        alt="" 
        loading="lazy"
        className="absolute right-0 top-[85%] w-28 md:w-36 lg:w-44 h-auto translate-x-1/2 opacity-70 pointer-events-none z-10"
        style={{
          filter: 'drop-shadow(-2px 2px 8px rgba(107, 75, 154, 0.2))'
        }}
      />
      
      <Header />
      <main className="flex-1">
        <Hero />
        <GallerySection />
        <PackagesPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Home;