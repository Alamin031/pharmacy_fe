"use client";

import { mockSuppliers } from "@/app/lib/mock-data";
import { formatCurrency } from "@/app/lib/utils";
import { Plus, Mail, Phone, MapPin } from "lucide-react";

export default function SuppliersPage() {
  return (
    <div className="container-wrapper py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Suppliers</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage supplier relationships and payments
          </p>
        </div>
        <button className="btn-primary px-4 py-2 text-sm flex items-center gap-2 w-fit">
          <Plus size={18} />
          Add Supplier
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockSuppliers.map((supplier) => (
          <div key={supplier.id} className="card-base p-6">
            <h3 className="font-bold text-lg mb-4">{supplier.name}</h3>
            <div className="space-y-2 text-sm mb-4">
              {supplier.email && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Mail size={16} />
                  {supplier.email}
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Phone size={16} />
                {supplier.phone}
              </div>
              {supplier.address && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MapPin size={16} />
                  {supplier.address}
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-1">Total Due</p>
                <p className="font-bold">{formatCurrency(supplier.totalDue)}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-1">Total Purchased</p>
                <p className="font-bold">{formatCurrency(supplier.totalPurchased)}</p>
              </div>
            </div>

            <button className="btn-secondary w-full py-2 text-sm mt-4">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
