"use client";

import Link from "next/link";
import { ShoppingCart, MapPin, Heart, Zap, Truck, TrendingUp } from "lucide-react";

export default function CustomerHomePage() {
  const features = [
    {
      icon: ShoppingCart,
      title: "Browse Pharmacy",
      description: "Shop medicines from nearby pharmacies",
      href: "/customer/online-store",
      button: "Shop Now",
    },
    {
      icon: MapPin,
      title: "Find Nearby",
      description: "Locate pharmacies close to you",
      href: "/customer/nearby",
      button: "Find Pharmacy",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Same-day delivery available",
      href: "/customer/orders",
      button: "Track Order",
    },
    {
      icon: Heart,
      title: "Favorites",
      description: "Save your favorite medicines",
      href: "/customer/favorites",
      button: "View Favorites",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <div className="container-wrapper py-12 md:py-20">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-balance">
            Order Medicines
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
              From Home
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find nearby pharmacies, browse medicines, and get fast delivery straight to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/customer/online-store"
              className="btn-primary px-8 py-3 text-lg"
            >
              Start Shopping
            </Link>
            <Link
              href="/customer/nearby"
              className="btn-secondary px-8 py-3 text-lg"
            >
              Find Pharmacy
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Link
                key={idx}
                href={feature.href}
                className="card-base p-6 hover:shadow-lg transition-all group"
              >
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 mb-4 w-fit group-hover:scale-110 transition-transform">
                  <Icon size={28} />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {feature.description}
                </p>
                <button className="btn-secondary px-4 py-2 text-sm w-full">
                  {feature.button}
                </button>
              </Link>
            );
          })}
        </div>

        {/* Promo Section */}
        <div className="card-base p-8 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="flex items-center gap-4">
            <Zap size={32} />
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">Limited Time Offer</h3>
              <p className="opacity-90">Get 20% off on your first order with code FIRST20</p>
            </div>
            <button className="btn-primary bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white dark:bg-slate-900 py-12">
        <div className="container-wrapper">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-green-600">10K+</p>
              <p className="text-gray-600 dark:text-gray-400">Medicines</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">500+</p>
              <p className="text-gray-600 dark:text-gray-400">Pharmacies</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">24hr</p>
              <p className="text-gray-600 dark:text-gray-400">Delivery</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-600">50K+</p>
              <p className="text-gray-600 dark:text-gray-400">Happy Users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
