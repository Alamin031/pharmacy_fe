// Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "pharmacist" | "staff" | "customer" | "rider";
  branch?: string;
  avatar?: string;
  phone?: string;
  status: "active" | "inactive" | "suspended";
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  token?: string;
}

// Medicine Types
export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  company: string;
  category: string;
  price: number;
  costPrice: number;
  stock: number;
  minStock: number;
  unit: string;
  barcode: string;
  qrCode?: string;
  image?: string;
  description?: string;
  expiryDate?: Date;
  batchNumber?: string;
  dosage?: string;
  composition?: string;
  sideEffects?: string;
  manufacturer?: string;
  registrationNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Inventory Types
export interface InventoryItem {
  id: string;
  medicineId: string;
  branchId: string;
  quantity: number;
  minStock: number;
  maxStock: number;
  lastUpdated: Date;
  lastCountedAt?: Date;
}

// Customer Types
export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone: string;
  address?: string;
  city?: string;
  postalCode?: string;
  accountType: "retail" | "wholesale" | "corporate";
  totalDue: number;
  totalPurchased: number;
  loyaltyPoints: number;
  lastPurchaseDate?: Date;
  createdAt: Date;
}

// Order Types
export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: "pending" | "approved" | "packed" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "unpaid" | "partial" | "paid";
  paymentMethod: "cash" | "card" | "mobile_banking" | "check";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  medicineId: string;
  quantity: number;
  price: number;
  discount: number;
}

// POS Types
export interface POSCart {
  items: POSCartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  customerId?: string;
  notes?: string;
}

export interface POSCartItem {
  medicineId: string;
  medicineName: string;
  quantity: number;
  price: number;
  discount: number;
}

// Delivery Types
export interface Delivery {
  id: string;
  orderId: string;
  riderId: string;
  status: "pending" | "assigned" | "out_for_delivery" | "delivered" | "cancelled";
  pickupAddress: string;
  deliveryAddress: string;
  distance: number;
  estimatedTime: number;
  actualDeliveryTime?: Date;
  ratings?: number;
  notes?: string;
  createdAt: Date;
}

// Supplier Types
export interface Supplier {
  id: string;
  name: string;
  email?: string;
  phone: string;
  address?: string;
  contactPerson?: string;
  paymentTerms?: string;
  totalDue: number;
  totalPurchased: number;
  createdAt: Date;
}

// Report Types
export interface SalesReport {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  topProducts: Medicine[];
  topCustomers: Customer[];
  period: "daily" | "weekly" | "monthly" | "yearly";
  startDate: Date;
  endDate: Date;
}

// Dashboard Types
export interface DashboardMetrics {
  todaySales: number;
  monthlyRevenue: number;
  profit: number;
  dueAmount: number;
  totalCustomers: number;
  lowStockMedicines: Medicine[];
  expiringMedicines: Medicine[];
  deadStock: Medicine[];
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "alert" | "info" | "success" | "error" | "warning";
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

// Pagination Types
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  filters?: Record<string, any>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
