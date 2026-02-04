import { Button } from "@/components/ui/button";
import { TimeSlot } from "@/types/booking";
import { cn } from "@/lib/utils";
import { availableDates } from "@/data/packages";
import { format, isSameDay } from "date-fns";
import { CalendarDays } from "lucide-react";

interface DateTimePickerProps {
  selectedDate: Date | undefined;
  selectedTimeSlots: string[];
  onDateChange: (date: Date | undefined) => void;
  onTimeSlotsChange: (timeSlots: string[]) => void;
  timeSlots: TimeSlot[];
}

const DateTimePicker = ({
  selectedDate,
  selectedTimeSlots,
  onDateChange,
  onTimeSlotsChange,
  timeSlots,
}: DateTimePickerProps) => {
  
  const handleTimeSlotClick = (time: string) => {
    if (selectedTimeSlots.includes(time)) {
      // Remove if already selected
      onTimeSlotsChange(selectedTimeSlots.filter(t => t !== time));
    } else {
      // Add to selection
      onTimeSlotsChange([...selectedTimeSlots, time]);
    }
  };
  // Group dates by month
  const februaryDates = availableDates.filter(d => d.getMonth() === 1);
  const marchDates = availableDates.filter(d => d.getMonth() === 2);

  return (
    <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
      <div className="bg-secondary/30 p-4 sm:p-6 rounded-xl border border-secondary">
        <h3 className="font-bold text-base sm:text-lg mb-4 flex items-center gap-2">
          <CalendarDays className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
          Select Date
        </h3>
        
        {/* February dates */}
        <div className="mb-5">
          <p className="text-xs sm:text-sm font-bold text-accent mb-2 uppercase tracking-wider">
            February 2026
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
            {februaryDates.map((date) => (
              <Button
                key={date.toISOString()}
                variant="outline"
                onClick={() => onDateChange(date)}
                className={cn(
                  "h-14 sm:h-16 flex flex-col transition-all duration-300 hover:scale-105 px-2",
                  selectedDate && isSameDay(selectedDate, date)
                    ? "bg-accent text-primary-foreground border-accent shadow-md scale-105"
                    : "bg-background/50 hover:bg-accent/10"
                )}
              >
                <span className="text-lg sm:text-xl font-bold">{format(date, "d")}</span>
                <span className="text-[9px] sm:text-[10px] opacity-80 uppercase font-medium">{format(date, "EEE")}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* March dates */}
        <div>
          <p className="text-xs sm:text-sm font-bold text-accent mb-2 uppercase tracking-wider">
            March 2026
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
            {marchDates.map((date) => (
              <Button
                key={date.toISOString()}
                variant="outline"
                onClick={() => onDateChange(date)}
                className={cn(
                  "h-14 sm:h-16 flex flex-col transition-all duration-300 hover:scale-105 px-2",
                  selectedDate && isSameDay(selectedDate, date)
                    ? "bg-accent text-primary-foreground border-accent shadow-md scale-105"
                    : "bg-background/50 hover:bg-accent/10"
                )}
              >
                <span className="text-lg sm:text-xl font-bold">{format(date, "d")}</span>
                <span className="text-[9px] sm:text-[10px] opacity-80 uppercase font-medium">{format(date, "EEE")}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-secondary/30 p-4 sm:p-6 rounded-xl border border-secondary">
        <div className="flex items-center justify-between mb-4 gap-2">
          <h3 className="font-bold text-base sm:text-lg">Select Time Slot(s)</h3>
          {selectedTimeSlots.length > 0 && (
            <span className="text-xs sm:text-sm font-semibold text-accent whitespace-nowrap">
              {selectedTimeSlots.length} slot{selectedTimeSlots.length > 1 ? 's' : ''}
            </span>
          )}
        </div>
        {selectedDate ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
            {timeSlots.map((slot) => (
              <Button
                key={slot.time}
                variant="outline"
                disabled={!slot.available}
                onClick={() => handleTimeSlotClick(slot.time)}
                className={cn(
                  "h-auto py-2 px-2 text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 relative",
                  selectedTimeSlots.includes(slot.time)
                    ? "bg-accent text-primary-foreground border-accent shadow-md scale-105 ring-2 ring-accent ring-offset-1"
                    : slot.status === "pending"
                    ? "bg-orange-500/20 border-orange-500/50 text-orange-700 dark:text-orange-400 cursor-not-allowed hover:scale-100"
                    : slot.status === "booked"
                    ? "bg-muted/50 text-muted-foreground opacity-50 cursor-not-allowed hover:scale-100"
                    : "bg-background/50 hover:bg-accent/10"
                )}
              >
                <div className="flex flex-col items-center gap-0.5 leading-tight">
                  <span className="text-[11px] sm:text-xs">{slot.time}</span>
                  {slot.status === "pending" && (
                    <span className="text-[8px] sm:text-[9px] font-medium">PENDING</span>
                  )}
                  {slot.status === "booked" && (
                    <span className="text-[8px] sm:text-[9px] font-medium">SOLD OUT</span>
                  )}
                </div>
              </Button>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-40 sm:h-48 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">Please select a date first</p>
          </div>
        )}
        {selectedDate && (
          <div className="mt-3 sm:mt-4 space-y-1 text-[10px] sm:text-xs text-muted-foreground leading-relaxed">
            <p className="font-semibold text-accent">💡 Click multiple slots for back-to-back sessions</p>
            <p>🟠 <span className="text-orange-600 dark:text-orange-400 font-medium">PENDING</span> = Payment pending</p>
            <p>⚫ <span className="font-medium">SOLD OUT</span> = Fully booked</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateTimePicker;