import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <>
      {/* First Screen - Logo & Tagline */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#F5EDD8] px-4">
        {/* Playful Animated Elements */}
        <div className="absolute top-10 right-10 text-6xl opacity-50 animate-float" style={{animation: 'float 6s ease-in-out infinite'}}>
          ☁️
        </div>
        <div className="absolute top-32 left-16 text-5xl opacity-40 animate-float" style={{animation: 'float 8s ease-in-out infinite 2s'}}>
          ☁️
        </div>
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
            {/* Playful curved text */}
            <div className="relative inline-block">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-wide mb-1" 
                  style={{
                    background: 'linear-gradient(135deg, #D94F8C 0%, #9B5DA5 50%, #6B4B9A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '3px 3px 0px rgba(107, 75, 154, 0.15)',
                    fontFamily: 'Arial Black, sans-serif',
                    transform: 'rotate(-2deg)',
                    display: 'inline-block'
                  }}>
                MOMENTOUS
              </h1>
              {/* Playful dots */}
              <span className="absolute -top-4 -right-8 text-4xl">✨</span>
            </div>
            <p className="text-3xl md:text-4xl lg:text-5xl font-serif italic mt-1"
               style={{
                 background: 'linear-gradient(135deg, #6B4B9A 0%, #9B5DA5 100%)',
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
                 transform: 'rotate(1deg)',
                 display: 'inline-block'
               }}>
              studio Raya
            </p>
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

      {/* Second Screen - More Compact & Playful */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#F5EDD8] px-6 py-12">
        {/* Playful floating elements */}
        <div className="absolute top-16 right-12 text-5xl opacity-40 animate-float" style={{animation: 'float 8s ease-in-out infinite'}}>
          🎉
        </div>
        <div className="absolute bottom-24 left-12 text-4xl opacity-35 animate-float" style={{animation: 'float 9s ease-in-out infinite 2s'}}>
          🌸
        </div>

        <div className="relative z-10 max-w-2xl text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 tracking-wide leading-tight"
              style={{
                fontFamily: 'Arial Black, sans-serif'
              }}>
            <span style={{
              background: 'linear-gradient(135deg, #9B5DA5 0%, #6B4B9A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '2px 2px 0px rgba(107, 75, 154, 0.12)',
              display: 'inline-block',
              transform: 'rotate(-1deg)'
            }}>
              What is Momentous
            </span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #6B4B9A 0%, #D94F8C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '2px 2px 0px rgba(107, 75, 154, 0.12)',
              display: 'inline-block',
              transform: 'rotate(1deg)'
            }}>
              Studio Raya? ✨
            </span>
          </h2>

          <p className="text-base md:text-lg leading-relaxed text-[#B8956A] mb-10 font-serif max-w-xl mx-auto">
            Classic garden setting surrounded by natural greenery, warm string lights, vintage elements, and soft lantern lighting — creating an elegant space for capturing meaningful moments.
          </p>

          <Button asChild size="lg" className="group bg-gradient-to-r from-[#D94F8C] to-[#6B4B9A] hover:opacity-90 hover:scale-105 transition-all text-white font-bold px-6 py-5 text-base rounded-full shadow-lg">
            <Link to="/book">
              Book Your Session
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Hero;