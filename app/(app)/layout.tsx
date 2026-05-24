"use client";

import { Sidebar } from "@/app/components/sidebar";
import { Header } from "@/app/components/header";
import { BottomNav } from "@/app/components/bottom-nav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-slate-950 pb-20 md:pb-0">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
