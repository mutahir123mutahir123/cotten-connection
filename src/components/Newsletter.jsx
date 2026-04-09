import { useState } from 'react';
import { Check, Loader2, Lock } from 'lucide-react';
import { useScrollReveal } from '../hooks';
import './Newsletter.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const sectionRef = useScrollReveal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section className="newsletter section section-pink" id="newsletter">
      <div className="newsletter__bg-shapes" aria-hidden="true">
        <div className="newsletter__shape newsletter__shape--1" />
        <div className="newsletter__shape newsletter__shape--2" />
        <div className="newsletter__shape newsletter__shape--3" />
      </div>

      <div className="container container-narrow reveal" ref={sectionRef}>
        <div className="newsletter__content">
          <h2>Join the Cotton Connection Club</h2>
          <p className="newsletter__subtitle">
            Get <strong>15% off</strong> your first order + exclusive access to
            new collections and special offers
          </p>

          {status === 'success' ? (
            <div className="newsletter__success">
              <div className="newsletter__success-icon">
                <Check size={28} />
              </div>
              <p>You're in! Check your inbox for your 15% off code.</p>
            </div>
          ) : (
            <form className="newsletter__form" onSubmit={handleSubmit}>
              <div className="newsletter__input-group">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter__input"
                  required
                  disabled={status === 'loading'}
                />
                <button
                  type="submit"
                  className="btn btn-primary newsletter__submit"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <Loader2 size={18} className="spin" />
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>
            </form>
          )}

          <p className="newsletter__privacy">
            <Lock size={13} />
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
