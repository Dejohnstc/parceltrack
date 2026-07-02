"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

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

export default function DashboardSidebar() {
  return (
    <aside className="w-72 border-r bg-white">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-orange-500">
          ParcelTrack
        </h1>
      </div>

      <nav className="p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-orange-50"
            >
              <Icon size={20} />

              {link.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}