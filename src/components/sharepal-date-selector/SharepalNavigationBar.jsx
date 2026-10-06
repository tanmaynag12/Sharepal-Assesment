import { CalendarClock, ChevronDown, MapPin, Search, ShoppingCart, UserRound } from "lucide-react";
import { format } from "date-fns";
import { Button } from "../ui/button";

export function SharepalNavigationBar({ deliveryDate, pickupDate, onSelectDates }) {
  return (
    <header className="sharepal-navigation">
      <nav className="sharepal-navigation-inner" aria-label="Main navigation">
        <a className="sharepal-navigation-logo" href="/" aria-label="SharePal home">
          <img src="/favicon.svg" alt="SharePal" width="160" height="67" />
        </a>
        <div className="sharepal-navigation-dates">
          <Button variant="ghost" className="sharepal-navigation-city" aria-label="City: Bangalore">
            <MapPin /><span>Bangalore</span><ChevronDown />
          </Button>
          <Button variant="ghost" className="sharepal-navigation-date" onClick={onSelectDates}>
            <CalendarClock /><span>Delivery Date: {format(deliveryDate, "do MMM")}</span>
          </Button>
          <Button variant="ghost" className="sharepal-navigation-date" onClick={onSelectDates}>
            <CalendarClock /><span>Pickup Date{pickupDate ? `: ${format(pickupDate, "do MMM")}` : ""}</span>
          </Button>
          <Button className="sharepal-navigation-select" onClick={onSelectDates}>
            <CalendarClock /><span>Select</span>
          </Button>
        </div>
        <div className="sharepal-navigation-actions">
          <Button variant="ghost" size="icon" className="sharepal-navigation-icon" aria-label="Search" title="Search"><Search /></Button>
          <Button variant="ghost" size="icon" className="sharepal-navigation-icon" aria-label="Shopping cart" title="Shopping cart"><ShoppingCart /></Button>
          <Button variant="ghost" className="sharepal-navigation-login" aria-label="Log in">
            <span className="sharepal-navigation-user"><UserRound /></span><span>Hi, Login</span>
          </Button>
        </div>
      </nav>
    </header>
  );
}