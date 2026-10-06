import { useEffect, useRef, useState } from "react";

const categoryMenus = {
  Photography: [
    "DJI Drones",
    "360 Cameras",
    "Vlogging",
    "GoPro Cameras",
    "Mobile Gimbals",
    "iPhones",
    "Action Cameras",
    "UNLMTD Vlogging",
    "Insta360 Cameras",
    "Wireless & Collar Mics",
    "Cameras",
    "DSLR Cameras",
    "Wildlife Photography",
    "DJI Cameras",
    "DSLR Lens",
    "Pocket Cameras",
    "Mirrorless Cameras",
    "Professional Cameras",
    "DSLR Gimbal Combos",
    "Tripod and camera accessories",
  ],
  Gaming: [
    "All",
    "GTA VI",
    "PS5 Console",
    "Xbox Console",
    "VR",
    "Racing Wheel",
    "Big Screen Gaming",
  ],
  Outdoor: [
    "Trekking Gear",
    "Snow Boots",
    "Winter Jackets",
    "Riding Luggage",
    "Camping Stools & Tables",
    "Riding Gear",
    "Trekking Jackets",
    "Riding Jackets",
    "Backpacks",
    "Sleeping Bags & Mats",
    "Camping Gear",
    "Trek/Snow Pants",
    "Riding Boots",
    "Binoculars",
    "Trekking Shoes",
    "Trek Accessories",
    "Riding Essentials",
    "Camping Tents",
  ],
  Entertainment: ["Projectors", "Speakers", "Mics", "VR"],
};

export function SharepalCategoryTabs({
  navigationHidden = false,
  gamingSelection = "All",
  onGamingSelectionChange,
}) {
  const [openCategory, setOpenCategory] = useState();
  const menuRef = useRef(null);

  useEffect(() => {
    const closeMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenCategory(undefined);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpenCategory(undefined);
    };
    document.addEventListener("mousedown", closeMenu);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const selectMenuItem = (category, item) => {
    if (category === "Gaming" && onGamingSelectionChange) {
      onGamingSelectionChange(item);
    }
    setOpenCategory(undefined);
  };

  return (
    <div
      className={`sharepal-category-menu${
        navigationHidden ? " sharepal-category-menu-header-hidden" : ""
      }`}
      ref={menuRef}
    >
      <nav className="sharepal-category-tabs" aria-label="Product categories">
        {Object.keys(categoryMenus).map((category) => {
          const isActive = category === (openCategory || "Gaming");
          return (
            <button
              type="button"
              key={category}
              className={
                isActive
                  ? "sharepal-category-tab sharepal-category-tab-active"
                  : "sharepal-category-tab"
              }
              aria-expanded={openCategory === category}
              onClick={() =>
                setOpenCategory((current) =>
                  current === category ? undefined : category,
                )
              }
            >
              {category}
            </button>
          );
        })}
      </nav>

      {openCategory && (
        <div
          className={`sharepal-category-dropdown sharepal-category-dropdown-${openCategory.toLowerCase()}`}
          role="menu"
        >
          {categoryMenus[openCategory]?.map((item) => (
            <button
              type="button"
              key={item}
              className={
                openCategory === "Gaming" && item === gamingSelection
                  ? "sharepal-category-option sharepal-category-option-selected"
                  : "sharepal-category-option"
              }
              onClick={() => selectMenuItem(openCategory, item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
