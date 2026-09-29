import React, { useState } from 'react';
import { TableMap } from '../components/TableMap';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Booking = ({ setView }) => {
  const { booking, saveBooking, cancelBooking } = useCart();

  // Form input states
  const [formData, setFormData] = useState({
    guestName: booking?.guestName || '',
    email: booking?.email || '',
    phone: booking?.phone || '',
    date: booking?.date || new Date().toISOString().split('T')[0],
    time: booking?.time || '19:30',
    guests: booking?.guests || 2,
    tableId: booking?.tableId || 'T-1',
    tableName: booking?.tableName || 'Table 1 (Window View)',
    occasion: booking?.occasion || 'dinner',
    notes: booking?.notes || ''
  });

  // Validation errors
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Time slots
  const timeSlots = [
    '12:30', '13:00', '13:30', '14:00',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  // Validation function
  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.guestName.trim()) {
      newErrors.guestName = 'Full Name is required.';
    } else if (formData.guestName.trim().length < 3) {
      newErrors.guestName = 'Name must be at least 3 characters.';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.guestName.trim())) {
      newErrors.guestName = 'Name should contain only letters.';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone.trim().replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit mobile number.';
    }

    // Date validation
    const today = new Date().toISOString().split('T')[0];
    if (!formData.date) {
      newErrors.date = 'Reservation date is required.';
    } else if (formData.date < today) {
      newErrors.date = 'Reservation date cannot be in the past.';
    }

    // Time validation
    if (!formData.time) {
      newErrors.time = 'Time slot is required.';
    }

    // Table selection
    if (!formData.tableId) {
      newErrors.tableId = 'Please select a dining table from the floor map.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time error clearance
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleTableSelect = (table) => {
    setFormData((prev) => ({
      ...prev,
      tableId: table.id,
      tableName: `${table.name} (${table.zone})`
    }));
    if (errors.tableId) {
      setErrors((prev) => ({ ...prev, tableId: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validate()) {
      saveBooking(formData);
    }
  };

  return (
    <div className="booking-view animate-fade-in">
      <div className="section-container">
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">ROYAL RESERVATIONS</span>
          <h1 className="section-title">Reserve Your Private Table</h1>
          <p className="section-subtitle">
            Experience our legendary hospitality. Select your seating zone, specify your party details, and complete table pre-booking.
          </p>
        </div>

        {/* Existing Active Booking Banner */}
        {booking && (
          <div className="active-booking-card luxury-card animate-fade-in">
            <div className="booking-status-badge">
              <span>✓ Confirmed Table Reservation</span>
            </div>
            <div className="booking-details-grid">
              <div className="b-detail">
                <span className="b-label">Guest Name</span>
                <b>{booking.guestName}</b>
              </div>
              <div className="b-detail">
                <span className="b-label">Reserved Table</span>
                <b>{booking.tableName}</b>
              </div>
              <div className="b-detail">
                <span className="b-label">Date & Time</span>
                <b>{booking.date} at {booking.time}</b>
              </div>
              <div className="b-detail">
                <span className="b-label">Party Size</span>
                <b>{booking.guests} Guests</b>
              </div>
              <div className="b-detail">
                <span className="b-label">Deposit Credit</span>
                <b className="gold-text">₹{RESTAURANT_INFO.tableDeposit} (Adjusted in bill)</b>
              </div>
            </div>

            <div className="booking-actions-row">
              <button className="btn btn-primary btn-sm" onClick={() => setView('menu')}>
                🍽️ Pre-Order Culinary Course →
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => setView('cart')}>
                View Cart & Bill
              </button>
              <button className="btn btn-danger btn-sm" onClick={cancelBooking}>
                Cancel Reservation
              </button>
            </div>
          </div>
        )}

        <div className="booking-layout">
          {/* Left Column: Interactive Table Map */}
          <div className="map-column">
            <TableMap
              selectedTableId={formData.tableId}
              onSelectTable={handleTableSelect}
              guestCount={+formData.guests}
            />

            <div className="reservation-perks luxury-card">
              <h4 style={{ color: 'var(--primary-gold-light)', marginBottom: '0.75rem' }}>
                ✦ The Aurelia Reservation Guarantee
              </h4>
              <ul className="perks-list">
                <li>Zero queue entry — your dedicated table is dressed and candlelit upon arrival.</li>
                <li>₹100 pre-booking confirmation fee is fully adjusted in your dining bill.</li>
                <li>Complimentary welcome artisanal elixir drink for each guest.</li>
                <li>Free cancellation or rescheduling up to 2 hours prior to reservation.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Controlled Reservation Form with Validation */}
          <div className="form-column">
            <form onSubmit={handleSubmit} className="reservation-form luxury-card" noValidate>
              <h3 className="form-title">Guest Details & Preferences</h3>
              <p className="form-subtitle">Fields marked with <span style={{ color: 'var(--accent-crimson)' }}>*</span> are mandatory.</p>

              {/* Selected Table Indicator */}
              <div className="selected-table-callout">
                <span className="callout-icon">📍</span>
                <div>
                  <span className="callout-label">Chosen Table:</span>
                  <b className="callout-value">{formData.tableName || 'Click a table on the map'}</b>
                </div>
              </div>
              {errors.tableId && <span className="form-error-msg">⚠️ {errors.tableId}</span>}

              {/* Guest Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="guestName">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="guestName"
                  name="guestName"
                  placeholder="e.g. Dharshini"
                  value={formData.guestName}
                  onChange={handleInputChange}
                  className={`form-input ${errors.guestName ? 'error' : ''}`}
                />
                {errors.guestName && <span className="form-error-msg">⚠️ {errors.guestName}</span>}
              </div>

              {/* Email & Phone Row */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                  />
                  {errors.email && <span className="form-error-msg">⚠️ {errors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    Phone Number (10 digits) <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="9876543210"
                    maxLength="10"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                  />
                  {errors.phone && <span className="form-error-msg">⚠️ {errors.phone}</span>}
                </div>
              </div>

              {/* Date & Time Row */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="date">
                    Date <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={handleInputChange}
                    className={`form-input ${errors.date ? 'error' : ''}`}
                  />
                  {errors.date && <span className="form-error-msg">⚠️ {errors.date}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="time">
                    Dining Slot <span className="required">*</span>
                  </label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className={`form-select ${errors.time ? 'error' : ''}`}
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot} {+slot.split(':')[0] >= 12 ? 'PM' : 'AM'}
                      </option>
                    ))}
                  </select>
                  {errors.time && <span className="form-error-msg">⚠️ {errors.time}</span>}
                </div>
              </div>

              {/* Guests Count & Occasion */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="guests">
                    Party Size (Guests) <span className="required">*</span>
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 16, 20].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="occasion">
                    Occasion / Celebration
                  </label>
                  <select
                    id="occasion"
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="dinner">Casual Gourmet Dinner</option>
                    <option value="birthday">Birthday Celebration</option>
                    <option value="anniversary">Romantic Anniversary</option>
                    <option value="corporate">Executive Corporate Dinner</option>
                    <option value="family">Family Celebration</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div className="form-group">
                <label className="form-label" htmlFor="notes">
                  Special Dining Notes (Allergies, Floral decor, etc.)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows="3"
                  placeholder="Tell our chef about food sensitivities or decor requests..."
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="form-textarea"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary btn-block submit-booking-btn">
                Confirm Reservation (₹{RESTAURANT_INFO.tableDeposit} Credit Token)
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .active-booking-card {
          margin-bottom: 2.5rem;
          background: #191e2b;
          border-color: var(--primary-gold);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
        }
        .booking-status-badge {
          display: inline-block;
          font-size: 0.82rem;
          font-weight: 700;
          color: #2ecc71;
          background: rgba(46, 204, 113, 0.15);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(46, 204, 113, 0.4);
          margin-bottom: 1.25rem;
        }
        .booking-details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }
        .b-detail {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .b-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .b-detail b {
          font-size: 0.95rem;
          color: var(--text-primary);
        }
        .booking-actions-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-solid);
        }
        .booking-layout {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 2.5rem;
        }
        .reservation-perks {
          margin-top: 1.5rem;
          background: #14171f;
        }
        .perks-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          font-size: 0.88rem;
          color: var(--text-muted);
        }
        .perks-list li {
          position: relative;
          padding-left: 1.25rem;
        }
        .perks-list li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--primary-gold);
          font-weight: 700;
        }
        .reservation-form {
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
        .selected-table-callout {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 1.15rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          margin-bottom: 1.25rem;
        }
        .callout-icon {
          font-size: 1.3rem;
        }
        .callout-label {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .callout-value {
          color: var(--primary-gold-light);
          font-size: 0.95rem;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .submit-booking-btn {
          margin-top: 1.5rem;
          padding: 0.95rem;
          font-size: 1.05rem;
        }
        @media (max-width: 900px) {
          .booking-layout {
            grid-template-columns: 1fr;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
