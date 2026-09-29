import React, { useState } from 'react';
import { INITIAL_REVIEWS, FAQS } from '../data/restaurantData';
import { StarRating } from '../components/StarRating';
import { useCart } from '../context/CartContext';

export const Reviews = () => {
  const { showToast } = useCart();

  const [reviewsList, setReviewsList] = useState(INITIAL_REVIEWS);
  const [filterRating, setFilterRating] = useState(0); // 0 means all

  // Form states
  const [formData, setFormData] = useState({
    author: '',
    dish: 'Signature Dream Cake',
    rating: 5,
    comment: ''
  });

  const [errors, setErrors] = useState({});
  const [activeFaq, setActiveFaq] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.author.trim()) {
      errs.author = 'Your name is required.';
    } else if (formData.author.trim().length < 2) {
      errs.author = 'Name must be at least 2 characters.';
    }

    if (!formData.comment.trim()) {
      errs.comment = 'Review commentary is required.';
    } else if (formData.comment.trim().length < 10) {
      errs.comment = 'Please provide at least 10 characters of feedback.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newRev = {
        id: Date.now(),
        author: formData.author.trim(),
        rating: formData.rating,
        date: 'Just now',
        dish: formData.dish,
        comment: formData.comment.trim()
      };

      setReviewsList([newRev, ...reviewsList]);
      showToast('Thank you for sharing your dining review!', 'success');
      setFormData({
        author: '',
        dish: 'Signature Dream Cake',
        rating: 5,
        comment: ''
      });
      setErrors({});
    }
  };

  // Calculations
  const averageRating = (
    reviewsList.reduce((sum, r) => sum + r.rating, 0) / reviewsList.length
  ).toFixed(1);

  const filteredReviews = filterRating === 0
    ? reviewsList
    : reviewsList.filter((r) => r.rating === filterRating);

  return (
    <div className="reviews-view animate-fade-in">
      <div className="section-container">
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">VOICES OF CONNOISSEURS</span>
          <h1 className="section-title">Guest Reviews & Feedback</h1>
          <p className="section-subtitle">
            Explore authentic reflections from guests who dined at Aurelia, or share your own personal experience.
          </p>
        </div>

        {/* Rating Metrics Overview Bar */}
        <div className="rating-overview-bar luxury-card">
          <div className="overview-left">
            <span className="big-rating-number">{averageRating}</span>
            <div>
              <StarRating rating={+averageRating} size="1.25rem" />
              <span className="total-reviews-count">Based on {reviewsList.length} verified dining reflections</span>
            </div>
          </div>

          <div className="overview-filter">
            <span className="filter-label">Filter by Stars:</span>
            <div className="star-filter-buttons">
              {[0, 5, 4, 3].map((star) => (
                <button
                  key={star}
                  className={`star-f-btn ${filterRating === star ? 'active' : ''}`}
                  onClick={() => setFilterRating(star)}
                >
                  {star === 0 ? 'All' : `${star} ★`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Content Grid */}
        <div className="reviews-layout">
          {/* Left Column: Reviews Feed */}
          <div className="reviews-feed-column">
            <h3 className="column-title">
              {filterRating === 0 ? 'All Reviews' : `${filterRating}-Star Reviews`} ({filteredReviews.length})
            </h3>

            <div className="reviews-cards-list">
              {filteredReviews.map((rev) => (
                <div key={rev.id} className="review-card luxury-card animate-fade-in">
                  <div className="rev-header">
                    <div>
                      <h4 className="rev-author">{rev.author}</h4>
                      <span className="rev-dish">Dished experienced: <i>{rev.dish}</i></span>
                    </div>
                    <div className="rev-meta">
                      <StarRating rating={rev.rating} size="0.9rem" />
                      <span className="rev-date">{rev.date}</span>
                    </div>
                  </div>

                  <p className="rev-comment">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Controlled Feedback Submission Form */}
          <div className="form-column">
            <form onSubmit={handleSubmit} className="review-form luxury-card" noValidate>
              <h3 className="form-title">Leave Your Dining Review</h3>
              <p className="form-subtitle">Share your perspective on our dishes and ambiance.</p>

              {/* Author Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="revAuthor">
                  Your Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="revAuthor"
                  value={formData.author}
                  onChange={(e) => {
                    setFormData({ ...formData, author: e.target.value });
                    if (errors.author) setErrors({ ...errors, author: null });
                  }}
                  placeholder="e.g. Priyadharshini"
                  className={`form-input ${errors.author ? 'error' : ''}`}
                />
                {errors.author && <span className="form-error-msg">⚠️ {errors.author}</span>}
              </div>

              {/* Favorite Dish Experienced */}
              <div className="form-group">
                <label className="form-label" htmlFor="revDish">
                  Signature Dish Experienced
                </label>
                <select
                  id="revDish"
                  value={formData.dish}
                  onChange={(e) => setFormData({ ...formData, dish: e.target.value })}
                  className="form-select"
                >
                  <option value="Signature Dream Cake">Aurelia Signature Dream Cake</option>
                  <option value="Wild Mushroom Truffle Risotto">Wild Mushroom Truffle Risotto</option>
                  <option value="Golden Chicken Platter">Golden Chicken Platter</option>
                  <option value="Garlic Butter Tiger Prawns">Garlic Butter Tiger Prawns</option>
                  <option value="Chocolate Hazelnut Frappe">Chocolate Hazelnut Frappe</option>
                  <option value="Family Royal Feast Combo">Family Royal Feast Combo</option>
                </select>
              </div>

              {/* Star Rating Picker */}
              <div className="form-group">
                <label className="form-label">
                  Your Rating: <b className="gold-text">{formData.rating} of 5 Stars</b>
                </label>
                <div style={{ padding: '0.5rem 0' }}>
                  <StarRating
                    rating={formData.rating}
                    size="1.8rem"
                    interactive={true}
                    onRate={(r) => setFormData({ ...formData, rating: r })}
                  />
                </div>
              </div>

              {/* Commentary */}
              <div className="form-group">
                <label className="form-label" htmlFor="revComment">
                  Dining Commentary & Reflections <span className="required">*</span>
                </label>
                <textarea
                  id="revComment"
                  rows="4"
                  value={formData.comment}
                  onChange={(e) => {
                    setFormData({ ...formData, comment: e.target.value });
                    if (errors.comment) setErrors({ ...errors, comment: null });
                  }}
                  placeholder="Tell us about the culinary flavors, staff presentation, and atmosphere..."
                  className={`form-textarea ${errors.comment ? 'error' : ''}`}
                ></textarea>
                {errors.comment && <span className="form-error-msg">⚠️ {errors.comment}</span>}
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Submit Review
              </button>
            </form>
          </div>
        </div>

        {/* --- INTERACTIVE FAQ ACCORDION --- */}
        <div className="faqs-section">
          <div className="section-header" style={{ marginTop: '4rem' }}>
            <span className="section-tag">FREQUENTLY ASKED</span>
            <h2 className="section-title">Dining & Reservation Queries</h2>
          </div>

          <div className="faqs-container">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="faq-item luxury-card">
                  <button
                    className="faq-question-btn"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                  >
                    <span>{faq.question}</span>
                    <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer-panel animate-fade-in">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .rating-overview-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          margin-bottom: 2.5rem;
          background: #14171f;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .overview-left {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .big-rating-number {
          font-family: var(--font-serif);
          font-size: 2.8rem;
          font-weight: 800;
          color: var(--primary-gold-light);
          line-height: 1;
        }
        .total-reviews-count {
          display: block;
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-top: 2px;
        }
        .overview-filter {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .filter-label {
          font-size: 0.88rem;
          color: var(--text-muted);
        }
        .star-filter-buttons {
          display: flex;
          gap: 0.4rem;
        }
        .star-f-btn {
          padding: 0.35rem 0.75rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-solid);
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .star-f-btn.active {
          background: var(--primary-gold);
          color: #121316;
          border-color: var(--primary-gold);
        }
        .reviews-layout {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 2.5rem;
        }
        .column-title {
          font-size: 1.2rem;
          color: var(--primary-gold-light);
          margin-bottom: 1.25rem;
        }
        .reviews-cards-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .review-card {
          background: #14171f;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .rev-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .rev-author {
          font-size: 1.05rem;
          color: var(--text-primary);
        }
        .rev-dish {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .rev-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.2rem;
        }
        .rev-date {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .rev-comment {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
          font-style: italic;
        }
        .review-form {
          background: #14171f;
        }
        .form-title {
          font-size: 1.2rem;
          color: var(--primary-gold-light);
          margin-bottom: 0.25rem;
        }
        .form-subtitle {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }
        .faqs-container {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .faq-item {
          background: #14171f;
          padding: 0;
          overflow: hidden;
        }
        .faq-question-btn {
          width: 100%;
          text-align: left;
          padding: 1.25rem 1.5rem;
          font-size: 1.02rem;
          font-weight: 600;
          color: var(--text-primary);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: none;
        }
        .faq-question-btn:hover {
          color: var(--primary-gold-light);
        }
        .faq-toggle-icon {
          font-size: 1.4rem;
          color: var(--primary-gold);
          min-width: 24px;
          text-align: right;
        }
        .faq-answer-panel {
          padding: 0 1.5rem 1.25rem 1.5rem;
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
          border-top: 1px solid var(--border-solid);
          padding-top: 0.75rem;
        }
        @media (max-width: 900px) {
          .reviews-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
