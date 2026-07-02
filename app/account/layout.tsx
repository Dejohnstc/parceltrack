import { ReactNode } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";

import {
  LayoutDashboard,
  Package,
  User,
  LogOut,
} from "lucide-react";

import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "@/actions/auth/logout";

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

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}

      <aside className="flex w-72 flex-col border-r bg-white">
        <div className="border-b p-8">
          <h1 className="text-2xl font-bold text-orange-500">
            ParcelTrack
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Customer Portal
          </p>
        </div>

        <nav className="flex-1 space-y-2 p-6">
          <Link
            href="/account"
            className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-orange-50 hover:text-orange-600"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            href="/account/shipments"
            className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-orange-50 hover:text-orange-600"
          >
            <Package size={20} />
            My Shipments
          </Link>

          <Link
            href="/account/profile"
            className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-orange-50 hover:text-orange-600"
          >
            <User size={20} />
            Profile
          </Link>
        </nav>

        <div className="border-t p-6">
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 font-medium text-white transition hover:bg-red-600"
            >
              <LogOut size={18} />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}

      <div className="flex flex-1 flex-col">
        <header className="flex h-20 items-center justify-between border-b bg-white px-8">
          <div>
            <h2 className="text-2xl font-bold">
              Welcome, {user.name}
            </h2>

            <p className="text-slate-500">
              Manage your shipments and account.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold">
                {user.name}
              </p>

              <p className="text-sm text-slate-500">
                {user.email}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}