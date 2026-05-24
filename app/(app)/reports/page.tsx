"use client";

import { Download } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="container-wrapper py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Generate and export business reports
          </p>
        </div>
      </div>

      <div className="card-base p-12 text-center">
        <Download size={48} className="mx-auto mb-4 opacity-30" />
        <p className="text-gray-600 dark:text-gray-400">
          Reports module coming soon...
        </p>
      </div>
    </div>
  );
}
