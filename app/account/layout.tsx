import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "@/actions/auth/logout";

import AccountShell from "@/components/account/AccountShell";

interface AccountLayoutProps {
  children: ReactNode;
}

export default async function AccountLayout({
  children,
}: AccountLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "CUSTOMER") {
    redirect("/dashboard");
  }

  return (
    <AccountShell
      user={{
        name: user.name,
        email: user.email,
      }}
      logoutAction={logoutAction}
    >
      {children}
    </AccountShell>
  );
}