import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SharepalDateField({
  label,
  value,
  active,
  onClick,
}: {
  label: string;
  value: string | undefined;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold">
        {label} <span className="text-required">*</span>
      </p>
      <Button
        type="button"
        variant="outline"
        onClick={onClick}
        className={`h-11 w-full justify-start rounded-[15px] border bg-card px-3 text-sm shadow-field hover:bg-card ${active ? "border-ring" : "border-border"}`}
      >
        <CalendarDays className="size-[17px]" />
        <span
          className={
            value
              ? "font-semibold text-foreground"
              : "font-medium text-placeholder"
          }
        >
          {value ?? "Select pickup date"}
        </span>
      </Button>
    </div>
  );
}
