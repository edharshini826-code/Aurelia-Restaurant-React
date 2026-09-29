import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Optional helper for test preview states and screenshot automation
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('seed') === 'booking') {
  localStorage.setItem('aurelia_react_booking', JSON.stringify({
    id: 'AUR-2026-8492',
    tableId: 1,
    tableName: 'Table 1 (Window View)',
    zone: 'Window View',
    guestName: 'Dharshini E',
    email: 'dharshini@example.com',
    phone: '9876543210',
    date: '2026-10-01',
    time: '19:30',
    guests: 2,
    specialRequests: 'Window seat with candlelight arrangement.',
    depositCredit: 100,
    createdAt: '2026-09-28T18:00:00.000Z'
  }));
} else if (urlParams.get('seed') === 'cart') {
  localStorage.setItem('aurelia_react_cart', JSON.stringify([
    { id: '101', name: 'Garlic Butter Jumbo Prawns', price: 680, qty: 2, category: 'starters', image: 'garlic-butter-prawns.jpg' },
    { id: '201', name: 'Truffle Mushroom Risotto', price: 740, qty: 1, category: 'mains', image: 'mushroom-risotto.jpg' },
    { id: '301', name: 'Classic Belgian Chocolate Mousse', price: 380, qty: 2, category: 'desserts', image: 'chocolate-mousse.jpg' }
  ]));
} else if (urlParams.get('seed') === 'clear') {
  localStorage.removeItem('aurelia_react_booking');
  localStorage.removeItem('aurelia_react_cart');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
