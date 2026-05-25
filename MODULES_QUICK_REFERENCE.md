# PharmERP - Modules Quick Reference

## 🎯 Quick Navigation

### **Admin Modules (Pharmacy Management)**

| Module | URL | Features | Status |
|--------|-----|----------|--------|
| Dashboard | `/dashboard` | Metrics, charts, alerts, recent orders | ✅ Full |
| POS System | `/pos` | Real-time checkout, cart, search | ✅ Full |
| Inventory | `/inventory` | Stock tracking, low stock alerts | ✅ Full |
| Medicines | `/medicines` | Database search, filtering, details | ✅ Full |
| Customers | `/customers` | Profiles, due tracking, analytics | ✅ Full |
| Suppliers | `/suppliers` | Supplier profiles, payment tracking | ✅ Full |
| Staff | `/staff` | Employee management, performance | ✅ Full |
| Settings | `/settings` | Configuration options | ✅ Full |

### **Sales & Orders Modules**

| Module | URL | Features | Status |
|--------|-----|----------|--------|
| Online Store | `/online-store` | E-commerce, product grid, cart | ✅ Full |
| Orders | `/orders` | Order management, status tracking | ✅ Full |
| Sales | `/sales` | Sales history, profit analysis | ✅ Full |
| Purchases | `/purchases` | Purchase orders, supplier invoices | ✅ Full |

### **Operations Modules**

| Module | URL | Features | Status |
|--------|-----|----------|--------|
| Delivery | `/delivery` | Tracking, rider info, timeline | ✅ Full |
| Nearby | `/nearby` | Location-based pharmacy finder | ✅ Full |
| Due Management | `/due-management` | Payment tracking, reminders | ✅ Full |

### **Analytics & Reports**

| Module | URL | Features | Status |
|--------|-----|----------|--------|
| Analytics | `/analytics` | Forecasting, predictions, charts | ✅ Full |
| Reports | `/reports` | Business reports, exports | ✅ Full |
| Notifications | `/notifications` | Alert management | ✅ Full |

### **Authentication**

| Module | URL | Features | Status |
|--------|-----|----------|--------|
| Login | `/login` | Authentication | ✅ Full |
| Home | `/` | Landing page | ✅ Full |

---

## 📝 Module Details

### **1. Dashboard** `/dashboard`
**Purpose**: Central overview of pharmacy operations

**Components**:
- Key metrics cards (Sales, Revenue, Due, Customers)
- Weekly sales chart
- Inventory status
- Recent orders table
- Low stock alerts

**Interactive Features**:
- Export button
- New order creation
- View all link

**Data Points**:
```
- Today's Sales
- Monthly Revenue
- Total Due Amount
- Total Customers
- Low Stock Items (3)
- Expiring Medicines (0)
- Dead Stock (0)
```

---

### **2. POS System** `/pos`
**Purpose**: Fast point-of-sale checkout

**Layout**:
- Left: Product search & grid
- Right: Invoice sidebar

**Features**:
- Medicine search by name/generic
- Quick add to cart
- Quantity adjustment
- Customer selection
- Discount application
- Auto-calculated tax & totals
- Clear cart
- Complete sale

**Responsive**:
- Desktop: Multi-column
- Mobile: Single column with fixed cart

---

### **3. Online Store** `/online-store`
**Purpose**: Customer-facing e-commerce

**Features**:
- Location header with delivery address
- Category filtering
- Product search
- Product cards with:
  - Product image placeholder
  - Price with discount
  - Stock status
  - Wishlist heart
  - Add to cart button
- Floating cart counter
- Bottom cart action bar

**Filters**:
- All categories
- Individual category selection

---

### **4. Orders** `/orders`
**Purpose**: Manage all orders

**Features**:
- Status filtering (All, Pending, Approved, Packed, Shipped, Delivered, Cancelled)
- Order cards with:
  - Order number & status
  - Total amount
  - Item list
  - Subtotal, tax, discount
  - Payment method & status
- Action buttons:
  - View Details
  - Track
  - Contact Customer

**Status Colors**:
- Warning: Pending
- Primary: Approved, Packed
- Info: Shipped
- Success: Delivered
- Danger: Cancelled

---

### **5. Delivery** `/delivery`
**Purpose**: Track deliveries in real-time

**Features**:
- Delivery summary cards
- Expandable delivery cards with:
  - Order info & status
  - Distance & ETA
  - Rider details
  - Pickup & delivery addresses
  - Delivery timeline
  - Contact & reschedule buttons
- Status tracking

**Statuses**:
- Pending
- Assigned
- Out for Delivery
- Delivered
- Cancelled

---

### **6. Nearby Pharmacy Finder** `/nearby`
**Purpose**: Find nearby pharmacies

**Features**:
- Location display (changeable)
- Sort options (Nearest, Top Rated, Fastest)
- Pharmacy cards with:
  - Name, distance, delivery time
  - Rating & reviews
  - Open/closed status
  - Delivery fee
  - Expandable details:
    - Address
    - Contact info
    - Hours
- View details & order buttons

**Sorting**:
- Distance (ascending)
- Rating (descending)
- Delivery time (ascending)

---

### **7. Staff Management** `/staff`
**Purpose**: Manage employees

**Features**:
- Staff summary cards
- Staff list with:
  - Name, avatar, role, status
  - Expandable details:
    - Email, phone
    - Performance metrics
    - Shift information
  - Edit & activity buttons
- Role badges (Admin, Pharmacist, Staff)
- Status indicators

**Metrics**:
- Sales Performance
- Attendance Rate
- Customer Satisfaction

---

### **8. Sales Management** `/sales`
**Purpose**: Track sales and profitability

**Features**:
- Sales metrics (Total, Profit, Avg Order Value)
- Search by order number or customer
- Sort options (Date, Amount, Items)
- Sales table with:
  - Order details
  - Item count
  - Amount & profit
  - Status
  - View button
- Export functionality

**Calculations**:
- Auto-calculates profit from medicine cost price
- Shows profit margin

---

### **9. Due Management** `/due-management`
**Purpose**: Manage customer payments

**Features**:
- Due summary cards
- Customers with due list:
  - Risk level (Low/Medium/High)
  - Outstanding amount
  - Contact info
  - Expandable details:
    - Due history
    - Payment input
    - Send reminder button
    - View history button

**Risk Levels**:
- Low: < 2000
- Medium: 2000-5000
- High: > 5000

---

### **10. Purchases** `/purchases`
**Purpose**: Manage supplier orders

**Features**:
- Purchase order metrics
- Filter by status (All, Pending, Approved, Received, Cancelled)
- Purchase order cards with:
  - PO number & status
  - Supplier name
  - Amount & item count
  - Dates (ordered & expected)
  - Expandable details:
    - Supplier details
    - Payment status breakdown
    - Record payment button
    - Upload invoice button

---

### **11. AI Analytics** `/analytics`
**Purpose**: Advanced business intelligence

**Features**:
- AI Insight cards:
  - Demand Forecast
  - Top Selling
  - Dead Stock Alert
  - Reorder Optimal
- Sales Forecast chart (6 months)
- Stock Level Prediction chart
- Weekly Demand vs Supply chart

**Charts**:
- Area Chart: Sales forecast
- Line Chart: Stock prediction
- Bar Chart: Demand vs supply

---

### **12. Reports** `/reports`
**Purpose**: Generate business reports

**Features**:
- Date range selector (Daily, Weekly, Monthly, Yearly, Custom)
- Report selection grid:
  - Sales Report
  - Profit & Loss
  - Inventory Report
  - Customer Analytics
  - Expiry Management
  - Staff Performance
- Quick stats display
- Detailed report view
- PDF & Excel export buttons

**Each Report Shows**:
- Quick stats
- Key metrics
- Export options

---

### **13. Notifications** `/notifications`
**Purpose**: Manage alerts

**Features**:
- Filter tabs (All, Unread, Success, Warning)
- Mark all as read
- Notification cards with:
  - Type icon (color-coded)
  - Title & message
  - Timestamp
  - Unread indicator
  - Mark as read button
  - Delete button
- Types: Success, Error, Warning, Info

---

### **14. Inventory** `/inventory`
**Purpose**: Stock management

**Features**:
- Inventory summary cards
- Search functionality
- Filter (All, Low, High, Critical)
- Inventory table with:
  - Medicine name & generic
  - Company
  - Current & min stock
  - Inventory value
  - Status badge

**Status**:
- Critical: < 50% of min stock
- Warning: At or below min stock
- Good: Above min stock

---

### **15. Medicines** `/medicines`
**Purpose**: Medicine database

**Features**:
- Bulk import button
- Search by name or generic
- Category filtering
- Medicine table with:
  - Name, generic, company
  - Category badge
  - Selling & cost price
  - Stock level
  - Action buttons (View, Edit, Delete)

**Actions** (Interactive):
- View details
- Edit medicine
- Delete medicine

---

### **16. Customers** `/customers`
**Purpose**: Customer management

**Features**:
- Customer statistics cards
- Search by name, email, or phone
- Account type filtering (All, Retail, Wholesale, Corporate)
- Customer cards with:
  - Name, account type
  - Contact info (email, phone, address)
  - Total due & total purchased
  - View profile button

**Card Layout**:
- Grid for better visual organization
- Hover effects
- Account type badge

---

### **17. Suppliers** `/suppliers`
**Purpose**: Supplier management

**Features**:
- Supplier cards with:
  - Name, contact person
  - Email, phone
  - Address
  - Total due & total purchased
  - View details button

**Information**:
- Contact details
- Financial summary
- Payment terms (optional)

---

### **18. Settings** `/settings`
**Purpose**: System configuration

**Features**:
- General settings section
- Save changes button
- Expandable for multiple sections

---

### **19. Login** `/login`
**Purpose**: Authentication

**Features**:
- Email input
- Password input
- Remember me checkbox
- Forgot password link
- Create account link
- Sign in button
- Demo credentials hint box

**Demo Credentials**:
- Email: admin@pharmacy.com
- Password: password

---

## 🎨 Component Structure

### **Sidebar** (Desktop)
- PharmERP logo
- Navigation sections:
  - Core (Dashboard, POS)
  - Operations (Inventory, Medicines, Purchases, Sales)
  - Business (Customers, Suppliers, Due, Returns)
  - Sales (Online Store, Orders, Delivery, Nearby)
  - Management (Staff, Analytics, Reports, Notifications)
  - Settings
- Logout button

### **Bottom Nav** (Mobile)
- Home (Dashboard)
- POS
- Stock
- Medicines
- Settings

### **Header**
- Notifications bell with unread count
- Dark mode toggle
- User profile with name & role

---

## 💾 Data Models

### **Medicine**
```typescript
{
  id: string
  name: string
  genericName: string
  company: string
  price: number
  costPrice: number
  stock: number
  minStock: number
  category: string
  barcode: string
}
```

### **Customer**
```typescript
{
  id: string
  name: string
  phone: string
  email?: string
  accountType: 'retail' | 'wholesale' | 'corporate'
  totalDue: number
  totalPurchased: number
}
```

### **Order**
```typescript
{
  id: string
  orderNumber: string
  customerId: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'approved' | 'packed' | 'shipped' | 'delivered'
  paymentStatus: 'unpaid' | 'partial' | 'paid'
  paymentMethod: 'cash' | 'card' | 'mobile_banking' | 'check'
}
```

---

## 🔄 State Management (Zustand)

### **useAuthStore**
- User authentication
- Login/logout
- Token management

### **usePOSStore**
- Shopping cart items
- Add/remove/update items
- Discount & totals

### **useUIStore**
- Sidebar visibility
- Dark mode toggle

### **useNotificationStore**
- Notification list
- Mark as read
- Delete notifications

---

## 🎯 Working Buttons & Actions

### **Dashboard**
- ✅ Export button
- ✅ New order button
- ✅ View all link

### **POS**
- ✅ Search input
- ✅ Product add buttons
- ✅ Quantity +/- buttons
- ✅ Customer dropdown
- ✅ Remove item button
- ✅ Clear cart button
- ✅ Complete sale button

### **All Modules**
- ✅ Search/filter inputs
- ✅ Sort buttons
- ✅ Status filter tabs
- ✅ Expandable cards
- ✅ Action buttons
- ✅ Modal-like details

---

## 📊 Charts Implemented

1. **Line Chart**: Sales forecast
2. **Area Chart**: Sales analysis
3. **Bar Chart**: Demand vs supply
4. **Tables**: Orders, medicines, sales, etc.

---

## ✨ Special Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode support
- ✅ Real-time mock data
- ✅ Type-safe TypeScript
- ✅ Interactive UI elements
- ✅ Professional styling
- ✅ Accessible components
- ✅ Smooth animations

---

**All modules are fully functional and ready to integrate with a real backend API!**

