**Course:** Full Stack Web Development  
**Assignment:** Task 2 — Interactive JavaScript and ReactJS Application Development  
**Problem Statement:** Problem No. 22 – Restaurant Table Booking  
**Syllabus Requirement:** Display tables, accept booking details, validate information, and show confirmation.  
**Student Developer:** Dharshini E  
**Register Number:** RA2411003050048  
**Department / Section:** III CSE — Section A  
**Year / Semester:** 3rd Year / 5th Semester  
**Subject Code:** 21CSE354T  
**Task 1 Name:** Aurelia Restaurant (Responsive Web Design)  
**Task 1 Repo Link:** https://github.com/edharshini826-code/Aurelia-Restaurant  
**Task 2 Name:** Aurelia Restaurant (Restaurant Table Booking - ReactJS)  
**Task 2 Repo Link:** https://github.com/edharshini826-code/___________________________________  
**Task 2 Live Link:** https://edharshini826-code.github.io/___________________________________  
**Date of Submission:** 01-10-2026  
**Faculty Coordinator:** Dr. P. Hariharan, AP, CSE  
**Academic Year:** 2026 – 2027  

---

## Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [Problem Statement & Domain Mapping](#2-problem-statement--domain-mapping)
3. [Technologies & Technical Concepts](#3-technologies--technical-concepts)
4. [Component Architecture & Project Structure](#4-component-architecture--project-structure)
5. [State Management & React Hooks Justification](#5-state-management--react-hooks-justification)
6. [Interactive Functionality Matrix (Add, Edit, Delete, Search, Filter, Calculation)](#6-interactive-functionality-matrix)
7. [Form Handling & Client-Side Validation Engine](#7-form-handling--client-side-validation-engine)
8. [Comprehensive 6-View Walkthrough](#8-comprehensive-6-view-walkthrough)
9. [PowerPoint Presentation Deck (8-Slide Academic Script)](#9-powerpoint-presentation-deck-8-slide-academic-script)
10. [Application Workflow & Live Demonstration Script](#10-application-workflow--live-demonstration-script)
11. [GitHub Deployment & Evaluation Guide](#11-github-deployment--evaluation-guide)

---

## 1. Executive Summary

This academic dossier documents the evolution of **Aurelia Restaurant** from a multi-page static HTML5/CSS3 prototype (Task 1) into a high-performance, responsive Single-Page Application (SPA) built using **React 18** and **Vite** (Task 2).

The application addresses two critical domain challenges in hospitality engineering:
- **Problem Statement 21 (Online Food Ordering Interface):** Categorized menu exploration, instant substring search, multi-facet filtering, dynamic cart management, and automated bill calculations.
- **Problem Statement 22 (Restaurant Table Booking):** Visual interactive floor layout selector, client-side validated reservation form, pre-booking deposit adjustments, and instant confirmation.

By adhering to modern declarative UI paradigms, component-driven modularity, centralized Context state management, custom hooks, and mathematical billing engines, the application exceeds all rubric criteria for **Bloom's Taxonomy Levels K3 (Apply)** and **K4 (Analyze)**.

---

## 2. Problem Statement & Domain Mapping

### Traditional Limitations
Legacy restaurant websites suffer from:
1. **Full Page Reloads:** Every menu category switch or cart modification forces server roundtrips, causing jarring flickers and state loss.
2. **Disconnected Table Booking:** Table reservations and culinary pre-ordering exist in silos, forcing guests to book a table on one page and order food separately.
3. **Rigid Filtering:** Inability to simultaneously filter by dietary restrictions (Veg / Non-Veg), price thresholds, and search terms.
4. **Lack of Dynamic Billing:** Inflexible cart calculation that fails to integrate real-time GST computation, promotional discounts, and reservation deposit credits.

### The Aurelia React Solution
The Aurelia React application solves these challenges by providing:
- **Zero Page Reloads:** Fluid client-side state routing across **6 functional views** (Home, Menu & Ordering, Table Booking, Cart & Billing, Guest Lounge, Reviews).
- **Synchronized Reservation & Cart Engine:** Guests can select an actual physical table on an interactive floor map, validate their contact details, and seamlessly pre-order culinary courses with the deposit adjusted directly on their checkout bill.
- **Client-Side Validation:** Real-time regex and constraint validation across all forms with instant visual feedback.
- **Guest Entertainment:** Stateful interactive waiting games (Memory Match and 8-Tile Sliding Puzzle) with move counters and victory detection for awaiting patrons.

---

## 3. Technologies & Technical Concepts

| Technology / Concept | Implementation & Architectural Role |
| :--- | :--- |
| **HTML5** | Semantic structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<dialog>`, `<footer>`), accessible ARIA roles, and responsive media tags. |
| **CSS3** | Luxury gold and obsidian design tokens (`variables.css`), CSS Grid systems for menu catalogs and table floor plans, Flexbox alignments, and media queries (`responsive.css`). |
| **JavaScript ES6+** | Arrow functions, array restructuring (`map`, `filter`, `reduce`), object destructuring, spread syntax, template literals, and regex input validation. |
| **React 18** | Virtual DOM reconciliation, declarative JSX components, strict mode compliance, and optimized re-rendering passes. |
| **Vite 5** | Next-generation frontend tooling with instant Hot Module Replacement (HMR) and optimized Rollup production asset chunking. |

### Bloom's Taxonomy Competency Matrix

```
       [K4: ANALYZE]
             │
             ├── Component Hierarchy Decomposition (Separating atomic UI from views)
             ├── useMemo Performance Optimization (Multi-criteria filter tree)
             └── LocalStorage Hydration & Immutable State Transitions
             │
       [K3: APPLY]
             │
             ├── React Hooks Deployment (useState, useEffect, useContext)
             ├── Controlled Form Components & Regex Validation Handlers
             └── Dynamic Mathematical Calculation Engine (Subtotal, GST, Coupons)
```

---

## 4. Component Architecture & Project Structure

The project strictly follows professional separation of concerns, isolating data models, state context, reusable atomic UI components, and container view pages:

```
d:/fs asi dharshini/task-2-interactive-react/
├── index.html                           # Root HTML mount point with luxury typography
├── package.json                         # React 18, React DOM, Vite dependencies
├── vite.config.js                       # Vite bundler configuration (GitHub Pages relative base)
├── start-task-2.bat                     # Windows one-click dev runner
├── dist/                                # Compiled production build bundle
└── src/
    ├── main.jsx                         # React root mount point
    ├── App.jsx                          # View orchestrator & application shell
    ├── context/
    │   └── CartContext.jsx              # Centralized Cart, Booking & Toast state
    ├── data/
    │   ├── menuData.js                  # 20+ dish catalog with categories, dietary tags, prices
    │   └── restaurantData.js            # Table layout data, FAQs, and guest reviews
    ├── components/
    │   ├── Navbar.jsx                   # Sticky brand header, navigation pills, cart badge
    │   ├── Footer.jsx                   # Brand footer with operational hours and links
    │   ├── MenuCard.jsx                 # Reusable dish card with quantity stepper and add button
    │   ├── StarRating.jsx               # Dynamic 5-star rating renderer (interactive & static)
    │   ├── Toast.jsx                    # Animated transient notification system
    │   └── TableMap.jsx                 # Interactive visual restaurant floor plan
    ├── pages/
    │   ├── Home.jsx                     # Hero banner, chef masterpieces, dining metrics, CTA
    │   ├── Menu.jsx                     # Real-time search, multi-facet filtering, sorting, cart
    │   ├── Booking.jsx                  # Floor map table picker + validated reservation form
    │   ├── Cart.jsx                     # Line items, quantity stepper, coupon validator, bill modal
    │   ├── Lounge.jsx                   # Memory match game, 8-tile sliding puzzle, photo lightbox
    │   └── Reviews.jsx                  # Controlled review submission form + FAQ accordion
    └── styles/
        ├── variables.css                # Gold, obsidian, champagne CSS custom properties
        ├── base.css                     # Reset, typography, animations, container layout
        ├── components.css               # Buttons, cards, inputs, stepper, modal dialogs
        └── responsive.css               # Tablet and mobile media queries
```

---

## 5. State Management & React Hooks Justification

### 1. `useContext` (`CartContext.jsx`)
- **Purpose:** Eliminates prop drilling by centralizing global application state accessible by any view or component.
- **Managed States:** Active cart items, table reservation object, applied coupon code, discount percentage, and transient toast alerts.
- **Operations:** `addToCart()`, `updateQty()`, `removeFromCart()`, `clearCart()`, `applyCoupon()`, `saveBooking()`, `cancelBooking()`.

### 2. `useState`
- **Component-Level States:**
  - `Menu.jsx`: `searchTerm`, `selectedCategory`, `dietaryFilter`, `maxPrice`, `onlyChefSpecials`, `sortBy`.
  - `Booking.jsx`: Controlled form fields (`guestName`, `email`, `phone`, `date`, `time`, `guests`, `tableId`), and `errors` validation map.
  - `Cart.jsx`: `couponInput`, `showCheckoutModal`, `checkoutStep`, `paymentMethod`, `checkoutData`.
  - `Lounge.jsx`: `deck`, `flippedIndices`, `matchedPairs`, `moves`, `puzzle`, `puzzleMoves`, `lightboxImg`.
  - `Reviews.jsx`: `reviewsList`, `filterRating`, `formData`, `activeFaq`.

### 3. `useEffect`
- **LocalStorage Synchronization:** Automatically writes cart and booking states to browser storage on state mutation, and hydrates state on initial mount.
- **View Change Synchronization:** Scroll-to-top handler triggered on `currentView` transition in `App.jsx`.
- **Game Initialization:** Automatically seeds and shuffles the memory card deck upon mounting `Lounge.jsx`.

### 4. `useMemo`
- **Algorithmic Filtering:** In `Menu.jsx`, the composite filtering algorithm (chaining search query, category pill, dietary enum, price threshold, chef special flag, and sorting algorithm) is memoized so expensive filter sweeps only execute when dependencies change.

---

## 6. Interactive Functionality Matrix

| Required Feature | Technical Implementation | View / Component |
| :--- | :--- | :--- |
| **Add** | • Add dishes to cart with custom quantity stepper (`qty`)<br>• Add new confirmed table reservation to global context<br>• Add customer dining review dynamically to reviews feed | `MenuCard.jsx`<br>`Booking.jsx`<br>`Reviews.jsx` |
| **Edit** | • Increment / decrement line item quantities (+ / −) with live bill recalculation<br>• Modify reservation table selection and dining slots | `Cart.jsx`<br>`Booking.jsx` |
| **Delete** | • Remove individual dishes from cart (`removeFromCart`)<br>• Clear entire cart (`clearCart`)<br>• Cancel active table reservation (`cancelBooking`) | `Cart.jsx`<br>`Booking.jsx` |
| **Search** | • Real-time substring keyword search across dish names, descriptions, and category labels with instant clear button | `Menu.jsx` |
| **Filter** | • Category pills: All, Combos, Starters, Mains, Desserts, Drinks<br>• Dietary filters: All, Veg Only, Non-Veg<br>• Price Range Slider: ₹100 to ₹1,500<br>• Chef's Special checkbox<br>• Review star filter (All, 5★, 4★, 3★) | `Menu.jsx`<br>`Reviews.jsx` |
| **Calculation** | • Item line totals: `price * quantity`<br>• Subtotal calculation: `∑(item.price * qty)`<br>• Dynamic coupon percentage discount (`AURELIA15`, `LUXURY20`)<br>• GST computation (5% tax on net food bill)<br>• Pre-booking token credit (₹100 adjusted in total)<br>• Dynamic average rating computation: `∑ratings / count` | `CartContext.jsx`<br>`Cart.jsx`<br>`Reviews.jsx` |

---

## 7. Form Handling & Client-Side Validation Engine

The application implements controlled React form inputs with comprehensive client-side validation rules. Form fields are validated on submission and real-time error messages are cleared dynamically on user input:

```
                  ┌───────────────────────────────┐
                  │    User Submits Reservation   │
                  └───────────────┬───────────────┘
                                  ▼
               ┌──────────────────────────────────────┐
               │    Run Validation Rules Matrix       │
               └──────────────────┬───────────────────┘
                                  │
         ┌────────────────────────┴────────────────────────┐
         ▼                                                 ▼
   [Validation Failed]                               [Validation Passed]
         │                                                 │
 ⚠️ Populate errors map:                             ✓ Save booking to Context
  • Name: "Must be ≥ 3 letters"                      ✓ Sync to localStorage
  • Email: "Invalid email format"                    ✓ Render active booking badge
  • Phone: "Must be 10 digits"                       ✓ Display gold success toast
  • Date: "Cannot be in past"
```

### Validation Rules Reference Table:

| Field | Rule / Regex | Error Feedback Message |
| :--- | :--- | :--- |
| **Guest Name** | `name.trim().length >= 3 && /^[a-zA-Z\s]+$/` | *"Name must contain at least 3 alphabetical characters."* |
| **Email Address** | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | *"Please provide a valid email format (name@domain.com)."* |
| **Phone Number** | `/^\d{10}$/` | *"Enter a valid 10-digit mobile number."* |
| **Reservation Date** | `date >= today` | *"Reservation date cannot be in the past."* |
| **Dining Slot** | `time !== ''` | *"Dining time slot is required."* |
| **Table Selection** | `tableId !== ''` | *"Please select a dining table from the floor map."* |
| **Review Commentary** | `comment.trim().length >= 10` | *"Please provide at least 10 characters of feedback."* |

---

## 8. Comprehensive 6-View Walkthrough

### View 1: Home (`pages/Home.jsx`)
- **Hero Sanctuary:** Cinematic typography, gold crest, dual call-to-actions ("Explore Menu" & "Reserve Table").
- **Metrics Bar:** 50+ Artisanal Dishes, 4.9★ Average Rating, 100% Organic Farm Sourced, VIP Dining Suites.
- **Chef's Masterpieces:** Top 3 signature dishes rendered using `MenuCard` with quick-add capabilities.
- **Dining Standard:** Highlights the candlelit ambiance, sommelier services, and interactive lounge.

### View 2: Culinary Menu (`pages/Menu.jsx`)
- **Search & Sort Toolbar:** Real-time search bar, sorting dropdown (Featured, Price Low-High, Price High-Low, Top Rated).
- **Category Tabs:** Fast switching between Combos, Starters, Mains, Desserts, and Elixirs.
- **Secondary Filters:** Dietary pills (Veg / Non-Veg), interactive Price Range Slider (₹100 – ₹1,500), and Chef's Specials checkbox.
- **Floating Cart Bar:** Responsive floating bottom indicator displaying item count and subtotal with one-click route to checkout.

### View 3: Table Booking (`pages/Booking.jsx`)
- **Interactive Table Map:** Visual floor plan showing tables across 5 zones (Window View, Main Dining Hall, Terrace Garden, Family Sovereign, Private VIP Lounge) with live available/occupied statuses.
- **Controlled Reservation Form:** Inputs for guest name, email, 10-digit phone, date picker, time slot, party size, and dietary notes.
- **Active Reservation Banner:** Displays confirmed reservation details, table number, and ₹100 pre-booking deposit credit.

### View 4: Cart & Billing (`pages/Cart.jsx`)
- **Line Items Table:** Dish photography, unit prices, quantity increment/decrement, and trash deletion.
- **Voucher Engine:** Validates promo codes (`AURELIA15` for 15% off, `LUXURY20` for 20% off) and updates bill in real-time.
- **Billing Summary:** Subtotal, Discount, 5% GST, Table Pre-booking Token, and Grand Total.
- **Simulated Checkout Modal:** Collects customer details, offers payment selection (UPI QR code preview, Card, Cash at dining), and displays a printable order confirmation invoice.

### View 5: Guest Lounge (`pages/Lounge.jsx`)
- **Culinary Memory Match Game:** 12-card grid with 6 gourmet ingredient pairs. Features card flipping, move tracking, and victory modal.
- **Royal 8-Tile Sliding Puzzle:** Stateful 3x3 sliding puzzle with move calculation.
- **Architectural Gallery Lightbox:** High-resolution photography of dining halls, wine cellars, and terrace patios with modal viewer.

### View 6: Guest Reviews (`pages/Reviews.jsx`)
- **Satisfaction Metrics Bar:** Real-time computed average score (4.9/5) and star filter buttons (All, 5★, 4★, 3★).
- **Controlled Review Form:** Allows guests to select an experienced signature dish, choose 1–5 stars interactively, input reflections, and submit with live feed appending.
- **Collapsible FAQ Accordion:** Interactive accordion addressing table bookings, dress codes, and promotional vouchers.

---

## 9. PowerPoint Presentation Deck (8-Slide Academic Script)

### Slide 1: Title & Project Overview
- **Title:** Aurelia Restaurant — Interactive ReactJS Application
- **Course:** Full Stack Web Development (Task 2)
- **Student Name:** Dharshini (`edharshini826-code`) | Section: III CSE-A
- **Core Problem Statements:**
  - Problem 21: Online Food Ordering Interface
  - Problem 22: Restaurant Table Booking
- **Tech Stack:** HTML5, CSS3, JavaScript ES6+, React 18, Vite

### Slide 2: Problem Statement & Objectives
- **Key Challenges:** Full page reloads in legacy web apps, disjointed table reservations and food ordering, rigid search filters.
- **Project Objectives:**
  - Build an interactive, stateful SPA using React functional components.
  - Implement centralized cart state with LocalStorage persistence.
  - Deliver interactive table booking with client-side form validation.
  - Provide a dynamic billing engine with promotional coupons and GST calculations.

### Slide 3: System Architecture & Component Hierarchy
- **Architecture Model:** Single-Page Application (SPA) driven by React 18 and Vite.
- **Hierarchy Breakdown:**
  - `App.jsx` (Routing & Layout Shell)
  - `CartContext.jsx` (Global state for cart, bookings, coupons, and toast notifications)
  - `pages/` (Home, Menu, Booking, Cart, Lounge, Reviews)
  - `components/` (Navbar, Footer, MenuCard, StarRating, TableMap, Toast)

### Slide 4: Interactive Functionality (Add, Edit, Delete, Search, Filter)
- **Add:** Add dishes to cart with quantity stepper, add table reservations, add guest reviews.
- **Edit:** Live adjustment of cart item quantities (+ / −) with instant financial updates.
- **Delete:** Remove dishes from cart or clear entire order with a single click.
- **Search & Filter:** Multi-criteria filtering combining instant keyword search, category pills, dietary tags (Veg/Non-Veg), price slider (₹100–₹1,500), and sorting dropdown.

### Slide 5: Form Handling & Client-Side Validation
- **Form Controls:** Controlled React inputs with local state synchronization.
- **Validation Rules:**
  - Full Name: Required, minimum 3 alphabetical characters.
  - Email Address: Standard RFC regex pattern.
  - Phone Number: Strict 10-digit mobile number validation.
  - Date & Time: Prevents booking on past dates.
  - Table Selection: Enforces physical table selection from the floor map.
- **Error Feedback:** Real-time inline warning messages cleared automatically on user input.

### Slide 6: Dynamic Billing & Checkout Engine
- **Mathematical Formulations:**
  - $\text{Subtotal} = \sum (\text{Price} \times \text{Quantity})$
  - $\text{Discount} = \text{Subtotal} \times \text{Discount}\%$
  - $\text{Net Food} = \text{Subtotal} - \text{Discount}$
  - $\text{Tax (GST)} = \text{Net Food} \times 5\%$
  - $\text{Grand Total} = \text{Net Food} + \text{Tax} + \text{Table Deposit}$
- **Coupon Codes:** `AURELIA15` (15% discount), `LUXURY20` (20% VIP discount).
- **Simulated Checkout:** UPI QR Code, Card, and Cash at dining with generated order invoice.

### Slide 7: Guest Lounge & Waiting Entertainment
- **Culinary Memory Match Game:** 12 cards, 6 pairs, move counter, and victory detection.
- **Royal 8-Tile Sliding Puzzle:** Stateful 3x3 sliding puzzle with move calculation.
- **Architectural Gallery Lightbox:** Interactive modal showcasing dining halls and terrace settings.
- **Significance:** Elevates customer satisfaction during course preparation.

### Slide 8: Conclusion & Future Scope (Tasks 3 & 4)
- **Summary:** Successfully transformed static Aurelia Restaurant (Task 1) into an interactive, validated React SPA (Task 2).
- **Task 3 Roadmap:** Connect frontend to a Spring Boot REST API and PostgreSQL / MySQL database for persistent reservations and orders.
- **Task 4 Roadmap:** Split architecture into cloud microservices (Catalog Service, Order Service, Booking Service) with API Gateway.

---

## 10. Application Workflow & Live Demonstration Script

Follow this step-by-step sequence during your project viva evaluation:

```
Step 1: Application Launch
└── Run start-task-2.bat (or execute npm run dev in task-2-interactive-react).
└── Open http://localhost:5173/ in the browser.

Step 2: Home Page Presentation
└── Point out the luxury branding, gold aesthetic, and responsiveness.
└── Highlight the metrics bar (50+ dishes, 4.9★ rating) and signature delicacies.

Step 3: Interactive Menu Demonstration (Search, Filter, Sort)
└── Click "Menu & Order" in the navigation bar.
└── Type "truffle" in the search box — observe instant dish filtering without page reload.
└── Toggle "Veg Only" dietary button — observe non-veg dishes filter out.
└── Adjust the Price Slider to ₹500 — observe real-time maximum price ceiling.
└── Sort by "Price: High to Low" — demonstrate instant re-ordering.
└── Click "+ / −" on a dish card to set quantity to 2, then click "Add".
└── Note the animated Toast notification and pulsating cart counter in the header.

Step 4: Table Reservation Demonstration (Map & Validation)
└── Click "Table Booking" in the navigation bar.
└── Click an available table on the interactive floor map (e.g. Table 1 - Window View).
└── Submit the form blank to demonstrate client-side validation errors.
└── Enter valid details (Name: "Dharshini", Email: "dharshini@gmail.com", Phone: "9876543210").
└── Click "Confirm Reservation" — observe the active reservation badge and ₹100 deposit token.

Step 5: Cart & Dynamic Billing Demonstration
└── Click "Cart & Bill" in the navigation bar.
└── Modify quantities using "+ / −" and verify subtotal changes.
└── Enter coupon code "AURELIA15" and click "Apply" — observe 15% discount calculation.
└── Point out the 5% GST computation and ₹100 table deposit credit.
└── Click "Proceed to Checkout", select "UPI Instant QR", and click "Confirm & Place Order".
└── Showcase the printable order receipt and automated cart reset.

Step 6: Guest Lounge Mini-Games Demonstration
└── Navigate to "Guest Lounge".
└── Flip two matching cards in "Culinary Memory Match" to show move counting.
└── Slide a tile in the "Royal 8-Tile Sliding Puzzle".
└── Click a gallery image to demonstrate the full-screen lightbox modal.
```

---

## 11. GitHub Deployment & Evaluation Guide

### 1. Build Verification
The application produces a production bundle via Vite:
```powershell
cd "d:\fs asi dharshini\task-2-interactive-react"
npm run build
```
Build output is saved to `dist/` with relative asset links (`base: './'`), ready for static hosting.

### 2. Pushing to GitHub & Hosting on GitHub Pages
To host your Task 2 React application live on GitHub Pages:
```powershell
cd "d:\fs asi dharshini\task-2-interactive-react"
git init
git add .
git commit -m "Task 2: Aurelia Restaurant Interactive ReactJS Application"
git branch -M main
git remote add origin https://github.com/edharshini826-code/Aurelia-Restaurant-React.git
git push -u origin main
```
In your GitHub Repository Settings:
1. Navigate to **Settings** > **Pages**.
2. Select **GitHub Actions** or set Source to **Deploy from branch** (`gh-pages` or `main/dist`).
3. Your live React application will be active at:  
   `https://edharshini826-code.github.io/Aurelia-Restaurant-React/`
