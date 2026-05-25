"use client";

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingUp, Brain, Zap, Target } from "lucide-react";

const salesForecast = [
  { month: "Jan", predicted: 45000, actual: 42000 },
  { month: "Feb", predicted: 52000, actual: 48000 },
  { month: "Mar", predicted: 61000, actual: 59000 },
  { month: "Apr", predicted: 55000, actual: 58000 },
  { month: "May", predicted: 68000, actual: 70000 },
  { month: "Jun", predicted: 75000, actual: 72000 },
];

const stockPrediction = [
  { week: "Week 1", predicted: 850, actual: 820 },
  { week: "Week 2", predicted: 920, actual: 910 },
  { week: "Week 3", predicted: 1050, actual: 1020 },
  { week: "Week 4", predicted: 980, actual: 995 },
];

const demandTrend = [
  { day: "Mon", demand: 450, supply: 500 },
  { day: "Tue", demand: 520, supply: 500 },
  { day: "Wed", demand: 480, supply: 500 },
  { day: "Thu", demand: 610, supply: 600 },
  { day: "Fri", demand: 750, supply: 700 },
  { day: "Sat", demand: 920, supply: 900 },
  { day: "Sun", demand: 680, supply: 700 },
];

export default function AnalyticsPage() {
  const insights = [
    {
      icon: <Brain size={24} />,
      title: "Demand Forecast",
      description: "Sales expected to increase by 23% next month",
      trend: "up",
      value: "23%",
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Top Selling",
      description: "Paracetamol 500mg dominates sales",
      trend: "up",
      value: "45%",
    },
    {
      icon: <Zap size={24} />,
      title: "Dead Stock Alert",
      description: "5 medicines have 0 sales in 30 days",
      trend: "warning",
      value: "5",
    },
    {
      icon: <Target size={24} />,
      title: "Reorder Optimal",
      description: "Reorder these items to maximize profit",
      trend: "info",
      value: "12",
    },
  ];

  return (
    <div className="container-wrapper py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">AI Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          AI-powered insights and predictions
        </p>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, idx) => (
          <div key={idx} className="card-base p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                {insight.icon}
              </div>
              <span
                className={`badge-${
                  insight.trend === "up"
                    ? "success"
                    : insight.trend === "warning"
                    ? "warning"
                    : "primary"
                }`}
              >
                {insight.value}
              </span>
            </div>
            <h3 className="font-bold mb-1">{insight.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {insight.description}
            </p>
          </div>
        ))}
      </div>

      {/* Sales Forecast */}
      <div className="card-base p-6">
        <h2 className="text-lg font-bold mb-4">Sales Forecast (Next 6 Months)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={salesForecast}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
            <XAxis dataKey="month" stroke="currentColor" opacity={0.5} />
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
            <Area
              type="monotone"
              dataKey="predicted"
              stroke="#3b82f6"
              fill="#3b82f6"
              opacity={0.3}
              name="Predicted Sales"
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#10b981"
              fill="#10b981"
              opacity={0.3}
              name="Actual Sales"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stock Prediction */}
      <div className="card-base p-6">
        <h2 className="text-lg font-bold mb-4">Stock Level Prediction</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stockPrediction}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
            <XAxis dataKey="week" stroke="currentColor" opacity={0.5} />
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
              dataKey="predicted"
              stroke="#f59e0b"
              strokeWidth={2}
              name="Predicted Stock"
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#8b5cf6"
              strokeWidth={2}
              name="Actual Stock"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Demand Trend */}
      <div className="card-base p-6">
        <h2 className="text-lg font-bold mb-4">Weekly Demand vs Supply</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={demandTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
            <XAxis dataKey="day" stroke="currentColor" opacity={0.5} />
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
            <Bar dataKey="demand" fill="#ef4444" name="Demand" />
            <Bar dataKey="supply" fill="#3b82f6" name="Supply" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
