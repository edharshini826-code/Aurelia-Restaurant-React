import React, { useState } from 'react';
import { StarRating } from './StarRating';
import { useCart } from '../context/CartContext';

export const MenuCard = ({ item }) => {
  const { addToCart, cart } = useCart();
  const [qty, setQty] = useState(1);

  // Check if item is already in cart
  const cartItem = cart.find((i) => i.id === item.id);
  const inCartQty = cartItem ? cartItem.qty : 0;

  const getImageUrl = (imgName) => {
    try {
      return new URL(`../assets/images/${imgName}`, import.meta.url).href;
    } catch {
      return '';
    }
  };

  const handleAdd = () => {
    addToCart(item, qty);
    setQty(1);
  };

  return (
    <div className="menu-card luxury-card">
      <div className="card-media">
        <img
          src={getImageUrl(item.image)}
          alt={item.name}
          className="card-img"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80';
          }}
        />
        <div className="card-badges">
          <span className={`badge ${item.dietary === 'veg' ? 'badge-veg' : 'badge-nonveg'}`}>
            {item.dietary === 'veg' ? '🌿 Pure Veg' : '🥩 Non-Veg'}
          </span>
          {item.isChefSpecial && (
            <span className="badge badge-gold">👑 Chef's Secret</span>
          )}
        </div>
        <span className="prep-time-badge">⏱ {item.prepTime}</span>
      </div>

      <div className="card-body">
        <div className="card-header-row">
          <h3 className="card-title">{item.name}</h3>
          <span className="calorie-tag">{item.calories}</span>
        </div>

        <div className="card-meta">
          <StarRating rating={item.rating} size="0.9rem" />
          <span className="rating-text">{item.rating} ({item.reviews})</span>
        </div>

        <p className="card-desc">{item.description}</p>

        <div className="card-footer-row">
          <div className="price-tag">
            <span className="currency">₹</span>
            <span className="amount">{item.price}</span>
          </div>

          <div className="card-actions">
            <div className="qty-stepper">
              <button 
                type="button" 
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span>{qty}</span>
              <button 
                type="button" 
                onClick={() => setQty((q) => Math.min(20, q + 1))}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              className="btn btn-primary btn-sm add-cart-btn"
              onClick={handleAdd}
            >
              Add {inCartQty > 0 ? `(${inCartQty})` : ''}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .menu-card {
          display: flex;
          flex-direction: column;
          padding: 0;
          overflow: hidden;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
        }
        .menu-card:hover {
          transform: translateY(-5px);
          border-color: var(--border-medium);
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(212, 175, 55, 0.15);
        }
        .card-media {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
          background: #14171f;
        }
        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .menu-card:hover .card-img {
          transform: scale(1.06);
        }
        .card-badges {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }
        .prep-time-badge {
          position: absolute;
          bottom: 0.75rem;
          right: 0.75rem;
          background: rgba(14, 16, 20, 0.85);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-secondary);
          font-size: 0.75rem;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          font-weight: 500;
        }
        .card-body {
          padding: 1.4rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .card-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 0.5rem;
          margin-bottom: 0.35rem;
        }
        .card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .calorie-tag {
          font-size: 0.75rem;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.05);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-sm);
          white-space: nowrap;
        }
        .card-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.65rem;
        }
        .rating-text {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .card-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 1.25rem;
          flex: 1;
        }
        .card-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding-top: 0.85rem;
          border-top: 1px solid var(--border-solid);
        }
        .price-tag {
          display: flex;
          align-items: baseline;
          color: var(--primary-gold-light);
          font-family: var(--font-serif);
          font-weight: 700;
        }
        .price-tag .currency {
          font-size: 0.95rem;
          margin-right: 2px;
        }
        .price-tag .amount {
          font-size: 1.35rem;
        }
        .card-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      `}</style>
    </div>
  );
};
