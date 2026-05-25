"use client";

import { useState } from "react";
import { Download, FileText, Calendar, Filter } from "lucide-react";
import { formatCurrency } from "@/app/lib/utils";

const reports = [
  {
    id: "sales",
    name: "Sales Report",
    description: "Daily, weekly, and monthly sales analysis",
    icon: "📊",
    lastGenerated: "2024-01-21",
    data: { total: 85000, orders: 125, avgOrder: 680 },
  },
  {
    id: "profit",
    name: "Profit & Loss",
    description: "Revenue vs expenses analysis",
    icon: "💰",
    lastGenerated: "2024-01-21",
    data: { profit: 25500, revenue: 85000, expenses: 59500 },
  },
  {
    id: "inventory",
    name: "Inventory Report",
    description: "Stock levels, turnover, and valuations",
    icon: "📦",
    lastGenerated: "2024-01-20",
    data: { items: 2450, value: 185000, turnover: 8.5 },
  },
  {
    id: "customer",
    name: "Customer Analytics",
    description: "Customer demographics and behavior",
    icon: "👥",
    lastGenerated: "2024-01-21",
    data: { customers: 1250, newThisMonth: 125, retention: "92%" },
  },
  {
    id: "expiry",
    name: "Expiry Management",
    description: "Expired and near-expiry medicines",
    icon: "⏰",
    lastGenerated: "2024-01-19",
    data: { expiredSoon: 23, expired: 0, riskValue: 12500 },
  },
  {
    id: "staff",
    name: "Staff Performance",
    description: "Employee productivity and metrics",
    icon: "⭐",
    lastGenerated: "2024-01-21",
    data: { staff: 8, avgSales: 10625, satisfaction: "4.6/5" },
  },
];

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState("monthly");

  const selectedReportData = reports.find((r) => r.id === selectedReport);

  return (
    <div className="container-wrapper py-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Generate and export business reports
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="card-base p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Date Range</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input-base"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">From Date</label>
          <input type="date" className="input-base" />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">To Date</label>
          <input type="date" className="input-base" />
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className={`card-base p-6 cursor-pointer transition-all ${
              selectedReport === report.id ? "ring-2 ring-blue-500 shadow-lg" : ""
            }`}
            onClick={() => setSelectedReport(report.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{report.icon}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {report.lastGenerated}
              </span>
            </div>
            <h3 className="font-bold mb-1">{report.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {report.description}
            </p>

            {/* Quick Stats */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-sm space-y-1">
              {Object.entries(report.data).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="text-gray-600 dark:text-gray-400 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <span className="font-semibold">
                    {typeof value === "number" && key.includes("profit")
                      ? formatCurrency(value)
                      : typeof value === "number" && key.includes("value")
                      ? formatCurrency(value)
                      : typeof value === "number" && key.includes("revenue")
                      ? formatCurrency(value)
                      : typeof value === "number" && key.includes("expenses")
                      ? formatCurrency(value)
                      : value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed View */}
      {selectedReportData && (
        <div className="card-base p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="text-3xl">{selectedReportData.icon}</span>
                {selectedReportData.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                {selectedReportData.description}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary px-4 py-2 text-sm flex items-center gap-2">
                <Download size={16} />
                PDF
              </button>
              <button className="btn-secondary px-4 py-2 text-sm flex items-center gap-2">
                <Download size={16} />
                Excel
              </button>
            </div>
          </div>

          {/* Report Content */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Object.entries(selectedReportData.data).map(([key, value]) => (
                <div key={key} className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                  <p className="text-2xl font-bold">
                    {typeof value === "number" &&
                    (key.includes("profit") ||
                      key.includes("value") ||
                      key.includes("revenue") ||
                      key.includes("expenses"))
                      ? formatCurrency(value)
                      : value}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-700 dark:text-blue-300">
              <p>
                <strong>Note:</strong> This report is generated based on {dateRange} data. Use the
                filters above to customize the date range for more accurate insights.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
