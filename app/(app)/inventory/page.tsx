"use client";

import { useState } from "react";
import { Search, AlertTriangle, TrendingUp, Package } from "lucide-react";
import { mockMedicines } from "@/app/lib/mock-data";
import { formatCurrency, formatNumber } from "@/app/lib/utils";

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "low" | "high" | "critical">("all");

  const filteredMedicines = mockMedicines.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterType === "low") return matchesSearch && m.stock <= m.minStock;
    if (filterType === "high") return matchesSearch && m.stock > m.minStock * 2;
    if (filterType === "critical") return matchesSearch && m.stock <= m.minStock / 2;
    return matchesSearch;
  });

  const stats = {
    totalItems: mockMedicines.length,
    lowStock: mockMedicines.filter((m) => m.stock <= m.minStock).length,
    totalValue: mockMedicines.reduce((sum, m) => sum + m.costPrice * m.stock, 0),
  };

  return (
    <div className="container-wrapper py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Real-time stock tracking and management
          </p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary px-4 py-2 text-sm">Import</button>
          <button className="btn-primary px-4 py-2 text-sm">Add Item</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-base p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Total Items
              </p>
              <p className="text-2xl font-bold">{stats.totalItems}</p>
            </div>
            <Package className="w-10 h-10 text-blue-600 opacity-20" />
          </div>
        </div>

        <div className="card-base p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Low Stock Alert
              </p>
              <p className="text-2xl font-bold text-amber-600">{stats.lowStock}</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-amber-600 opacity-20" />
          </div>
        </div>

        <div className="card-base p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Total Value
              </p>
              <p className="text-2xl font-bold">{formatCurrency(stats.totalValue)}</p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-600 opacity-20" />
          </div>
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
            placeholder="Search medicines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-base pl-10 w-full"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {["all", "low", "high", "critical"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type as typeof filterType)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-base">
            <thead>
              <tr>
                <th className="table-head-cell">Medicine Name</th>
                <th className="table-head-cell">Generic</th>
                <th className="table-head-cell">Company</th>
                <th className="table-head-cell text-right">Current Stock</th>
                <th className="table-head-cell text-right">Min. Stock</th>
                <th className="table-head-cell text-right">Value</th>
                <th className="table-head-cell text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.map((medicine) => {
                const stockPercent = (medicine.stock / (medicine.minStock * 2)) * 100;
                const status =
                  medicine.stock <= medicine.minStock / 2
                    ? "critical"
                    : medicine.stock <= medicine.minStock
                    ? "warning"
                    : "good";

                return (
                  <tr key={medicine.id} className="table-body-row">
                    <td className="table-body-cell font-medium">
                      {medicine.name}
                    </td>
                    <td className="table-body-cell text-gray-600 dark:text-gray-400">
                      {medicine.genericName}
                    </td>
                    <td className="table-body-cell text-gray-600 dark:text-gray-400">
                      {medicine.company}
                    </td>
                    <td className="table-body-cell text-right font-semibold">
                      {medicine.stock}
                    </td>
                    <td className="table-body-cell text-right text-gray-600 dark:text-gray-400">
                      {medicine.minStock}
                    </td>
                    <td className="table-body-cell text-right">
                      {formatCurrency(medicine.stock * medicine.costPrice)}
                    </td>
                    <td className="table-body-cell text-center">
                      <span
                        className={`badge-${
                          status === "critical"
                            ? "danger"
                            : status === "warning"
                            ? "warning"
                            : "success"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
