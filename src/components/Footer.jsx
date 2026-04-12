import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import './Footer.css';

const Footer = memo(function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <img src="/images/logo1.png" alt="Cotton Connection" className="footer__logo-img" />
            </Link>
            <p className="footer__tagline">
              Luxury comfort, everyday. Premium cotton textiles crafted
              for those who value quality and style.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4 className="footer__heading">Quick Links</h4>
            <ul className="footer__links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop All</Link></li>
              <li><a href="/#collections">Collections</a></li>
              <li><a href="/#about">About Us</a></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div className="footer__col">
            <h4 className="footer__heading">Help</h4>
            <ul className="footer__links">
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shipping &amp; Delivery</a></li>
              <li><a href="#">Returns &amp; Exchanges</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="footer__col">
            <h4 className="footer__heading">Follow Us</h4>
            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="footer__social" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="footer__social" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
            <p className="footer__social-text">
              @cottonconnection
            </p>
          </div>
        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {year} Cotton Connection. All rights reserved.
          </p>

          <div className="footer__payments">
            <span className="footer__payment-icon">Visa</span>
            <span className="footer__payment-icon">MC</span>
            <span className="footer__payment-icon">Amex</span>
            <span className="footer__payment-icon">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
