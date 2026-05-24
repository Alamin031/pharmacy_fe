"use client";

import { ReactNode } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: "up" | "down" | null;
  trendPercent?: number;
  description?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  trendPercent,
  description,
  className,
}: StatCardProps) {
  return (
    <div className={cn("card-base p-6", className)}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">
            {title}
          </p>
          <p className="text-2xl sm:text-3xl font-bold">{value}</p>
        </div>
        {icon && (
          <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>

      {(trend || description) && (
        <div className="flex items-center gap-2 text-xs">
          {trend && (
            <>
              <div
                className={cn(
                  "flex items-center gap-1 font-semibold",
                  trend === "up"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                )}
              >
                {trend === "up" ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                {trendPercent}%
              </div>
              <span className="text-gray-500 dark:text-gray-400">vs last month</span>
            </>
          )}
          {description && !trend && (
            <span className="text-gray-500 dark:text-gray-400">{description}</span>
          )}
        </div>
      )}
    </div>
  );
}
