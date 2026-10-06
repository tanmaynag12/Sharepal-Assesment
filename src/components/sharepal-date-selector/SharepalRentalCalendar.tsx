import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function SharepalRentalCalendar({
  month,
  deliveryDate,
  pickupDate,
  onSelect,
  onPrevious,
  onNext,
}: {
  month: Date;
  deliveryDate: Date;
  pickupDate: Date | undefined;
  onSelect: (date: Date) => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div className="relative mx-auto min-w-[610px]">
      <Button
        variant="outline"
        size="icon"
        aria-label="Previous month"
        onClick={onPrevious}
        className="absolute left-0 top-0 z-10 size-9 rounded-full text-muted-foreground shadow-none"
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="outline"
        size="icon"
        aria-label="Next month"
        onClick={onNext}
        className="absolute right-0 top-0 z-10 size-9 rounded-full text-muted-foreground shadow-none"
      >
        <ChevronRight />
      </Button>
      <div className="grid grid-cols-2 gap-6">
        {[month, addMonths(month, 1)].map((displayMonth) => (
          <SharepalCalendarMonth
            key={displayMonth.toISOString()}
            month={displayMonth}
            deliveryDate={deliveryDate}
            pickupDate={pickupDate}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

function SharepalCalendarMonth({
  month,
  deliveryDate,
  pickupDate,
  onSelect,
}: {
  month: Date;
  deliveryDate: Date;
  pickupDate: Date | undefined;
  onSelect: (date: Date) => void;
}) {
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  });
  while (days.length < 42) {
    const lastDay = days.at(-1);
    if (!lastDay) break;
    const nextDay = new Date(lastDay);
    nextDay.setDate(nextDay.getDate() + 1);
    days.push(nextDay);
  }
  const visibleDays = days.slice(0, 42);

  return (
    <div>
      <h2 className="flex h-10 items-center justify-center text-base font-semibold">
        {format(month, "MMMM yyyy")}
      </h2>
      <div className="grid grid-cols-7">
        {weekDays.map((day) => (
          <span
            key={day}
            className="grid h-9 place-items-center text-[13px] font-medium text-muted-foreground"
          >
            {day}
          </span>
        ))}
        {visibleDays.map((day) => {
          const start = isSameDay(day, deliveryDate);
          const end = pickupDate ? isSameDay(day, pickupDate) : false;
          const middle = pickupDate
            ? isAfter(day, deliveryDate) && isBefore(day, pickupDate)
            : false;
          const disabled = isBefore(day, startOfToday());
          const outside = !isSameMonth(day, month);
          const rangeClass =
            start || end
              ? "rounded-[7px] bg-range font-bold text-range-foreground"
              : middle
                ? "rounded-none bg-range-soft text-foreground"
                : "rounded-[7px] hover:bg-muted";
          return (
            <Button
              key={day.toISOString()}
              variant="ghost"
              aria-label={format(day, "EEEE, MMMM do, yyyy")}
              disabled={disabled}
              onClick={() => onSelect(day)}
              className={`h-[46px] min-w-0 rounded-none p-0 text-sm shadow-none disabled:opacity-35 ${rangeClass} ${outside && !start && !end && !middle ? "text-calendar-muted" : ""}`}
            >
              {format(day, "d")}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
