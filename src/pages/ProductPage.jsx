import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, ChevronLeft, Minus, Plus, Check, Truck, RotateCcw, Shield } from 'lucide-react';
import { useCart } from '../CartContext';
import { products } from '../data';
import './ProductPage.css';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = products.find((p) => p.id === Number(id));
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="product-page" style={{ paddingTop: 'calc(var(--navbar-height) + 64px)', textAlign: 'center' }}>
        <div className="container">
          <h2>Product not found</h2>
          <Link to="/shop" className="btn btn-secondary" style={{ marginTop: '24px' }}>
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="product-page__breadcrumb">
          <button onClick={() => navigate(-1)} className="product-page__back">
            <ChevronLeft size={18} />
            Back
          </button>
          <span className="product-page__crumbs">
            <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span>{product.name}</span>
          </span>
        </nav>

        <div className="product-page__layout">
          {/* Image */}
          <div className="product-page__image-section">
            <div className="product-page__image-main">
              <img src={product.image} alt={product.name} />
              {product.badge && (
                <span className={`product-card__badge ${product.badge === 'Sale' ? 'badge--sale' : ''}`}>
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="product-page__details">
            <span className="product-page__category">{product.category}</span>
            <h1 className="product-page__title">{product.name}</h1>

            <div className="product-page__rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <span>{product.rating}</span>
              <span className="product-page__review-count">({product.reviews} reviews)</span>
            </div>

            <div className="product-page__price-wrap">
              <span className="product-page__price">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="product-page__original">${product.originalPrice.toFixed(2)}</span>
                  <span className="product-page__discount">
                    Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            <p className="product-page__description">{product.description}</p>

            {/* Color Selector */}
            {product.colors && (
              <div className="product-page__option">
                <label className="product-page__option-label">
                  Color: <strong>{selectedColor}</strong>
                </label>
                <div className="product-page__color-options">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`product-page__color-btn ${selectedColor === color ? 'active' : ''}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="product-page__option">
              <label className="product-page__option-label">Quantity</label>
              <div className="product-page__quantity">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus size={16} />
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              className={`btn btn-primary btn-lg product-page__add-btn ${added ? 'added' : ''}`}
              onClick={handleAddToCart}
            >
              {added ? (
                <><Check size={18} /> Added to Cart!</>
              ) : (
                <><ShoppingBag size={18} /> Add to Cart — ${(product.price * quantity).toFixed(2)}</>
              )}
            </button>

            {/* Trust Badges */}
            <div className="product-page__trust">
              <div className="product-page__trust-item">
                <Truck size={18} />
                <span>Free shipping over $75</span>
              </div>
              <div className="product-page__trust-item">
                <RotateCcw size={18} />
                <span>30-day easy returns</span>
              </div>
              <div className="product-page__trust-item">
                <Shield size={18} />
                <span>2-year quality guarantee</span>
              </div>
            </div>

            {/* Details List */}
            <div className="product-page__details-list">
              <h3>Product Details</h3>
              <ul>
                {product.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
