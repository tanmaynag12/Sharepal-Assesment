import { useState } from "react";
import { addMonths, format, subMonths } from "date-fns";
import { CalendarDays, CirclePercent, Info, X } from "lucide-react";
import { SharepalNavigationBar } from "./components/sharepal-date-selector/SharepalNavigationBar";
import { SharepalCategoryTabs } from "./components/sharepal-date-selector/SharepalCategoryTabs";
import { SharepalGamingProductGrid } from "./components/sharepal-date-selector/SharepalGamingProductGrid";
import { SharepalDateField } from "./components/sharepal-date-selector/SharepalDateField";
import { SharepalRentalCalendar } from "./components/sharepal-date-selector/SharepalRentalCalendar";
import { Button } from "./components/ui/button";
import {
  getChargeablePeriod,
  getRentalDays,
  isValidPickup,
} from "./lib/rental-dates";

const initialDeliveryDate = new Date(2026, 9, 17);

export default function App() {
  const [open, setOpen] = useState(true);
  const [deliveryDate, setDeliveryDate] = useState(initialDeliveryDate);
  const [pickupDate, setPickupDate] = useState();
  const [activeField, setActiveField] = useState("pickup");
  const [month, setMonth] = useState(new Date(2026, 9, 1));
  const [gamingSelection, setGamingSelection] = useState("All");
  const [targetProductId, setTargetProductId] = useState(null);

  const rentalDays = getRentalDays(deliveryDate, pickupDate);

  const chooseDate = (date) => {
    if (activeField === "delivery") {
      setDeliveryDate(date);
      if (pickupDate && !isValidPickup(date, pickupDate))
        setPickupDate(undefined);
      setActiveField("pickup");
      return;
    }
    if (isValidPickup(deliveryDate, date)) {
      setPickupDate(date);
    } else {
      setDeliveryDate(date);
      setPickupDate(undefined);
    }
  };

  return (
    <main className="min-h-screen bg-background font-sans text-foreground">
      {/* 1. Navigation Bar with city dropdown */}
      <SharepalNavigationBar
        deliveryDate={deliveryDate}
        pickupDate={pickupDate}
        onSelectDates={() => setOpen(true)}
        onProductSelect={(product) => {
          setGamingSelection("All");
          setTargetProductId(product.id);
        }}
      />

      {/* 2. Category tabs with dropdowns */}
      <SharepalCategoryTabs
        gamingSelection={gamingSelection}
        onGamingSelectionChange={setGamingSelection}
      />

      {/* 3. Filtered gaming products */}
      <SharepalGamingProductGrid
        selection={gamingSelection}
        onSelectionChange={setGamingSelection}
        targetProductId={targetProductId}
      />

      {/* 4. Calendar dialog */}
      {open && (
        <div className="fixed inset-0 z-20 grid place-items-center overflow-y-auto bg-overlay/65 p-3 backdrop-blur-[3px] sm:p-7">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="date-dialog-title"
            className="relative my-auto w-full max-w-[1280px] rounded-[26px] bg-panel p-6 shadow-modal sm:p-8 lg:p-7"
          >
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close date selector"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full text-foreground hover:bg-muted sm:right-6 sm:top-5"
            >
              <X />
            </Button>

            <div className="grid gap-7 lg:grid-cols-[472px_1fr] lg:gap-6">
              <div className="flex flex-col">
                <h1
                  id="date-dialog-title"
                  className="mb-5 text-[25px] font-bold leading-none sm:text-[27px]"
                >
                  Select your Dates
                </h1>

                <div className="grid gap-3 sm:grid-cols-2">
                  <SharepalDateField
                    label="Delivery Date"
                    value={format(deliveryDate, "MMM d, yyyy")}
                    active={activeField === "delivery"}
                    onClick={() => setActiveField("delivery")}
                  />
                  <SharepalDateField
                    label="Pickup Date"
                    value={
                      pickupDate ? format(pickupDate, "MMM d, yyyy") : undefined
                    }
                    active={activeField === "pickup"}
                    onClick={() => setActiveField("pickup")}
                  />
                </div>

                <div className="mt-5 flex gap-3 rounded-[17px] bg-notice px-4 py-3 text-[13px] font-semibold leading-[1.3] text-notice-foreground">
                  <Info className="mt-0.5 size-5 shrink-0 fill-info text-info-foreground" />
                  <p>
                    <strong>Same-day delivery between 5PM and 11PM</strong> For
                    future dates, you can select a specific time slot available
                    at checkout. We pickup between <strong>9AM to 1PM.</strong>
                  </p>
                </div>

                <p className="mb-2 mt-5 text-sm font-medium">
                  Your Rental Period:
                </p>
                <div className="flex min-h-[80px] items-center gap-2 rounded-[16px] border border-border bg-card px-5 py-3 shadow-field">
                  <div className="flex min-w-[110px] shrink-0 items-baseline gap-1">
                    <span
                      data-testid="rental-days"
                      className="text-[42px] font-bold leading-none"
                    >
                      {String(rentalDays).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {rentalDays === 1 ? "Day" : "Days"}
                    </span>
                  </div>
                  <div className="ml-2 border-l border-border pl-5 text-[13px]">
                    <p className="mb-1.5 font-medium">Chargeable Period:</p>
                    <p className="flex items-center gap-2 font-semibold">
                      <CalendarDays className="size-4" />
                      {getChargeablePeriod(deliveryDate, pickupDate)}
                    </p>
                  </div>
                </div>

                <div className="relative mt-5 overflow-hidden rounded-[12px] bg-promo px-5 py-3 text-promo-foreground">
                  <CirclePercent
                    className="absolute -left-1 -top-1 size-11"
                    strokeWidth={2.6}
                  />
                  <h2 className="pl-8 text-[25px] font-bold italic leading-tight">
                    Save more with us!
                  </h2>
                  <p className="mt-4 text-xs font-semibold leading-[1.3] text-promo-copy">
                    Longer rental periods mean bigger savings—enjoy discounts of
                    up to 12%.
                    <br />
                    We don’t charge you for delivery and pickup days!
                  </p>
                </div>

                <div className="mt-5">
                  <Button
                    className="h-12 w-full rounded-[14px] bg-action text-base font-semibold text-action-foreground shadow-none hover:bg-action-hover"
                    disabled={!pickupDate || rentalDays === 0}
                    onClick={() => setOpen(false)}
                  >
                    Continue
                  </Button>
                </div>
              </div>

              <div className="rounded-[22px] border border-border bg-card p-4 sm:p-5">
                <SharepalRentalCalendar
                  month={month}
                  deliveryDate={deliveryDate}
                  pickupDate={pickupDate}
                  activeField={activeField}
                  onSelect={chooseDate}
                  onPrevious={() => setMonth((prev) => subMonths(prev, 1))}
                  onNext={() => setMonth((prev) => addMonths(prev, 1))}
                />
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
