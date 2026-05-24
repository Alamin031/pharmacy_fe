import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, currency: string = "BDT") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency === "BDT" ? "BDT" : "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDate(date: Date | string, format: "short" | "long" = "short") {
  const d = typeof date === "string" ? new Date(date) : date;
  return format === "short"
    ? d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

export function formatTime(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export function formatNumber(value: number, decimals: number = 2) {
  return value.toFixed(decimals);
}

export function truncate(text: string, length: number = 50) {
  return text.length > length ? text.substring(0, length) + "..." : text;
}

export function generateId(prefix: string = "") {
  return `${prefix}${Math.random().toString(36).substr(2, 9)}`;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
