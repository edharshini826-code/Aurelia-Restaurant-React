import React from 'react';
import { RESTAURANT_TABLES } from '../data/restaurantData';

export const TableMap = ({ selectedTableId, onSelectTable, guestCount = 2 }) => {
  return (
    <div className="table-map-container luxury-card">
      <div className="map-header">
        <h4 className="map-title">Interactive Dining Floor Map</h4>
        <div className="map-legend">
          <span className="legend-item"><span className="legend-dot available"></span> Available</span>
          <span className="legend-item"><span className="legend-dot selected"></span> Selected</span>
          <span className="legend-item"><span className="legend-dot occupied"></span> Reserved</span>
        </div>
      </div>

      <p className="map-instructions">
        Select your preferred table setting. Tables highlighted with a gold crown are optimal for your party size of <b>{guestCount}</b> guests.
      </p>

      <div className="tables-grid">
        {RESTAURANT_TABLES.map((t) => {
          const isSelected = selectedTableId === t.id;
          const isOccupied = t.status === 'occupied';
          const isGoodFit = t.capacity >= guestCount && t.capacity <= guestCount + 2;

          return (
            <div
              key={t.id}
              className={`table-node ${isSelected ? 'selected' : ''} ${isOccupied ? 'occupied' : 'available'} ${isGoodFit ? 'good-fit' : ''}`}
              onClick={() => {
                if (!isOccupied) onSelectTable(t);
              }}
            >
              <div className="table-top">
                <span className="table-name">{t.name}</span>
                {isGoodFit && !isOccupied && <span className="fit-badge" title="Recommended for party size">👑</span>}
              </div>

              <div className="table-capacity">
                <span>👥 {t.capacity} Guests</span>
              </div>

              <span className="table-zone">{t.zone}</span>

              <div className="table-status-label">
                {isOccupied ? 'Occupied' : isSelected ? 'Selected' : 'Available'}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .table-map-container {
          margin-bottom: 2rem;
          background: #14171f;
        }
        .map-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }
        .map-title {
          font-family: var(--font-serif);
          color: var(--primary-gold-light);
          font-size: 1.15rem;
        }
        .map-legend {
          display: flex;
          gap: 1.25rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .legend-dot {
          width: 10px;
          height: 10px;
          border-radius: var(--radius-full);
        }
        .legend-dot.available { background: var(--accent-emerald); }
        .legend-dot.selected { background: var(--primary-gold); box-shadow: 0 0 8px var(--primary-gold); }
        .legend-dot.occupied { background: #555b6e; }

        .map-instructions {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }
        .tables-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
          gap: 1rem;
        }
        .table-node {
          padding: 1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-solid);
          background: var(--bg-card);
          transition: all var(--transition-fast);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          position: relative;
        }
        .table-node.available:hover {
          border-color: var(--primary-gold);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.15);
        }
        .table-node.selected {
          border-color: var(--primary-gold);
          background: rgba(212, 175, 55, 0.12);
          box-shadow: 0 0 16px rgba(212, 175, 55, 0.3);
        }
        .table-node.occupied {
          opacity: 0.45;
          cursor: not-allowed;
          background: #111317;
          border-color: #252830;
        }
        .table-node.good-fit.available {
          border-left: 3px solid var(--primary-gold);
        }
        .table-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .table-name {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-primary);
        }
        .fit-badge {
          font-size: 0.9rem;
        }
        .table-capacity {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .table-zone {
          font-size: 0.72rem;
          color: var(--primary-gold);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .table-status-label {
          font-size: 0.72rem;
          margin-top: 0.4rem;
          padding: 0.15rem 0.4rem;
          border-radius: var(--radius-sm);
          text-align: center;
          font-weight: 600;
        }
        .table-node.available .table-status-label {
          background: rgba(39, 174, 96, 0.15);
          color: #2ecc71;
        }
        .table-node.selected .table-status-label {
          background: var(--primary-gold);
          color: #121316;
        }
        .table-node.occupied .table-status-label {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
};
