// Aurelia Restaurant supplementary data: Tables, FAQs, Testimonials

export const RESTAURANT_INFO = {
  name: 'Aurelia Restaurant',
  tagline: 'The Pinnacle of Contemporary Luxury Dining',
  address: '14 Royal Promenade, High Street, Chennai, TN 600028',
  phone: '+91 98401 23456',
  email: 'reservations@aureliadining.com',
  hours: 'Mon – Sun: 12:00 PM – 11:30 PM',
  tableDeposit: 100, // Pre-booking confirmation fee in INR
  gstRate: 0.05 // 5% GST
};

export const RESTAURANT_TABLES = [
  { id: 'T-1', name: 'Table 1', capacity: 2, zone: 'Window View', status: 'available', description: 'Romantic table overlooking the illuminated gardens' },
  { id: 'T-2', name: 'Table 2', capacity: 2, zone: 'Window View', status: 'available', description: 'Intimate setting with soft candlelit ambiance' },
  { id: 'T-3', name: 'Table 3', capacity: 4, zone: 'Main Dining Hall', status: 'available', description: 'Spacious booth beside acoustic water fountain' },
  { id: 'T-4', name: 'Table 4', capacity: 4, zone: 'Main Dining Hall', status: 'occupied', description: 'Central dining setting with chandelier lighting' },
  { id: 'T-5', name: 'Table 5', capacity: 4, zone: 'Main Dining Hall', status: 'available', description: 'Cozy leather seating with discreet service access' },
  { id: 'T-6', name: 'Table 6', capacity: 6, zone: 'Terrace Garden', status: 'available', description: 'Open-sky patio seating with warm breeze heaters' },
  { id: 'T-7', name: 'Table 7', capacity: 6, zone: 'Terrace Garden', status: 'available', description: 'Pergola shaded round table for joyful gatherings' },
  { id: 'T-8', name: 'Table 8', capacity: 8, zone: 'Family Sovereign', status: 'available', description: 'Large oval hardwood table for grand family celebrations' },
  { id: 'T-9', name: 'Table 9', capacity: 8, zone: 'Family Sovereign', status: 'occupied', description: 'Secluded corner with dedicated waitstaff' },
  { id: 'VIP-1', name: 'VIP Royal Suite 1', capacity: 6, zone: 'Private VIP Lounge', status: 'available', description: 'Sound-dampened private salon with custom sommelier service' },
  { id: 'VIP-2', name: 'VIP Royal Suite 2', capacity: 10, zone: 'Private VIP Lounge', status: 'available', description: 'Executive dining enclave with private terrace view' }
];

export const INITIAL_REVIEWS = [
  {
    id: 1,
    author: 'Kavitha Ramachandran',
    rating: 5,
    date: 'Yesterday',
    dish: 'Signature Dream Cake',
    comment: 'The five-layer dream cake was nothing short of culinary perfection. The staff catered to every detail with pure elegance.'
  },
  {
    id: 2,
    author: 'Dr. Siddharth Menon',
    rating: 5,
    date: '3 days ago',
    dish: 'Wild Mushroom Truffle Risotto',
    comment: 'Exceptional texture and porcini aroma. Easily the finest European fine-dining experience in the city.'
  },
  {
    id: 3,
    author: 'Ananya & Rohit',
    rating: 5,
    date: '1 week ago',
    dish: 'Golden Chicken Platter',
    comment: 'We booked Table 1 for our anniversary. The table decor, private attention, and herb chicken made our night unforgettable!'
  }
];

export const FAQS = [
  {
    question: 'How does table pre-booking work?',
    answer: 'Guests can select their preferred table and time slot. A nominal ₹100 pre-booking confirmation token is recorded online to secure your seat, and the remaining food bill is paid seamlessly at dining.'
  },
  {
    question: 'Can we order food online for pre-dining preparation?',
    answer: 'Yes! You can curate your cart directly through our Interactive Menu. Your selected dishes will be synchronized with your reservation so the kitchen prepares your culinary course timely.'
  },
  {
    question: 'Do you offer vegetarian and dietary customization?',
    answer: 'Every dish on our menu clearly indicates dietary classifications (Veg, Non-Veg, Chef Specials). Our culinary artisans gladly accommodate gluten-free and allergen-sensitive requests.'
  },
  {
    question: 'Are there promotional discounts for celebration bookings?',
    answer: 'Use promotional code AURELIA15 at checkout for 15% off food orders over ₹500, or LUXURY20 for 20% off grand orders above ₹1,000!'
  }
];
