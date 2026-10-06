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

  return (
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
                No matching products are included in the provided Gaming data.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
