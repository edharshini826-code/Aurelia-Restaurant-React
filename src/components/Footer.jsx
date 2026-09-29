import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Footer = ({ setView }) => {
  return (
    <footer className="footer-wrapper">
      <div className="section-container footer-content">
        <div className="footer-grid">
          {/* Col 1: Brand & Bio */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <span className="footer-crest">⚜️</span>
              <span className="footer-title">AURELIA</span>
            </div>
            <p className="footer-tagline">{RESTAURANT_INFO.tagline}</p>
            <p className="footer-desc">
              Curating gastronomic opulence with heritage ingredients, modern European gastronomy, and personalized hospitality.
            </p>
            <div className="footer-socials">
              <span className="social-pill">Instagram</span>
              <span className="social-pill">Facebook</span>
              <span className="social-pill">TripAdvisor</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="footer-col">
            <h4 className="footer-heading">Culinary Views</h4>
            <ul className="footer-links">
              <li><button onClick={() => { setView('home'); window.scrollTo(0,0); }}>Home Experience</button></li>
              <li><button onClick={() => { setView('menu'); window.scrollTo(0,0); }}>Explore Menu & Order</button></li>
              <li><button onClick={() => { setView('booking'); window.scrollTo(0,0); }}>Table Reservation</button></li>
              <li><button onClick={() => { setView('lounge'); window.scrollTo(0,0); }}>Guest Lounge & Games</button></li>
              <li><button onClick={() => { setView('reviews'); window.scrollTo(0,0); }}>Guest Testimonials</button></li>
              <li><button onClick={() => { setView('cart'); window.scrollTo(0,0); }}>Cart & Billing</button></li>
            </ul>
          </div>

          {/* Col 3: Hours & Ambiance */}
          <div className="footer-col">
            <h4 className="footer-heading">Service Hours</h4>
            <div className="timing-box">
              <div className="timing-row">
                <span>Lunch Soirée:</span>
                <b>12:00 PM – 03:30 PM</b>
              </div>
              <div className="timing-row">
                <span>Sunset High Tea:</span>
                <b>04:00 PM – 06:30 PM</b>
              </div>
              <div className="timing-row">
                <span>Grand Dinner:</span>
                <b>07:00 PM – 11:30 PM</b>
              </div>
            </div>
            <p className="valet-note">✦ Complimentary valet parking & sommelier service.</p>
          </div>

          {/* Col 4: Location & Booking */}
          <div className="footer-col">
            <h4 className="footer-heading">Sanctuary Address</h4>
            <address className="footer-address">
              <p>📍 {RESTAURANT_INFO.address}</p>
              <p>📞 {RESTAURANT_INFO.phone}</p>
              <p>✉️ {RESTAURANT_INFO.email}</p>
            </address>
            <button 
              className="btn btn-primary btn-sm footer-book-btn"
              onClick={() => { setView('booking'); window.scrollTo(0,0); }}
            >
              Reserve a Table
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Aurelia Restaurant & Fine Dining. Crafted with React 18 & Vite.</p>
          <p className="student-credit">Student Project Portfolio — III CSE Section A</p>
        </div>
      </div>

      <style>{`
        .footer-wrapper {
          background: #08090c;
          border-top: 1px solid var(--border-subtle);
          color: var(--text-secondary);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1.3fr 1.3fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.75rem;
        }
        .footer-crest {
          font-size: 1.5rem;
        }
        .footer-title {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          color: var(--primary-gold-light);
          letter-spacing: 0.15em;
          font-weight: 800;
        }
        .footer-tagline {
          color: var(--primary-gold);
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }
        .footer-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }
        .footer-socials {
          display: flex;
          gap: 0.6rem;
        }
        .social-pill {
          font-size: 0.75rem;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          background: var(--bg-surface);
          border: 1px solid var(--border-solid);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .social-pill:hover {
          color: var(--primary-gold);
          border-color: var(--primary-gold);
        }
        .footer-heading {
          color: var(--text-primary);
          font-size: 1.05rem;
          margin-bottom: 1.25rem;
          position: relative;
          padding-bottom: 0.5rem;
        }
        .footer-heading::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 30px;
          height: 2px;
          background: var(--primary-gold);
        }
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .footer-links button {
          color: var(--text-muted);
          font-size: 0.88rem;
          text-align: left;
          transition: color var(--transition-fast), transform var(--transition-fast);
        }
        .footer-links button:hover {
          color: var(--primary-gold-light);
          transform: translateX(4px);
        }
        .timing-box {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }
        .timing-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .timing-row b {
          color: var(--text-primary);
        }
        .valet-note {
          font-size: 0.8rem;
          color: var(--primary-gold);
        }
        .footer-address {
          font-style: normal;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }
        .footer-book-btn {
          margin-top: 0.5rem;
        }
        .footer-bottom {
          padding-top: 2rem;
          border-top: 1px solid var(--border-solid);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .student-credit {
          color: var(--primary-gold);
        }
      `}</style>
    </footer>
  );
};
