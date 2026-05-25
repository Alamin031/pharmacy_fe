"use client";

import { Bell, Sun, Moon, ShoppingCart } from "lucide-react";
import { useUIStore, useNotificationStore } from "@/app/lib/store";
import { cn } from "@/app/lib/utils";

export function CustomerHeader() {
  const { darkMode, toggleDarkMode } = useUIStore();
  const { notifications } = useNotificationStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex-1" />

        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Shopping cart">
            <ShoppingCart size={20} />
            <span className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-semibold">
              1
            </span>
          </button>

          {/* Notifications */}
          <button
            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-semibold">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* User profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Customer</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">User</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
              C
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
