import Header from "@/components/booking/Header";
import Footer from "@/components/booking/Footer";
import PackageCard from "@/components/booking/PackageCard";
import { packages } from "@/data/packages";

const Packages = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="booking-container animate-fade-in">
          <div className="text-center mb-12">
            <span className="text-sm font-medium tracking-widest uppercase text-accent">
              Raya Photography Packages
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Find Your Perfect Package
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Celebrate Raya with a memorable photoshoot in our classic garden studio.
              Choose the package that suits your family best.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
            {packages.map((pkg, index) => (
              <PackageCard key={pkg.id} pkg={pkg} featured={index === 1} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Packages;