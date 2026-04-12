import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import './ContactPage.css';

export default function ContactPage() {
  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Our team is ready to help.</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Contact Information</h2>
              
              <div className="contact-info-item">
                <MapPin size={20} />
                <div>
                  <h4>Visit Us</h4>
                  <p>123 Cotton Street<br />New York, NY 10001</p>
                </div>
              </div>

              <div className="contact-info-item">
                <Phone size={20} />
                <div>
                  <h4>Call Us</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="contact-info-item">
                <Mail size={20} />
                <div>
                  <h4>Email Us</h4>
                  <p>hello@cottonconnection.com</p>
                </div>
              </div>

              <div className="contact-info-item">
                <Clock size={20} />
                <div>
                  <h4>Hours</h4>
                  <p>Mon - Fri: 9AM - 6PM<br />Sat - Sun: 10AM - 4PM</p>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <h2>Send a Message</h2>
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Your name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Your email" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" placeholder="How can we help?" />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" rows="5" placeholder="Your message..."></textarea>
                </div>

                <button type="submit" className="contact-submit">
                  <Send size={18} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}