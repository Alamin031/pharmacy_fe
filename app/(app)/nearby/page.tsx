"use client";

import { useState } from "react";
import { MapPin, Phone, Clock, Navigation, Star, Pill } from "lucide-react";
import { formatCurrency } from "@/app/lib/utils";

const nearbyPharmacies = [
  {
    id: "ph1",
    name: "Main Pharmacy",
    distance: 2.3,
    deliveryTime: "25-35 min",
    rating: 4.8,
    reviews: 1250,
    isOpen: true,
    address: "123 Main Street, Downtown",
    phone: "+880-1700-000001",
    deliveryCharge: 50,
  },
  {
    id: "ph2",
    name: "Health Plus Pharmacy",
    distance: 3.5,
    deliveryTime: "35-45 min",
    rating: 4.6,
    reviews: 890,
    isOpen: true,
    address: "456 Oak Avenue, North",
    phone: "+880-1700-000002",
    deliveryCharge: 60,
  },
  {
    id: "ph3",
    name: "24/7 Express Pharmacy",
    distance: 5.2,
    deliveryTime: "45-60 min",
    rating: 4.5,
    reviews: 645,
    isOpen: true,
    address: "789 Park Road, East",
    phone: "+880-1700-000003",
    deliveryCharge: 80,
  },
];

export default function NearbyPage() {
  const [selectedPharmacy, setSelectedPharmacy] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"distance" | "rating" | "delivery">("distance");

  const sortedPharmacies = [...nearbyPharmacies].sort((a, b) => {
    if (sortBy === "distance") return a.distance - b.distance;
    if (sortBy === "rating") return b.rating - a.rating;
    return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
  });

  return (
    <div className="container-wrapper py-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Nearby Pharmacies</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Find and order from nearby pharmacies
        </p>
      </div>

      {/* Location Info */}
      <div className="card-base p-4 flex items-center gap-3">
        <Navigation className="text-blue-600 flex-shrink-0" size={20} />
        <div className="flex-1">
          <p className="font-semibold text-sm">Your Location</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            123 Main Street, Downtown
          </p>
        </div>
        <button className="btn-secondary px-4 py-2 text-sm">Change</button>
      </div>

      {/* Sort Options */}
      <div className="flex gap-2">
        {["distance", "rating", "delivery"].map((sort) => (
          <button
            key={sort}
            onClick={() => setSortBy(sort as typeof sortBy)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              sortBy === sort
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50"
            }`}
          >
            {sort === "distance"
              ? "Nearest"
              : sort === "rating"
              ? "Top Rated"
              : "Fastest"}
          </button>
        ))}
      </div>

      {/* Pharmacies List */}
      <div className="space-y-4">
        {sortedPharmacies.map((pharmacy) => (
          <div
            key={pharmacy.id}
            className="card-base overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg">{pharmacy.name}</h3>
                    {pharmacy.isOpen && (
                      <span className="badge-success text-xs">Open</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <MapPin size={16} />
                    {pharmacy.distance} km away • {pharmacy.deliveryTime}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Star
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <span className="font-semibold">{pharmacy.rating}</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        ({pharmacy.reviews})
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Delivery Fee
                  </p>
                  <p className="text-lg font-bold">
                    {formatCurrency(pharmacy.deliveryCharge)}
                  </p>
                </div>
              </div>

              {/* Expandable Details */}
              {selectedPharmacy === pharmacy.id && (
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                        ADDRESS
                      </p>
                      <p className="text-sm">{pharmacy.address}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                        CONTACT
                      </p>
                      <p className="text-sm flex items-center gap-2">
                        <Phone size={14} />
                        {pharmacy.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                        HOURS
                      </p>
                      <p className="text-sm flex items-center gap-2">
                        <Clock size={14} />
                        Open 24/7
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setSelectedPharmacy(
                      selectedPharmacy === pharmacy.id ? null : pharmacy.id
                    )
                  }
                  className="flex-1 btn-secondary py-2 text-sm"
                >
                  {selectedPharmacy === pharmacy.id ? "Hide Details" : "View Details"}
                </button>
                <button className="flex-1 btn-primary py-2 text-sm flex items-center justify-center gap-2">
                  <Pill size={16} />
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
