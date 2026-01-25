import Header from "@/components/booking/Header";
import Footer from "@/components/booking/Footer";
import Hero from "@/components/booking/Hero";
import PackagesPreview from "@/components/booking/PackagesPreview";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <PackagesPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Home;