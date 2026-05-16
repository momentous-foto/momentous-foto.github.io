import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getImagePath } from '@/utils/imagePath';

const Hero = () => {
  return (
    <section className="relative py-8 md:py-12 flex flex-col items-center justify-center overflow-hidden bg-[#415643] px-4">
        <div className="relative z-10 text-center animate-fade-in max-w-2xl mx-auto">
          {/* Logo */}
          <div className="mb-2">
            <img 
              src={getImagePath('images/logo/logo.png')} 
              alt="Momentous Studio Raya" 
              loading="eager"
              fetchpriority="high"
              className="w-[150px] md:w-[180px] h-auto mx-auto"
            />
          </div>
          
          {/* MOMENTOUS FOTO */}
          <h1 className="text-[#fcfcfc] text-xl md:text-2xl font-semibold tracking-[0.3em] mb-8">
            MOMENTOUS FOTO
          </h1>
          
          {/* LAMAN RAYA */}
          <h2 className="text-[#fcfcfc] text-2xl md:text-3xl font-bold tracking-[0.2em] mb-4">
            LAMAN RAYA
          </h2>
          
          {/* Main Image */}
          <div className="mb-4 rounded-lg overflow-hidden shadow-2xl aspect-square max-w-md mx-auto">
            <img 
              src={getImagePath('images/sample/main.webp')} 
              alt="Laman Raya Setup" 
              loading="eager"
              fetchpriority="high"
              className="w-full h-full object-cover object-bottom"
            />
          </div>
          
          {/* Description */}
          <p className="text-sm md:text-base text-[#fcfcfc] mb-4 leading-relaxed px-4">
            Laman raya momentous berkonsepkan alam semula jadi dan gaya klasik Melayu. Dijalankan di kawasan luar dengan suasana tenang, menggunakan cahaya semula jadi dan dekorasi ringkas. Sesuai untuk merakam kenangan raya yang indah dan penuh makna.
          </p>
          
          {/* Location */}
          <p className="text-base md:text-lg text-[#fcfcfc] mb-6 font-medium">
            Outdoor photoshoot, Bukit Lagong, Batu Caves
          </p>

          {/* Button */}
          <Button asChild size="lg" className="bg-[#C49A6C] hover:bg-[#B08A5C] transition-all text-[#415643] font-bold px-6 md:px-8 py-5 md:py-6 text-sm md:text-base rounded-md shadow-lg touch-manipulation w-full sm:w-auto">
            <Link to="/packages">
              Get package
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
  );
};

export default Hero;