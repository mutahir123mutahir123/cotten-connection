import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingBag, ChevronRight } from 'lucide-react';
import { useCart } from '../CartContext';
import { useScrollReveal, useStaggerReveal } from '../hooks';
import { useCollection, useProducts, useCollections } from '../hooks/useData.jsx';
import './CollectionPage.css';

export default function CollectionPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const { collection, loading: collectionLoading } = useCollection(id);
  const { products, loading: productsLoading } = useProducts();
  const { collections: allCollections, loading: collectionsLoading } = useCollections();
  const headerRef = useScrollReveal();
  const gridRef = useStaggerReveal(null, '.product-card', 120);

  const collectionProducts = useMemo(() => {
    if (!collection) return [];
    const matched = products.filter((p) => p.category === collection.category);
    return matched.length > 0 ? matched : products;
  }, [collection, products]);

  if (collectionLoading || productsLoading || collectionsLoading) {
    return (
      <div className="collection-page">
        <div className="container" style={{ paddingTop: 'calc(var(--navbar-height) + 80px)', textAlign: 'center' }}>
          <p>Loading collection...</p>
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="collection-page">
        <div className="container" style={{ paddingTop: 'calc(var(--navbar-height) + 80px)', textAlign: 'center' }}>
          <h2>Collection not found</h2>
          <p style={{ color: 'var(--color-warm-grey)', margin: '16px 0 32px' }}>
            The collection you're looking for doesn't exist.
          </p>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="collection-page">
      {/* Hero Banner */}
      <div className="collection-page__hero">
        <div className="collection-page__hero-bg">
          <img src={collection.heroImage} alt={collection.name} />
        </div>
        <div className="collection-page__hero-overlay" />
        <div className="collection-page__hero-content container">
          <nav className="collection-page__breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <Link to="/#collections">Collections</Link>
            <ChevronRight size={14} />
            <span>{collection.name}</span>
          </nav>
          <h1>{collection.name}</h1>
          <p>{collection.longDescription}</p>
        </div>
      </div>

      <div className="container">
        {/* Subcategories */}
        {collection.subcategories && (
          <div className="collection-page__subcategories">
            <button className="collection-page__subcat active">All {collection.name}</button>
            {collection.subcategories.map((sub) => (
              <button className="collection-page__subcat" key={sub}>{sub}</button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        <div className="section-header reveal" ref={headerRef}>
          <h2>{collection.name} Collection</h2>
          <p>{collection.count} products available</p>
          <div className="gold-line" />
        </div>

        <div className="collection-page__grid" ref={gridRef}>
          {collectionProducts.map((product) => (
            <div className="product-card reveal" key={product.id}>
              <Link to={`/product/${product.id}`} className="product-card__image-wrap">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-card__image"
                  loading="lazy"
                />
                {product.badge && (
                  <span className={`product-card__badge ${product.badge === 'Sale' ? 'badge--sale' : ''}`}>
                    {product.badge}
                  </span>
                )}
                <div className="product-card__quick-view">
                  <span>Quick View</span>
                </div>
              </Link>

              <div className="product-card__info">
                <Link to={`/product/${product.id}`}>
                  <h3 className="product-card__title">{product.name}</h3>
                </Link>

                <div className="product-card__rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span className="product-card__reviews">({product.reviews})</span>
                </div>

                <div className="product-card__price-row">
                  <span className="product-card__price">AED {product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="product-card__original-price">
                      AED {product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <button
                  className="btn btn-primary product-card__add-btn"
                  onClick={() => addItem(product, product.colors?.[0])}
                >
                  <ShoppingBag size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Explore other collections */}
        <div className="collection-page__other">
          <h2>Explore Other Collections</h2>
          <div className="collection-page__other-grid">
            {allCollections
              .filter((c) => c.id !== id)
              .slice(0, 4)
              .map((col) => (
                <Link to={`/collection/${col.id}`} className="collection-page__other-card" key={col.id}>
                  <img src={col.image} alt={col.name} loading="lazy" />
                  <div className="collection-page__other-overlay" />
                  <div className="collection-page__other-info">
                    <h3>{col.name}</h3>
                    <span>{col.count} items →</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
