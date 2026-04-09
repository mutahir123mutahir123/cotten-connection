import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../hooks';
import './About.css';

function CountUp({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const isFloat = target % 1 !== 0;

          const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const current = eased * target;
            setCount(isFloat ? parseFloat(current.toFixed(1)) : Math.floor(current));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {typeof target === 'number' && target >= 1000
        ? count.toLocaleString()
        : count}
      {suffix}
    </span>
  );
}

export default function About() {
  const imgRef = useScrollReveal();
  const textRef = useScrollReveal();

  return (
    <section className="about section section-pink" id="about">
      <div className="container">
        <div className="about__grid">
          <div className="about__image-col reveal-left" ref={imgRef}>
            <div className="about__image-frame">
              <img
                src="https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=600&h=800&fit=crop"
                alt="Artisan folding premium cotton towels"
                loading="lazy"
              />
              <div className="about__image-accent" />
            </div>
          </div>

          <div className="about__text-col reveal-right" ref={textRef}>
            <span className="about__label">Our Story</span>
            <h2>Woven with Care,<br />Made for <em>You</em></h2>
            <div className="gold-line about__gold-line" />
            <p>
              Since 2010, Cotton Connection has been dedicated to bringing the finest
              quality cotton textiles into homes around the world. Every thread is chosen
              with intention, every weave speaks of craftsmanship passed down through
              generations.
            </p>
            <p>
              We believe comfort isn't a luxury — it's a right. From the Egyptian cotton
              fields to your bedroom, we oversee every step to ensure you receive nothing
              but the best. Our products are OEKO-TEX certified and sustainably sourced.
            </p>
            <a href="#newsletter" className="btn btn-secondary" onClick={(e) => {
              e.preventDefault();
              document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Learn More
            </a>
          </div>
        </div>

        <div className="about__stats">
          <div className="about__stat reveal">
            <span className="about__stat-number">
              <CountUp target={100} suffix="%" />
            </span>
            <span className="about__stat-label">Premium Cotton</span>
          </div>
          <div className="about__stat reveal" style={{ transitionDelay: '0.15s' }}>
            <span className="about__stat-number">
              <CountUp target={50000} suffix="+" />
            </span>
            <span className="about__stat-label">Happy Customers</span>
          </div>
          <div className="about__stat reveal" style={{ transitionDelay: '0.3s' }}>
            <span className="about__stat-number">
              <CountUp target={4.9} suffix="★" />
            </span>
            <span className="about__stat-label">Average Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}
