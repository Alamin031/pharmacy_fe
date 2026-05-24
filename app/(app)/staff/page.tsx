"use client";

import { useState } from "react";
import { mockUsers } from "@/app/lib/mock-data";
import { Plus, Mail, Phone, Calendar, Clock, TrendingUp } from "lucide-react";

export default function StaffPage() {
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);

  const roleColors: Record<string, string> = {
    admin: "badge-primary",
    pharmacist: "badge-success",
    staff: "badge-warning",
  };

  return (
    <div className="container-wrapper py-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Staff Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage staff, roles, and attendance
          </p>
        </div>
        <button className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
          <Plus size={18} />
          Add Staff
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="card-base p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Total Staff
          </p>
          <p className="text-2xl font-bold">{mockUsers.length}</p>
        </div>
        <div className="card-base p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Present Today
          </p>
          <p className="text-2xl font-bold text-green-600">
            {mockUsers.filter((u) => u.status === "active").length}
          </p>
        </div>
        <div className="card-base p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Avg Performance
          </p>
          <p className="text-2xl font-bold">4.6★</p>
        </div>
        <div className="card-base p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Schedules
          </p>
          <p className="text-2xl font-bold">12</p>
        </div>
      </div>

      {/* Staff List */}
      <div className="space-y-4">
        {mockUsers.map((user) => (
          <div
            key={user.id}
            className="card-base p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() =>
              setSelectedStaff(selectedStaff === user.id ? null : user.id)
            }
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{user.name}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span className={roleColors[user.role as keyof typeof roleColors]}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                    <span
                      className={`badge-${
                        user.status === "active" ? "success" : "warning"
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Joined
                </p>
                <p className="text-sm font-semibold">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Expandable Details */}
            {selectedStaff === user.id && (
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                      EMAIL
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <Mail size={14} />
                      {user.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                      PHONE
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <Phone size={14} />
                      {user.phone}
                    </p>
                  </div>
                </div>

                {/* Performance */}
                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    PERFORMANCE
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Sales Performance</span>
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "85%" }} />
                      </div>
                      <span className="font-semibold">85%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Attendance</span>
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "92%" }} />
                      </div>
                      <span className="font-semibold">92%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Customer Satisfaction</span>
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "88%" }} />
                      </div>
                      <span className="font-semibold">88%</span>
                    </div>
                  </div>
                </div>

                {/* Shift Info */}
                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    CURRENT SHIFT
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <Clock size={14} />
                    9:00 AM - 6:00 PM (in shift now)
                  </p>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex gap-2 mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="flex-1 btn-secondary py-2 text-sm"
              >
                Edit Profile
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="flex-1 btn-ghost py-2 text-sm"
              >
                View Activity
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
