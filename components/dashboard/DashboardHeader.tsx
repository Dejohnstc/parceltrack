"use client";

import {
  Bell,
  LogOut,
  Menu,
  Settings,
} from "lucide-react";

import { logoutAction } from "@/actions/auth/logout";

interface DashboardHeaderProps {
  user: {
    name: string;
    email: string;
  };
  sidebarOpen: boolean;
  setSidebarOpen: (
    value: boolean
  ) => void;
}

export default function DashboardHeader({
  user,
  sidebarOpen,
  setSidebarOpen,
}: DashboardHeaderProps) {
  return (
    <>
      {/* Mobile Header */}

      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm lg:hidden">
        <button
          onClick={() =>
            setSidebarOpen(!sidebarOpen)
          }
          className="rounded-xl p-2 transition hover:bg-slate-100"
        >
          <Menu size={24} />
        </button>

        <h1 className="text-lg font-bold text-orange-500">
          ParcelTrack
        </h1>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
          {user.name.charAt(0).toUpperCase()}
        </div>
      </header>

      {/* Desktop Header */}

      <header className="hidden h-24 items-center justify-between border-b bg-white px-8 shadow-sm lg:flex">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Admin Dashboard
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            Welcome back, {user.name}
          </h2>

          <p className="mt-1 text-slate-500">
            Manage shipments, customers and system
            settings.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button className="rounded-xl border p-3 transition hover:bg-slate-100">
            <Bell size={20} />
          </button>

          <button className="rounded-xl border p-3 transition hover:bg-slate-100">
            <Settings size={20} />
          </button>

          <div className="text-right">
            <p className="font-semibold">
              {user.name}
            </p>

            <p className="text-sm text-slate-500">
              {user.email}
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 font-bold text-white shadow-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-3 font-medium text-white transition hover:bg-red-600"
            >
              <LogOut size={18} />
              Logout
            </button>
          </form>
        </div>
      </header>
    </>
  );
}