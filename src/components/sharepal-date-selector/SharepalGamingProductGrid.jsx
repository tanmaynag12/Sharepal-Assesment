import { useEffect, useState } from "react";
import { Gamepad2, Star } from "lucide-react";
import productData from "../../data/gammingproducts.json";
import ps5Image from "../../assets/ps5-category.webp";
import xboxImage from "../../assets/xbox-category.webp";
import vrImage from "../../assets/vr-category.webp";
import racingImage from "../../assets/racing-category.webp";
import screenImage from "../../assets/screen-category.webp";
import gtaImage from "../../assets/gta-category.webp";

const products = productData.products || [];
const sidebarCategories = [
  { id: "All", label: "All" },
  { id: "GTA VI", label: "GTA VI" },
  { id: "PS5 Console", label: "PS5 Console" },
  { id: "Xbox Console", label: "Xbox Console" },
  { id: "VR", label: "VR" },
  { id: "Racing Wheel", label: "Racing Wheel" },
  { id: "Big Screen Gaming", label: "Big Screen Gaming" },
];
const sidebarImages = {
  "PS5 Console": ps5Image,
  "Xbox Console": xboxImage,
  VR: vrImage,
  "Racing Wheel": racingImage,
  "Big Screen Gaming": screenImage,
  "GTA VI": gtaImage,
};

function formatBooked(count) {
  return count >= 1000
    ? `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1)}k+`
    : `${count}+`;
}

function matchesSelection(product, selection) {
  const name = (product.name || "").toLowerCase();
  if (selection === "All") return true;
  if (selection === "GTA VI")
    return name.includes("gta") || product.tag === "Trending";
  if (selection === "PS5 Console")
    return name.includes("ps5") || name.includes("playstation");
  if (selection === "Xbox Console") return name.includes("xbox");
  if (selection === "VR")
    return (
      name.includes("vr") ||
      name.includes("oculus") ||
      name.includes("meta quest")
    );
  if (selection === "Racing Wheel") return name.includes("racing wheel");
  if (selection === "Big Screen Gaming")
    return name.includes("projector") || name.includes("big screen");
  return true;
}

export function SharepalGamingProductGrid({
  selection = "All",
  onSelectionChange,
  targetProductId,
}) {
  const [waitlistedProducts, setWaitlistedProducts] = useState(() => new Set());
  const [openFaq, setOpenFaq] = useState();
  const [moreFaqOpen, setMoreFaqOpen] = useState(false);
  const [openMoreFaq, setOpenMoreFaq] = useState();
  const activeSelection = selection;
  const filteredProducts = products.filter((product) =>
    matchesSelection(product, activeSelection),
  );
  useEffect(() => {
    if (!targetProductId) return;
    const productCard = document.querySelector(
      `[data-product-id="${targetProductId}"]`,
    );
    productCard?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [targetProductId]);
  useEffect(() => {
    if (!moreFaqOpen) return;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMoreFaqOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [moreFaqOpen]);
  const heading =
    activeSelection === "All"
      ? "Gaming Gadgets On Rent"
      : `${sidebarCategories.find((category) => category.id === activeSelection)?.label} On Rent`;

  const joinWaitlist = (productId) => {
    setWaitlistedProducts((current) => {
      const next = new Set(current);
      next.add(productId);
      return next;
    });
  };

  const faqItems = [
    {
      question: "What is the storage capacity of the PS5?",
      answer: "The PS5 comes with an 825 GB custom SSD.",
    },
    {
      question: "Can I install my own games on this PS5?",
      answer: "Yes, you can install compatible games on the console during your rental.",
    },
    {
      question: "How can I rent from SharePal?",
      answer: "Choose your dates, select a product, and continue to checkout.",
    },
    {
      question:
        "If I rent multiple products, do I need to extend the rental duration for all or partial extension is possible?",
      answer: "You can extend individual products when extension availability permits.",
    },
    {
      question: "When does the rental start?",
      answer: "Your rental starts when the product is delivered to you.",
    },
  ];
  const moreFaqItems = [
    {
      question: "Can I connect the PS5 to any smart TV or monitor?",
      answer: "Yes, connect the PS5 to a compatible display using the included HDMI cable.",
    },
    {
      question: "What will be the condition of the products at the time of delivery?",
      answer: "Every product is checked, cleaned, and packed before it is delivered.",
    },
    {
      question: "What games can I play on the PS5 console?",
      answer: "You can play the games included with the selected product and compatible games you own.",
    },
    {
      question: "Do you provide controllers and cables with the console?",
      answer: "The included accessories are listed on each product card before you rent.",
    },
    {
      question: "Can I cancel my rental after placing an order?",
      answer: "Cancellation depends on the order status and the applicable rental policy.",
    },
    {
      question: "Do you deliver gaming products to my area?",
      answer: "Enter your city at the top of the page to check available delivery coverage.",
    },
  ];
  const testimonials = [
    {
      initials: "SB",
      name: "Satyaki",
      location: "Kolkata",
      category: "Gaming Gear",
      text: "I would recommend SharePal for anyone looking to rent gaming gear. On-time delivery and great product condition.",
    },
    {
      initials: "AS",
      name: "Afrana",
      location: "Bangalore",
      category: "Gaming Console",
      text: "Have used their services twice now. Quick responses, polite support, and hassle-free rentals.",
    },
    {
      initials: "KK",
      name: "Kanthikiran",
      location: "Bangalore",
      category: "Gaming Console",
      text: "An amazing service with quality gear delivered to the doorstep. The staff is extremely helpful.",
    },
    {
      initials: "AA",
      name: "Aarav",
      location: "Mumbai",
      category: "PS5 Rental",
      text: "The console arrived clean and ready to use. The entire rental experience was smooth and easy.",
    },
    {
      initials: "RM",
      name: "Riya",
      location: "Pune",
      category: "VR Gear",
      text: "Great range of gaming products and very simple booking process. Would definitely rent again.",
    },
  ];

  return (
    <>
      <div className="sharepal-main-container">
      <aside className="sharepal-sidebar" aria-label="Gaming categories">
        {sidebarCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`sharepal-sidebar-item ${activeSelection === category.id ? "active" : ""}`}
            aria-pressed={activeSelection === category.id}
            onClick={() => onSelectionChange?.(category.id)}
          >
            <span className="sharepal-sidebar-icon-box">
              {sidebarImages[category.id] ? (
                <img
                  src={sidebarImages[category.id]}
                  alt=""
                  onError={(event) => {
                    event.currentTarget.src = "/favicon.svg";
                  }}
                />
              ) : (
                <Gamepad2 aria-hidden="true" />
              )}
            </span>
            <span>{category.label}</span>
          </button>
        ))}
      </aside>

      <div className="sharepal-content-column">
        <section className="sharepal-hero-banner" aria-label="Gaming consoles">
          <div className="sharepal-hero-banner-image-left">
            <img
              src="https://images.sharepal.in/categories/gaming-consoles/ps5/ps5-with-100-games-with-1-controller/ps5-with-100-games-with-1-controller-on-rent-sharepal-1.webp"
              alt="PlayStation console"
            />
            </div>
          <div className="sharepal-hero-banner-center">
            <h1>Gaming Consoles</h1>
            <p>
              Rent the latest gaming gadgets from <strong>SharePal</strong> PS5,
              Xbox, Oculus VR, Racing Wheel on rent.
            </p>
            <div className="sharepal-hero-logos">
              <span>XBOX</span>
              <span>PS5</span>
              <span>Meta Quest</span>
            </div>
          </div>
          <div className="sharepal-hero-banner-image-right">
            <img
              src="https://images.sharepal.in/categories/gaming-consoles/ps5/ps5-with-ea-play-with-100-games-with-2-controllers/ps5-with-2-controllers-with-ea-play-with-ps-plus-deluxe-subscription-combo-on-rent-sharepal-1.webp"
              alt="Gaming controller combo"
            />
          </div>
        </section>

        <section
          className="sharepal-products"
          aria-labelledby="sharepal-products-title"
        >
          <div className="sharepal-products-header">
            <h2 id="sharepal-products-title">{heading}</h2>
            <p>
              Total items: <strong>{filteredProducts.length} items</strong>
            </p>
          </div>

          <div className="sharepal-products-grid">
            {filteredProducts.map((product) => (
          <article
          key={product.id}
          data-product-id={product.id}
          className={[
            "sharepal-product-card",
            product.out_of_stock && "sharepal-product-card-out",
          ]
            .filter(Boolean)
            .join(" ")}
          >
            {product.tag && (
              <span className="sharepal-product-tag">{product.tag}</span>
            )}

            <div className="sharepal-product-image">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.src = "/favicon.svg";
                }}
              />
              {product.out_of_stock && (
                <span className="sharepal-product-stock">Out of Stock</span>
              )}
            </div>

            <h3 className="sharepal-product-name">{product.name}</h3>

            <div className="sharepal-product-meta">
              {product.rating > 0 && (
                <span className="sharepal-product-rating">
                  <Star size={14} fill="currentColor" strokeWidth={0} />
                  {product.rating.toFixed(1)}
                </span>
              )}
              <span>{formatBooked(product.booked_count)} booked</span>
            </div>

            {product.out_of_stock && (
              <div className="sharepal-product-waitlist">
                <p>
                  We&apos;ll notify you when this product becomes available.
                </p>
                <div
                  className="sharepal-product-waitlist-track"
                  aria-label="Availability updates in progress"
                >
                  <span />
                </div>
              </div>
            )}

            <div className="sharepal-product-footer">
              {product.out_of_stock ? (
                <button
                  type="button"
                  className="sharepal-product-waitlist-button"
                  onClick={() => joinWaitlist(product.id)}
                  disabled={waitlistedProducts.has(product.id)}
                >
                  {waitlistedProducts.has(product.id)
                    ? "You're on the list"
                    : "Join Waitlist"}
                </button>
              ) : (
                <>
                  <p className="sharepal-product-price">
                    ₹{product.per_day_rent}
                    <span>/day</span>
                  </p>
                  <button type="button" className="sharepal-product-button">
                    Add to Cart
                  </button>
                </>
              )}
            </div>
          </article>
            ))}

            {filteredProducts.length === 0 && (
              <p className="sharepal-products-empty">
                No products found. Please contact us for registering your
                product.
              </p>
            )}
          </div>
        </section>

      </div>
    </div>

    <div className="sharepal-below-products">
        <section className="sharepal-faq" aria-labelledby="sharepal-faq-title">
          <h2 id="sharepal-faq-title">Frequently Asked Questions (FAQs)</h2>
          <div className="sharepal-faq-list">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div className="sharepal-faq-item" key={item.question}>
                  <button
                    type="button"
                    className="sharepal-faq-question"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? undefined : index)}
                  >
                    <span>{item.question}</span>
                    <span aria-hidden="true">{isOpen ? "⌃" : "⌄"}</span>
                  </button>
                  {isOpen && (
                    <p className="sharepal-faq-answer">{item.answer}</p>
                  )}
                </div>
              );
            })}
          </div>
          <button
            type="button"
            className="sharepal-faq-more"
            onClick={() => setMoreFaqOpen(true)}
          >
            View more FAQ&apos;s
          </button>
        </section>

        <section
          className="sharepal-testimonials"
          aria-labelledby="sharepal-testimonials-title"
        >
          <h2 id="sharepal-testimonials-title">
            Served more than <span>1 Lakh Orders</span>
          </h2>
          <div className="sharepal-testimonials-window">
            <div className="sharepal-testimonials-track">
              {[...testimonials, ...testimonials].map((review, index) => (
                <article
                  className="sharepal-testimonial-card"
                  key={`${review.name}-${index}`}
                >
                  <div className="sharepal-testimonial-rating">
                    <span>G</span>
                    <b>★★★★★</b>
                  </div>
                  <p className="sharepal-testimonial-text">
                    “{review.text}”
                  </p>
                  <div className="sharepal-testimonial-author">
                    <span>{review.initials}</span>
                    <div>
                      <strong>{review.name}</strong>
                      <small>
                        {review.location} • {review.category}
                      </small>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sharepal-impact-stats" aria-label="SharePal impact">
          <div>
            <strong>250Cr+</strong>
            <span>Saved Together</span>
          </div>
          <div>
            <strong>4.5M Kg</strong>
            <span>CO₂E Emissions Saved</span>
          </div>
          <div>
            <strong>100K+</strong>
            <span>Products In Circulation</span>
          </div>
        </section>
      </div>

      {moreFaqOpen && (
        <div
          className="sharepal-faq-drawer-overlay"
          onMouseDown={() => setMoreFaqOpen(false)}
        >
          <aside
            className="sharepal-faq-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="more-faq-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="sharepal-faq-drawer-header">
              <button
                type="button"
                aria-label="Close FAQs"
                onClick={() => setMoreFaqOpen(false)}
              >
                ×
              </button>
              <h2 id="more-faq-title">FAQs</h2>
            </header>
            <div className="sharepal-faq-drawer-list">
              {[...faqItems, ...moreFaqItems].map((item, index) => {
                const isOpen = openMoreFaq === index;
                return (
                  <div className="sharepal-faq-drawer-item" key={item.question}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenMoreFaq(isOpen ? undefined : index)
                      }
                    >
                      <span>{item.question}</span>
                      <span aria-hidden="true">{isOpen ? "⌃" : "⌄"}</span>
                    </button>
                    {isOpen && (
                      <p className="sharepal-faq-answer">{item.answer}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
