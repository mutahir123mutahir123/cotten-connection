import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import './Hero.css';

const heroSlides = [
  {
    image: '/images/hero-bg.png',
    alt: 'Luxury bedroom with cotton bedding and bathrobe',
  },
  {
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&h=1080&fit=crop&q=80',
    alt: 'Elegant hotel room with premium white bed linens',
  },
  {
    image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=1920&h=1080&fit=crop&q=80',
    alt: 'Spa-like bathroom with luxurious towels',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const bgContainerRef = useRef(null);
  const timerRef = useRef(null);

  // Parallax effect
  useEffect(() => {
    const onScroll = () => {
      if (bgContainerRef.current) {
        const scrollY = window.scrollY;
        bgContainerRef.current.style.transform = `translateY(${scrollY * 0.35}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Go to a specific slide
  const goToSlide = useCallback((targetIndex) => {
    if (transitioning || targetIndex === current) return;
    setNext(targetIndex);
    setTransitioning(true);

    setTimeout(() => {
      setCurrent(targetIndex);
      setTransitioning(false);
    }, 1200);
  }, [current, transitioning]);

  // Slideshow auto-advance
  const advanceSlide = useCallback(() => {
    const nextIndex = (current + 1) % heroSlides.length;
    goToSlide(nextIndex);
  }, [current, goToSlide]);

  // Auto-advance timer — resets when slide changes
  useEffect(() => {
    timerRef.current = setInterval(advanceSlide, 5000);
    return () => clearInterval(timerRef.current);
  }, [advanceSlide]);

  // Handle indicator click
  const handleIndicatorClick = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    // Reset auto-advance timer so it doesn't fire right after manual switch
    clearInterval(timerRef.current);
    goToSlide(index);
  };

  return (
    <section className="hero">
      <div className="hero__bg-container" ref={bgContainerRef}>
        {/* Current slide */}
        <div
          className={`hero__slide ${transitioning ? 'hero__slide--exiting' : 'hero__slide--active'}`}
          key={`slide-current-${current}`}
        >
          <img
            src={heroSlides[current].image}
            alt={heroSlides[current].alt}
          />
        </div>

        {/* Next slide (fades in on top) */}
        {transitioning && (
          <div
            className="hero__slide hero__slide--entering"
            key={`slide-next-${next}`}
          >
            <img
              src={heroSlides[next].image}
              alt={heroSlides[next].alt}
            />
          </div>
        )}
      </div>

      <div className="hero__overlay" />

      {/* Slide indicators — clickable buttons */}
      <div className="hero__indicators" onClick={(e) => e.stopPropagation()}>
        {heroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`hero__indicator ${i === (transitioning ? next : current) ? 'active' : ''}`}
            onClick={(e) => handleIndicatorClick(e, i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="hero__content container">
        <div className="hero__decorative-line" />
        <h1 className="hero__title">
          Wrap Yourself<br />in <em>Luxury</em>
        </h1>
        <p className="hero__subtitle">
          Premium cotton towels, bathrobes, and bedding<br />
          crafted for the comfort you deserve
        </p>
        <div className="hero__actions">
          <Link to="/shop" className="btn btn-primary btn-lg">
            Shop Now
          </Link>
          <a href="#about" className="btn btn-white btn-lg" onClick={(e) => {
            e.preventDefault();
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Our Story
          </a>
        </div>
      </div>

      <button
        className="hero__scroll-indicator"
        onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to featured products"
      >
        <span>Discover</span>
        <ArrowDown size={18} />
      </button>
    </section>
  );
}
