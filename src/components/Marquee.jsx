import './Marquee.css';

export default function Marquee() {
  const brandText = [
    'TOWELS', 'ROBES', 'BED SHEETS', 'PILLOW COVERS', 'DUVET COVERS', 'GIFT SETS',
    'QUALITY', 'LUXURY', 'COMFORT', 'PREMIUM', 'COTTON', 'ARTISAN',
  ];

  const offerText = [
    '🎉 FLASH SALE: Use code SAVE20 for 20% off!',
    '🎁 FREE SHIPPING on orders over AED 275',
    '✨ LUXURY QUALITY - Crafted with care since 2010',
    '🌟 NEW ARRIVALS - Shop the latest collection',
  ];

  return (
    <section className="marquee section" id="brands">
      <div className="marquee__container">
        <div className="marquee__track">
          <div className="marquee__content">
            {[...brandText, ...brandText].map((text, i) => (
              <span key={i} className="marquee__text">{text}</span>
            ))}
          </div>
          <div className="marquee__content" aria-hidden="true">
            {[...brandText, ...brandText].map((text, i) => (
              <span key={i} className="marquee__text">{text}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="marquee__offer">
        <div className="marquee__offer-track">
          <div className="marquee__offer-content">
            {[...offerText, ...offerText].map((text, i) => (
              <span key={i} className="marquee__offer-text">{text}</span>
            ))}
          </div>
          <div className="marquee__offer-content" aria-hidden="true">
            {[...offerText, ...offerText].map((text, i) => (
              <span key={i} className="marquee__offer-text">{text}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}