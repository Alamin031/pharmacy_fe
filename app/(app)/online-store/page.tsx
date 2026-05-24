"use client";

import { ShoppingCart } from "lucide-react";

export default function OnlineStorePage() {
  return (
    <div className="container-wrapper py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Online Store</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Customer-facing online ordering platform
        </p>
      </div>

      <div className="card-base p-12 text-center">
        <ShoppingCart size={48} className="mx-auto mb-4 opacity-30" />
        <p className="text-gray-600 dark:text-gray-400">
          Online store module coming soon...
        </p>
      </div>
    </div>
  );
}
