"use client";

import { useState } from "react";
import { mockOrders, mockMedicines } from "@/app/lib/mock-data";
import { formatCurrency } from "@/app/lib/utils";
import { Search, Eye, Download, TrendingUp } from "lucide-react";

export default function SalesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "amount" | "items">("date");

  const sortedOrders = [...mockOrders].sort((a, b) => {
    if (sortBy === "date")
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === "amount") return b.total - a.total;
    return b.items.length - a.items.length;
  });

  const filteredOrders = sortedOrders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate metrics
  const totalSales = mockOrders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = mockOrders.length;
  const totalProfit = mockOrders.reduce((sum, o) => {
    const cost = o.items.reduce((s, item) => {
      const medicine = mockMedicines.find((m) => m.id === item.medicineId);
      return s + (medicine?.costPrice || 0) * item.quantity;
    }, 0);
    return s + (o.total - cost);
  }, 0);

  return (
    <div className="container-wrapper py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Sales Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track sales history and analytics
          </p>
        </div>
        <button className="btn-primary px-4 py-2 text-sm flex items-center gap-2 w-fit">
          <Download size={18} />
          Export
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-base p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Total Sales
          </p>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(totalSales)}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            {totalOrders} orders
          </p>
        </div>
        <div className="card-base p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Total Profit
          </p>
          <p className="text-2xl font-bold text-blue-600">
            {formatCurrency(totalProfit)}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            {((totalProfit / totalSales) * 100).toFixed(1)}% margin
          </p>
        </div>
        <div className="card-base p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Avg Order Value
          </p>
          <p className="text-2xl font-bold">
            {formatCurrency(totalSales / totalOrders)}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            Per transaction
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card-base p-4 space-y-4">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search order number or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-base pl-10 w-full"
          />
        </div>

        <div className="flex gap-2">
          {["date", "amount", "items"].map((sort) => (
            <button
              key={sort}
              onClick={() => setSortBy(sort as typeof sortBy)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                sortBy === sort
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50"
              }`}
            >
              Sort by {sort.charAt(0).toUpperCase() + sort.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Sales Table */}
      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-base">
            <thead>
              <tr>
                <th className="table-head-cell">Order #</th>
                <th className="table-head-cell">Date</th>
                <th className="table-head-cell text-right">Items</th>
                <th className="table-head-cell text-right">Amount</th>
                <th className="table-head-cell text-right">Profit</th>
                <th className="table-head-cell text-center">Status</th>
                <th className="table-head-cell text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const cost = order.items.reduce((sum, item) => {
                  const medicine = mockMedicines.find(
                    (m) => m.id === item.medicineId
                  );
                  return sum + (medicine?.costPrice || 0) * item.quantity;
                }, 0);
                const profit = order.total - cost;

                return (
                  <tr key={order.id} className="table-body-row">
                    <td className="table-body-cell font-medium">
                      {order.orderNumber}
                    </td>
                    <td className="table-body-cell">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="table-body-cell text-right">
                      {order.items.length}
                    </td>
                    <td className="table-body-cell text-right font-semibold">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="table-body-cell text-right text-green-600 font-semibold">
                      {formatCurrency(profit)}
                    </td>
                    <td className="table-body-cell text-center">
                      <span className={`badge-${order.status === "delivered" ? "success" : "warning"}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="table-body-cell text-center">
                      <button className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 justify-center">
                        <Eye size={16} />
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredOrders.length === 0 && (
        <div className="card-base p-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No sales found matching your search criteria.
          </p>
        </div>
      )}
    </div>
  );
}
