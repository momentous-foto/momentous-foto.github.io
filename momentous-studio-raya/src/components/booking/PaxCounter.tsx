import { Button } from "@/components/ui/button";
import { Minus, Plus, Users } from "lucide-react";

interface PaxCounterProps {
  pax: number;
  onPaxChange: (pax: number) => void;
  minPax?: number;
  maxPax?: number;
  pricePerExtraPax?: number;
}

const PaxCounter = ({
  pax,
  onPaxChange,
  minPax = 1,
  maxPax = 6,
  pricePerExtraPax = 10,
}: PaxCounterProps) => {
  const basePax = 4;
  const extraPax = Math.max(0, pax - basePax);
  const extraCost = extraPax * pricePerExtraPax;

  const handleDecrease = () => {
    if (pax > minPax) {
      onPaxChange(pax - 1);
    }
  };

  const handleIncrease = () => {
    if (pax < maxPax) {
      onPaxChange(pax + 1);
    }
  };

  return (
    <div className="bg-secondary/30 p-8 rounded-xl border border-secondary">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="flex items-center gap-3">
          <Users className="h-7 w-7 text-accent" />
          <div>
            <h3 className="font-bold text-lg">Number of People</h3>
            <p className="text-sm text-muted-foreground">How many will be coming?</p>
          </div>
        </div>
        <div className="flex items-center gap-4 justify-center bg-background/50 p-4 rounded-xl">
          <Button
            variant="outline"
            size="icon"
            onClick={handleDecrease}
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
            onClick={handleIncrease}
            disabled={pax >= maxPax}
            className="h-12 w-12 rounded-full hover:scale-110 transition-all duration-300 disabled:opacity-30"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-background/50 rounded-lg space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-green-500">✓</span>
          <span>1-4 pax included in package price</span>
        </div>
        {extraPax > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-accent font-bold text-lg">+</span>
            <span className="font-semibold text-accent">
              {extraPax} extra pax = +RM{extraCost}
            </span>
          </div>
        )}
        <div className="text-xs text-muted-foreground pt-1 border-t border-secondary/30 mt-2">
          Maximum {maxPax} people per session
        </div>
      </div>
    </div>
  );
};

export default PaxCounter;
