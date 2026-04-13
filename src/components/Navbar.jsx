import { memo, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../CartContext';
import { useWishlist } from '../WishlistContext';
import './Navbar.css';

const defaultNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/#collections' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Wishlist', href: '/wishlist' },
];

const Navbar = memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const navLinks = defaultNavLinks;

  useEffect(() => {
    const onScroll = () => {
      if (isHome) setScrolled(window.scrollY > 40);
      else setScrolled(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (!isHome) setScrolled(true);
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.replace('/#', '');
      if (location.pathname !== '/') {
        window.location.href = href;
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
<Link to="/" className="navbar__logo">
          <img 
            src={isHome && !scrolled ? "/images/logo.png" : "/images/logo1.png"} 
            alt="Cotton Connection" 
            className={`navbar__logo-img ${isHome && !scrolled ? 'navbar__logo-img--large' : ''}`}
          />
        </Link>

        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.label}>
              {link.href.startsWith('/#') ? (
                <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                  {link.label}
                </a>
              ) : (
                <Link to={link.href}>{link.label}</Link>
              )}
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <Link to="/wishlist" className="navbar__wishlist" aria-label="Wishlist">
            <Heart size={22} strokeWidth={1.8} />
            {wishlistItems.length > 0 && (
              <span className="navbar__cart-badge" key={wishlistItems.length}>
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="navbar__cart" aria-label="Shopping cart">
            <ShoppingBag size={22} strokeWidth={1.8} />
            {totalItems > 0 && (
              <span className="navbar__cart-badge" key={totalItems}>
                {totalItems}
              </span>
            )}
          </Link>
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? 'open' : ''}`}>
        <button className="navbar__mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          <X size={24} />
        </button>
        <ul className="navbar__mobile-links">
          {navLinks.map((link, i) => (
            <li key={link.label} style={{ transitionDelay: `${i * 0.06}s` }}>
              {link.href.startsWith('/#') ? (
                <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                  {link.label}
                </a>
              ) : (
                <Link to={link.href}>{link.label}</Link>
              )}
            </li>
          ))}
          <li style={{ transitionDelay: `${navLinks.length * 0.06}s` }}>
            <Link to="/cart" className="navbar__mobile-cart-link">
              <ShoppingBag size={18} /> Cart ({totalItems})
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
});

export default Navbar;
