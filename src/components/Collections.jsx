import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks';
import { useCollections } from '../hooks/useData';
import './Collections.css';

export default function Collections() {
  const { collections, loading } = useCollections();
  const headerRef = useScrollReveal();

  return (
    <section className="collections section section-linen" id="collections">
      <div className="container">
        <div className="section-header reveal" ref={headerRef}>
          <h2>Our Collections</h2>
          <p>Curated for every room</p>
          <div className="gold-line" />
        </div>
      </div>

      <div className="container">
        <div className="collections__grid">
          {loading ? (
            <div className="loading-placeholder">Loading collections...</div>
          ) : (
            collections.slice(0, 3).map((col, i) => (
            <Link
              to={`/collection/${col.id}`}
              className="collection-card"
              key={col.id}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <img
                src={col.image}
                alt={col.name}
                className="collection-card__image"
                loading="lazy"
              />
              <div className="collection-card__overlay" />
              <div className="collection-card__content">
                <h3 className="collection-card__title">{col.name}</h3>
                <p className="collection-card__desc">{col.description}</p>
                <span className="collection-card__cta">Explore →</span>
              </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
