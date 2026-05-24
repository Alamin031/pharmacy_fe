"use client";

import { useState } from "react";
import { Search, Plus, MoreVertical, Edit, Trash2, Eye } from "lucide-react";
import { mockMedicines } from "@/app/lib/mock-data";
import { formatCurrency } from "@/app/lib/utils";

export default function MedicinesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(mockMedicines.map((m) => m.category)));

  const filteredMedicines = mockMedicines.filter(
    (m) =>
      (m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.genericName.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === null || m.category === selectedCategory)
  );

  return (
    <div className="container-wrapper py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Medicine Database</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage {mockMedicines.length}+ medicines in your inventory
          </p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary px-4 py-2 text-sm">Bulk Import</button>
          <button className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
            <Plus size={18} />
            Add Medicine
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card-base p-4 space-y-4">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by name or generic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-base pl-10 w-full"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === null
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {category}
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
                <th className="table-head-cell">Name</th>
                <th className="table-head-cell">Generic</th>
                <th className="table-head-cell">Company</th>
                <th className="table-head-cell">Category</th>
                <th className="table-head-cell text-right">Price</th>
                <th className="table-head-cell text-right">Cost</th>
                <th className="table-head-cell text-right">Stock</th>
                <th className="table-head-cell text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.map((medicine) => (
                <tr key={medicine.id} className="table-body-row">
                  <td className="table-body-cell font-medium">{medicine.name}</td>
                  <td className="table-body-cell text-gray-600 dark:text-gray-400">
                    {medicine.genericName}
                  </td>
                  <td className="table-body-cell text-gray-600 dark:text-gray-400">
                    {medicine.company}
                  </td>
                  <td className="table-body-cell">
                    <span className="badge-primary">{medicine.category}</span>
                  </td>
                  <td className="table-body-cell text-right font-semibold">
                    {formatCurrency(medicine.price)}
                  </td>
                  <td className="table-body-cell text-right text-gray-600 dark:text-gray-400">
                    {formatCurrency(medicine.costPrice)}
                  </td>
                  <td className="table-body-cell text-right">
                    <span
                      className={`font-semibold ${
                        medicine.stock <= medicine.minStock
                          ? "text-amber-600"
                          : "text-green-600"
                      }`}
                    >
                      {medicine.stock}
                    </span>
                  </td>
                  <td className="table-body-cell text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        title="View details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredMedicines.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            No medicines found matching your search criteria.
          </p>
        </div>
      )}
    </div>
  );
}
