import { Button } from "@/components/ui/button";
import { TimeSlot } from "@/types/booking";
import { cn } from "@/lib/utils";
import { availableDates } from "@/data/packages";
import { format, isSameDay } from "date-fns";
import { CalendarDays } from "lucide-react";

interface DateTimePickerProps {
  selectedDate: Date | undefined;
  selectedTime: string | null;
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
  timeSlots: TimeSlot[];
}

const DateTimePicker = ({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  timeSlots,
}: DateTimePickerProps) => {
  // Group dates by month
  const februaryDates = availableDates.filter(d => d.getMonth() === 1);
  const marchDates = availableDates.filter(d => d.getMonth() === 2);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="bg-secondary/30 p-6 rounded-xl border border-secondary">
        <h3 className="font-bold text-lg mb-5 flex items-center gap-2">
          <CalendarDays className="h-6 w-6 text-accent" />
          Select Date
        </h3>
        
        {/* February dates */}
        <div className="mb-6">
          <p className="text-sm font-bold text-accent mb-3 uppercase tracking-wider">
            February 2026
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
            {februaryDates.map((date) => (
              <Button
                key={date.toISOString()}
                variant="outline"
                onClick={() => onDateChange(date)}
                className={cn(
                  "h-16 flex flex-col transition-all duration-300 hover:scale-105",
                  selectedDate && isSameDay(selectedDate, date)
                    ? "bg-accent text-primary-foreground border-accent shadow-md scale-105"
                    : "bg-background/50 hover:bg-accent/10"
                )}
              >
                <span className="text-xl font-bold">{format(date, "d")}</span>
                <span className="text-[10px] opacity-80 uppercase font-medium">{format(date, "EEE")}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* March dates */}
        <div>
          <p className="text-sm font-bold text-accent mb-3 uppercase tracking-wider">
            March 2026
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
            {marchDates.map((date) => (
              <Button
                key={date.toISOString()}
                variant="outline"
                onClick={() => onDateChange(date)}
                className={cn(
                  "h-16 flex flex-col transition-all duration-300 hover:scale-105",
                  selectedDate && isSameDay(selectedDate, date)
                    ? "bg-accent text-primary-foreground border-accent shadow-md scale-105"
                    : "bg-background/50 hover:bg-accent/10"
                )}
              >
                <span className="text-xl font-bold">{format(date, "d")}</span>
                <span className="text-[10px] opacity-80 uppercase font-medium">{format(date, "EEE")}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-secondary/30 p-6 rounded-xl border border-secondary">
        <h3 className="font-bold text-lg mb-5">Select Time Slot</h3>
        {selectedDate ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {timeSlots.map((slot) => (
              <Button
                key={slot.time}
                variant="outline"
                disabled={!slot.available}
                onClick={() => onTimeChange(slot.time)}
                className={cn(
                  "h-11 sm:h-14 text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 relative",
                  selectedTime === slot.time
                    ? "bg-accent text-primary-foreground border-accent shadow-md scale-105"
                    : slot.status === "pending"
                    ? "bg-orange-500/20 border-orange-500/50 text-orange-700 dark:text-orange-400 cursor-not-allowed hover:scale-100"
                    : slot.status === "booked"
                    ? "bg-muted/50 text-muted-foreground opacity-50 cursor-not-allowed hover:scale-100"
                    : "bg-background/50 hover:bg-accent/10"
                )}
              >
                <div className="flex flex-col items-center gap-0.5">
                  <span>{slot.time}</span>
                  {slot.status === "pending" && (
                    <span className="text-[9px] sm:text-[10px] font-medium">PENDING</span>
                  )}
                  {slot.status === "booked" && (
                    <span className="text-[9px] sm:text-[10px] font-medium">SOLD OUT</span>
                  )}
                </div>
              </Button>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">Please select a date first</p>
          </div>
        )}
        {selectedDate && (
          <div className="mt-4 space-y-1 text-xs text-muted-foreground">
            <p>🟠 <span className="text-orange-600 dark:text-orange-400 font-medium">PENDING</span> = Booked but payment not confirmed</p>
            <p>⚫ <span className="font-medium">SOLD OUT</span> = Fully booked & paid</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateTimePicker;