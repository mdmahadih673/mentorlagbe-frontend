import { Suspense } from "react";
import type { ReactNode } from "react";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f6f1]">{children}</div>}>
      <DashboardShell>{children}</DashboardShell>
    </Suspense>
  );
}
