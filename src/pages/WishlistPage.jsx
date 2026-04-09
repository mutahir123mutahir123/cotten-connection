import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '../WishlistContext';
import { useCart } from '../CartContext';
import './WishlistPage.css';

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (product) => {
    addItem(product, product.colors?.[0]);
    removeItem(product.id);
  };

  return (
    <div className="wishlist-page">
      <div className="container">
        <h1 className="wishlist-page__title">My Wishlist</h1>
        
        {items.length === 0 ? (
          <div className="wishlist-page__empty">
            <Heart size={48} strokeWidth={1.5} />
            <p>Your wishlist is empty</p>
            <Link to="/shop" className="btn btn-primary">Browse Products</Link>
          </div>
        ) : (
          <div className="wishlist-page__grid">
            {items.map((product) => (
              <div key={product.id} className="wishlist-card">
                <Link to={`/product/${product.id}`} className="wishlist-card__image-link">
                  <img src={product.image} alt={product.name} className="wishlist-card__image" />
                </Link>
                <div className="wishlist-card__info">
                  <Link to={`/product/${product.id}`} className="wishlist-card__name">
                    {product.name}
                  </Link>
                  <span className="wishlist-card__category">{product.category}</span>
                  <span className="wishlist-card__price">${product.price.toFixed(0)}</span>
                  <div className="wishlist-card__actions">
                    <button 
                      className="wishlist-card__add-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                    <button 
                      className="wishlist-card__remove-btn"
                      onClick={() => removeItem(product.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}