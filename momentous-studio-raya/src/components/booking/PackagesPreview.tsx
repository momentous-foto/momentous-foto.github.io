import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PackagesPreview = () => {
  return (
    <section className="py-8 md:py-12 bg-[#415643] px-4">
      <div className="booking-container text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#fcfcfc] mb-3 md:mb-4">
          Ready to Book?
        </h2>
        <p className="text-[#fcfcfc] text-base md:text-lg mb-6 md:mb-7 max-w-2xl mx-auto px-4">
          View our package details and secure your spot for this Raya season
        </p>
        <div className="flex gap-3 md:gap-4 justify-center flex-col sm:flex-row items-stretch sm:items-center max-w-md sm:max-w-none mx-auto">
          <Button asChild size="lg" className="bg-[#C49A6C] hover:bg-[#B08A5C] text-[#415643] font-bold px-6 md:px-8 py-5 md:py-6 touch-manipulation w-full sm:w-auto">
            <Link to="/packages">
              View Package Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-2 border-[#fcfcfc] text-[#fcfcfc] hover:bg-[#fcfcfc]/10 px-6 md:px-8 py-5 md:py-6 touch-manipulation w-full sm:w-auto">
            <Link to="/book">
              Book Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};


export default PackagesPreview;