"use client";

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from './ui/Button';
import { useCollections } from '../hooks/useData';
import './Gallery6.css';

export default function Gallery6({
  heading = 'Our Collections',
}) {
  const { collections, loading } = useCollections();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const [emblaRef, emblaApiInstance] = useEmblaCarousel({
    breakpoints: {
      '(max-width: 768px)': {
        dragFree: true,
      },
    },
  });

  useEffect(() => {
    if (!emblaApiInstance) {
      return;
    }

    const updateSelection = () => {
      setCanScrollPrev(emblaApiInstance.canScrollPrev());
      setCanScrollNext(emblaApiInstance.canScrollNext());
    };

    updateSelection();
    emblaApiInstance.on('select', updateSelection);
    return () => {
      emblaApiInstance.off('select', updateSelection);
    };
  }, [emblaApiInstance]);

  return (
    <section className="gallery6 section section-linen" id="collections">
      <div className="container">
        <div className="gallery6__header">
          <div>
            <h2 className="gallery6__heading">{heading}</h2>
            <p className="gallery6__subheading">Curated for every room</p>
            <div className="gold-line" />
          </div>
          <div className="gallery6__nav">
            <Button
              size="icon"
              variant="outline"
              onClick={() => emblaApiInstance?.scrollPrev()}
              disabled={!canScrollPrev}
              className="gallery6__arrow"
              aria-label="Scroll left"
            >
              <ArrowLeft size={20} />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => emblaApiInstance?.scrollNext()}
              disabled={!canScrollNext}
              className="gallery6__arrow"
              aria-label="Scroll right"
            >
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>

      <div className="gallery6__slider-wrap">
        <div className="gallery6__slider" ref={emblaRef}>
          <div className="gallery6__track">
            {loading ? (
              <div className="loading-placeholder">Loading collections...</div>
            ) : (
              collections.map((item) => (
              <Link
                to={`/collection/${item.id}`}
                className="gallery6__card"
                key={item.id}
              >
                <div className="gallery6__media">
                  <div className="gallery6__image-wrap">
                    <img
                      src={item.heroImage || item.image}
                      alt={item.name}
                      className="gallery6__image"
                      loading="lazy"
                    />
                  </div>
                </div>
                <h3 className="gallery6__card-title">{item.name}</h3>
                <p className="gallery6__card-summary">{item.description}</p>
                <span className="gallery6__card-cta">
                  Shop Now <ArrowRight size={16} className="gallery6__card-arrow" />
                </span>
              </Link>
            ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}