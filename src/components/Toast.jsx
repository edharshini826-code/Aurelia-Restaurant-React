import React from 'react';
import { useCart } from '../context/CartContext';

export const Toast = () => {
  const { toast } = useCart();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'info': return 'ℹ';
      default: return '✦';
    }
  };

  return (
    <div className={`toast-container toast-${toast.type} animate-fade-in`}>
      <span className="toast-icon">{getIcon()}</span>
      <span className="toast-message">{toast.message}</span>

      <style>{`
        .toast-container {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: #14171f;
          border: 1px solid var(--border-medium);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(212, 175, 55, 0.2);
          border-radius: var(--radius-md);
          padding: 0.85rem 1.4rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          z-index: 2000;
          color: var(--text-primary);
          max-width: 400px;
        }
        .toast-icon {
          width: 26px;
          height: 26px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.85rem;
        }
        .toast-success .toast-icon {
          background: rgba(39, 174, 96, 0.2);
          color: #2ecc71;
          border: 1px solid #2ecc71;
        }
        .toast-error .toast-icon {
          background: rgba(192, 57, 43, 0.2);
          color: #e74c3c;
          border: 1px solid #e74c3c;
        }
        .toast-info .toast-icon {
          background: rgba(212, 175, 55, 0.2);
          color: var(--primary-gold);
          border: 1px solid var(--primary-gold);
        }
        .toast-message {
          font-size: 0.92rem;
          font-weight: 500;
        }
        @media (max-width: 480px) {
          .toast-container {
            bottom: 1rem;
            right: 1rem;
            left: 1rem;
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
};
