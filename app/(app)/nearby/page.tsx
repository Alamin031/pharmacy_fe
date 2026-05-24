"use client";

import { MapPin } from "lucide-react";

export default function NearbyPage() {
  return (
    <div className="container-wrapper py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Nearby Pharmacies</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Find nearby branches and available medicines
        </p>
      </div>

      <div className="card-base p-12 text-center">
        <MapPin size={48} className="mx-auto mb-4 opacity-30" />
        <p className="text-gray-600 dark:text-gray-400">
          Nearby pharmacy finder coming soon...
        </p>
      </div>
    </div>
  );
}
