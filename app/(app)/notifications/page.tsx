"use client";

import { useState } from "react";
import { Bell, AlertCircle, CheckCircle, AlertTriangle, Info, Trash2 } from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  timestamp: string;
  read: boolean;
}

const mockNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Low Stock Alert",
    message: "Paracetamol 500mg stock is below minimum level",
    type: "warning",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    title: "New Order Received",
    message: "Order ORD-2024-001 has been placed",
    type: "info",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    title: "Delivery Completed",
    message: "Order ORD-2024-002 delivered successfully",
    type: "success",
    timestamp: "30 minutes ago",
    read: true,
  },
  {
    id: "4",
    title: "Medicine Expiry Alert",
    message: "Ibuprofen 400mg batch expires in 15 days",
    type: "warning",
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: "5",
    title: "Payment Received",
    message: "Payment of 5,000 BDT received from Customer #001",
    type: "success",
    timestamp: "2 days ago",
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    mockNotifications
  );
  const [filter, setFilter] = useState<"all" | "unread" | "success" | "warning">(
    "all"
  );

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "success") return n.type === "success";
    if (filter === "warning") return n.type === "warning";
    return true;
  });

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-600" size={20} />;
      case "error":
        return <AlertCircle className="text-red-600" size={20} />;
      case "warning":
        return <AlertTriangle className="text-yellow-600" size={20} />;
      case "info":
        return <Info className="text-blue-600" size={20} />;
      default:
        return <Bell size={20} />;
    }
  };

  return (
    <div className="container-wrapper py-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={markAllAsRead}
          className="btn-secondary px-4 py-2 text-sm"
        >
          Mark all as read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {["all", "unread", "success", "warning"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as typeof filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`card-base p-4 border-l-4 transition-all ${
                !notification.read
                  ? "border-l-blue-600 bg-blue-50/50 dark:bg-blue-900/10"
                  : "border-l-gray-200 dark:border-l-gray-700"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-sm">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        {notification.timestamp}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="mt-3 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="card-base p-12 text-center">
            <Bell size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-gray-600 dark:text-gray-400">
              No notifications yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
