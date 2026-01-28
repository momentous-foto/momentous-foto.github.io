import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getImagePath } from '@/utils/imagePath';

const Hero = () => {
  return (
    <section className="relative py-20 md:py-32 flex flex-col items-center justify-center overflow-hidden bg-[#F5EDD8] px-4">
        {/* Playful Animated Elements */}
        <img src={getImagePath('images/icons/cloud (1).png')} alt="" loading="lazy" className="absolute top-10 right-10 w-24 opacity-50 animate-float pointer-events-none" style={{animation: 'float 6s ease-in-out infinite'}} />
        <img src={getImagePath('images/icons/cloud (2).png')} alt="" loading="lazy" className="absolute top-32 left-16 w-32 opacity-40 animate-float pointer-events-none" style={{animation: 'float 8s ease-in-out infinite 2s'}} />
        <img src={getImagePath('images/icons/cloud (3).png')} alt="" loading="lazy" className="absolute top-20 left-1/2 w-20 opacity-35 animate-float pointer-events-none" style={{animation: 'float 7s ease-in-out infinite 1s'}} />
        <div className="absolute bottom-20 right-24 text-4xl opacity-35 animate-float" style={{animation: 'float 10s ease-in-out infinite 4s'}}>
          ✨
        </div>
        <div className="absolute top-1/4 left-8 text-3xl opacity-40 animate-float" style={{animation: 'float 7s ease-in-out infinite 1s'}}>
          ⭐
        </div>
        <div className="absolute bottom-40 left-20 text-5xl opacity-30 animate-float" style={{animation: 'float 9s ease-in-out infinite 3s'}}>
          🌙
        </div>

        {/* Main logo - More Compact */}
        <div className="relative z-10 text-center animate-fade-in">
          <div className="mb-6">
            {/* Logo Image */}
            <div className="relative inline-block mb-4">
              <img 
                src={getImagePath('images/logo/logo.png')} 
                alt="Momentous Studio Raya" 
                loading="eager"
                fetchPriority="high"
                className="w-[300px] md:w-[400px] lg:w-[650px] h-auto mx-auto drop-shadow-xl"
                style={{
                  filter: 'drop-shadow(3px 3px 8px rgba(107, 75, 154, 0.3))'
                }}
              />
              {/* Playful dots */}
              <span className="absolute -top-4 -right-8 text-4xl">✨</span>
            </div>
          </div>
          
          <p className="text-lg md:text-xl font-serif italic text-[#B8956A] mb-8 flex items-center justify-center gap-2">
            <span className="text-2xl">🌿</span>
            A Classic Garden Studio
            <span className="text-2xl">🌿</span>
          </p>

          <Button asChild size="lg" className="group bg-gradient-to-r from-[#D94F8C] to-[#6B4B9A] hover:opacity-90 hover:scale-105 transition-all text-white font-bold px-6 py-5 text-base rounded-full shadow-lg">
            <Link to="/packages">
              View Packages ✨
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
  );
};

export default Hero;