import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { canAccessDashboard } from "@/lib/auth/permissions";

export async function requireAdmin() {
  const user = await getCurrentUser();

  // User is not authenticated
  if (!user) {
    redirect("/login");
  }

  // User is authenticated but not authorized
  if (!canAccessDashboard(user.role)) {
    redirect("/unauthorized");
  }

  return user;
}