import { useState } from "react";

export function SharepalCategoryTabs() {
  const categories = ["Photography", "Gaming", "Outdoor", "Entertainment"];
  const [activeCategory, setActiveCategory] = useState("Gaming");

  return (
    <nav className="sharepal-category-tabs" aria-label="Product categories">
      {categories.map((category) => {
        const isActive = category === activeCategory;
        return (
          <button
            key={category}
            type="button"
            className={
              isActive
                ? "sharepal-category-tab sharepal-category-tab-active"
                : "sharepal-category-tab"
            }
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        );
      })}
    </nav>
  );
}
