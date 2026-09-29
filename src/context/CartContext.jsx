import React, { createContext, useContext, useState, useEffect } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';

const CartContext = createContext();

const CART_STORAGE_KEY = 'aurelia_react_cart';
const BOOKING_STORAGE_KEY = 'aurelia_react_booking';

export const CartProvider = ({ children }) => {
  // Initialize state from LocalStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [booking, setBooking] = useState(() => {
    try {
      const saved = localStorage.getItem(BOOKING_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [coupon, setCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [toast, setToast] = useState(null);

  // Sync cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('LocalStorage write error', e);
    }
  }, [cart]);

  // Sync booking to LocalStorage
  useEffect(() => {
    try {
      if (booking) {
        localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(booking));
      } else {
        localStorage.removeItem(BOOKING_STORAGE_KEY);
      }
    } catch (e) {
      console.error('LocalStorage booking write error', e);
    }
  }, [booking]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToast({ message, type, id });
    setTimeout(() => {
      setToast((current) => (current && current.id === id ? null : current));
    }, 3200);
  };

  const addToCart = (item, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + quantity } : i
        );
      }
      return [...prevCart, { ...item, qty: quantity }];
    });
    showToast(`Added "${item.name}" to your order!`, 'success');
  };

  const updateQty = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    const item = cart.find((i) => i.id === id);
    setCart((prevCart) => prevCart.filter((i) => i.id !== id));
    if (item) {
      showToast(`Removed "${item.name}" from your order`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
    setCoupon('');
    setDiscountPercent(0);
  };

  const applyCoupon = (code) => {
    const normalized = (code || '').trim().toUpperCase();
    if (normalized === 'AURELIA15') {
      setCoupon('AURELIA15');
      setDiscountPercent(15);
      showToast('Promo code "AURELIA15" applied! 15% discount activated.', 'success');
      return { success: true, message: '15% Discount Applied!' };
    } else if (normalized === 'LUXURY20') {
      setCoupon('LUXURY20');
      setDiscountPercent(20);
      showToast('VIP Voucher "LUXURY20" applied! 20% discount activated.', 'success');
      return { success: true, message: '20% VIP Discount Applied!' };
    } else if (normalized === 'WELCOME10') {
      setCoupon('WELCOME10');
      setDiscountPercent(10);
      showToast('First Taste "WELCOME10" applied! 10% discount activated.', 'success');
      return { success: true, message: '10% Discount Applied!' };
    } else {
      showToast('Invalid coupon code. Try AURELIA15 or LUXURY20', 'error');
      return { success: false, message: 'Invalid or expired coupon' };
    }
  };

  const removeCoupon = () => {
    setCoupon('');
    setDiscountPercent(0);
    showToast('Coupon removed.', 'info');
  };

  const saveBooking = (bookingData) => {
    setBooking(bookingData);
    showToast(`Table reserved for ${bookingData.guestName}!`, 'success');
  };

  const cancelBooking = () => {
    setBooking(null);
    showToast('Table reservation cancelled.', 'info');
  };

  // Calculations
  const totalItems = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 1), 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const netFood = Math.max(0, subtotal - discountAmount);
  const tax = Math.round(netFood * RESTAURANT_INFO.gstRate);
  const tableDeposit = booking ? RESTAURANT_INFO.tableDeposit : 0;
  const grandTotal = netFood + tax + tableDeposit;

  return (
    <CartContext.Provider
      value={{
        cart,
        booking,
        coupon,
        discountPercent,
        toast,
        totalItems,
        subtotal,
        discountAmount,
        netFood,
        tax,
        tableDeposit,
        grandTotal,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        saveBooking,
        cancelBooking,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
