import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, SlidersHorizontal, X, Heart } from 'lucide-react';
import { useCart } from '../CartContext';
import { products } from '../data';
import './ShopPage.css';

const categories = ['All', 'Towels', 'Bathrobes', 'Bed Sheets', 'Pillow Covers'];
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function ShopPage() {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const filtered = useMemo(() => {
    let items = [...products];
    if (activeCategory !== 'All') {
      items = items.filter((p) => p.category === activeCategory);
    }
    switch (sortBy) {
      case 'price-low': items.sort((a, b) => a.price - b.price); break;
      case 'price-high': items.sort((a, b) => b.price - a.price); break;
      case 'rating': items.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return items;
  }, [activeCategory, sortBy]);

  return (
    <div className="shop-page">
      {/* Banner */}
      <div className="shop-page__banner">
        <img 
          src="https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=1920&h=400&fit=crop" 
          alt="Shop Banner" 
          className="shop-page__banner-img"
        />
        <div className="shop-page__banner-overlay"></div>
        <div className="shop-page__banner-content">
          <h1>Shop</h1>
          <p>Premium Cotton Essentials</p>
        </div>
      </div>

      <div className="container">
        {/* Toolbar */}
        <div className="shop-page__toolbar">
          <div className="shop-page__categories">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`shop-page__cat-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="shop-page__sort-wrap">
            <button
              className="shop-page__filter-toggle"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
            <select
              className="shop-page__sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results info */}
        <p className="shop-page__results">
          Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          {activeCategory !== 'All' && (
            <button className="shop-page__clear-filter" onClick={() => setActiveCategory('All')}>
              <X size={14} /> Clear filter
            </button>
          )}
        </p>

        {/* Products Grid */}
        <div className="shop-page__grid">
          {filtered.map((product) => (
            <div 
              className="shop-product-card" 
              key={product.id}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="shop-product-card__image-wrap">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="shop-product-card__image"
                    loading="lazy"
                  />
                </Link>
                {product.badge && (
                  <span className={`shop-product-card__badge ${product.badge === 'Sale' ? 'badge--sale' : ''}`}>
                    {product.badge}
                  </span>
                )}
                <button className="shop-product-card__wishlist">
                  <Heart size={18} />
                </button>
                <button 
                  className={`shop-product-card__quick-add ${hoveredProduct === product.id ? 'visible' : ''}`}
                  onClick={() => addItem(product, product.colors?.[0])}
                >
                  <ShoppingBag size={16} /> Add to Cart
                </button>
              </div>

              <div className="shop-product-card__info">
                <Link to={`/product/${product.id}`}>
                  <h3 className="shop-product-card__title">{product.name}</h3>
                </Link>
                <div className="shop-product-card__price-row">
                  <span className="shop-product-card__price">AED {product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="shop-product-card__original-price">AED {product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
                <div className="shop-product-card__rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill={i < Math.floor(product.rating) ? '#C9A96E' : 'none'} color="#C9A96E" />
                    ))}
                  </div>
                  <span className="shop-product-card__reviews">({product.reviews})</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="shop-page__empty">
            <p>No products found in this category.</p>
            <button className="btn btn-secondary" onClick={() => setActiveCategory('All')}>
              View All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
