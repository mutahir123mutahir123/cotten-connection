"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './ProductShowcase.css';

function calculateGap(width) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

const productsData = [
  {
    name: 'Premium Egyptian Towels',
    description: 'Bath Essentials',
    summary: 'Crafted from 700 GSM premium Egyptian cotton for exceptional softness and absorbency. Our towels elevate your daily routine with luxurious comfort.',
    image: '/images/product-towels.png',
  },
  {
    name: 'Luxury Bathrobes',
    description: 'Spa Comfort',
    summary: 'Wrap yourself in our premium waffle weave and terry cloth robes. Designed for year-round comfort with thoughtful细节-like deep pockets and elegant collars.',
    image: '/images/product-bathrobe.png',
  },
  {
    name: 'Artisan Pillow Covers',
    description: 'Decorative Accents',
    summary: 'Handcrafted pillow covers featuring premium cotton with hidden zipper closures. From classic solids to elegant geometric patterns.',
    image: '/images/product-pillowcovers.png',
  },
  {
    name: 'Premium Bed Sheets',
    description: 'Sleep Luxury',
    summary: 'Transform your bedroom with sateen and percale weaves from 300-600 thread count. The perfect balance of silky smoothness and breathable comfort.',
    image: '/images/product-bedsheets.png',
  },
];

export default function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef(null);
  const autoplayIntervalRef = useRef(null);

  const testimonialsLength = useMemo(() => productsData.length, []);
  const activeProduct = useMemo(() => productsData[activeIndex], [activeIndex]);

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    autoplayIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    }, 5000);
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [testimonialsLength]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  function getImageStyle(index) {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const offset = (index - activeIndex + testimonialsLength) % testimonialsLength;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: 'auto',
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: 'auto',
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: 'auto',
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: 'none',
      transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
    };
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section className="product-showcase section" id="products">
      <div className="container">
        <div className="product-showcase__grid">
          <div className="product-showcase__images" ref={imageContainerRef}>
            {productsData.map((product, index) => (
              <img
                key={product.image}
                src={product.image}
                alt={product.name}
                className="product-showcase__image"
                style={getImageStyle(index)}
              />
            ))}
          </div>

          <div className="product-showcase__content">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={quoteVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <span className="product-showcase__category">
                  {activeProduct.description}
                </span>
                <h3 className="product-showcase__name">
                  {activeProduct.name}
                </h3>
                <motion.p
                  className="product-showcase__summary"
                >
                  {activeProduct.summary.split(' ').map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{
                        filter: 'blur(10px)',
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        filter: 'blur(0px)',
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.22,
                        ease: 'easeInOut',
                        delay: 0.025 * i,
                      }}
                      style={{ display: 'inline-block' }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            <div className="product-showcase__nav">
              <button
                className="product-showcase__arrow"
                onClick={handlePrev}
                aria-label="Previous product"
              >
                <ArrowLeft size={28} color="#f1f1f7" />
              </button>
              <button
                className="product-showcase__arrow"
                onClick={handleNext}
                aria-label="Next product"
              >
                <ArrowRight size={28} color="#f1f1f7" />
              </button>
            </div>

            <div className="product-showcase__dots">
              {productsData.map((_, index) => (
                <button
                  key={index}
                  className={`product-showcase__dot ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to product ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}