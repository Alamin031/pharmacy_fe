# PharmERP - Pharmacy Management System

A comprehensive, enterprise-level pharmacy ERP system with online ordering, delivery tracking, and AI-powered analytics.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Data Fetching**: SWR
- **Charts**: Recharts
- **UI Components**: Radix UI primitives + Lucide icons
- **Animations**: Framer Motion
- **Tables**: TanStack React Table

## Project Structure

```
app/
├── (auth)/                 # Authentication routes (no sidebar)
│   ├── login/
│   ├── register/
│   └── layout.tsx
├── (app)/                  # Main app routes (with sidebar)
│   ├── dashboard/
│   ├── pos/
│   ├── inventory/
│   ├── medicines/
│   ├── customers/
│   ├── suppliers/
│   ├── purchases/
│   ├── sales/
│   ├── due-management/
│   ├── returns/
│   ├── online-store/
│   ├── orders/
│   ├── delivery/
│   ├── nearby/
│   ├── staff/
│   ├── analytics/
│   ├── reports/
│   ├── notifications/
│   ├── settings/
│   └── layout.tsx
├── components/             # Reusable UI components
│   ├── sidebar.tsx
│   ├── bottom-nav.tsx
│   ├── header.tsx
│   ├── stat-card.tsx
│   └── empty-state.tsx
├── lib/
│   ├── utils.ts           # Utility functions
│   ├── types.ts           # TypeScript type definitions
│   ├── store.ts           # Zustand stores
│   └── mock-data.ts       # Mock data for development
├── globals.css            # Global styles
└── page.tsx              # Landing page
```

## Core Modules

### 1. **Dashboard** (`/dashboard`)
Real-time pharmacy overview with:
- Key metrics (sales, revenue, due amount)
- Inventory status
- Recent orders
- Weekly sales chart
- Low stock alerts

### 2. **POS System** (`/pos`)
Ultra-fast point-of-sale interface:
- Product search and quick add
- Cart management
- Customer selection
- Discount application
- Multiple payment methods
- Invoice generation

### 3. **Inventory Management** (`/inventory`)
Real-time stock tracking:
- Stock level monitoring
- Low stock alerts
- Inventory value calculation
- Status filtering (low/high/critical)
- Batch tracking

### 4. **Medicine Database** (`/medicines`)
Comprehensive medicine management:
- 30,000+ medicine catalog
- Category filtering
- Search functionality
- Stock tracking
- Bulk import support

### 5. **Customer Management** (`/customers`)
Customer relationship management:
- Customer profiles
- Due tracking
- Purchase history
- Loyalty points
- Contact management

### 6. **Supplier Management** (`/suppliers`)
Supplier relationship management:
- Supplier profiles
- Payment tracking
- Purchase history
- Supplier analytics

### 7. **Purchase Orders** (`/purchases`)
Purchase order management:
- Create purchase orders
- Track supplier orders
- Invoice management
- Payment status

### 8. **Sales Management** (`/sales`)
Sales tracking and analytics:
- Sales history
- Product performance
- Branch comparison
- Revenue analytics

### 9. **Due Management** (`/due-management`)
Customer due tracking:
- Due customer list
- Payment tracking
- SMS reminders
- Risk analysis

### 10. **Returns & Refunds** (`/returns`)
Return management:
- Return verification
- Invoice matching
- Partial returns
- Refund tracking

### 11. **Online Store** (`/online-store`)
Customer-facing e-commerce:
- Medicine catalog
- Categories and search
- Cart system
- Wishlist
- Checkout process

### 12. **Orders** (`/orders`)
Order management system:
- Online order tracking
- Order status updates
- Invoice management
- Delivery coordination

### 13. **Delivery System** (`/delivery`)
Delivery tracking and management:
- Rider assignment
- Live tracking
- Delivery status updates
- Route optimization
- ETA prediction

### 14. **Nearby Pharmacy Finder** (`/nearby`)
Location-based pharmacy finder:
- GPS-based search
- Nearby branch detection
- Distance calculation
- Availability checking
- Delivery estimation

### 15. **Staff Management** (`/staff`)
Employee management:
- Staff profiles
- Role management
- Attendance tracking
- Performance analytics
- Activity logs

### 16. **Analytics** (`/analytics`)
AI-powered business intelligence:
- Sales forecasting
- Stock prediction
- Demand analytics
- Customer insights
- Trend analysis

### 17. **Reports** (`/reports`)
Business reporting:
- Sales reports
- Profit/loss statements
- Inventory reports
- Customer analytics
- Export to PDF/Excel

### 18. **Notifications** (`/notifications`)
Alert and notification management:
- Real-time alerts
- Low stock notifications
- Due reminders
- Order updates
- Push notifications

### 19. **Settings** (`/settings`)
System configuration:
- Business profile
- Invoice settings
- Notification preferences
- Security settings
- Delivery zone configuration

## Global Components

### Sidebar Navigation
- Desktop navigation (fixed)
- Mobile toggle
- Section-based menu organization
- Active page highlighting

### Header
- User profile
- Theme toggle (dark/light mode)
- Notification badge
- Quick actions

### Bottom Navigation
- Mobile-specific navigation
- 5 main sections
- Touch-optimized buttons

## State Management (Zustand Stores)

### `useAuthStore`
```typescript
- user: User | null
- isLoading: boolean
- isAuthenticated: boolean
- token: string
- Methods: setUser, setToken, login, logout
```

### `usePOSStore`
```typescript
- cart: POSCart
- Methods: addItem, removeItem, updateQuantity, setDiscount, setCustomer, clearCart
```

### `useNotificationStore`
```typescript
- notifications: Notification[]
- Methods: addNotification, removeNotification, markAsRead
```

### `useUIStore`
```typescript
- sidebarOpen: boolean
- darkMode: boolean
- Methods: toggleSidebar, setSidebarOpen, toggleDarkMode, setDarkMode
```

## Key Types

### User
```typescript
{
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'pharmacist' | 'staff' | 'customer' | 'rider';
  phone?: string;
  status: 'active' | 'inactive' | 'suspended';
}
```

### Medicine
```typescript
{
  id: string;
  name: string;
  genericName: string;
  company: string;
  price: number;
  costPrice: number;
  stock: number;
  minStock: number;
  category: string;
  dosage?: string;
}
```

### Order
```typescript
{
  id: string;
  orderNumber: string;
  customerId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'approved' | 'packed' | 'shipped' | 'delivered';
  paymentStatus: 'unpaid' | 'partial' | 'paid';
}
```

## Styling

### Global Classes (TailwindCSS)
- `.container-wrapper` - Max-width container
- `.card-base` - Standard card styling
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.btn-ghost` - Ghost button
- `.input-base` - Standard input field
- `.badge-*` - Badge variations
- `.table-base` - Table styling

## Mock Data

Mock data is provided for development:
- `mockMedicines` - 5 sample medicines
- `mockCustomers` - 3 sample customers
- `mockOrders` - 2 sample orders
- `mockUsers` - 3 sample staff members
- `mockSuppliers` - 2 sample suppliers
- `getMockDashboardMetrics()` - Dynamic dashboard data

## Getting Started

1. **Install dependencies** (after you run the npm install command):
```bash
npm install
```

2. **Run development server**:
```bash
npm run dev
```

3. **Default login credentials**:
   - Email: `admin@pharmacy.com`
   - Password: `password`

4. **Access the app**:
   - Homepage: `http://localhost:3000`
   - Dashboard: `http://localhost:3000/dashboard`
   - POS: `http://localhost:3000/pos`

## API Integration Points

Replace mock data with real API calls in:
- `useAuthStore.login()` - Authentication endpoint
- `usePOSStore` - Order creation endpoint
- Each module's data fetching (to be implemented with SWR)

## Next Steps

1. **Connect to Backend API**
   - Replace mock data with real API endpoints
   - Implement SWR hooks for data fetching
   - Add error handling and loading states

2. **Implement Real-time Features**
   - Socket.IO integration for live updates
   - Websocket for order tracking
   - Push notifications

3. **Add Missing Features**
   - Payment gateway integration
   - QR/Barcode scanning
   - CCTV integration
   - Map integration
   - SMS/Email integration

4. **PWA Setup**
   - Add manifest.json
   - Service worker registration
   - Offline support

5. **Deployment**
   - Build optimization
   - Environment configuration
   - Database setup
   - CI/CD pipeline

## Authentication

Currently using mock authentication. To implement real auth:

1. Replace `useAuthStore.login()` with actual API call
2. Implement JWT token storage
3. Add protected routes with middleware
4. Setup session management

## Dark Mode

Dark mode is fully implemented with:
- CSS variables for theming
- Zustand store for mode toggling
- Automatic media query detection
- Tailwind dark mode classes

## Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Bottom navigation for mobile
- Sidebar for desktop
- Touch-optimized interactive elements

## Performance Optimizations

- Code splitting with Next.js
- Image optimization
- CSS optimization with TailwindCSS
- State management with Zustand (minimal re-renders)
- Lazy loading routes with App Router

## File Naming Conventions

- Components: `PascalCase` (e.g., `Sidebar.tsx`)
- Utilities: `camelCase` (e.g., `utils.ts`)
- Pages: `page.tsx` in directory
- Styles: Follow component file names
- Types: Defined in `types.ts`

## Contributing Guidelines

1. Keep components small and focused
2. Use TypeScript for type safety
3. Follow the existing code style
4. Use mock data for new features first
5. Test responsive design on mobile
6. Maintain dark mode compatibility

---

**Built with ❤️ for modern pharmacies**
