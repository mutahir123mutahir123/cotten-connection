import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../CartContext';
import { useWishlist } from '../WishlistContext';
import { useStaggerReveal, useScrollReveal } from '../hooks';
import { products } from '../data';
import './FeaturedProducts.css';

export default function FeaturedProducts() {
  const { addItem } = useCart();
  const { isWishlisted, toggleItem } = useWishlist();
  const headerRef = useScrollReveal();
  const gridRef = useStaggerReveal(null, '.fp-card', 150);

  return (
    <section className="featured-section section-pink" id="featured">
      <div className="container container-wide">
        {/* Header — left-aligned with button on right */}
        <div className="featured-header reveal" ref={headerRef}>
          <div className="featured-header__text">
            <span className="featured-header__label">Our Best</span>
            <h2 className="featured-header__title">Featured Products</h2>
          </div>
          <Link to="/shop" className="featured-header__btn">
            View All Products
          </Link>
        </div>

        {/* Product Grid */}
        <div className="featured-grid" ref={gridRef}>
          {products.map((product) => (
            <div className="fp-card reveal" key={product.id}>
              {/* Stamp-style card body */}
              <div className="fp-card__body">
                {/* Badge */}
                {product.badge && (
                  <span className="fp-card__badge">{product.badge}</span>
                )}

                {/* Wishlist heart */}
                <button
                  className={`fp-card__heart ${isWishlisted(product.id) ? 'active' : ''}`}
                  onClick={() => toggleItem(product)}
                  aria-label="Add to wishlist"
                >
                  <Heart
                    size={18}
                    fill={isWishlisted(product.id) ? 'currentColor' : 'none'}
                  />
                </button>

                {/* Product image */}
                <Link to={`/product/${product.id}`} className="fp-card__image-link">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="fp-card__image"
                    loading="lazy"
                  />
                </Link>
              </div>

              {/* Scalloped edge separator */}
              <div className="fp-card__scallop" />

              {/* Info section below the scallop */}
              <div className="fp-card__info">
                <Link to={`/product/${product.id}`} className="fp-card__name">
                  {product.name}
                </Link>
                <span className="fp-card__category">{product.category}</span>

                <div className="fp-card__bottom">
                  <div className="fp-card__pricing">
                    <span className="fp-card__price">${product.price.toFixed(0)}</span>
                    {product.originalPrice && (
                      <span className="fp-card__original">
                        ${product.originalPrice.toFixed(0)}
                      </span>
                    )}
                  </div>
                  <button
                    className="fp-card__cart-btn"
                    onClick={() => addItem(product, product.colors?.[0])}
                    aria-label="Add to cart"
                  >
                    <ShoppingCart size={17} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
