"use client";

import { useState } from "react";
import { Search, Plus, Mail, Phone, MapPin, TrendingUp, DollarSign } from "lucide-react";
import { mockCustomers } from "@/app/lib/mock-data";
import { formatCurrency } from "@/app/lib/utils";

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [accountType, setAccountType] = useState<"all" | "retail" | "wholesale" | "corporate">(
    "all"
  );

  const filteredCustomers = mockCustomers.filter(
    (c) =>
      (c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery)) &&
      (accountType === "all" || c.accountType === accountType)
  );

  const stats = {
    total: mockCustomers.length,
    totalDue: mockCustomers.reduce((sum, c) => sum + c.totalDue, 0),
    totalPurchased: mockCustomers.reduce((sum, c) => sum + c.totalPurchased, 0),
    avgValue: mockCustomers.length > 0
      ? mockCustomers.reduce((sum, c) => sum + c.totalPurchased, 0) / mockCustomers.length
      : 0,
  };

  return (
    <div className="container-wrapper py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your customer relationships and transactions
          </p>
        </div>
        <button className="btn-primary px-4 py-2 text-sm flex items-center gap-2 w-fit">
          <Plus size={18} />
          Add Customer
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-base p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Total Customers
              </p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="text-2xl opacity-20">👥</div>
          </div>
        </div>

        <div className="card-base p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Total Due
              </p>
              <p className="text-2xl font-bold">{formatCurrency(stats.totalDue)}</p>
            </div>
            <DollarSign className="w-10 h-10 text-red-600 opacity-20" />
          </div>
        </div>

        <div className="card-base p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Total Purchased
              </p>
              <p className="text-2xl font-bold">{formatCurrency(stats.totalPurchased)}</p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-600 opacity-20" />
          </div>
        </div>

        <div className="card-base p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Avg. Customer Value
              </p>
              <p className="text-2xl font-bold">{formatCurrency(stats.avgValue)}</p>
            </div>
            <div className="text-2xl opacity-20">📊</div>
          </div>
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
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-base pl-10 w-full"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {["all", "retail", "wholesale", "corporate"].map((type) => (
            <button
              key={type}
              onClick={() =>
                setAccountType(type as typeof accountType)
              }
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                accountType === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="card-base p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg">{customer.name}</h3>
                <span className="badge-primary text-xs capitalize">
                  {customer.accountType}
                </span>
              </div>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                ⋮
              </button>
            </div>

            <div className="space-y-2 text-sm mb-4">
              {customer.email && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Mail size={16} />
                  {customer.email}
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Phone size={16} />
                {customer.phone}
              </div>
              {customer.address && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MapPin size={16} />
                  {customer.address}
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  Total Due
                </p>
                <p className="font-bold text-red-600">
                  {formatCurrency(customer.totalDue)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  Total Purchased
                </p>
                <p className="font-bold text-green-600">
                  {formatCurrency(customer.totalPurchased)}
                </p>
              </div>
            </div>

            <button className="btn-secondary w-full py-2 text-sm mt-4">
              View Profile
            </button>
          </div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            No customers found matching your search criteria.
          </p>
        </div>
      )}
    </div>
  );
}
