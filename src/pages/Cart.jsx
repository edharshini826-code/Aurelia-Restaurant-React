import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Cart = ({ setView }) => {
  const {
    cart,
    booking,
    coupon,
    discountPercent,
    totalItems,
    subtotal,
    discountAmount,
    tax,
    tableDeposit,
    grandTotal,
    updateQty,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('form'); // 'form', 'success'
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'card', 'cash'

  // Checkout form state
  const [checkoutData, setCheckoutData] = useState({
    customerName: booking?.guestName || '',
    phone: booking?.phone || '',
    serviceMode: booking ? 'dine-in' : 'takeaway',
    instructions: ''
  });

  const [checkoutErrors, setCheckoutErrors] = useState({});
  const [orderReceipt, setOrderReceipt] = useState(null);

  const getImageUrl = (imgName) => {
    try {
      return new URL(`../assets/images/${imgName}`, import.meta.url).href;
    } catch {
      return '';
    }
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    applyCoupon(couponInput);
  };

  const validateCheckout = () => {
    const errs = {};
    if (!checkoutData.customerName.trim()) {
      errs.customerName = 'Customer name is required.';
    } else if (checkoutData.customerName.trim().length < 3) {
      errs.customerName = 'Name must be at least 3 characters.';
    }

    if (!checkoutData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(checkoutData.phone.trim().replace(/[\s-]/g, ''))) {
      errs.phone = 'Valid 10-digit phone number is required.';
    }

    setCheckoutErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (validateCheckout()) {
      const receipt = {
        orderId: 'AUR-' + Math.floor(100000 + Math.random() * 900000),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        items: [...cart],
        subtotal,
        discountAmount,
        tax,
        tableDeposit,
        grandTotal,
        paymentMethod,
        customerName: checkoutData.customerName,
        phone: checkoutData.phone,
        table: booking?.tableName || 'Takeaway Service Counter'
      };
      setOrderReceipt(receipt);
      setCheckoutStep('success');
      clearCart();
    }
  };

  if (cart.length === 0 && !orderReceipt) {
    return (
      <div className="cart-view animate-fade-in">
        <div className="section-container">
          <div className="empty-cart-card luxury-card">
            <span className="empty-icon">🛍️</span>
            <h2>Your Culinary Order is Empty</h2>
            <p>
              Explore our artisanal menu, select your favorite dishes, and pre-order for a seamless dining experience.
            </p>
            <div className="empty-actions">
              <button className="btn btn-primary" onClick={() => setView('menu')}>
                🍽️ Browse Menu
              </button>
              <button className="btn btn-secondary" onClick={() => setView('booking')}>
                🍷 Reserve a Table First
              </button>
            </div>
          </div>
        </div>
        <style>{`
          .empty-cart-card {
            text-align: center;
            max-width: 600px;
            margin: 3rem auto;
            padding: 4rem 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.25rem;
          }
          .empty-icon {
            font-size: 3.5rem;
            opacity: 0.6;
          }
          .empty-actions {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 1rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="cart-view animate-fade-in">
      <div className="section-container">
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">ORDER & BILLING</span>
          <h1 className="section-title">Your Culinary Order & Bill</h1>
          <p className="section-subtitle">
            Review your selected courses, apply promotional vouchers, and proceed to confirmed checkout.
          </p>
        </div>

        <div className="cart-layout">
          {/* Left: Line Items List */}
          <div className="items-column">
            <div className="items-header-bar luxury-card">
              <span><b>{totalItems} Delicacies</b> in Order</span>
              <button className="btn btn-outline btn-sm" onClick={clearCart}>
                🗑️ Clear All Items
              </button>
            </div>

            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item-row luxury-card animate-fade-in">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    className="item-thumb"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=150&q=80';
                    }}
                  />

                  <div className="item-details">
                    <div className="item-title-row">
                      <h4 className="item-name">{item.name}</h4>
                      <button
                        className="delete-item-btn"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove dish"
                      >
                        ✕
                      </button>
                    </div>

                    <span className="item-unit-price">₹{item.price} each</span>

                    <div className="item-footer-row">
                      {/* Quantity Stepper */}
                      <div className="qty-stepper">
                        <button onClick={() => updateQty(item.id, -1)} aria-label="Decrease">
                          −
                        </button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} aria-label="Increase">
                          +
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <div className="item-line-total">
                        <span className="currency">₹</span>
                        <span className="amount">{item.price * item.qty}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Table Booking Banner */}
            {booking ? (
              <div className="booking-linked-banner luxury-card">
                <span className="banner-icon">🍷</span>
                <div className="banner-info">
                  <b>Linked to Table Reservation: {booking.tableName}</b>
                  <span>For {booking.guestName} on {booking.date} at {booking.time}</span>
                </div>
                <span className="badge badge-gold">₹100 Pre-booked</span>
              </div>
            ) : (
              <div className="booking-suggest-banner luxury-card">
                <div>
                  <b>Dining in our restaurant?</b>
                  <p>Reserve a table now to avoid waiting time and get an exclusive garden view.</p>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={() => setView('booking')}>
                  Reserve Table →
                </button>
              </div>
            )}
          </div>

          {/* Right: Bill Calculation & Coupon */}
          <div className="summary-column">
            {/* Promo Voucher Box */}
            <div className="coupon-box luxury-card">
              <h4 className="box-title">Promotional Voucher</h4>
              {coupon ? (
                <div className="active-coupon-pill">
                  <div>
                    <span className="tag-icon">🏷️</span>
                    <b>{coupon}</b>
                    <span className="discount-tag">({discountPercent}% OFF)</span>
                  </div>
                  <button className="remove-coupon-btn" onClick={removeCoupon}>
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="coupon-form">
                  <input
                    type="text"
                    placeholder="Try AURELIA15 or LUXURY20"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    className="form-input coupon-input"
                  />
                  <button type="submit" className="btn btn-secondary btn-sm apply-btn">
                    Apply
                  </button>
                </form>
              )}
              <span className="coupon-hint">💡 Tip: Use code <b>AURELIA15</b> for 15% discount or <b>LUXURY20</b> for 20% off.</span>
            </div>

            {/* Calculation Breakdown */}
            <div className="bill-summary-box luxury-card">
              <h3 className="bill-title">Billing Summary</h3>

              <div className="calc-row">
                <span>Food Order Subtotal:</span>
                <b>₹{subtotal}</b>
              </div>

              {discountAmount > 0 && (
                <div className="calc-row discount-row">
                  <span>Promotional Discount ({discountPercent}%):</span>
                  <b>− ₹{discountAmount}</b>
                </div>
              )}

              <div className="calc-row">
                <span>GST (5% Hospitality Tax):</span>
                <b>₹{tax}</b>
              </div>

              {tableDeposit > 0 && (
                <div className="calc-row deposit-row">
                  <span>Table Pre-booking Token:</span>
                  <b>₹{tableDeposit}</b>
                </div>
              )}

              <div className="calc-divider"></div>

              <div className="calc-row grand-total-row">
                <span>Grand Total:</span>
                <div className="total-price">
                  <span className="currency">₹</span>
                  <span className="amount">{grandTotal}</span>
                </div>
              </div>

              <button
                className="btn btn-primary btn-block checkout-btn"
                onClick={() => {
                  setShowCheckoutModal(true);
                  setCheckoutStep('form');
                }}
              >
                Proceed to Checkout (₹{grandTotal}) →
              </button>

              <p className="payment-guarantee">
                🔒 Safe & secure simulated checkout. All taxes & tokens calculated in accordance with dining policies.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- CHECKOUT MODAL --- */}
      {showCheckoutModal && (
        <div className="modal-overlay" onClick={() => setShowCheckoutModal(false)}>
          <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowCheckoutModal(false)}>✕</button>

            {checkoutStep === 'form' ? (
              <form onSubmit={handleCheckoutSubmit} className="checkout-form">
                <span className="section-tag">SIMULATED CHECKOUT</span>
                <h3 className="modal-title">Complete Your Dining Order</h3>
                <p className="modal-subtitle">
                  Total Payable: <b className="gold-text">₹{grandTotal}</b>
                </p>

                {/* Customer Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor="custName">
                    Customer Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="custName"
                    value={checkoutData.customerName}
                    onChange={(e) => {
                      setCheckoutData({ ...checkoutData, customerName: e.target.value });
                      if (checkoutErrors.customerName) setCheckoutErrors({ ...checkoutErrors, customerName: null });
                    }}
                    placeholder="Enter your full name"
                    className={`form-input ${checkoutErrors.customerName ? 'error' : ''}`}
                  />
                  {checkoutErrors.customerName && <span className="form-error-msg">⚠️ {checkoutErrors.customerName}</span>}
                </div>

                {/* Phone Number */}
                <div className="form-group">
                  <label className="form-label" htmlFor="custPhone">
                    Contact Phone (10 digits) <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="custPhone"
                    maxLength="10"
                    value={checkoutData.phone}
                    onChange={(e) => {
                      setCheckoutData({ ...checkoutData, phone: e.target.value });
                      if (checkoutErrors.phone) setCheckoutErrors({ ...checkoutErrors, phone: null });
                    }}
                    placeholder="9876543210"
                    className={`form-input ${checkoutErrors.phone ? 'error' : ''}`}
                  />
                  {checkoutErrors.phone && <span className="form-error-msg">⚠️ {checkoutErrors.phone}</span>}
                </div>

                {/* Payment Method Selector */}
                <div className="form-group">
                  <label className="form-label">Payment Mode</label>
                  <div className="payment-options">
                    <label className={`pay-option ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="payMethod"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                      />
                      <span>📱 UPI Instant QR</span>
                    </label>
                    <label className={`pay-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="payMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                      />
                      <span>💳 Credit / Debit Card</span>
                    </label>
                    <label className={`pay-option ${paymentMethod === 'cash' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="payMethod"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={() => setPaymentMethod('cash')}
                      />
                      <span>💵 Pay at Hotel / Cash</span>
                    </label>
                  </div>
                </div>

                {/* UPI QR Display */}
                {paymentMethod === 'upi' && (
                  <div className="qr-container">
                    <img
                      src={getImageUrl('payment-qr.svg')}
                      alt="Payment QR"
                      className="qr-img"
                    />
                    <p className="qr-text">Scan with any UPI App (GPay, PhonePe, Paytm) to pay <b>₹{grandTotal}</b></p>
                  </div>
                )}

                <button type="submit" className="btn btn-primary btn-block submit-order-btn">
                  Confirm & Place Order (₹{grandTotal})
                </button>
              </form>
            ) : (
              /* Success Receipt View */
              <div className="receipt-view">
                <div className="success-crest">🎉</div>
                <span className="badge badge-gold">ORDER CONFIRMED</span>
                <h3 className="receipt-title">Thank You, {orderReceipt.customerName}!</h3>
                <p className="receipt-subtitle">Your culinary request has been transmitted to our head chef.</p>

                <div className="receipt-box luxury-card">
                  <div className="receipt-row">
                    <span>Order Reference:</span>
                    <b>{orderReceipt.orderId}</b>
                  </div>
                  <div className="receipt-row">
                    <span>Dining Station / Table:</span>
                    <b>{orderReceipt.table}</b>
                  </div>
                  <div className="receipt-row">
                    <span>Time Placed:</span>
                    <b>{orderReceipt.timestamp}</b>
                  </div>
                  <div className="receipt-row">
                    <span>Payment Method:</span>
                    <b>{orderReceipt.paymentMethod.toUpperCase()}</b>
                  </div>

                  <div className="calc-divider"></div>

                  <div className="receipt-items-list">
                    {orderReceipt.items.map((i) => (
                      <div key={i.id} className="r-item-row">
                        <span>{i.qty}x {i.name}</span>
                        <b>₹{i.price * i.qty}</b>
                      </div>
                    ))}
                  </div>

                  <div className="calc-divider"></div>

                  <div className="receipt-row total-receipt-row">
                    <span>Total Amount Paid:</span>
                    <b className="gold-text">₹{orderReceipt.grandTotal}</b>
                  </div>
                </div>

                <div className="receipt-actions">
                  <button className="btn btn-primary" onClick={() => setShowCheckoutModal(false)}>
                    Close & Enjoy Dining
                  </button>
                  <button className="btn btn-secondary" onClick={() => setView('lounge')}>
                    🎮 Visit Waiting Lounge
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .cart-layout {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 2.5rem;
        }
        .items-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          margin-bottom: 1.25rem;
          background: #14171f;
        }
        .cart-items-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .cart-item-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.25rem;
          background: #14171f;
        }
        .item-thumb {
          width: 90px;
          height: 90px;
          border-radius: var(--radius-md);
          object-fit: cover;
          background: #0f1116;
        }
        .item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .item-title-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .item-name {
          font-size: 1.05rem;
          color: var(--text-primary);
        }
        .delete-item-btn {
          color: var(--text-muted);
          font-size: 1.1rem;
          padding: 2px 6px;
        }
        .delete-item-btn:hover {
          color: #ff6b6b;
        }
        .item-unit-price {
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .item-footer-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.5rem;
        }
        .item-line-total {
          font-family: var(--font-serif);
          font-weight: 700;
          color: var(--primary-gold-light);
          font-size: 1.15rem;
        }
        .booking-linked-banner {
          margin-top: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #181d29;
          border-color: var(--primary-gold);
        }
        .banner-icon {
          font-size: 1.8rem;
        }
        .banner-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .banner-info span {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .booking-suggest-banner {
          margin-top: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          background: #14171f;
        }
        .booking-suggest-banner p {
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .coupon-box {
          margin-bottom: 1.5rem;
          background: #14171f;
        }
        .box-title {
          font-size: 0.95rem;
          color: var(--primary-gold-light);
          margin-bottom: 0.75rem;
        }
        .coupon-form {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .coupon-input {
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 600;
        }
        .coupon-hint {
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        .active-coupon-pill {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.65rem 1rem;
          background: rgba(212, 175, 55, 0.12);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          margin-bottom: 0.5rem;
        }
        .remove-coupon-btn {
          font-size: 0.8rem;
          color: #ff6b6b;
          font-weight: 600;
        }
        .bill-summary-box {
          background: #14171f;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .bill-title {
          font-size: 1.25rem;
          color: var(--primary-gold-light);
          margin-bottom: 0.5rem;
        }
        .calc-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.92rem;
          color: var(--text-secondary);
        }
        .discount-row {
          color: #2ecc71;
        }
        .calc-divider {
          height: 1px;
          background: var(--border-solid);
          margin: 0.5rem 0;
        }
        .grand-total-row {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          align-items: baseline;
        }
        .total-price {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: var(--primary-gold-light);
        }
        .checkout-btn {
          margin-top: 1rem;
          padding: 0.95rem;
          font-size: 1.05rem;
        }
        .payment-guarantee {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-align: center;
          line-height: 1.4;
        }
        .payment-options {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .pay-option {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-solid);
          background: var(--bg-surface);
          cursor: pointer;
        }
        .pay-option.selected {
          border-color: var(--primary-gold);
          background: rgba(212, 175, 55, 0.1);
        }
        .qr-container {
          text-align: center;
          padding: 1.25rem;
          background: var(--bg-surface);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-solid);
          margin-bottom: 1.25rem;
        }
        .qr-img {
          width: 140px;
          height: 140px;
          margin-bottom: 0.5rem;
        }
        .qr-text {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .receipt-view {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        .success-crest {
          font-size: 3rem;
        }
        .receipt-box {
          width: 100%;
          text-align: left;
          background: var(--bg-surface);
          margin: 1rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .receipt-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.88rem;
          color: var(--text-secondary);
        }
        .receipt-items-list {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .r-item-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .total-receipt-row {
          font-size: 1.1rem;
          font-weight: 700;
        }
        .receipt-actions {
          display: flex;
          gap: 1rem;
          width: 100%;
          justify-content: center;
        }
        @media (max-width: 900px) {
          .cart-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
