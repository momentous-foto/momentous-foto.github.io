import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingStepsProps {
  currentStep: number;
  steps: { number: number; title: string }[];
}

const BookingSteps = ({ currentStep, steps }: BookingStepsProps) => {
  return (
    <div className="mb-8 px-2">
      <div className="flex items-center justify-center overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-shrink-0">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 font-semibold text-sm md:text-base transition-all duration-300",
                  currentStep > step.number
                    ? "bg-accent border-accent text-accent-foreground"
                    : currentStep === step.number
                    ? "border-accent text-accent bg-background"
                    : "border-muted text-muted-foreground"
                )}
              >
                {currentStep > step.number ? (
                  <Check className="h-5 w-5 md:h-6 md:w-6" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs md:text-sm font-medium text-center max-w-[80px] sm:max-w-none",
                  currentStep >= step.number
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-8 sm:w-12 md:w-20 h-0.5 mx-2 transition-colors duration-300 flex-shrink-0",
                  currentStep > step.number ? "bg-accent" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingSteps;