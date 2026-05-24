"use client";

import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="container-wrapper py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage alerts and notifications
        </p>
      </div>

      <div className="card-base p-12 text-center">
        <Bell size={48} className="mx-auto mb-4 opacity-30" />
        <p className="text-gray-600 dark:text-gray-400">
          Notifications module coming soon...
        </p>
      </div>
    </div>
  );
}
