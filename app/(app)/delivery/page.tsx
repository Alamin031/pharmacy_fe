"use client";

import { Truck } from "lucide-react";

export default function DeliveryPage() {
  return (
    <div className="container-wrapper py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Delivery System</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Track deliveries and manage riders
        </p>
      </div>

      <div className="card-base p-12 text-center">
        <Truck size={48} className="mx-auto mb-4 opacity-30" />
        <p className="text-gray-600 dark:text-gray-400">
          Delivery system module coming soon...
        </p>
      </div>
    </div>
  );
}
