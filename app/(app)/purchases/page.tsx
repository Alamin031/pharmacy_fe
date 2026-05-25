"use client";

import { useState } from "react";
import { mockSuppliers } from "@/app/lib/mock-data";
import { formatCurrency } from "@/app/lib/utils";
import { Plus, FileText, DollarSign, Calendar, Eye } from "lucide-react";

const purchaseOrders = [
  {
    id: "po1",
    poNumber: "PO-2024-001",
    supplierId: "s1",
    items: 45,
    amount: 125000,
    status: "pending",
    date: "2024-01-21",
    deliveryDate: "2024-01-28",
  },
  {
    id: "po2",
    poNumber: "PO-2024-002",
    supplierId: "s2",
    items: 32,
    amount: 95000,
    status: "approved",
    date: "2024-01-20",
    deliveryDate: "2024-01-25",
  },
  {
    id: "po3",
    poNumber: "PO-2024-003",
    supplierId: "s1",
    items: 58,
    amount: 180000,
    status: "received",
    date: "2024-01-15",
    deliveryDate: "2024-01-22",
  },
];

export default function PurchasesPage() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const filteredOrders = filter
    ? purchaseOrders.filter((o) => o.status === filter)
    : purchaseOrders;

  const totalOrders = purchaseOrders.length;
  const totalAmount = purchaseOrders.reduce((sum, o) => sum + o.amount, 0);
  const pendingAmount = purchaseOrders
    .filter((o) => o.status !== "received")
    .reduce((sum, o) => sum + o.amount, 0);

  const statusColors: Record<string, string> = {
    pending: "badge-warning",
    approved: "badge-primary",
    received: "badge-success",
    cancelled: "badge-danger",
  };

  return (
    <div className="container-wrapper py-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Purchase Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage purchase orders and supplier invoices
          </p>
        </div>
        <button className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
          <Plus size={18} />
          New Order
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-base p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Total Orders
          </p>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>
        <div className="card-base p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Total Amount
          </p>
          <p className="text-2xl font-bold">
            {formatCurrency(totalAmount)}
          </p>
        </div>
        <div className="card-base p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Pending Amount
          </p>
          <p className="text-2xl font-bold text-orange-600">
            {formatCurrency(pendingAmount)}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[null, "pending", "approved", "received", "cancelled"].map((status) => (
          <button
            key={status || "all"}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              filter === status
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50"
            }`}
          >
            {status
              ? status.charAt(0).toUpperCase() + status.slice(1)
              : "All Orders"}
          </button>
        ))}
      </div>

      {/* Purchase Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const supplier = mockSuppliers.find((s) => s.id === order.supplierId);
          const isSelected = selectedOrder === order.id;

          return (
            <div
              key={order.id}
              className="card-base p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() =>
                setSelectedOrder(isSelected ? null : order.id)
              }
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg">{order.poNumber}</h3>
                    <span className={statusColors[order.status]}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Supplier: {supplier?.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">
                    {formatCurrency(order.amount)}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {order.items} items
                  </p>
                </div>
              </div>

              {/* Dates */}
              <div className="flex gap-4 text-sm mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Calendar size={16} />
                  Ordered: {new Date(order.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Calendar size={16} />
                  Expected: {new Date(order.deliveryDate).toLocaleDateString()}
                </div>
              </div>

              {/* Expandable Details */}
              {isSelected && (
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-4">
                  {/* Supplier Info */}
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                      SUPPLIER DETAILS
                    </p>
                    <div className="space-y-1 text-sm">
                      <p>
                        <strong>{supplier?.name}</strong>
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {supplier?.address}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {supplier?.phone}
                      </p>
                    </div>
                  </div>

                  {/* Payment Status */}
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                      PAYMENT STATUS
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span>Invoice Amount:</span>
                      <span className="font-semibold">
                        {formatCurrency(order.amount)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span>Paid:</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(0)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span>Pending:</span>
                      <span className="font-semibold text-red-600">
                        {formatCurrency(order.amount)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button className="flex-1 btn-primary py-2 text-sm flex items-center justify-center gap-2">
                      <DollarSign size={16} />
                      Record Payment
                    </button>
                    <button className="flex-1 btn-secondary py-2 text-sm flex items-center justify-center gap-2">
                      <FileText size={16} />
                      Upload Invoice
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="card-base p-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No purchase orders found.
          </p>
        </div>
      )}
    </div>
  );
}
