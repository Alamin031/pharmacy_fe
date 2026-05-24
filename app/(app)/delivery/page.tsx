"use client";

import { useState } from "react";
import { mockDeliveries } from "@/app/lib/mock-data";
import { Truck, MapPin, Phone, Star, Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function DeliveryPage() {
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);

  const statusColors: Record<string, string> = {
    pending: "badge-warning",
    assigned: "badge-primary",
    out_for_delivery: "badge-info",
    delivered: "badge-success",
    cancelled: "badge-danger",
  };

  return (
    <div className="container-wrapper py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Delivery Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track and manage deliveries
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card-base p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Total Deliveries
          </p>
          <p className="text-2xl font-bold">{mockDeliveries.length}</p>
        </div>
        <div className="card-base p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Out for Delivery
          </p>
          <p className="text-2xl font-bold text-blue-600">
            {mockDeliveries.filter((d) => d.status === "out_for_delivery").length}
          </p>
        </div>
        <div className="card-base p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Delivered
          </p>
          <p className="text-2xl font-bold text-green-600">
            {mockDeliveries.filter((d) => d.status === "delivered").length}
          </p>
        </div>
        <div className="card-base p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Avg Rating
          </p>
          <p className="text-2xl font-bold">4.8★</p>
        </div>
      </div>

      {/* Deliveries List */}
      <div className="space-y-4">
        {mockDeliveries.map((delivery) => (
          <div
            key={delivery.id}
            className="card-base p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() =>
              setSelectedDelivery(
                selectedDelivery === delivery.id ? null : delivery.id
              )
            }
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Truck className="text-blue-600" size={20} />
                  <h3 className="font-bold text-lg">Order: {delivery.orderId}</h3>
                  <span className={statusColors[delivery.status]}>
                    {delivery.status.replace("_", " ").toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin size={16} />
                  <span>{delivery.distance} km away</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">ETA</p>
                <p className="text-lg font-bold text-blue-600">
                  {delivery.estimatedTime} min
                </p>
              </div>
            </div>

            {/* Expandable Details */}
            {selectedDelivery === delivery.id && (
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-4 mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                {/* Rider Info */}
                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-3">
                    RIDER DETAILS
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      R
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Rider Name</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Phone size={14} />
                        +880-1700-000000
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold flex items-center gap-1 justify-end">
                        <Star
                          size={14}
                          className="fill-yellow-400 text-yellow-400"
                        />
                        4.9
                      </p>
                    </div>
                  </div>
                </div>

                {/* Addresses */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                      PICKUP
                    </p>
                    <p className="text-sm font-medium">
                      {delivery.pickupAddress}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                      DELIVERY
                    </p>
                    <p className="text-sm font-medium">
                      {delivery.deliveryAddress}
                    </p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                    DELIVERY TIMELINE
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <CheckCircle size={16} className="text-green-600" />
                      <span className="text-sm">Order Confirmed</span>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Truck size={16} className="text-blue-600" />
                      <span className="text-sm">Out for Delivery</span>
                      <span className="text-xs text-gray-500">Now</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="flex-1 btn-primary py-2 text-sm">
                    Contact Rider
                  </button>
                  <button className="flex-1 btn-secondary py-2 text-sm">
                    Reschedule
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
