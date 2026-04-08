import { getImagePath } from "@/utils/imagePath";

const samplePhotos = [
  "images/sample/IMG_6827.JPG.webp",
  "images/sample/IMG_6829.JPG.webp",
  "images/sample/IMG_6830.JPG.webp",
  "images/sample/IMG_6831.JPG.webp",
  "images/sample/IMG_6832.JPG.webp",
  "images/sample/IMG_6833.JPG.webp",
  "images/sample/IMG_6834.JPG.webp",
  "images/sample/IMG_6923.JPG.webp",
  "images/sample/IMG_6924.JPG.webp",
  "images/sample/IMG_6925.JPG.webp",
  "images/sample/IMG_6926.JPG.webp",
  "images/sample/IMG_6928.JPG.webp",
  "images/sample/IMG_6929.JPG.webp",
  "images/sample/IMG_6930.JPG.webp",
  "images/sample/IMG_6931.JPG.webp",
];

const Closed = () => {
  return (
    <div className="min-h-screen bg-[#415643] text-[#fcfcfc]">
      {/* ── Hero ── */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-16 pb-12">
        <img
          src={getImagePath("images/logo/logo.png")}
          alt="Momentous Studio Raya"
          loading="eager"
          className="w-[140px] md:w-[170px] h-auto mb-6"
        />

        <p className="text-xs tracking-[0.35em] text-[#C49A6C] uppercase mb-1">
          Momentous Foto
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-[0.2em] mb-6">
          LAMAN RAYA
        </h1>

        {/* Closed badge */}
        <span className="inline-flex items-center gap-2 bg-[#C49A6C]/20 border border-[#C49A6C]/40 text-[#C49A6C] text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C49A6C] inline-block" />
          Musim Raya 2025 · Telah Berakhir
        </span>

        {/* Main hero image */}
        <div className="rounded-2xl overflow-hidden shadow-2xl max-w-sm w-full aspect-square mb-8">
          <img
            src={getImagePath("images/sample/main.webp")}
            alt="Laman Raya Setup"
            loading="eager"
            className="w-full h-full object-cover object-bottom"
          />
        </div>

        <p className="max-w-md text-[#fcfcfc]/80 text-sm md:text-base leading-relaxed mb-3">
          Terima kasih kerana menjadi sebahagian daripada kenangan kami.
          Sesi Laman Raya Momentous 2025 telah pun tamat.
        </p>
        <p className="max-w-md text-[#C49A6C] text-xs md:text-sm italic leading-relaxed mb-10">
          "Every moment captured is a memory preserved forever."
        </p>

        {/* Social links */}
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://www.instagram.com/momentous.foto"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#fcfcfc]/10 hover:bg-[#C49A6C]/30 border border-[#fcfcfc]/20 hover:border-[#C49A6C] text-[#fcfcfc] text-xs font-medium px-5 py-2.5 rounded-full transition-all duration-200"
          >
            Instagram
          </a>
          <a
            href="https://www.tiktok.com/@momentous.foto"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#fcfcfc]/10 hover:bg-[#C49A6C]/30 border border-[#fcfcfc]/20 hover:border-[#C49A6C] text-[#fcfcfc] text-xs font-medium px-5 py-2.5 rounded-full transition-all duration-200"
          >
            TikTok
          </a>
          <a
            href="https://www.threads.net/@momentous.foto"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#fcfcfc]/10 hover:bg-[#C49A6C]/30 border border-[#fcfcfc]/20 hover:border-[#C49A6C] text-[#fcfcfc] text-xs font-medium px-5 py-2.5 rounded-full transition-all duration-200"
          >
            Threads
          </a>
        </div>
      </section>

      {/* ── Photo Grid (samples) ── */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wide mb-2">
            Captured Memories
          </h2>
          <p className="text-[#C49A6C] text-sm italic">Sessions from Raya 2025</p>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {samplePhotos.map((src, i) => (
            <div key={i} className="break-inside-avoid rounded-xl overflow-hidden shadow-md group">
              <img
                src={getImagePath(src)}
                alt={`Raya 2025 session ${i + 1}`}
                loading="lazy"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#fcfcfc]/10 py-8 text-center px-6">
        <p className="text-[#fcfcfc]/50 text-xs mb-1">
          © 2025 Momentous Foto · All rights reserved
        </p>
        <p className="text-[#fcfcfc]/30 text-xs">
          momentousfotostudio@gmail.com
        </p>
      </footer>
    </div>
  );
};

export default Closed;
