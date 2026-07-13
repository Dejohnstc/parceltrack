import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Package } from "lucide-react";

import { getCurrentUser } from "@/lib/auth";

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function AuthLayout({
  children,
}: AuthLayoutProps) {
  const user = await getCurrentUser();

  // Prevent authenticated users from visiting auth pages
  if (user) {
    if (user.role === "ADMIN" || user.role === "STAFF") {
      redirect("/dashboard");
    }

    redirect("/account");
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Left Side */}

      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 p-12 text-white">
        <div className="max-w-lg">
          <Package className="mb-8 h-20 w-20" />

          <h1 className="text-5xl font-bold">
            ValidXpress
          </h1>

          <p className="mt-6 text-lg leading-8 text-orange-100">
            Enterprise logistics software built for modern
            courier companies.
          </p>

          <div className="mt-10 space-y-4 text-orange-100">
            <div>✔ Real-Time Shipment Tracking</div>

            <div>✔ Customer Portal</div>

            <div>✔ Admin Dashboard</div>

            <div>✔ Email Notifications</div>

            <div>✔ Secure Authentication</div>

            <div>✔ Live Tracking Updates</div>
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}