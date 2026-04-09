import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useScrollReveal } from '../hooks';
import { testimonials } from '../data';
import './Testimonials.css';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('right');
  const headerRef = useScrollReveal();

  const goTo = useCallback((index, dir) => {
    if (isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 300);
  }, [isAnimating]);

  const next = useCallback(() => {
    goTo((current + 1) % testimonials.length, 'right');
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + testimonials.length) % testimonials.length, 'left');
  }, [current, goTo]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <section className="testimonials section section-linen" id="testimonials">
      <div className="container container-narrow">
        <div className="section-header reveal" ref={headerRef}>
          <h2>What Our Customers Say</h2>
          <div className="testimonials__stars-header">
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
          </div>
          <div className="gold-line" />
        </div>

        <div className="testimonials__carousel">
          <button className="testimonials__arrow" onClick={prev} aria-label="Previous review">
            <ChevronLeft size={22} />
          </button>

          <div className={`testimonials__card ${isAnimating ? `exit-${direction}` : 'enter'}`}>
            <div className="testimonials__quote-icon">
              <Quote size={36} />
            </div>

            <blockquote className="testimonials__quote">
              "{t.quote}"
            </blockquote>

            <div className="testimonials__rating">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>

            <div className="testimonials__author">
              <div className="testimonials__avatar">{t.avatar}</div>
              <div>
                <span className="testimonials__name">{t.name}</span>
                <span className="testimonials__role">{t.role}</span>
              </div>
            </div>
          </div>

          <button className="testimonials__arrow" onClick={next} aria-label="Next review">
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="testimonials__dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testimonials__dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i, i > current ? 'right' : 'left')}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
