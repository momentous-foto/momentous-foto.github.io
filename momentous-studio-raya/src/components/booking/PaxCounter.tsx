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
    <div className="bg-secondary/30 p-8 rounded-xl border border-secondary space-y-6">
      {/* Base Pax Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="flex items-center gap-3">
          <Users className="h-7 w-7 text-accent" />
          <div>
            <h3 className="font-bold text-lg">Base Package (1-4 pax)</h3>
            <p className="text-sm text-muted-foreground">Included in package price</p>
          </div>
        </div>
        <div className="flex items-center gap-4 justify-center bg-background/50 p-4 rounded-xl">
          <Button
            variant="outline"
            size="icon"
            onClick={handleBasePaxDecrease}
            disabled={pax <= minPax}
            className="h-12 w-12 rounded-full hover:scale-110 transition-all duration-300 disabled:opacity-30"
          >
            <Minus className="h-5 w-5" />
          </Button>
          <div className="flex flex-col items-center min-w-[60px]">
            <span className="text-4xl font-bold text-accent">{pax}</span>
            <span className="text-xs text-muted-foreground font-medium">person{pax > 1 ? 's' : ''}</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleBasePaxIncrease}
            disabled={pax >= maxBasePax}
            className="h-12 w-12 rounded-full hover:scale-110 transition-all duration-300 disabled:opacity-30"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Add-ons Section */}
      <div className="border-t border-secondary/50 pt-6">
        <h4 className="font-semibold text-md mb-4 flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-accent" />
          Add-ons (max {maxAddOns} people)
        </h4>
        
        <div className="space-y-4">
          {/* Adult Add-ons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-background/50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <UserPlus className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">Additional Person</p>
                <p className="text-xs text-muted-foreground">RM{pricePerAdultAddOn} per person</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={handleAdultAddOnDecrease}
                disabled={adultAddOns <= 0}
                className="h-10 w-10 rounded-full hover:scale-110 transition-all duration-300 disabled:opacity-30"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="flex flex-col items-center min-w-[50px]">
                <span className="text-2xl font-bold text-blue-500">{adultAddOns}</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleAdultAddOnIncrease}
                disabled={totalAddOns >= maxAddOns}
                className="h-10 w-10 rounded-full hover:scale-110 transition-all duration-300 disabled:opacity-30"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Kid Add-ons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-background/50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <Baby className="h-5 w-5 text-pink-500" />
              <div>
                <p className="font-medium">Kids (0-6 years old)</p>
                <p className="text-xs text-green-500 font-semibold">FREE - No charge!</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={handleKidAddOnDecrease}
                disabled={kidAddOns <= 0}
                className="h-10 w-10 rounded-full hover:scale-110 transition-all duration-300 disabled:opacity-30"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="flex flex-col items-center min-w-[50px]">
                <span className="text-2xl font-bold text-pink-500">{kidAddOns}</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleKidAddOnIncrease}
                disabled={totalAddOns >= maxAddOns}
                className="h-10 w-10 rounded-full hover:scale-110 transition-all duration-300 disabled:opacity-30"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-4 p-4 bg-background/50 rounded-lg space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Base package ({pax} pax)</span>
          <span className="font-medium">Included</span>
        </div>
        {adultAddOns > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Adult add-ons ({adultAddOns} pax)</span>
            <span className="font-semibold text-accent">+RM{adultAddOnsCost}</span>
          </div>
        )}
        {kidAddOns > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Kids ({kidAddOns} kids)</span>
            <span className="font-semibold text-green-500">FREE</span>
          </div>
        )}
        <div className="border-t border-secondary/30 pt-2 mt-2 flex justify-between items-center">
          <span className="font-bold">Total People</span>
          <span className="font-bold text-lg text-accent">{totalPeople} / 10</span>
        </div>
        {totalAddOns > 0 && (
          <div className="text-xs text-muted-foreground">
            {maxAddOns - totalAddOns} add-on slot{(maxAddOns - totalAddOns) !== 1 ? 's' : ''} remaining
          </div>
        )}
      </div>
    </div>
  );
};

export default PaxCounter;
