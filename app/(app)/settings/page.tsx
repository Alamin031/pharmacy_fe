"use client";

import { Settings as SettingsIcon, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="container-wrapper py-6 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your pharmacy ERP configuration
        </p>
      </div>

      <div className="space-y-6">
        <div className="card-base p-6">
          <div className="flex items-center gap-3 mb-4">
            <SettingsIcon size={24} />
            <h2 className="text-xl font-bold">General Settings</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            General settings module coming soon...
          </p>
          <button className="btn-primary px-6 py-2 text-sm flex items-center gap-2">
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
