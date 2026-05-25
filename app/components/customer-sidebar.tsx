"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingCart,
  Package,
  MapPin,
  Heart,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/app/lib/utils";
import { useUIStore } from "@/app/lib/store";

const customerNavigation = [
  {
    section: "Shopping",
    items: [
      { href: "/customer", label: "Home", icon: Home },
      { href: "/customer/online-store", label: "Pharmacy Store", icon: ShoppingCart },
      { href: "/customer/nearby", label: "Nearby Pharmacy", icon: MapPin },
    ],
  },
  {
    section: "My Account",
    items: [
      { href: "/customer/orders", label: "My Orders", icon: Package },
      { href: "/customer/favorites", label: "Favorites", icon: Heart },
      { href: "/customer/profile", label: "Profile", icon: User },
      { href: "/customer/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function CustomerSidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => toggleSidebar()}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:sticky left-0 top-0 z-40 w-64 h-screen bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto transition-transform duration-300 md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8 mt-8 md:mt-0">
            <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center">
              <ShoppingCart className="text-white" size={24} />
            </div>
            <div className="font-bold text-lg">PharmShop</div>
          </div>

          {customerNavigation.map((section) => (
            <div key={section.section} className="mb-6">
              <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                {section.section}
              </h3>
              <nav className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => window.innerWidth < 768 && toggleSidebar()}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                    >
                      <Icon size={18} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
