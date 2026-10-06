import { useState } from "react";
import { Star, Smile } from "lucide-react";
import productData from "../../data/gammingproducts.json";

const allProducts = productData.products || [];

const SIDEBAR_CATEGORIES = [
  { id: "all", label: "All", type: "icon" },
  { id: "gta", label: "GTA VI", type: "badge" },
  {
    id: "ps5",
    label: "PS5 Console",
    image:
      "https://images.sharepal.in/categories/gaming-consoles/ps5/ps5-with-100-games-with-1-controller/ps5-with-100-games-with-1-controller-on-rent-sharepal-1.webp",
  },
  {
    id: "xbox",
    label: "Xbox Console",
    image:
      "https://images.sharepal.in/categories/gaming-consoles/ps5/ps5-with-2%20controllers/ps5-console-with-2-controllers-on-rent-sharepal-1.webp",
  },
];

function formatBooked(count) {
  return count >= 1000
    ? `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1)}k+`
    : `${count}+`;
}

export function SharepalGamingProductGrid() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = allProducts.filter((product) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "ps5")
      return (
        product.name.toLowerCase().includes("ps5") ||
        product.name.toLowerCase().includes("playstation")
      );
    if (activeCategory === "xbox")
      return product.name.toLowerCase().includes("xbox");
    if (activeCategory === "gta")
      return (
        product.name.toLowerCase().includes("gta") || product.tag === "Trending"
      );
    return true;
  });

  return (
    <div className="sharepal-main-container">
      {/* 1. Left Vertical Sidebar */}
      <aside className="sharepal-sidebar">
        {SIDEBAR_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`sharepal-sidebar-item ${activeCategory === cat.id ? "active" : ""}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <div className="sharepal-sidebar-icon-box">
              {cat.type === "icon" && <Smile size={26} strokeWidth={1.8} />}
              {cat.type === "badge" && (
                <span className="sharepal-gta-badge">GTA VI</span>
              )}
              {cat.image && <img src={cat.image} alt={cat.label} />}
            </div>
            <span>{cat.label}</span>
          </button>
        ))}
      </aside>

      {/* 2. Main Right Column */}
      <div className="sharepal-content-column">
        {/* Purple Hero Banner */}
        <section className="sharepal-hero-banner">
          <div className="sharepal-hero-banner-image-left">
            <img
              src="https://images.sharepal.in/categories/gaming-consoles/ps5/ps5-with-100-games-with-1-controller/ps5-with-100-games-with-1-controller-on-rent-sharepal-1.webp"
              alt="Console"
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
              <span>∞ Meta</span>
            </div>
          </div>

          <div className="sharepal-hero-banner-image-right">
            <img
              src="https://images.sharepal.in/categories/gaming-consoles/ps5/ps5-with-ea-play-with-100-games-with-2-controllers/ps5-with-2-controllers-with-ea-play-with-ps-plus-deluxe-subscription-combo-on-rent-sharepal-1.webp"
              alt="Controller Combo"
            />
          </div>
        </section>

        {/* Section Title */}
        <div className="sharepal-products-header">
          <h2>Gaming Gadgets On Rent</h2>
          <p>
            Total items: <strong>{filteredProducts.length} items</strong>
          </p>
        </div>

        {/* Product Grid */}
        <div className="sharepal-products-grid">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className={
                product.out_of_stock
                  ? "sharepal-product-card sharepal-product-card-out"
                  : "sharepal-product-card"
              }
            >
              {product.tag && (
                <span className="sharepal-product-tag">{product.tag}</span>
              )}

              <div className="sharepal-product-image">
                <img src={product.image} alt={product.name} loading="lazy" />
                {product.out_of_stock && (
                  <span className="sharepal-product-stock">Out of Stock</span>
                )}
              </div>

              <h3 className="sharepal-product-name">{product.name}</h3>

              <div className="sharepal-product-meta">
                {product.rating > 0 && (
                  <span className="sharepal-product-rating">
                    <Star size={13} fill="currentColor" strokeWidth={0} />
                    {product.rating.toFixed(1)}
                  </span>
                )}
                <span>{formatBooked(product.booked_count)} booked</span>
              </div>

              <div className="sharepal-product-footer">
                <p className="sharepal-product-price">
                  ₹{product.per_day_rent}
                  <span>/day</span>
                </p>
                <button
                  type="button"
                  className="sharepal-product-button"
                  disabled={product.out_of_stock}
                >
                  {product.out_of_stock ? "Notify Me" : "Add to Cart"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
