import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export const Navbar = ({ currentView, setView }) => {
  const { totalItems, booking } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu & Order' },
    { id: 'booking', label: 'Table Booking', badge: booking ? 'Reserved' : null },
    { id: 'lounge', label: 'Guest Lounge' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'cart', label: 'Cart & Bill', count: totalItems }
  ];

  const handleNavClick = (viewId) => {
    setView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-wrapper">
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="navbar-brand" onClick={() => handleNavClick('home')}>
          <span className="brand-crest">⚜️</span>
          <div className="brand-titles">
            <span className="brand-name">AURELIA</span>
            <span className="brand-sub">LUXURY DINING</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${currentView === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
              {item.count !== undefined && item.count > 0 && (
                <span className="cart-pill pulse-badge">{item.count}</span>
              )}
              {item.badge && (
                <span className="booking-pill">{item.badge}</span>
              )}
            </button>
          ))}
          
          <button 
            className="btn btn-primary btn-sm nav-cta"
            onClick={() => handleNavClick('booking')}
          >
            Book a Table
          </button>
        </nav>

        {/* Mobile Toggle Button */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      <style>{`
        .navbar-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 80px;
          background: rgba(14, 16, 20, 0.92);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--border-subtle);
          z-index: 999;
          display: flex;
          align-items: center;
        }
        .navbar-container {
          max-width: 1240px;
          width: 100%;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          user-select: none;
        }
        .brand-crest {
          font-size: 1.8rem;
          filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.4));
        }
        .brand-titles {
          display: flex;
          flex-direction: column;
        }
        .brand-name {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          color: var(--primary-gold-light);
          line-height: 1;
        }
        .brand-sub {
          font-size: 0.65rem;
          letter-spacing: 0.28em;
          color: var(--text-muted);
          font-weight: 600;
          margin-top: 2px;
        }
        .nav-menu {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .nav-link {
          font-size: 0.92rem;
          font-weight: 500;
          color: var(--text-secondary);
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.5rem 0.25rem;
          transition: color var(--transition-fast);
        }
        .nav-link:hover {
          color: var(--primary-gold);
        }
        .nav-link.active {
          color: var(--primary-gold);
          font-weight: 700;
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--primary-gold);
          border-radius: var(--radius-full);
          box-shadow: 0 0 8px var(--primary-gold);
        }
        .cart-pill {
          background: var(--primary-gold);
          color: #0b0d11;
          font-size: 0.75rem;
          font-weight: 700;
          min-width: 20px;
          height: 20px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 5px;
        }
        .booking-pill {
          background: rgba(39, 174, 96, 0.2);
          color: #2ecc71;
          border: 1px solid rgba(39, 174, 96, 0.4);
          font-size: 0.68rem;
          font-weight: 700;
          border-radius: var(--radius-full);
          padding: 1px 6px;
        }
        .nav-cta {
          margin-left: 0.5rem;
        }
        .mobile-toggle {
          display: none;
          font-size: 1.6rem;
          color: var(--primary-gold);
        }
        @media (max-width: 900px) {
          .mobile-toggle {
            display: block;
          }
          .nav-cta {
            margin-left: 0;
            width: 100%;
          }
        }
      `}</style>
    </header>
  );
};
