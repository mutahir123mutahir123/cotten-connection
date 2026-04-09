import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../CartContext';
import './CartPage.css';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-page__empty">
            <div className="cart-page__empty-icon">
              <ShoppingBag size={48} strokeWidth={1.2} />
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/shop" className="btn btn-primary btn-lg">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-page__header">
          <Link to="/shop" className="cart-page__back">
            <ArrowLeft size={18} /> Continue Shopping
          </Link>
          <h1>Your Cart</h1>
          <p>{items.length} item{items.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="cart-page__layout">
          {/* Items */}
          <div className="cart-page__items">
            {items.map((item) => (
              <div className="cart-item" key={`${item.id}-${item.color}`}>
                <Link to={`/product/${item.id}`} className="cart-item__image">
                  <img src={item.image} alt={item.name} />
                </Link>

                <div className="cart-item__details">
                  <Link to={`/product/${item.id}`} className="cart-item__name">
                    {item.name}
                  </Link>
                  <span className="cart-item__color">Color: {item.color}</span>
                  <span className="cart-item__price">${item.price.toFixed(2)}</span>
                </div>

                <div className="cart-item__actions">
                  <div className="cart-item__quantity">
                    <button onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}>
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}>
                      <Plus size={14} />
                    </button>
                  </div>

                  <span className="cart-item__subtotal">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>

                  <button
                    className="cart-item__remove"
                    onClick={() => removeItem(item.id, item.color)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-page__summary">
            <div className="cart-summary">
              <h3>Order Summary</h3>

              <div className="cart-summary__row">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="cart-summary__row">
                <span>Shipping</span>
                <span>{totalPrice >= 75 ? <span className="cart-summary__free">Free</span> : '$9.99'}</span>
              </div>
              {totalPrice < 75 && (
                <p className="cart-summary__shipping-note">
                  Add ${(75 - totalPrice).toFixed(2)} more for free shipping!
                </p>
              )}

              <div className="cart-summary__divider" />

              <div className="cart-summary__row cart-summary__total">
                <span>Total</span>
                <span>${(totalPrice + (totalPrice >= 75 ? 0 : 9.99)).toFixed(2)}</span>
              </div>

              <button className="btn btn-primary btn-lg cart-summary__checkout">
                Proceed to Checkout
              </button>

              <button className="cart-summary__clear" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
