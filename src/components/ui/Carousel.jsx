"use client";

import { createContext, useContext, useState, useEffect, forwardRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import './Carousel.css';

const CarouselContext = createContext(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }
  return context;
}

const Carousel = forwardRef(
  ({ orientation = 'horizontal', opts, setApi, plugins, className = '', children, ...props }, ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel({
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    }, plugins);
    
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = (carouselApi) => {
      if (!carouselApi) return;
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };

    const scrollPrev = () => api?.scrollPrev();
    const scrollNext = () => api?.scrollNext();

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    };

    useEffect(() => {
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);

    useEffect(() => {
      if (!api) return;
      onSelect(api);
      api.on('reInit', onSelect);
      api.on('select', onSelect);
      return () => {
        api?.off('select', onSelect);
      };
    }, [api]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          opts,
          orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={`carousel ${className}`.trim()}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = 'Carousel';

const CarouselContent = forwardRef(({ className = '', ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="carousel__viewport">
      <div
        ref={ref}
        className={`carousel__container ${orientation === 'horizontal' ? 'carousel__container--horizontal' : 'carousel__container--vertical'} ${className}`.trim()}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = forwardRef(({ className = '', ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={`carousel__item ${orientation === 'horizontal' ? 'carousel__item--horizontal' : 'carousel__item--vertical'} ${className}`.trim()}
      {...props}
    />
  );
});
CarouselItem.displayName = 'CarouselItem';

const CarouselPrevious = forwardRef(({ className = '', ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variant="outline"
      size="icon"
      className={`carousel__button carousel__button--prev ${orientation === 'horizontal' ? 'carousel__button--horizontal' : 'carousel__button--vertical'} ${className}`.trim()}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft size={20} />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = forwardRef(({ className = '', ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      variant="outline"
      size="icon"
      className={`carousel__button carousel__button--next ${orientation === 'horizontal' ? 'carousel__button--horizontal' : 'carousel__button--vertical'} ${className}`.trim()}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight size={20} />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = 'CarouselNext';

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };