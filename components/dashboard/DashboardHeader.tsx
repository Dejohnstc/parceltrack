import { Bell, LogOut, Settings } from "lucide-react";

import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "@/actions/auth/logout";

export default async function DashboardHeader() {
  const user = await getCurrentUser();

  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8 shadow-sm">
      {/* Left */}

      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h2>

        <p className="text-slate-500">
          Welcome back,{" "}
          <span className="font-medium">
            {user?.name ?? "Administrator"}
          </span>
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">
        {/* Notifications */}

        <button className="rounded-xl border p-3 transition hover:bg-slate-100">
          <Bell size={20} />
        </button>

        {/* Settings */}

        <button className="rounded-xl border p-3 transition hover:bg-slate-100">
          <Settings size={20} />
        </button>

        {/* User */}

        <div className="hidden text-right md:block">
          <p className="font-semibold">
            {user?.name}
          </p>

          <p className="text-sm text-slate-500">
            {user?.email}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
          {user?.name?.charAt(0).toUpperCase() ?? "A"}
        </div>

        {/* Logout */}

        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>
        </form>
      </div>
    </header>
  );
}