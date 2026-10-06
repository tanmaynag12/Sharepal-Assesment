import { useEffect, useState } from "react";
import {
  CalendarClock,
  ChevronDown,
  ArrowRight,
  Camera,
  Landmark,
  MapPin,
  Search,
  ShoppingCart,
  Star,
  UserRound,
  X,
} from "lucide-react";
import { format } from "date-fns";
import sharepalLogo from "../../assets/sharepal-navigation-logo.png";
import productData from "../../data/gammingproducts.json";
import { SharepalLoginModal } from "./SharepalLoginModal";

const popularCities = [
  "Delhi",
  "Mumbai",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Bangalore",
];
const otherCities = ["Faridabad", "Kolkata", "Gurgaon", "Noida", "Ghaziabad"];
const products = productData.products || [];

export function SharepalNavigationBar({
  navigationHidden,
  deliveryDate,
  pickupDate,
  onSelectDates,
  onProductSelect,
  loginOpen,
  onLoginOpenChange,
}) {
  const [city, setCity] = useState("Bangalore");
  const [citySelectorOpen, setCitySelectorOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllSearchResults, setShowAllSearchResults] = useState(false);

  useEffect(() => {
    if (!citySelectorOpen) return;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setCitySelectorOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [citySelectorOpen]);

  useEffect(() => {
    if (!searchOpen && !accountOpen && !loginOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setAccountOpen(false);
        onLoginOpenChange(false);
        setShowAllSearchResults(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [searchOpen, accountOpen, loginOpen, onLoginOpenChange]);

  const chooseCity = (nextCity) => {
    setCity(nextCity);
    setCitySelectorOpen(false);
  };

  return (
    <>
      <header
        className={`sharepal-navigation${
          navigationHidden ? " sharepal-navigation-hidden" : ""
        }`}
      >
        <nav className="sharepal-navigation-inner" aria-label="Main navigation">
          <a
            className="sharepal-navigation-logo"
            href="/"
            aria-label="SharePal home"
          >
            <img
              src={sharepalLogo}
              alt="SharePal"
              width="160"
              height="67"
              onError={(event) => {
                event.currentTarget.src = "/favicon.svg";
              }}
            />
          </a>

          <div className="sharepal-navigation-dates">
            <button
              type="button"
              className="sharepal-navigation-city"
              aria-label={`City: ${city}`}
              onClick={() => setCitySelectorOpen(true)}
            >
              <MapPin size={16} />
              <span>{city}</span>
              <ChevronDown size={14} />
            </button>

            <button
              type="button"
              className="sharepal-navigation-date"
              onClick={onSelectDates}
            >
              <CalendarClock size={16} />
              <span>Delivery Date: {format(deliveryDate, "do MMM")}</span>
            </button>

            <button
              type="button"
              className="sharepal-navigation-date"
              onClick={onSelectDates}
            >
              <CalendarClock size={16} />
              <span>
                Pickup Date
                {pickupDate ? `: ${format(pickupDate, "do MMM")}` : ""}
              </span>
            </button>

            <button
              type="button"
              className="sharepal-navigation-select"
              onClick={onSelectDates}
            >
              <CalendarClock size={16} />
              <span>Select</span>
            </button>
          </div>

          <div className="sharepal-navigation-actions">
            <button
              type="button"
              className="sharepal-navigation-icon"
              aria-label="Search"
              title="Search"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={22} />
            </button>
            <button
              type="button"
              className="sharepal-navigation-icon"
              aria-label="Shopping cart"
              title="Shopping cart"
            >
              <ShoppingCart size={22} />
            </button>
            <button
              type="button"
              className="sharepal-navigation-login"
              aria-label="Log in"
              onClick={() => setAccountOpen(true)}
            >
              <span className="sharepal-navigation-user">
                <UserRound size={20} />
              </span>
              <span>Hi, Pal</span>
            </button>
          </div>
        </nav>
      </header>

      {/* City selector modal */}
      {citySelectorOpen && (
        <div
          className="sharepal-city-overlay"
          onMouseDown={() => setCitySelectorOpen(false)}
        >
          <section
            className="sharepal-city-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="city-dialog-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="sharepal-city-close"
              aria-label="Close city selector"
              onClick={() => setCitySelectorOpen(false)}
            >
              <X size={20} />
            </button>

            <h2 id="city-dialog-title">Select Your City</h2>

            <div className="sharepal-city-divider">
              <span>Popular Cities</span>
            </div>
            <div className="sharepal-popular-cities">
              {popularCities.map((popularCity) => (
                <button
                  type="button"
                  key={popularCity}
                  className={
                    popularCity === city
                      ? "sharepal-popular-city sharepal-city-selected"
                      : "sharepal-popular-city"
                  }
                  onClick={() => chooseCity(popularCity)}
                >
                  <Landmark size={32} />
                  <span>{popularCity}</span>
                </button>
              ))}
            </div>

            <div className="sharepal-city-divider">
              <span>Other Cities</span>
            </div>
            <div className="sharepal-other-cities">
              {otherCities.map((otherCity) => (
                <button
                  type="button"
                  key={otherCity}
                  className="sharepal-other-city-btn"
                  onClick={() => chooseCity(otherCity)}
                >
                  {otherCity}
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

      {searchOpen && (
        <div
          className="sharepal-search-overlay"
          onMouseDown={() => {
            setSearchOpen(false);
            setShowAllSearchResults(false);
          }}
        >
          <section
            className="sharepal-search-dialog"
            style={{
              position: "fixed",
              inset: "0 0 0 auto",
              width: "610px",
              maxWidth: "610px",
              height: "100vh",
              margin: 0,
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-dialog-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="sharepal-search-header">
              <button
                type="button"
                className="sharepal-search-close"
                aria-label="Close product search"
                onClick={() => {
                  setSearchOpen(false);
                  setShowAllSearchResults(false);
                }}
              >
                <X />
              </button>
              <h2 id="search-dialog-title">Search Products</h2>
            </div>

            <>
                <form
                  className="sharepal-search-input-wrap"
                  onSubmit={(event) => event.preventDefault()}
                >
                  <Search size={20} />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search for products"
                    aria-label="Search for products"
                  />
                  <ArrowRight size={20} />
                </form>

                <div className="sharepal-search-results">
                  <div className="sharepal-search-section-heading">
                    <p className="sharepal-search-section-title">
                      {searchQuery.trim() ? "Search results" : "Popular Items"}
                    </p>
                    {!searchQuery.trim() && (
                      <button
                        type="button"
                        className="sharepal-search-view-all"
                        onClick={() => setShowAllSearchResults(true)}
                      >
                        View all
                      </button>
                    )}
                  </div>
                  <div className="sharepal-search-product-list">
                    {products
                      .filter((product) =>
                        product.name
                          .toLowerCase()
                          .includes(searchQuery.trim().toLowerCase()),
                      )
                      .slice(0, showAllSearchResults ? products.length : 6)
                      .map((product) => (
                        <button
                          type="button"
                          className="sharepal-search-product"
                          key={product.id}
                          onClick={() => {
                            onProductSelect?.(product);
                            setSearchOpen(false);
                            setShowAllSearchResults(false);
                          }}
                        >
                          <img
                            src={product.image}
                            alt=""
                            onError={(event) => {
                              event.currentTarget.src = "/favicon.svg";
                            }}
                          />
                          <span className="sharepal-search-product-copy">
                            <strong>{product.name}</strong>
                            <span>₹{product.per_day_rent}/day</span>
                            <span className="sharepal-search-booked">
                              <Star size={12} fill="currentColor" />
                              {product.rating.toFixed(1)} ·{" "}
                              {product.booked_count}+ booked
                            </span>
                          </span>
                        </button>
                      ))}
                  </div>
                  {products.filter((product) =>
                    product.name
                      .toLowerCase()
                      .includes(searchQuery.trim().toLowerCase()),
                  ).length === 0 && (
                    <p className="sharepal-search-empty">
                      No matching products found.
                    </p>
                  )}
                </div>
            </>
          </section>
        </div>
      )}

      {accountOpen && (
        <div
          className="sharepal-account-overlay"
          onMouseDown={() => setAccountOpen(false)}
        >
          <section
            className="sharepal-account-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="account-dialog-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="sharepal-account-header">
              <h2 id="account-dialog-title">Hi, Pal!</h2>
              <button
                type="button"
                className="sharepal-account-login"
                onClick={() => {
                  setAccountOpen(false);
                  onLoginOpenChange(true);
                }}
              >
                Log In <ArrowRight size={18} />
              </button>
            </div>

            <div className="sharepal-account-coupon">
              <span className="sharepal-account-coupon-icon">
                🎉
              </span>
              <div>
                <p>
                  <strong>Use code SHAREPAL & get 10%</strong> on orders above
                  ₹1500.
                </p>
                <p className="sharepal-account-coupon-max">
                  Maximum discount: ₹300
                </p>
                <p className="sharepal-account-coupon-code">
                  Use Coupon - SHAREPAL
                </p>
              </div>
            </div>

            <div className="sharepal-account-spacer" />

            <button type="button" className="sharepal-account-partner">
              <span className="sharepal-account-partner-icon">
                <Camera size={36} />
              </span>
              <span>
                <strong>ASSET PARTNER PROGRAM</strong>
                <b>Sponsor an asset. Earn every month.</b>
                <small>Monthly payouts to your bank — plus discounts on every rental.</small>
              </span>
              <ArrowRight size={22} />
            </button>
          </section>
        </div>
      )}

      <SharepalLoginModal
        open={loginOpen}
        onClose={() => onLoginOpenChange(false)}
      />
    </>
  );
}
