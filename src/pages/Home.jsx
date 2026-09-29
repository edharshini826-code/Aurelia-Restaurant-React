import React from 'react';
import { MENU_ITEMS } from '../data/menuData';
import { MenuCard } from '../components/MenuCard';
import { StarRating } from '../components/StarRating';
import { INITIAL_REVIEWS } from '../data/restaurantData';

export const Home = ({ setView }) => {
  // Grab top 3 chef signature items
  const signatureDishes = MENU_ITEMS.filter((item) => item.isChefSpecial).slice(0, 3);

  return (
    <div className="home-view animate-fade-in">
      {/* --- HERO SECTION --- */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="section-container hero-content">
          <div className="hero-crest">⚜️</div>
          <span className="section-tag">ROYAL FINE DINING EXPERIENCE</span>
          <h1 className="hero-title">
            The Art of <span className="gold-text">Gastronomic Opulence</span>
          </h1>
          <p className="hero-description">
            Step into a sanctuary where contemporary European mastery blends with royal artisanal flavors. Indulge in bespoke multi-course menus, private candlelit enclaves, and unforgettable moments.
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => setView('menu')}>
              🍽️ Explore Menu & Order
            </button>
            <button className="btn btn-outline" onClick={() => setView('booking')}>
              🍷 Reserve Private Table
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="metrics-bar luxury-card">
            <div className="metric-item">
              <span className="metric-num">50+</span>
              <span className="metric-label">Artisanal Dishes</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-num">4.9★</span>
              <span className="metric-label">Over 1,200 Reviews</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-num">100%</span>
              <span className="metric-label">Organic Farm Sourced</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-num">VIP</span>
              <span className="metric-label">Private Dining Suites</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- CHEF'S SIGNATURE DELICACIES --- */}
      <section className="section-container">
        <div className="section-header">
          <span className="section-tag">CHEF'S MASTERPIECES</span>
          <h2 className="section-title">Culinary Signatures of Aurelia</h2>
          <p className="section-subtitle">
            Meticulously plated dishes that define our gastronomic legacy. Handcrafted with rare ingredients and unparalleled precision.
          </p>
        </div>

        <div className="menu-grid">
          {signatureDishes.map((dish) => (
            <MenuCard key={dish.id} item={dish} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <button className="btn btn-secondary" onClick={() => setView('menu')}>
            View Full Grand Menu ({MENU_ITEMS.length} Delicacies) →
          </button>
        </div>
      </section>

      {/* --- THE AURELIA DINING EXPERIENCE --- */}
      <section className="experience-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">THE AURELIA STANDARD</span>
            <h2 className="section-title">An Immersive Symphony for the Senses</h2>
            <p className="section-subtitle">
              Beyond world-class cuisine, every touchpoint at Aurelia is curated for tranquility, exclusivity, and joy.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card luxury-card">
              <div className="feature-icon">🕯️</div>
              <h3 className="feature-title">Candlelit Garden Ambiance</h3>
              <p className="feature-desc">
                Surround yourself with soft acoustic melodies, whispering garden fountains, and bespoke table settings under starry pergolas.
              </p>
            </div>

            <div className="feature-card luxury-card">
              <div className="feature-icon">👑</div>
              <h3 className="feature-title">Private VIP Royal Suites</h3>
              <p className="feature-desc">
                Dedicated dining rooms for celebrations, family milestones, and executive soirees with personal chef consultations.
              </p>
            </div>

            <div className="feature-card luxury-card">
              <div className="feature-icon">🎮</div>
              <h3 className="feature-title">Interactive Guest Lounge</h3>
              <p className="feature-desc">
                Relax in our interactive waiting lounge featuring digital puzzle recreations, candy matches, and our high-definition gallery.
              </p>
              <button 
                className="btn btn-outline btn-sm" 
                style={{ marginTop: '0.75rem' }}
                onClick={() => setView('lounge')}
              >
                Enter Guest Lounge →
              </button>
            </div>

            <div className="feature-card luxury-card">
              <div className="feature-icon">✨</div>
              <h3 className="feature-title">Zero Waiting Table Booking</h3>
              <p className="feature-desc">
                Reserve your favorite table view online and pre-select your culinary course so everything is ready the moment you arrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- GUEST TESTIMONIALS TEASER --- */}
      <section className="section-container">
        <div className="section-header">
          <span className="section-tag">EPICUREAN PRAISE</span>
          <h2 className="section-title">Words from Our Valued Guests</h2>
        </div>

        <div className="reviews-teaser-grid">
          {INITIAL_REVIEWS.map((rev) => (
            <div key={rev.id} className="testimonial-card luxury-card">
              <StarRating rating={rev.rating} size="1rem" />
              <p className="testimonial-comment">"{rev.comment}"</p>
              <div className="testimonial-author">
                <b>{rev.author}</b>
                <span>Dined on: <i>{rev.dish}</i></span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setView('reviews')}>
            Read All Reviews & Share Your Feedback →
          </button>
        </div>
      </section>

      {/* --- RESERVATION CALL TO ACTION BANNER --- */}
      <section className="section-container">
        <div className="cta-banner luxury-card">
          <div className="cta-content">
            <span className="section-tag">UNFORGETTABLE MEMORIES AWAIT</span>
            <h2 className="cta-title">Ready for an Extraordinary Evening?</h2>
            <p className="cta-desc">
              Book your private table now and explore our interactive culinary menu for pre-dining service.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => setView('booking')}>
                Reserve Your Table Now
              </button>
              <button className="btn btn-secondary" onClick={() => setView('menu')}>
                Explore Menu Items
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 82vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: radial-gradient(circle at center, #1b202c 0%, #0b0d11 75%);
          padding: 4rem 1.5rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 900px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .hero-crest {
          font-size: 2.8rem;
          margin-bottom: 0.5rem;
          filter: drop-shadow(0 0 16px rgba(212, 175, 55, 0.5));
        }
        .hero-title {
          margin-bottom: 1.25rem;
        }
        .gold-text {
          background: linear-gradient(135deg, var(--primary-gold-light), var(--primary-gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-description {
          font-size: 1.15rem;
          color: var(--text-secondary);
          max-width: 720px;
          margin-bottom: 2.2rem;
          line-height: 1.7;
        }
        .hero-buttons {
          display: flex;
          gap: 1.25rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }
        .metrics-bar {
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 100%;
          max-width: 850px;
          padding: 1.25rem 2rem;
          background: rgba(20, 23, 31, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border-medium);
        }
        .metric-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .metric-num {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--primary-gold-light);
        }
        .metric-label {
          font-size: 0.78rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .metric-divider {
          width: 1px;
          height: 35px;
          background: var(--border-solid);
        }
        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }
        .experience-section {
          background: #0f1218;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.75rem;
        }
        .feature-card {
          display: flex;
          flex-direction: column;
          padding: 2rem;
          background: var(--bg-card);
        }
        .feature-icon {
          font-size: 2.2rem;
          margin-bottom: 1rem;
        }
        .feature-title {
          font-size: 1.15rem;
          margin-bottom: 0.6rem;
          color: var(--primary-gold-light);
        }
        .feature-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.6;
        }
        .reviews-teaser-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .testimonial-card {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          padding: 1.75rem;
        }
        .testimonial-comment {
          font-size: 0.95rem;
          color: var(--text-secondary);
          font-style: italic;
          line-height: 1.6;
          flex: 1;
        }
        .testimonial-author {
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--border-solid);
          padding-top: 0.75rem;
          font-size: 0.85rem;
        }
        .testimonial-author b {
          color: var(--primary-gold-light);
        }
        .testimonial-author span {
          color: var(--text-muted);
          font-size: 0.78rem;
        }
        .cta-banner {
          background: linear-gradient(135deg, #1b202d 0%, #12141a 100%);
          border: 1px solid var(--border-medium);
          text-align: center;
          padding: 3.5rem 2rem;
          position: relative;
          overflow: hidden;
        }
        .cta-banner::before {
          content: '⚜️';
          position: absolute;
          top: -20px;
          right: 20px;
          font-size: 8rem;
          opacity: 0.04;
        }
        .cta-title {
          margin-bottom: 0.85rem;
        }
        .cta-desc {
          font-size: 1.05rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto 2rem auto;
        }
      `}</style>
    </div>
  );
};
