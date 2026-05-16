import { Button } from "@/components/ui/button";
import { Minus, Plus, Users, UserPlus, Baby } from "lucide-react";

interface PaxCounterProps {
  pax: number;
  adultAddOns: number;
  kidAddOns: number;
  onPaxChange: (pax: number) => void;
  onAdultAddOnsChange: (addOns: number) => void;
  onKidAddOnsChange: (kids: number) => void;
  minPax?: number;
  maxBasePax?: number;
  maxAddOns?: number;
  pricePerAdultAddOn?: number;
}

const PaxCounter = ({
  pax,
  adultAddOns,
  kidAddOns,
  onPaxChange,
  onAdultAddOnsChange,
  onKidAddOnsChange,
  minPax = 1,
  maxBasePax = 4,
  maxAddOns = 6,
  pricePerAdultAddOn = 10,
}: PaxCounterProps) => {
  const totalAddOns = adultAddOns + kidAddOns;
  const totalPeople = pax + totalAddOns;
  const adultAddOnsCost = adultAddOns * pricePerAdultAddOn;

  const handleBasePaxDecrease = () => {
    if (pax > minPax) {
      onPaxChange(pax - 1);
    }
  };

  const handleBasePaxIncrease = () => {
    if (pax < maxBasePax) {
      onPaxChange(pax + 1);
    }
  };

  const handleAdultAddOnDecrease = () => {
    if (adultAddOns > 0) {
      onAdultAddOnsChange(adultAddOns - 1);
    }
  };

  const handleAdultAddOnIncrease = () => {
    if (totalAddOns < maxAddOns) {
      onAdultAddOnsChange(adultAddOns + 1);
    }
  };

  const handleKidAddOnDecrease = () => {
    if (kidAddOns > 0) {
      onKidAddOnsChange(kidAddOns - 1);
    }
  };

  const handleKidAddOnIncrease = () => {
    if (totalAddOns < maxAddOns) {
      onKidAddOnsChange(kidAddOns + 1);
    }
  };

  return (
    <div className="bg-secondary/30 p-4 sm:p-6 lg:p-7 rounded-xl border border-secondary space-y-4 sm:space-y-5">
      {/* Base Pax Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Users className="h-6 w-6 sm:h-7 sm:w-7 text-accent flex-shrink-0" />
          <div>
            <h3 className="font-bold text-base sm:text-lg">Base Package (1-4 pax)</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Included in package price</p>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-center bg-background/50 p-3 rounded-xl">
          <Button
            variant="outline"
            size="icon"
            onClick={handleBasePaxDecrease}
            disabled={pax <= minPax}
            className="h-10 w-10 sm:h-11 sm:w-11 rounded-full hover:scale-110 transition-all duration-300 disabled:opacity-30"
          >
            <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <div className="flex flex-col items-center min-w-[50px] sm:min-w-[55px]">
            <span className="text-3xl sm:text-4xl font-bold text-accent leading-none">{pax}</span>
            <span className="text-[10px] sm:text-xs text-muted-foreground font-medium mt-0.5">pax</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleBasePaxIncrease}
            disabled={pax >= maxBasePax}
            className="h-10 w-10 sm:h-11 sm:w-11 rounded-full hover:scale-110 transition-all duration-300 disabled:opacity-30"
          >
            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>

      {/* Add-ons Section */}
      <div className="border-t border-secondary/50 pt-4 sm:pt-5">
        <h4 className="font-semibold text-sm sm:text-base mb-3 flex items-center gap-2">
          <UserPlus className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
          Add-ons (max {maxAddOns} people)
        </h4>
        
        <div className="space-y-3">
          {/* Adult Add-ons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-background/50 p-3 rounded-lg">
            <div className="flex items-center gap-2 sm:gap-3">
              <UserPlus className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Additional Adults</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">RM{pricePerAdultAddOn} per person</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={handleAdultAddOnDecrease}
                disabled={adultAddOns <= 0}
                className="h-9 w-9 rounded-full hover:scale-110 transition-all duration-300 disabled:opacity-30"
              >
                <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <div className="flex flex-col items-center min-w-[40px]">
                <span className="text-xl sm:text-2xl font-bold text-blue-500 leading-none">{adultAddOns}</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleAdultAddOnIncrease}
                disabled={totalAddOns >= maxAddOns}
                className="h-9 w-9 rounded-full hover:scale-110 transition-all duration-300 disabled:opacity-30"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>

          {/* Kid Add-ons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-background/50 p-3 rounded-lg">
            <div className="flex items-center gap-2 sm:gap-3">
              <Baby className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Kids (0-6 years old)</p>
                <p className="text-[10px] sm:text-xs text-green-500 font-semibold">FREE - No charge!</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={handleKidAddOnDecrease}
                disabled={kidAddOns <= 0}
                className="h-9 w-9 rounded-full hover:scale-110 transition-all duration-300 disabled:opacity-30"
              >
                <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <div className="flex flex-col items-center min-w-[40px]">
                <span className="text-xl sm:text-2xl font-bold text-pink-500 leading-none">{kidAddOns}</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleKidAddOnIncrease}
                disabled={totalAddOns >= maxAddOns}
                className="h-9 w-9 rounded-full hover:scale-110 transition-all duration-300 disabled:opacity-30"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="p-3 bg-background/50 rounded-lg space-y-1.5 sm:space-y-2">
        <div className="flex justify-between items-center text-xs sm:text-sm">
          <span className="text-muted-foreground">Base package ({pax} pax)</span>
          <span className="font-medium">Included</span>
        </div>
        {adultAddOns > 0 && (
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-muted-foreground">Adult add-ons ({adultAddOns} pax)</span>
            <span className="font-semibold text-accent">+RM{adultAddOnsCost}</span>
          </div>
        )}
        {kidAddOns > 0 && (
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-muted-foreground">Kids ({kidAddOns} kids)</span>
            <span className="font-semibold text-green-500">FREE</span>
          </div>
        )}
        <div className="border-t border-secondary/30 pt-1.5 sm:pt-2 mt-1.5 sm:mt-2 flex justify-between items-center">
          <span className="font-bold text-sm">Total People</span>
          <span className="font-bold text-lg sm:text-xl text-accent">{totalPeople} / 10</span>
        </div>
        {totalAddOns > 0 && (
          <div className="text-[10px] sm:text-xs text-muted-foreground">
            {maxAddOns - totalAddOns} add-on slot{(maxAddOns - totalAddOns) !== 1 ? 's' : ''} remaining
          </div>
        )}
      </div>
    </div>
  );
};

export default PaxCounter;
