"use client";

import { useState } from "react";
import { mockOrders } from "@/app/lib/mock-data";
import { formatCurrency } from "@/app/lib/utils";
import { Eye, MessageCircle, RotateCcw, Truck, CheckCircle } from "lucide-react";

export default function OrdersPage() {
  const [filter, setFilter] = useState<string | null>(null);

  const filteredOrders = filter
    ? mockOrders.filter((o) => o.status === filter)
    : mockOrders;

  const statusColors: Record<string, string> = {
    pending: "badge-warning",
    approved: "badge-primary",
    packed: "badge-primary",
    shipped: "badge-info",
    delivered: "badge-success",
    cancelled: "badge-danger",
  };

  const statusIcons: Record<string, any> = {
    pending: "⏳",
    approved: "✓",
    packed: "📦",
    shipped: "🚚",
    delivered: "✓✓",
    cancelled: "✗",
  };

  return (
    <div className="container-wrapper py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track and manage all orders
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[null, "pending", "approved", "packed", "shipped", "delivered", "cancelled"].map(
          (status) => (
            <button
              key={status || "all"}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {status ? status.charAt(0).toUpperCase() + status.slice(1) : "All"}
            </button>
          )
        )}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="card-base p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-lg">{order.orderNumber}</h3>
                  <span className={statusColors[order.status]}>
                    {statusIcons[order.status]} {order.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Order Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(order.total)}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-4">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
                >
                  <div>
                    <p className="font-medium text-sm">Medicine ID: {item.medicineId}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Qty: {item.quantity} × {formatCurrency(item.price)}
                    </p>
                  </div>
                  <p className="font-semibold">
                    {formatCurrency(item.quantity * item.price)}
                  </p>
                </div>
              ))}
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">
                  Subtotal
                </p>
                <p className="font-semibold">{formatCurrency(order.subtotal)}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">
                  Tax
                </p>
                <p className="font-semibold">{formatCurrency(order.tax)}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">
                  Payment
                </p>
                <p className="font-semibold capitalize">
                  {order.paymentMethod.replace("_", " ")}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">
                  Payment Status
                </p>
                <span className={`badge-${order.paymentStatus === "paid" ? "success" : "warning"}`}>
                  {order.paymentStatus}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button className="flex-1 btn-primary py-2 text-sm flex items-center justify-center gap-2">
                <Eye size={16} />
                View Details
              </button>
              <button className="flex-1 btn-secondary py-2 text-sm flex items-center justify-center gap-2">
                <Truck size={16} />
                Track
              </button>
              <button className="flex-1 btn-ghost py-2 text-sm flex items-center justify-center gap-2">
                <MessageCircle size={16} />
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="card-base p-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No orders found for this status.
          </p>
        </div>
      )}
    </div>
  );
}
