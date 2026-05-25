"use client";

import { useState } from "react";
import { mockCustomers } from "@/app/lib/mock-data";
import { formatCurrency } from "@/app/lib/utils";
import { AlertTriangle, Send, Phone, Mail } from "lucide-react";

export default function DueManagementPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [paymentAmount, setPaymentAmount] = useState("");

  const customersWithDue = mockCustomers.filter((c) => c.totalDue > 0);
  const totalDueAmount = customersWithDue.reduce((sum, c) => sum + c.totalDue, 0);

  const getRiskLevel = (due: number) => {
    if (due > 5000) return { level: "high", color: "danger" };
    if (due > 2000) return { level: "medium", color: "warning" };
    return { level: "low", color: "primary" };
  };

  return (
    <div className="container-wrapper py-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Due Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track and collect customer dues
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-base p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Total Due Amount
          </p>
          <p className="text-2xl font-bold text-red-600">
            {formatCurrency(totalDueAmount)}
          </p>
        </div>
        <div className="card-base p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Customers with Due
          </p>
          <p className="text-2xl font-bold">{customersWithDue.length}</p>
        </div>
        <div className="card-base p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            High Risk Accounts
          </p>
          <p className="text-2xl font-bold text-orange-600">
            {customersWithDue.filter((c) => getRiskLevel(c.totalDue).level === "high").length}
          </p>
        </div>
      </div>

      {/* Customers with Due */}
      <div className="space-y-4">
        {customersWithDue.map((customer) => {
          const riskInfo = getRiskLevel(customer.totalDue);
          const isSelected = selectedCustomer === customer.id;

          return (
            <div
              key={customer.id}
              className="card-base p-6 cursor-pointer transition-all"
              onClick={() =>
                setSelectedCustomer(isSelected ? null : customer.id)
              }
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{customer.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`badge-${riskInfo.color}`}>
                      {riskInfo.level.toUpperCase()} RISK
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {customer.accountType.charAt(0).toUpperCase() +
                        customer.accountType.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Outstanding
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(customer.totalDue)}
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700 text-sm">
                <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  <Phone size={16} />
                  {customer.phone}
                </button>
                {customer.email && (
                  <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    <Mail size={16} />
                    {customer.email}
                  </button>
                )}
              </div>

              {/* Expandable Payment Section */}
              {isSelected && (
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-4">
                  {/* Due History */}
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                      DUE HISTORY
                    </p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Total Purchased</span>
                        <span className="font-semibold">
                          {formatCurrency(customer.totalPurchased)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Due</span>
                        <span className="font-semibold text-red-600">
                          {formatCurrency(customer.totalDue)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Payment</span>
                        <span>
                          {customer.lastPurchaseDate
                            ? new Date(customer.lastPurchaseDate).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Input */}
                  <div>
                    <label className="text-sm font-semibold mb-2 block">
                      Payment Amount
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Enter amount"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        className="input-base flex-1"
                      />
                      <button className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
                        <Send size={16} />
                        Record
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button className="flex-1 btn-secondary py-2 text-sm">
                      Send SMS Reminder
                    </button>
                    <button className="flex-1 btn-ghost py-2 text-sm">
                      View History
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {customersWithDue.length === 0 && (
        <div className="card-base p-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No customers with outstanding dues. Great job!
          </p>
        </div>
      )}
    </div>
  );
}
