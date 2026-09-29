import React, { useState, useMemo } from 'react';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/menuData';
import { MenuCard } from '../components/MenuCard';
import { useCart } from '../context/CartContext';

export const Menu = ({ setView }) => {
  const { totalItems, subtotal } = useCart();

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all', 'veg', 'non-veg'
  const [maxPrice, setMaxPrice] = useState(1500);
  const [onlyChefSpecials, setOnlyChefSpecials] = useState(false);
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-asc', 'price-desc', 'rating-desc'

  // Multi-facet filtering using useMemo
  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Search term matching
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchCat = item.category.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchCat) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Dietary filter
      if (dietaryFilter !== 'all' && item.dietary !== dietaryFilter) {
        return false;
      }

      // Price threshold
      if (item.price > maxPrice) {
        return false;
      }

      // Chef specials only
      if (onlyChefSpecials && !item.isChefSpecial) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      return 0; // 'featured' keeps original curated order
    });
  }, [searchTerm, selectedCategory, dietaryFilter, maxPrice, onlyChefSpecials, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setDietaryFilter('all');
    setMaxPrice(1500);
    setOnlyChefSpecials(false);
    setSortBy('featured');
  };

  const isFiltered =
    searchTerm !== '' ||
    selectedCategory !== 'all' ||
    dietaryFilter !== 'all' ||
    maxPrice < 1500 ||
    onlyChefSpecials ||
    sortBy !== 'featured';

  return (
    <div className="menu-view animate-fade-in">
      <div className="section-container">
        {/* View Header */}
        <div className="section-header">
          <span className="section-tag">GASTRONOMIC CATALOG</span>
          <h1 className="section-title">The Aurelia Culinary Menu</h1>
          <p className="section-subtitle">
            Browse our artisanal selection, filter by dietary preferences, search your cravings, and add to your order.
          </p>
        </div>

        {/* --- SEARCH & CONTROLS TOOLBAR --- */}
        <div className="menu-controls luxury-card">
          <div className="search-sort-row">
            {/* Search Input */}
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by dish name, herbs, or ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchTerm('')}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="sort-box">
              <label htmlFor="sort-select" className="sort-label">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="featured">✨ Featured & Chef Favorites</option>
                <option value="price-asc">💵 Price: Low to High</option>
                <option value="price-desc">💎 Price: High to Low</option>
                <option value="rating-desc">⭐ Highest Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="category-pills">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`cat-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-label">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Secondary Filters Bar */}
          <div className="secondary-filters-row">
            {/* Dietary Toggle */}
            <div className="filter-group">
              <span className="filter-title">Dietary:</span>
              <div className="dietary-buttons">
                <button
                  className={`diet-btn ${dietaryFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setDietaryFilter('all')}
                >
                  All
                </button>
                <button
                  className={`diet-btn diet-veg ${dietaryFilter === 'veg' ? 'active' : ''}`}
                  onClick={() => setDietaryFilter('veg')}
                >
                  🌿 Veg Only
                </button>
                <button
                  className={`diet-btn diet-nonveg ${dietaryFilter === 'non-veg' ? 'active' : ''}`}
                  onClick={() => setDietaryFilter('non-veg')}
                >
                  🥩 Non-Veg
                </button>
              </div>
            </div>

            {/* Price Slider */}
            <div className="filter-group price-slider-group">
              <div className="slider-header">
                <span className="filter-title">Max Price:</span>
                <b className="price-value">₹{maxPrice}</b>
              </div>
              <input
                type="range"
                min="100"
                max="1500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(+e.target.value)}
                className="price-slider"
              />
            </div>

            {/* Chef Specials Toggle */}
            <div className="filter-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={onlyChefSpecials}
                  onChange={(e) => setOnlyChefSpecials(e.target.checked)}
                />
                <span>👑 Chef's Secret Dishes Only</span>
              </label>
            </div>

            {/* Reset Button */}
            {isFiltered && (
              <button className="btn btn-outline btn-sm reset-btn" onClick={handleResetFilters}>
                ↺ Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Count Header */}
        <div className="results-header">
          <p className="results-count">
            Showing <b>{filteredDishes.length}</b> delicacies
            {selectedCategory !== 'all' && <span> in <i>{MENU_CATEGORIES.find(c => c.id === selectedCategory)?.label}</i></span>}
            {searchTerm && <span> matching "<i>{searchTerm}</i>"</span>}
          </p>
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length > 0 ? (
          <div className="menu-grid">
            {filteredDishes.map((dish) => (
              <MenuCard key={dish.id} item={dish} />
            ))}
          </div>
        ) : (
          <div className="no-results luxury-card">
            <span className="no-res-icon">🍽️</span>
            <h3>No Culinary Matches Found</h3>
            <p>We couldn't find any dishes matching your current filter criteria.</p>
            <button className="btn btn-primary" onClick={handleResetFilters}>
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Floating Bottom Quick Cart Indicator */}
      {totalItems > 0 && (
        <div className="floating-cart-bar animate-fade-in" onClick={() => setView('cart')}>
          <div className="floating-left">
            <span className="cart-badge-icon">🛍️</span>
            <div>
              <span className="float-items-text">{totalItems} item{totalItems === 1 ? '' : 's'} in Order</span>
              <span className="float-total-text">₹{subtotal}</span>
            </div>
          </div>
          <button className="btn btn-primary btn-sm float-view-btn">
            View Cart & Bill →
          </button>
        </div>
      )}

      <style>{`
        .menu-controls {
          padding: 1.75rem;
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          background: #14171f;
        }
        .search-sort-row {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
        }
        .search-box {
          position: relative;
          flex: 1;
          min-width: 280px;
        }
        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1rem;
          color: var(--text-muted);
        }
        .search-input {
          width: 100%;
          padding: 0.85rem 2.5rem 0.85rem 2.8rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-solid);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }
        .search-input:focus {
          outline: none;
          border-color: var(--primary-gold);
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2);
        }
        .clear-search-btn {
          position: absolute;
          right: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          font-size: 0.85rem;
          padding: 4px;
        }
        .clear-search-btn:hover {
          color: var(--text-primary);
        }
        .sort-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .sort-label {
          font-size: 0.88rem;
          color: var(--text-muted);
          white-space: nowrap;
        }
        .sort-select {
          padding: 0.85rem 1rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-solid);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          cursor: pointer;
        }
        .sort-select:focus {
          outline: none;
          border-color: var(--primary-gold);
        }
        .category-pills {
          display: flex;
          gap: 0.6rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }
        .cat-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.25rem;
          border-radius: var(--radius-full);
          background: var(--bg-surface);
          border: 1px solid var(--border-solid);
          color: var(--text-secondary);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all var(--transition-fast);
        }
        .cat-pill:hover {
          border-color: var(--primary-gold);
          color: var(--primary-gold-light);
        }
        .cat-pill.active {
          background: linear-gradient(135deg, var(--primary-gold-light), var(--primary-gold));
          color: #0e1014;
          border-color: var(--primary-gold);
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        }
        .secondary-filters-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.25rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-solid);
        }
        .filter-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .filter-title {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .dietary-buttons {
          display: flex;
          gap: 0.35rem;
        }
        .diet-btn {
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
          background: var(--bg-surface);
          border: 1px solid var(--border-solid);
          color: var(--text-secondary);
        }
        .diet-btn.active {
          background: var(--border-medium);
          color: var(--text-primary);
          border-color: var(--primary-gold);
        }
        .diet-btn.diet-veg.active {
          background: rgba(39, 174, 96, 0.25);
          color: #2ecc71;
          border-color: #2ecc71;
        }
        .diet-btn.diet-nonveg.active {
          background: rgba(192, 57, 43, 0.25);
          color: #e74c3c;
          border-color: #e74c3c;
        }
        .price-slider-group {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.25rem;
          min-width: 170px;
        }
        .slider-header {
          display: flex;
          justify-content: space-between;
          width: 100%;
          font-size: 0.85rem;
        }
        .price-value {
          color: var(--primary-gold-light);
        }
        .price-slider {
          width: 100%;
          accent-color: var(--primary-gold);
          cursor: pointer;
        }
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
          cursor: pointer;
        }
        .checkbox-label input {
          accent-color: var(--primary-gold);
        }
        .results-header {
          margin-bottom: 1.5rem;
        }
        .results-count {
          font-size: 0.95rem;
          color: var(--text-muted);
        }
        .results-count b {
          color: var(--text-primary);
        }
        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }
        .no-results {
          text-align: center;
          padding: 4rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .no-res-icon {
          font-size: 3rem;
          opacity: 0.5;
        }
        .floating-cart-bar {
          position: fixed;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          background: #191d27;
          border: 1px solid var(--primary-gold);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(212, 175, 55, 0.3);
          border-radius: var(--radius-full);
          padding: 0.65rem 1.4rem;
          display: flex;
          align-items: center;
          gap: 2rem;
          z-index: 950;
          cursor: pointer;
          max-width: 90vw;
        }
        .floating-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .cart-badge-icon {
          font-size: 1.3rem;
        }
        .float-items-text {
          display: block;
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .float-total-text {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--primary-gold-light);
        }
      `}</style>
    </div>
  );
};
