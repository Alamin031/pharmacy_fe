"use client";

import { StatCard } from "@/app/components/stat-card";
import {
  TrendingUp,
  Package,
  Users,
  AlertCircle,
  Clock,
  CheckCircle,
} from "lucide-react";
import { getMockDashboardMetrics, mockOrders, mockMedicines } from "@/app/lib/mock-data";
import { formatCurrency, formatNumber } from "@/app/lib/utils";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const metrics = getMockDashboardMetrics();

const chartData = [
  { date: "Mon", sales: 2400, orders: 4 },
  { date: "Tue", sales: 1398, orders: 3 },
  { date: "Wed", sales: 9800, orders: 7 },
  { date: "Thu", sales: 3908, orders: 5 },
  { date: "Fri", sales: 4800, orders: 6 },
  { date: "Sat", sales: 3800, orders: 5 },
  { date: "Sun", sales: 4300, orders: 6 },
];

export default function DashboardPage() {
  return (
    <div className="container-wrapper py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's your pharmacy overview.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary px-4 py-2 text-sm">Export</button>
          <button className="btn-primary px-4 py-2 text-sm">New Order</button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Sales"
          value={formatCurrency(metrics.todaySales)}
          icon={<TrendingUp size={24} />}
          trend="up"
          trendPercent={12}
        />
        <StatCard
          title="Monthly Revenue"
          value={formatCurrency(metrics.monthlyRevenue)}
          icon={<TrendingUp size={24} />}
          trend="up"
          trendPercent={8}
        />
        <StatCard
          title="Total Due"
          value={formatCurrency(metrics.dueAmount)}
          icon={<AlertCircle size={24} />}
          description="From customers"
        />
        <StatCard
          title="Total Customers"
          value={metrics.totalCustomers}
          icon={<Users size={24} />}
          description="Active customers"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 card-base p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Weekly Sales</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Sales trend over the last 7 days
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
              <XAxis dataKey="date" stroke="currentColor" opacity={0.5} />
              <YAxis stroke="currentColor" opacity={0.5} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                name="Sales (BDT)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Inventory Status */}
        <div className="card-base p-6">
          <h2 className="text-lg font-semibold mb-6">Inventory Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className="text-amber-600" size={20} />
                <div>
                  <p className="text-sm font-medium">Low Stock</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {metrics.lowStockMedicines.length} items
                  </p>
                </div>
              </div>
              <span className="text-lg font-bold text-amber-600">
                {metrics.lowStockMedicines.length}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className="text-red-600" size={20} />
                <div>
                  <p className="text-sm font-medium">Expired</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Immediate action needed
                  </p>
                </div>
              </div>
              <span className="text-lg font-bold text-red-600">0</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600" size={20} />
                <div>
                  <p className="text-sm font-medium">Good Stock</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {mockMedicines.length} medicines
                  </p>
                </div>
              </div>
              <span className="text-lg font-bold text-green-600">
                {mockMedicines.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card-base p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            View all
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table-base w-full text-sm">
            <thead>
              <tr>
                <th className="table-head-cell">Order #</th>
                <th className="table-head-cell">Customer</th>
                <th className="table-head-cell">Amount</th>
                <th className="table-head-cell">Status</th>
                <th className="table-head-cell">Date</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.slice(0, 5).map((order) => (
                <tr key={order.id} className="table-body-row">
                  <td className="table-body-cell font-medium">{order.orderNumber}</td>
                  <td className="table-body-cell">Customer ID: {order.customerId}</td>
                  <td className="table-body-cell font-semibold">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="table-body-cell">
                    <span className={`badge-${order.status === "delivered" ? "success" : "warning"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="table-body-cell text-gray-600 dark:text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
