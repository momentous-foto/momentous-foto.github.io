import { useEffect, useMemo, useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Package } from "@/types/booking";
import { getNextSlayPriceChange, isClearanceSale } from "@/data/packages";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PackageCardProps {
  pkg: Package;
  featured?: boolean;
}

const PackageCard = ({ pkg, featured = false }: PackageCardProps) => {
  const isSlay = pkg.id === "slay";
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (!isSlay) return;

    let intervalId: number;

    const tick = () => {
      const current = new Date();
      const nextChange = getNextSlayPriceChange(current);
      setNow(current);

      // If no more price changes, clear the interval
      if (!nextChange && intervalId) {
        window.clearInterval(intervalId);
      }
    };

    tick(); // Initial tick
    intervalId = window.setInterval(tick, 1000);

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [isSlay]);

  const nextChange = useMemo(() => (isSlay ? getNextSlayPriceChange(now) : null), [isSlay, now]);
  const isOnClearanceSale = useMemo(() => (isSlay ? isClearanceSale(now) : false), [isSlay, now]);
  
  const countdown = useMemo(() => {
    if (!isSlay || !nextChange) return null;
    
    const remainingMs = nextChange.getTime() - now.getTime();
    if (remainingMs <= 0) return null;

    const totalSeconds = Math.ceil(remainingMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, [nextChange, now]);

  const cutoffLabel = useMemo(() => {
    if (!isSlay || !nextChange) return null;
    
    return nextChange.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  }, [isSlay, nextChange]);

  return (
    <Card
      className={cn(
        "relative flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        featured && "border-accent shadow-md"
      )}
    >
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl">{pkg.name}</CardTitle>
        <CardDescription className="mt-2">{pkg.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="text-center mb-6">
          {isSlay && countdown && isOnClearanceSale && (
            <div className="mb-3">
              <span className="inline-flex items-center rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-600">
                🔥 Clearance Sale ends in {countdown}
              </span>
            </div>
          )}
          {pkg.isCustom ? (
            <div className="text-3xl font-bold">Custom Quote</div>
          ) : (
            <>
              {pkg.originalPrice && (
                <div className="text-muted-foreground">
                  <span className="text-lg line-through">RM{pkg.originalPrice}</span>
                  <span className="ml-2 text-xs text-red-600 font-semibold">SAVE RM{pkg.originalPrice - pkg.price}</span>
                </div>
              )}
              <div>
                <span className="text-sm text-muted-foreground">RM</span>
                <span className="text-4xl font-bold">{pkg.price}</span>
                <span className="text-muted-foreground ml-1">/ session</span>
              </div>
            </>
          )}
          {isSlay && isOnClearanceSale && (
            <p className="mt-2 text-xs font-semibold text-red-600">Limited time offer until 27 Feb 2026!</p>
          )}
        </div>

        <ul className="space-y-3">
          {pkg.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-sm">
              <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pt-4">
        <Button
          asChild
          className="w-full group"
          variant={featured ? "default" : "outline"}
        >
          <Link to={`/book?package=${pkg.id}`}>
            {pkg.isCustom ? "Get a Quote" : "Select Package"}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PackageCard;