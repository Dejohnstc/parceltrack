import type { ReactNode } from "react";

import { getCurrentUser } from "@/lib/auth";

import DashboardShell from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <DashboardShell
      user={{
        name: user?.name ?? "Administrator",
        email: user?.email ?? "",
      }}
    >
      {children}
    </DashboardShell>
  );
}