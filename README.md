# Aurelia Restaurant — Interactive ReactJS Application

**Course:** Full Stack Web Development (21CSE354T)  
**Task:** Task 2 — Interactive JavaScript and ReactJS Application Development  
**Problem Statement:** No. 22 — Restaurant Table Booking  
**Student Name:** Dharshini E  
**Register Number:** RA2411003050048  
**Department / Section:** B.Tech CSE - Section A  
**Bloom's Taxonomy Levels:** K3 (Apply), K4 (Analyze)  

---

## 🍽️ About the Project
Aurelia Restaurant is an interactive, responsive Single-Page Application (SPA) built with React 18 and Vite. It implements **Problem Statement 22 (Restaurant Table Booking)** with an interactive 11-table floor map, capacity recommendations, controlled form validation, state persistence, pre-booking deposit calculations, food pre-ordering, and guest entertainment mini-games.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### 3. Production Build
```bash
npm run build
```
Production bundle is compiled into the `dist/` directory.

---

## 🌟 Key Features
- **Interactive Table Floor Map (`TableMap.jsx`):** 11 tables across 5 ambiance zones with live availability and party size recommendations.
- **Client-Side Form Validation (`Booking.jsx`):** Controlled inputs with regex validation for name, RFC email, 10-digit phone, future date, and table selection.
- **Dynamic State Management (`CartContext.jsx`):** React Context API managing active table booking, menu cart items, ₹100 deposit token credit, and toasts.
- **Cross-Session Persistence:** Native `localStorage` sync for booking and cart state.
- **Integrated Menu & Order (`Menu.jsx`, `Cart.jsx`):** 20+ dishes, multi-facet filtering, search, promotional vouchers (`AURELIA15`), and 5% GST computation.
- **Guest Lounge Entertainment (`Lounge.jsx`):** Interactive Culinary Memory Match game and 8-tile sliding puzzle.
