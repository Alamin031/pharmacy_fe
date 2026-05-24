"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pill, ArrowRight, Zap, Shield, TrendingUp, Users, BarChart3, Truck } from "lucide-react";
import { useAuthStore } from "@/app/lib/store";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="container-wrapper flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Pill className="text-white" size={20} />
            </div>
            PharmERP
          </Link>

          <Link
            href="/login"
            className="btn-primary px-6 py-2 text-sm"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        <div className="container-wrapper text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-bold text-balance leading-tight">
              Enterprise Pharmacy Management
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Powered by AI
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Complete pharmacy ERP system with online ordering, delivery tracking, inventory management, and intelligent analytics.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/login"
              className="btn-primary px-8 py-3 text-lg flex items-center gap-2 justify-center"
            >
              Get Started <ArrowRight size={20} />
            </Link>
            <button className="btn-secondary px-8 py-3 text-lg">
              Request Demo
            </button>
          </div>

          <div className="pt-12 grid grid-cols-3 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-2xl font-bold">30+</p>
              <p className="text-gray-600 dark:text-gray-400">Modules</p>
            </div>
            <div>
              <p className="text-2xl font-bold">100K+</p>
              <p className="text-gray-600 dark:text-gray-400">Medicines</p>
            </div>
            <div>
              <p className="text-2xl font-bold">Real-time</p>
              <p className="text-gray-600 dark:text-gray-400">Analytics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-wrapper space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Powerful Features</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to run a modern pharmacy efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "Ultra-Fast POS", description: "Lightning-quick checkout experience" },
              { icon: TrendingUp, title: "Smart Analytics", description: "AI-powered business insights" },
              { icon: Truck, title: "Delivery Tracking", description: "Real-time delivery management" },
              { icon: Users, title: "Customer Management", description: "Complete customer relationship tools" },
              { icon: BarChart3, title: "Advanced Reports", description: "Comprehensive business analytics" },
              { icon: Shield, title: "Secure & Reliable", description: "Enterprise-grade security" },
              { icon: Pill, title: "Inventory Control", description: "Smart stock management" },
              { icon: ArrowRight, title: "Online Ordering", description: "Customer-facing e-commerce" },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="card-base p-6 text-center hover:shadow-lg transition-shadow">
                  <Icon className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container-wrapper text-center text-white space-y-8">
          <h2 className="text-4xl font-bold">Ready to Transform Your Pharmacy?</h2>
          <p className="text-lg text-blue-50 max-w-2xl mx-auto">
            Join hundreds of pharmacies using PharmERP to streamline operations and boost sales.
          </p>
          <Link
            href="/login"
            className="inline-flex btn-primary px-8 py-3 text-lg bg-white text-blue-600 hover:bg-gray-100"
          >
            Start Free Trial <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-300 py-12">
        <div className="container-wrapper text-center">
          <p>&copy; 2024 PharmERP. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
