"use client";

import { CustomerSidebar } from "@/app/components/customer-sidebar";
import { CustomerHeader } from "@/app/components/customer-header";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <CustomerSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <CustomerHeader />
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-slate-950 pb-20 md:pb-0">
          {children}
        </main>
      </div>
    </div>
  );
}
