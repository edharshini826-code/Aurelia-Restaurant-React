import React from 'react';

export const StarRating = ({ rating = 5, maxStars = 5, interactive = false, onRate = null, size = '1rem' }) => {
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    const isFilled = i <= Math.round(rating);
    stars.push(
      <span
        key={i}
        onClick={() => interactive && onRate && onRate(i)}
        style={{
          cursor: interactive ? 'pointer' : 'default',
          color: isFilled ? 'var(--primary-gold)' : 'var(--border-solid)',
          fontSize: size,
          transition: 'color 0.15s ease, transform 0.15s ease',
          display: 'inline-block'
        }}
        className={interactive ? 'star-interactive' : ''}
        title={`${i} Stars`}
      >
        ★
      </span>
    );
  }

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
      {stars}
    </div>
  );
};
