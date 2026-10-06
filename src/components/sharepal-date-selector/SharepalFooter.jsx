import sharepalLogo from "../../assets/sharepal-navigation-logo.png";

const footerCategories = [
  [
    "Action Cameras",
    "Action Cameras",
    "Pocket Cameras",
    "GoPro Cameras",
    "DJI Cameras",
    "DJI Drones",
    "360 Cameras",
  ],
  [
    "Cameras",
    "DSLR Cameras",
    "Cameras",
    "iPhones",
    "DSLR Gimbal Combos",
    "Wildlife Photography",
    "Tripod and camera accessories",
  ],
  [
    "Trekking Gear",
    "Trekking Gear",
    "Trekking Jackets",
    "Trek/Snow Pants",
    "Trekking Shoes",
    "Trek Accessories",
  ],
  [
    "Riding Gear",
    "Riding Gear",
    "Riding Luggage",
    "Riding Jackets",
    "Riding Essentials",
    "Riding Boots",
    "Binoculars",
  ],
  [
    "Creator Gear",
    "Wireless & Collar Mics",
    "Professional Cameras",
    "Mirrorless Cameras",
    "UNLMTD Vlogging",
    "Mobile Gimbals",
    "Vlogging",
  ],
  [
    "Gaming Console",
    "PS5 Console",
    "VR",
    "Racing Wheel",
    "Big Screen Gaming",
    "Xbox Console",
  ],
  ["Winter Wear", "Snow Boots", "Winter Jackets", "Backpacks"],
  [
    "Camping Gear",
    "Camping Gear",
    "Camping Stools & Tables",
    "Camping Tents",
    "Sleeping Bags & Mats",
  ],
  ["Audio Visual Equipment", "Projectors", "VR", "Mics", "Speakers"],
];

const footerColumns = [
  {
    title: "Sharepal",
    links: ["About", "Why SharePal", "Sitemap", "CarePal"],
  },
  {
    title: "Become a Pal",
    links: [
      "Sharepal for Creators",
      "Careers",
      "Sharepal for Brands",
      "Asset Funding Program",
      "Rent Your Gear",
    ],
  },
  {
    title: "Information",
    links: [
      "How it works?",
      "FAQs",
      "Verification",
      "Cancellation Policy",
      "Life at Sharepal",
    ],
  },
  {
    title: "Policies",
    links: [
      "Terms & Condition",
      "Shipping policy",
      "Damage Policy",
      "Terms of Use",
      "Privacy Policy",
    ],
  },
];

function FooterLink({ children, ...props }) {
  return (
    <a href="#footer" {...props}>
      {children}
    </a>
  );
}

export function SharepalFooter() {
  return (
    <footer id="footer" className="sharepal-footer">
      <div className="sharepal-footer-categories">
        {footerCategories.map(([title, ...items]) => (
          <div className="sharepal-footer-category" key={title}>
            <h3>{title}</h3>
            {items.map((item) => (
              <FooterLink key={`${title}-${item}`}>{item}</FooterLink>
            ))}
          </div>
        ))}
      </div>

      <div className="sharepal-footer-main">
        <div className="sharepal-footer-brand">
          <img src={sharepalLogo} alt="SharePal" />
        </div>

        <div className="sharepal-footer-columns">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3>{column.title}</h3>
              {column.links.map((link) => (
                <FooterLink key={link}>
                  {link}
                  {link === "Asset Funding Program" || link === "Rent Your Gear" ? (
                    <b>New</b>
                  ) : null}
                </FooterLink>
              ))}
            </div>
          ))}

          <div>
            <h3>Need Help</h3>
            <FooterLink>♧ Contact Support</FooterLink>
            <FooterLink>Contact Us</FooterLink>
            <a href="mailto:care@sharepal.in">✉ care@sharepal.in</a>
            <div className="sharepal-footer-socials">
              <FooterLink aria-label="Facebook">f</FooterLink>
              <FooterLink aria-label="Instagram">◎</FooterLink>
              <FooterLink aria-label="LinkedIn">in</FooterLink>
            </div>
          </div>
        </div>

        <div className="sharepal-footer-bottom">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Go up　⌃
          </button>
          <span>© 2026. SWNAC E-Kiraya Services Pvt Ltd</span>
          <span>
            Made with <b>♥</b> for India
          </span>
        </div>
      </div>
    </footer>
  );
}
