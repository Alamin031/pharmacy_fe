import { create } from "zustand";
import type { User, AuthState, POSCart, Notification } from "./types";

// Auth Store
interface AuthStore extends AuthState {
  setUser: (user: User | null) => void;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  token: undefined,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setToken: (token) => set({ token }),
  setLoading: (loading) => set({ isLoading: loading }),
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      // Mock login - replace with actual API call
      const mockUser: User = {
        id: "1",
        email,
        name: "John Doe",
        role: "admin",
        phone: "+8801700000000",
        status: "active",
        createdAt: new Date(),
      };
      set({ user: mockUser, isAuthenticated: true, token: "mock_token_123" });
    } catch (error) {
      console.error("Login failed:", error);
      set({ isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },
  logout: () => set({ user: null, isAuthenticated: false, token: undefined }),
}));

// POS Store
interface POSStore {
  cart: POSCart;
  addItem: (medicineId: string, medicineName: string, quantity: number, price: number) => void;
  removeItem: (medicineId: string) => void;
  updateQuantity: (medicineId: string, quantity: number) => void;
  setDiscount: (discount: number) => void;
  setCustomer: (customerId: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

const initialCart: POSCart = {
  items: [],
  subtotal: 0,
  tax: 0,
  discount: 0,
  total: 0,
};

export const usePOSStore = create<POSStore>((set) => ({
  cart: initialCart,
  addItem: (medicineId, medicineName, quantity, price) =>
    set((state) => {
      const existing = state.cart.items.find((item) => item.medicineId === medicineId);
      let items;
      if (existing) {
        items = state.cart.items.map((item) =>
          item.medicineId === medicineId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        items = [...state.cart.items, { medicineId, medicineName, quantity, price, discount: 0 }];
      }
      const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
      const tax = subtotal * 0.15;
      const total = subtotal + tax - state.cart.discount;
      return {
        cart: { ...state.cart, items, subtotal, tax, total },
      };
    }),
  removeItem: (medicineId) =>
    set((state) => {
      const items = state.cart.items.filter((item) => item.medicineId !== medicineId);
      const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
      const tax = subtotal * 0.15;
      const total = subtotal + tax - state.cart.discount;
      return {
        cart: { ...state.cart, items, subtotal, tax, total },
      };
    }),
  updateQuantity: (medicineId, quantity) =>
    set((state) => {
      const items = state.cart.items
        .map((item) => (item.medicineId === medicineId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0);
      const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
      const tax = subtotal * 0.15;
      const total = subtotal + tax - state.cart.discount;
      return {
        cart: { ...state.cart, items, subtotal, tax, total },
      };
    }),
  setDiscount: (discount) =>
    set((state) => {
      const total = state.cart.subtotal + state.cart.tax - discount;
      return {
        cart: { ...state.cart, discount, total },
      };
    }),
  setCustomer: (customerId) =>
    set((state) => ({
      cart: { ...state.cart, customerId },
    })),
  clearCart: () => set({ cart: initialCart }),
  calculateTotals: () => {
    set((state) => {
      const subtotal = state.cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
      const tax = subtotal * 0.15;
      const total = subtotal + tax - state.cart.discount;
      return {
        cart: { ...state.cart, subtotal, tax, total },
      };
    });
  },
}));

// Notification Store
interface NotificationStore {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id" | "createdAt">) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          ...notification,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date(),
        },
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),
}));

// UI Store
interface UIStore {
  sidebarOpen: boolean;
  darkMode: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleDarkMode: () => void;
  setDarkMode: (dark: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  darkMode: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setDarkMode: (dark) => set({ darkMode: dark }),
}));
