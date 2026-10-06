import { differenceInCalendarDays, format } from "date-fns";

export function getRentalDays(deliveryDate?: Date, pickupDate?: Date) {
  if (!deliveryDate || !pickupDate) return 0;
  return Math.max(0, differenceInCalendarDays(pickupDate, deliveryDate) - 1);
}

export function getChargeablePeriod(deliveryDate?: Date, pickupDate?: Date) {
  const days = getRentalDays(deliveryDate, pickupDate);
  if (!deliveryDate || !pickupDate || days === 0) return "--";

  const start = new Date(deliveryDate);
  start.setDate(start.getDate() + 1);
  const end = new Date(pickupDate);
  end.setDate(end.getDate() - 1);

  return `${format(start, "do MMM")} - ${format(end, "do MMM")}`;
}
export const MIN_GAP_DAYS = 2;

export function isValidPickup(deliveryDate: Date, pickupDate: Date) {
  return differenceInCalendarDays(pickupDate, deliveryDate) >= MIN_GAP_DAYS;
}
