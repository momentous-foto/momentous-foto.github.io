export default function About() {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 md:py-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-12 text-white">About Us</h1>
          <div className="max-w-3xl space-y-6 text-[#CACACA] text-lg leading-relaxed">
            <p>
              Hi, I'm the face behind Momentous Foto, a woman photographer who started this journey back in 2021,
              armed with nothing but a camera, a big dream, and a heart that just loves capturing people's moments.
            </p>
            <p>
              I didn't start as an expert. I started as someone who was curious. Every shoot I took, every mistake I made,
              and every photo I clicked became a lesson. And honestly… I'm still learning, still improving, still chasing
              better light, better angles, and better stories. But that's the beauty of photography for me, it's a never
              ending journey. Every face, every smile, every moment teaches me something new.
            </p>
            <p className="text-white font-semibold text-xl">What keeps me going?</p>
            <p>
              That feeling when someone sees their photo and smiles, or tears up a little, or says "This is so me."
              That's when I know I'm exactly where I'm meant to be. Momentous Foto is not just a business, it's a space
              where moments turn into memories, and where your story becomes part of mine.
            </p>
            <p>
              So here's to more growth, more learning, and more beautiful moments ahead.
            </p>
            <p className="italic text-[#6B6B6B] text-base mt-8">Thanks for being part of this journey.</p>
          </div>
        </div>
      </section>

      <section className="">
        <div className="w-full px-[15%]">
          <div className="w-full relative ">
            <img
              src="/images/about/moodboard - about us.png"
              alt="Momentous Foto Moodboard"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
