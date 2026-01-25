import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Package } from "@/types/booking";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PackageCardProps {
  pkg: Package;
  featured?: boolean;
}

const PackageCard = ({ pkg, featured = false }: PackageCardProps) => {
  return (
    <Card
      className={cn(
        "relative flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        featured && "border-accent shadow-md"
      )}
    >
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
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
          {pkg.isCustom ? (
            <div className="text-3xl font-bold">Custom Quote</div>
          ) : (
            <>
              <span className="text-sm text-muted-foreground">RM</span>
              <span className="text-4xl font-bold">{pkg.price}</span>
              <span className="text-muted-foreground ml-1">/ session</span>
            </>
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