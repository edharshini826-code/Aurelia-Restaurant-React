import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Booking } from './pages/Booking';
import { Cart } from './pages/Cart';
import { Lounge } from './pages/Lounge';
import { Reviews } from './pages/Reviews';

import './styles/base.css';
import './styles/components.css';
import './styles/responsive.css';

export function App() {
  const getInitialView = () => {
    const hash = window.location.hash.replace('#', '');
    if (['home', 'booking', 'menu', 'cart', 'lounge', 'reviews'].includes(hash)) {
      return hash;
    }
    return 'home';
  };

  const [currentView, setViewState] = useState(getInitialView);

  const setView = (view) => {
    window.location.hash = view;
    setViewState(view);
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'booking', 'menu', 'cart', 'lounge', 'reviews'].includes(hash)) {
        setViewState(hash);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home setView={setView} />;
      case 'menu':
        return <Menu setView={setView} />;
      case 'booking':
        return <Booking setView={setView} />;
      case 'cart':
        return <Cart setView={setView} />;
      case 'lounge':
        return <Lounge setView={setView} />;
      case 'reviews':
        return <Reviews setView={setView} />;
      default:
        return <Home setView={setView} />;
    }
  };

  return (
    <CartProvider>
      <div className="app-container">
        <Navbar currentView={currentView} setView={setView} />
        <main className="main-content">
          {renderView()}
        </main>
        <Footer setView={setView} />
        <Toast />
      </div>
    </CartProvider>
  );
}

export default App;
