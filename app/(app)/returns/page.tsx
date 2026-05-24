"use client";

import { Plus } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="container-wrapper py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Returns & Refunds</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage product returns and customer refunds
          </p>
        </div>
        <button className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
          <Plus size={18} />
          New Return
        </button>
      </div>

      <div className="card-base p-12 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Returns & Refunds module coming soon...
        </p>
      </div>
    </div>
  );
}
