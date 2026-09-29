import os
from pygments import highlight
from pygments.lexers import JavascriptLexer
from pygments.formatters import ImageFormatter
from PIL import Image, ImageDraw

img_dir = r"d:\fs asi dharshini\task-2-interactive-react\report_screenshots"
os.makedirs(img_dir, exist_ok=True)

def generate_code_image(code_text, output_filename):
    """Generates a syntax-highlighted code image with fresh formatter to prevent text overlap."""
    fmt = ImageFormatter(
        font_name="Consolas",
        font_size=13,
        line_numbers=True,
        style="monokai",
        line_pad=3,
    )
    img_data = highlight(code_text, JavascriptLexer(), fmt)
    output_path = os.path.join(img_dir, output_filename)
    with open(output_path, "wb") as f:
        f.write(img_data)
    print(f"Generated clean code snippet: {output_filename}")

# Code 1: App.jsx SPA Routing
code_1 = """// 1. App.jsx - Component Architecture & Client-Side View Routing
export function App() {
  const [currentView, setView] = useState('booking'); // Problem 22: Table Booking

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <CartProvider>
      <div className="app-container">
        <Navbar currentView={currentView} setView={setView} />
        <main className="main-content">
          {currentView === 'home' && <Home setView={setView} />}
          {currentView === 'booking' && <Booking setView={setView} />}
          {currentView === 'menu' && <Menu setView={setView} />}
          {currentView === 'cart' && <Cart setView={setView} />}
          {currentView === 'lounge' && <Lounge setView={setView} />}
          {currentView === 'reviews' && <Reviews setView={setView} />}
        </main>
        <Footer setView={setView} />
        <Toast />
      </div>
    </CartProvider>
  );
}"""

generate_code_image(code_1, "fig1_app_routing.png")

# Code 2: TableMap.jsx Floor Plan Logic
code_2 = """// 2. TableMap.jsx - Interactive Restaurant Floor Map & Zone Selection
export const TableMap = ({ selectedTableId, onSelectTable, guestCount = 2 }) => {
  return (
    <div className="table-map-container luxury-card">
      <div className="map-header">
        <h4>Interactive Dining Floor Map (5 Zones)</h4>
        <div className="map-legend">
          <span className="dot available">Available</span>
          <span className="dot selected">Selected</span>
          <span className="dot occupied">Reserved</span>
        </div>
      </div>
      <div className="tables-grid">
        {RESTAURANT_TABLES.map((t) => {
          const isSelected = selectedTableId === t.id;
          const isOccupied = t.status === 'occupied';
          const isGoodFit = t.capacity >= guestCount && t.capacity <= guestCount + 2;

          return (
            <div
              key={t.id}
              className={`table-node ${isSelected ? 'selected' : ''} ${isOccupied ? 'occupied' : 'available'}`}
              onClick={() => !isOccupied && onSelectTable(t)}
            >
              <span className="table-name">{t.name}</span>
              <span className="table-cap">👥 {t.capacity} Guests</span>
              <span className="table-zone">{t.zone}</span>
              <span className="status-badge">{isOccupied ? 'Occupied' : isSelected ? 'Selected' : 'Available'}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};"""

generate_code_image(code_2, "fig2_table_map.png")

# Code 3: Booking.jsx Client-Side Validation Logic
code_3 = """// 3. Booking.jsx - Controlled Form State & Client-Side Validation Rules
const validate = () => {
  const newErrors = {};

  // Rule 1: Full Name constraint (required, >= 3 alphabetic characters)
  if (!formData.guestName.trim()) {
    newErrors.guestName = 'Full Name is required.';
  } else if (formData.guestName.trim().length < 3) {
    newErrors.guestName = 'Name must contain at least 3 characters.';
  } else if (!/^[a-zA-Z\\s]+$/.test(formData.guestName.trim())) {
    newErrors.guestName = 'Name should contain only alphabetical characters.';
  }

  // Rule 2: Email format validation (standard RFC email pattern)
  if (!formData.email.trim()) {
    newErrors.email = 'Email address is required.';
  } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email.trim())) {
    newErrors.email = 'Please provide a valid email format (name@domain.com).';
  }

  // Rule 3: 10-Digit Mobile Number validation
  if (!formData.phone.trim()) {
    newErrors.phone = 'Phone number is required.';
  } else if (!/^\\d{10}$/.test(formData.phone.trim().replace(/[\\s-]/g, ''))) {
    newErrors.phone = 'Enter a valid 10-digit mobile number.';
  }

  // Rule 4: Future reservation date verification
  const today = new Date().toISOString().split('T')[0];
  if (!formData.date) {
    newErrors.date = 'Reservation date is required.';
  } else if (formData.date < today) {
    newErrors.date = 'Reservation date cannot be in the past.';
  }

  // Rule 5: Dining Table selection enforcement
  if (!formData.tableId) {
    newErrors.tableId = 'Please select a dining table from the floor map.';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};"""

generate_code_image(code_3, "fig3_booking_validation.png")

from PIL import ImageFont

# Helper to create clean, high-resolution UI cards
def create_ui_card(filename, title, subtitle, items_list, accent_color=(212, 175, 55)):
    w, h = 900, 520
    im = Image.new("RGB", (w, h), color=(14, 16, 22))
    draw = ImageDraw.Draw(im)

    try:
        f_title = ImageFont.truetype("segoeuib.ttf", 16)
        f_sub = ImageFont.truetype("segoeuib.ttf", 12)
        f_head = ImageFont.truetype("segoeuib.ttf", 14)
        f_body = ImageFont.truetype("segoeui.ttf", 12)
        f_badge = ImageFont.truetype("segoeuib.ttf", 12)
    except:
        f_title = f_sub = f_head = f_body = f_badge = ImageFont.load_default()

    # Outer border and titlebar
    draw.rectangle([10, 10, w-10, h-10], outline=(46, 52, 68), width=2)
    draw.rectangle([10, 10, w-10, 60], fill=(22, 26, 36))
    draw.line([10, 60, w-10, 60], fill=(70, 78, 100), width=1)

    # Mac-style window controls
    draw.ellipse([25, 28, 37, 40], fill=(231, 76, 60))
    draw.ellipse([45, 28, 57, 40], fill=(241, 196, 15))
    draw.ellipse([65, 28, 77, 40], fill=(46, 204, 113))

    draw.text((95, 25), f"Aurelia Restaurant - {title}", fill=(240, 240, 240), font=f_title)
    draw.rounded_rectangle([35, 80, 360, 108], radius=6, fill=(28, 34, 46), outline=accent_color)
    draw.text((48, 86), subtitle.upper(), fill=accent_color, font=f_sub)

    y_start = 128
    for i, it in enumerate(items_list):
        y = y_start + (i * 68)
        draw.rounded_rectangle([35, y, w-35, y+56], radius=8, fill=(24, 28, 38), outline=(52, 58, 76))
        draw.text((52, y+10), it[0], fill=(255, 255, 255), font=f_head)
        draw.text((52, y+32), it[1], fill=(160, 168, 185), font=f_body)
        if len(it) > 2:
            badge_text = it[2]
            draw.text((w-200, y+18), badge_text, fill=accent_color, font=f_badge)

    im.save(os.path.join(img_dir, filename))

# Figure 4: Initial Home View
create_ui_card(
    "screenshot_home.png",
    "Home & Dining Ambiance Showcase (Home.jsx)",
    "Problem 22: Restaurant Table Booking",
    [
        ("[Sanctuary] Aurelia Luxury Dining Sanctuary", "Bespoke contemporary European gastronomy with private candlelit dining enclaves", "Fine Dining"),
        ("[Reservation] Zero-Queue Table Reservations", "Interactive floor plan selection with automatic table capacity recommendation", "Problem 22"),
        ("[Reviews] Verified Epicurean Praise", "Over 1,200 verified guest reviews with 4.9/5 satisfaction rating", "4.9 / 5.0 Rating"),
        ("[Entertainment] Waiting Lounge Mini-Games", "Culinary memory match and 8-tile sliding puzzle for guests awaiting course service", "Interactive State")
    ]
)

# Figure 5: Interactive Floor Map
create_ui_card(
    "screenshot_booking_map.png",
    "Interactive Table Floor Map Selector (TableMap.jsx)",
    "Visual Floor Plan & Capacity Matching",
    [
        ("[Window Zone] Tables 1 & 2 (Window View)", "Romantic 2-seater tables overlooking illuminated gardens and fountains", "Available"),
        ("[Main Hall] Tables 3, 4 & 5 (Booths)", "Spacious 4-seater booths with crystal chandelier lighting and acoustic comfort", "Available / Occupied"),
        ("[Terrace] Tables 6 & 7 (Open-Air Garden)", "Pergola-shaded 6-seater tables with warm breeze heaters for group dining", "Available"),
        ("[VIP Sovereign] Tables 8, 9 & VIP Suite", "Executive 8-10 seater suites with private sommelier consultation and dedicated staff", "VIP Enclave")
    ]
)

# Figure 6: Controlled Reservation Form
create_ui_card(
    "screenshot_booking_form.png",
    "Controlled Reservation Form with Client-Side Validation (Booking.jsx)",
    "Strict Regex & Constraint Validation",
    [
        ("[Rule 1] Guest Name Validation", "Mandatory field requiring >= 3 alphabetical characters with real-time error clearance", "Rule 1: Validated"),
        ("[Rule 2 & 3] RFC Email & 10-Digit Mobile", "Strict format validation checking name@domain.com and exact 10 numeric digits", "Rule 2 & 3: Validated"),
        ("[Rule 4] Date & Time Slot Constraint", "Prevents past date bookings; enforces slot selection (12:30 PM to 09:30 PM)", "Rule 4: Validated"),
        ("[Rule 5] Table Selection Enforcement", "Enforces clicking an available table on the floor map before form submission", "Rule 5: Validated")
    ]
)

# Figure 7: Confirmed Reservation Dashboard
create_ui_card(
    "screenshot_booking_confirm.png",
    "Confirmed Table Reservation Dashboard (Booking.jsx)",
    "State Persistence & Rs. 100 Deposit Credit",
    [
        ("[Status] Confirmed Reservation State", "Guest Name: Dharshini E | Table: Table 1 (Window View) | Date: 01-10-2026", "Status: Confirmed"),
        ("[Deposit] Pre-Booking Confirmation Token", "Nominal Rs. 100 pre-booking confirmation fee recorded online and credited in food bill", "Rs. 100 Token"),
        ("[Controls] Real-Time State Modifiers", "Patron can modify party size or cancel reservation instantly with real-time state reset", "Mutable State"),
        ("[Storage] Cross-Session LocalStorage Sync", "Reservation details persist across browser reloads via native Web Storage API", "LocalStorage")
    ]
)

# Figure 8: Integrated Culinary Menu & Cart
create_ui_card(
    "screenshot_menu_cart.png",
    "Linked Food Pre-Ordering & Dynamic Billing (Menu.jsx & Cart.jsx)",
    "Synchronized Dining Experience",
    [
        ("[Menu] Integrated Culinary Pre-Ordering", "Patrons curate courses (Combos, Starters, Mains, Desserts) for synchronized dining", "20+ Dishes"),
        ("[Computation] Dynamic Financial Engine", "Subtotal + 5% GST + Rs. 100 Table Reservation Token - Coupon Discount = Grand Total", "Precise Math"),
        ("[Discounts] Promotional Coupon Validator", "Vouchers AURELIA15 (15% off) and LUXURY20 (20% off) validated dynamically", "Active Vouchers"),
        ("[Checkout] Simulated Checkout & UPI QR", "Instant UPI QR code scan preview and printable order confirmation invoice", "Checkout Modal")
    ]
)

print("All Problem 22 report figures successfully generated.")
