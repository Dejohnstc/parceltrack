"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (
    value: boolean
  ) => void;
}

const links = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Shipments",
    href: "/dashboard/shipments",
    icon: Package,
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardSidebar({
  sidebarOpen,
  setSidebarOpen,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r bg-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">

          <div>

            <h1 className="text-3xl font-bold text-orange-500">
              ValidXpress
            </h1>

            <p className="text-sm text-slate-500">
              Admin Panel
            </p>

          </div>

          <button
            onClick={() =>
              setSidebarOpen(false)
            }
            className="rounded-xl p-2 hover:bg-slate-100 lg:hidden"
          >
            <X size={22} />
          </button>

        </div>

        {/* Navigation */}

        <nav className="flex-1 space-y-2 p-5">

          {links.map((link) => {
            const Icon = link.icon;

            const active =
              pathname === link.href ||
              (link.href !== "/dashboard" &&
                pathname.startsWith(
                  link.href
                ));

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() =>
                  setSidebarOpen(false)
                }
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-medium transition-all ${
                  active
                    ? "bg-orange-500 text-white shadow-lg"
                    : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                <Icon size={20} />

                {link.title}
              </Link>
            );
          })}

        </nav>

        {/* Footer */}

        <div className="border-t p-6">

          <p className="text-center text-sm text-slate-500">
            ValidXpress Admin
          </p>

        </div>
      </aside>
    </>
  );
}