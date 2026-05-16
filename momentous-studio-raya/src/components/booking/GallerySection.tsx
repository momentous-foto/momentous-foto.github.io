import { getImagePath } from '@/utils/imagePath';

const GallerySection = () => {
  return (
    <section className="relative py-16 px-6 bg-[#415643] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Combined Section Title */}
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-wide leading-tight text-[#fcfcfc]">
            What is Momentous Studio Raya?
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-[#fcfcfc] max-w-2xl mx-auto mb-2">
            Laman raya berkonsepkan alam semula jadi dan gaya klasik Melayu dengan suasana tenang, menggunakan cahaya semula jadi dan dekorasi ringkas.
          </p>
          <p className="text-sm md:text-base text-[#C49A6C] italic">
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
              fetchpriority="high"
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
