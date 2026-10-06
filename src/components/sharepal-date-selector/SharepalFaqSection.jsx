import { useEffect, useState } from "react";

const faqItems = [
  {
    question: "What is the storage capacity of the PS5?",
    answer: "The PS5 comes with an 825 GB custom SSD.",
  },
  {
    question: "Can I install my own games on this PS5?",
    answer:
      "Yes, you can install compatible games on the console during your rental.",
  },
  {
    question: "How can I rent from SharePal?",
    answer: "Choose your dates, select a product, and continue to checkout.",
  },
  {
    question:
      "If I rent multiple products, do I need to extend the rental duration for all or partial extension is possible?",
    answer:
      "You can extend individual products when extension availability permits.",
  },
  {
    question: "When does the rental start?",
    answer: "Your rental starts when the product is delivered to you.",
  },
];

const moreFaqItems = [
  {
    question: "Can I connect the PS5 to any smart TV or monitor?",
    answer:
      "Yes, connect the PS5 to a compatible display using the included HDMI cable.",
  },
  {
    question:
      "What will be the condition of the products at the time of delivery?",
    answer:
      "Every product is checked, cleaned, and packed before it is delivered.",
  },
  {
    question: "What games can I play on the PS5 console?",
    answer:
      "You can play the games included with the selected product and compatible games you own.",
  },
  {
    question: "Do you provide controllers and cables with the console?",
    answer:
      "The included accessories are listed on each product card before you rent.",
  },
  {
    question: "Can I cancel my rental after placing an order?",
    answer:
      "Cancellation depends on the order status and the applicable rental policy.",
  },
  {
    question: "Do you deliver gaming products to my area?",
    answer:
      "Enter your city at the top of the page to check available delivery coverage.",
  },
];

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="sharepal-faq-item">
      <button
        type="button"
        className="sharepal-faq-question"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span>{item.question}</span>
        <span aria-hidden="true">{open ? "⌃" : "⌄"}</span>
      </button>
      {open && <p className="sharepal-faq-answer">{item.answer}</p>}
    </div>
  );
}

export function SharepalFaqSection() {
  const [openFaq, setOpenFaq] = useState();
  const [moreFaqOpen, setMoreFaqOpen] = useState(false);
  const [openMoreFaq, setOpenMoreFaq] = useState();

  useEffect(() => {
    if (!moreFaqOpen) return;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMoreFaqOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [moreFaqOpen]);

  const toggleMainFaq = (index) => {
    setOpenFaq(openFaq === index ? undefined : index);
  };

  const toggleMoreFaq = (index) => {
    setOpenMoreFaq(openMoreFaq === index ? undefined : index);
  };

  return (
    <>
      <section className="sharepal-faq" aria-labelledby="sharepal-faq-title">
        <h2 id="sharepal-faq-title">Frequently Asked Questions (FAQs)</h2>
        <div className="sharepal-faq-list">
          {faqItems.map((item, index) => (
            <FaqItem
              key={item.question}
              item={item}
              open={openFaq === index}
              onToggle={() => toggleMainFaq(index)}
            />
          ))}
        </div>
        <button
          type="button"
          className="sharepal-faq-more"
          onClick={() => setMoreFaqOpen(true)}
        >
          View more FAQ&apos;s
        </button>
      </section>

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
              <h2 id="more-faq-title">More FAQs</h2>
            </header>
            <div className="sharepal-faq-drawer-list">
              {[...faqItems, ...moreFaqItems].map((item, index) => (
                <FaqItem
                  key={item.question}
                  item={item}
                  open={openMoreFaq === index}
                  onToggle={() => toggleMoreFaq(index)}
                />
              ))}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
