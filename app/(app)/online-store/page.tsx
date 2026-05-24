"use client";

import { useState } from "react";
import { Search, ShoppingCart, Heart, MapPin, Clock, Star } from "lucide-react";
import { mockMedicines } from "@/app/lib/mock-data";
import { formatCurrency } from "@/app/lib/utils";

export default function OnlineStorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const categories = Array.from(new Set(mockMedicines.map((m) => m.category)));

  const filteredMedicines = mockMedicines.filter(
    (m) =>
      (m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.genericName.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === null || m.category === selectedCategory) &&
      m.stock > 0
  );

  const addToCart = (medicine: any) => {
    setCartItems([...cartItems, medicine]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="container-wrapper py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Pharmacy Online Store</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                <MapPin size={16} />
                <span>Deliver to: 123 Main Street</span>
              </div>
            </div>
            <button className="relative">
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search medicines, symptoms, doctors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-base pl-10 w-full"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === null
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 border border-gray-200 dark:border-gray-700"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 border border-gray-200 dark:border-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container-wrapper py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMedicines.map((medicine) => (
            <div
              key={medicine.id}
              className="card-base overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              {/* Product Image */}
              <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center relative">
                <ShoppingCart size={40} className="text-blue-400 opacity-30" />
                <button className="absolute top-2 right-2 p-2 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Heart size={16} />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div>
                  <p className="font-bold text-sm line-clamp-2">
                    {medicine.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {medicine.genericName}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 text-xs">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-gray-600 dark:text-gray-400">4.5</span>
                </div>

                {/* Price & Stock */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-lg font-bold text-blue-600">
                      {formatCurrency(medicine.price)}
                    </p>
                    <p className="text-xs text-gray-500 line-through">
                      {formatCurrency(medicine.price * 1.2)}
                    </p>
                  </div>
                  <span className="badge-success text-xs">20% off</span>
                </div>

                {/* Stock Info */}
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {medicine.stock > 0 ? (
                    <span className="text-green-600">In Stock ({medicine.stock})</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => addToCart(medicine)}
                  disabled={medicine.stock === 0}
                  className="btn-primary w-full py-2 text-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredMedicines.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-gray-600 dark:text-gray-400">
              No products found. Try a different search.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Action */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-800 p-4 safe-area-inset-bottom">
          <div className="container-wrapper flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
              </p>
              <p className="text-lg font-bold">
                {formatCurrency(
                  cartItems.reduce((sum, item) => sum + item.price, 0)
                )}
              </p>
            </div>
            <button className="btn-primary px-8 py-3">View Cart</button>
          </div>
        </div>
      )}
    </div>
  );
}
