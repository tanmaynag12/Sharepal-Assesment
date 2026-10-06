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

function TestimonialCard({ review }) {
  return (
    <article
      className="sharepal-testimonial-card"
    >
      <div className="sharepal-testimonial-rating">
        <span>G</span>
        <b>★★★★★</b>
      </div>
      <p className="sharepal-testimonial-text">“{review.text}”</p>
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
  );
}

export function SharepalTestimonials() {
  const repeatedReviews = [...testimonials, ...testimonials];

  return (
    <section
      className="sharepal-testimonials"
      aria-labelledby="sharepal-testimonials-title"
    >
      <h2 id="sharepal-testimonials-title">
        Served more than <span>1 Lakh Orders</span>
      </h2>
      <div className="sharepal-testimonials-window">
        <div className="sharepal-testimonials-track">
          {repeatedReviews.map((review, index) => (
            <TestimonialCard
              key={`${review.name}-${index}`}
              review={review}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
