"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pill } from "lucide-react";
import { useAuthStore } from "@/app/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState("admin@pharmacy.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="card-base p-8 w-full">
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
          <Pill className="text-white" size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">PharmERP</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Pharmacy Management System
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-2 text-center">Welcome Back</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-8">
        Sign in to your account to continue
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-200 text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <input
            type="email"
            className="input-base"
            placeholder="admin@pharmacy.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            className="input-base"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span>Remember me</span>
          </label>
          <Link href="/forgot-password" className="text-blue-600 dark:text-blue-400 hover:underline">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full py-2.5 mt-6"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm">
        Don't have an account?{" "}
        <Link href="/register" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
          Create one
        </Link>
      </div>

      {/* Demo hint */}
      <div className="mt-6 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-200 text-xs">
        <p className="font-semibold mb-1">Demo Credentials:</p>
        <p>Email: admin@pharmacy.com</p>
        <p>Password: password</p>
      </div>
    </div>
  );
}
