"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Rewind, FastForward } from "lucide-react";
import "./RulerCarousel.css";

export default function RulerCarousel() {
  const brandItems = [
    { id: 1, title: "TOWELS" },
    { id: 2, title: "ROBES" },
    { id: 3, title: "SHEETS" },
    { id: 4, title: "PILLOWS" },
    { id: 5, title: "DUVETS" },
    { id: 6, title: "GIFT SETS" },
  ];

  const itemsPerSet = brandItems.length;
  const [activeIndex, setActiveIndex] = useState(itemsPerSet + 2);
  const [isResetting, setIsResetting] = useState(false);

  const handlePrevious = () => {
    if (isResetting) return;
    setActiveIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (isResetting) return;
    setActiveIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (isResetting) return;

    if (activeIndex < itemsPerSet) {
      setIsResetting(true);
      setTimeout(() => {
        setActiveIndex(activeIndex + itemsPerSet);
        setIsResetting(false);
      }, 0);
    } else if (activeIndex >= itemsPerSet * 2) {
      setIsResetting(true);
      setTimeout(() => {
        setActiveIndex(activeIndex - itemsPerSet);
        setIsResetting(false);
      }, 0);
    }
  }, [activeIndex, itemsPerSet, isResetting]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isResetting) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((prev) => prev - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((prev) => prev + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isResetting]);

  const targetX = -500 + (5 - (activeIndex % itemsPerSet)) * 500;
  const currentPage = (activeIndex % itemsPerSet) + 1;

  const createItems = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      brandItems.forEach((item, index) => {
        items.push({
          ...item,
          id: `${i}-${item.id}`,
          originalIndex: index,
        });
      });
    }
    return items;
  };

  const infiniteItems = createItems();

  return (
    <section className="ruler-carousel section" id="products">
      <div className="ruler-carousel__container">
        <div className="ruler-carousel__ruler">
          <div className="ruler-carousel__lines ruler-carousel__lines--top">
            {[...Array(21)].map((_, i) => (
              <div
                key={i}
                className={`ruler-carousel__line ${
                  i % 5 === 0 ? "ruler-carousel__line--long" : ""
                } ${i === 10 ? "ruler-carousel__line--center" : ""}`}
                style={{ left: `${i * 5}%` }}
              />
            ))}
          </div>
        </div>

        <div className="ruler-carousel__track-wrap">
          <motion.div
            className="ruler-carousel__track"
            animate={{
              x: isResetting ? targetX : targetX,
            }}
            transition={
              isResetting
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    mass: 1,
                  }
            }
          >
            {infiniteItems.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`ruler-carousel__item ${
                    isActive ? "ruler-carousel__item--active" : ""
                  }`}
                  animate={{
                    scale: isActive ? 1 : 0.75,
                    opacity: isActive ? 1 : 0.4,
                  }}
                  transition={
                    isResetting
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        }
                  }
                >
                  {item.title}
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        <div className="ruler-carousel__ruler">
          <div className="ruler-carousel__lines ruler-carousel__lines--bottom">
            {[...Array(21)].map((_, i) => (
              <div
                key={i}
                className={`ruler-carousel__line ${
                  i % 5 === 0 ? "ruler-carousel__line--long" : ""
                } ${i === 10 ? "ruler-carousel__line--center" : ""}`}
                style={{ left: `${i * 5}%` }}
              />
            ))}
          </div>
        </div>

        <div className="ruler-carousel__controls">
          <button
            onClick={handlePrevious}
            disabled={isResetting}
            className="ruler-carousel__control-btn"
            aria-label="Previous"
          >
            <Rewind size={20} />
          </button>

          <div className="ruler-carousel__pagination">
            <span className="ruler-carousel__page-current">{currentPage}</span>
            <span className="ruler-carousel__page-divider">/</span>
            <span className="ruler-carousel__page-total">{itemsPerSet}</span>
          </div>

          <button
            onClick={handleNext}
            disabled={isResetting}
            className="ruler-carousel__control-btn"
            aria-label="Next"
          >
            <FastForward size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}