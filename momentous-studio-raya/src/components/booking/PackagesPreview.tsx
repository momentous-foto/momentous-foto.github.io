import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { packages } from "@/data/packages";
import PackageCard from "./PackageCard";
import { Button } from "@/components/ui/button";

const PackagesPreview = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="booking-container">
        <div className="text-center mb-12">
          <span className="text-sm font-medium tracking-widest uppercase text-accent">
            Raya Packages
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Choose Your Experience
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Celebrate this Raya season with a memorable photoshoot in our classic garden studio.
            Vintage elements, warm ambience, and natural greenery await.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto mb-10">
          {packages.map((pkg, index) => (
            <PackageCard key={pkg.id} pkg={pkg} featured={index === 1} />
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="group transition-all duration-300">
            <Link to="/packages">
              View All Packages
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PackagesPreview;