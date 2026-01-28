import { getImagePath } from '@/utils/imagePath';

const GallerySection = () => {
  return (
    <section className="relative py-16 px-6 bg-[#F5EDD8] overflow-hidden">
      {/* Decorative clouds */}
      <img 
        src={getImagePath('images/icons/cloud (2).png')} 
        alt="" 
        loading="lazy"
        className="absolute top-10 left-10 w-32 opacity-30 animate-float pointer-events-none" 
        style={{animation: 'float 9s ease-in-out infinite'}} 
      />
      <img 
        src={getImagePath('images/icons/cloud (1).png')}
        alt="" 
        loading="lazy"
      <div className="max-w-6xl mx-auto">
        {/* Combined Section Title */}
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-wide leading-tight"
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
          <p className="text-base md:text-lg leading-relaxed text-[#B8956A] font-serif max-w-2xl mx-auto mb-2">
            Classic garden setting surrounded by natural greenery, warm string lights, vintage elements, and soft lantern lighting — creating an elegant space for capturing meaningful moments.
          </p>
          <p className="text-sm md:text-base text-[#9B5DA5] font-serif italic">
            A glimpse of our studio
          </p>
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-12 grid-rows-12 gap-4 h-[600px] md:h-[700px] lg:h-[800px] animate-fade-in">
          {/* Large image - top left */}
          <div className="col-span-12 md:col-span-7 row-span-7 md:row-span-8 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group">
            <img 
              src={getImagePath('images/1.jpeg')} 
              alt="Studio setup 1" 
              loading="eager"
              fetchPriority="high"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Medium image - top right */}
          <div className="col-span-6 md:col-span-5 row-span-5 md:row-span-4 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group">
            <img 
              src={getImagePath('images/2.jpeg')} 
              alt="Studio setup 2" 
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Small image - middle right */}
          <div className="col-span-6 md:col-span-5 row-span-4 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group">
            <img 
              src={getImagePath('images/3.jpeg')} 
              alt="Studio setup 3" 
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Medium tall image - bottom left */}
          <div className="col-span-6 md:col-span-4 row-span-5 md:row-span-4 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group">
            <img 
              src={getImagePath('images/4.jpeg')} 
              alt="Studio setup 4" 
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Wide image - bottom center */}
          <div className="col-span-6 md:col-span-8 row-span-3 md:row-span-4 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group">
            <img 
              src={getImagePath('images/5.jpeg')} 
              alt="Studio setup 5" 
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default GallerySection;
