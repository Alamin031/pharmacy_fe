"use client";

import { BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="container-wrapper py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">AI Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Advanced analytics with AI insights
        </p>
      </div>

      <div className="card-base p-12 text-center">
        <BarChart3 size={48} className="mx-auto mb-4 opacity-30" />
        <p className="text-gray-600 dark:text-gray-400">
          AI Analytics module coming soon...
        </p>
      </div>
    </div>
  );
}
