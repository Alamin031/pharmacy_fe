"use client";

import { Plus } from "lucide-react";

export default function OrdersPage() {
  return (
    <div className="container-wrapper py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage online and offline orders
          </p>
        </div>
        <button className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
          <Plus size={18} />
          New Order
        </button>
      </div>

      <div className="card-base p-12 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Orders module coming soon...
        </p>
      </div>
    </div>
  );
}
