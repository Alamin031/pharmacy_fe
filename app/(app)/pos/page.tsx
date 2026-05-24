"use client";

import { useState } from "react";
import { Search, Plus, Minus, Trash2, ShoppingCart, DollarSign, Users } from "lucide-react";
import { mockMedicines, mockCustomers } from "@/app/lib/mock-data";
import { usePOSStore } from "@/app/lib/store";
import { formatCurrency } from "@/app/lib/utils";

export default function POSPage() {
  const { cart, addItem, removeItem, updateQuantity, setCustomer, setDiscount, clearCart } =
    usePOSStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  const filteredMedicines = mockMedicines.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.genericName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddItem = (medicine: typeof mockMedicines[0]) => {
    addItem(medicine.id, medicine.name, 1, medicine.price);
  };

  const handleCheckout = () => {
    alert(`Checkout: ${formatCurrency(cart.total)}`);
    clearCart();
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800 p-4">
        <h1 className="text-2xl font-bold">POS System</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Fast checkout interface
        </p>
      </div>

      <div className="flex-1 flex overflow-hidden gap-4 p-4">
        {/* Left side - Products */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Search */}
          <div className="relative mb-4">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-base pl-10 w-full"
            />
          </div>

          {/* Product Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {filteredMedicines.map((medicine) => (
                <button
                  key={medicine.id}
                  onClick={() => handleAddItem(medicine)}
                  className="card-base p-3 text-left hover:ring-2 hover:ring-blue-500 transition-all"
                >
                  <p className="font-medium text-sm line-clamp-2 mb-2">
                    {medicine.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    Stock: {medicine.stock}
                  </p>
                  <p className="text-sm font-bold text-blue-600">
                    {formatCurrency(medicine.price)}
                  </p>
                  <div className="mt-2 flex items-center justify-center w-full bg-blue-50 dark:bg-blue-900/20 rounded text-blue-600 dark:text-blue-400 p-1 text-xs font-medium">
                    <Plus size={14} />
                    Add
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Invoice */}
        <div className="w-full sm:w-80 lg:w-96 flex flex-col bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          {/* Invoice header */}
          <div className="bg-blue-600 text-white p-4">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <ShoppingCart size={20} />
              Invoice
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                <ShoppingCart size={40} opacity={0.3} className="mb-2" />
                <p className="text-sm">No items added</p>
              </div>
            ) : (
              cart.items.map((item) => (
                <div
                  key={item.medicineId}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-3"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-sm">{item.medicineName}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {formatCurrency(item.price)} each
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.medicineId)}
                      className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded">
                      <button
                        onClick={() =>
                          updateQuantity(item.medicineId, item.quantity - 1)
                        }
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.medicineId, item.quantity + 1)
                        }
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <p className="text-sm font-semibold">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Customer selection */}
          {cart.items.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-800 p-4">
              <label className="block text-xs font-semibold mb-2 flex items-center gap-2">
                <Users size={14} />
                Customer (Optional)
              </label>
              <select
                value={selectedCustomer || ""}
                onChange={(e) => {
                  setSelectedCustomer(e.target.value || null);
                  setCustomer(e.target.value);
                }}
                className="input-base text-sm w-full"
              >
                <option value="">Walk-in Customer</option>
                {mockCustomers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Totals */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-4 space-y-2 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>{formatCurrency(cart.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax (15%):</span>
              <span>{formatCurrency(cart.tax)}</span>
            </div>
            {cart.discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount:</span>
                <span>-{formatCurrency(cart.discount)}</span>
              </div>
            )}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-blue-600">{formatCurrency(cart.total)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-4 space-y-2">
            <button
              onClick={clearCart}
              disabled={cart.items.length === 0}
              className="btn-secondary w-full py-2.5 text-sm"
            >
              Clear
            </button>
            <button
              onClick={handleCheckout}
              disabled={cart.items.length === 0}
              className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2"
            >
              <DollarSign size={18} />
              Complete Sale
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
