"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Menu,
  X,
  LayoutDashboard,
  Package,
  User,
  LogOut,
} from "lucide-react";

interface AccountShellProps {
  children: ReactNode;
  user: {
    name: string;
    email: string;
  };
  logoutAction: () => Promise<void>;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/account",
    icon: LayoutDashboard,
  },
  {
    name: "My Shipments",
    href: "/account/shipments",
    icon: Package,
  },
  {
    name: "Profile",
    href: "/account/profile",
    icon: User,
  },
];
function NavLinks({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <>
      {navigation.map((item) => {
        const Icon = item.icon;

        const active =
          pathname === item.href ||
          (item.href !== "/account" &&
            pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all ${
              active
                ? "bg-orange-500 text-white shadow-lg"
                : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
            }`}
          >
            <Icon size={20} />

            <span className="font-medium">
              {item.name}
            </span>
          </Link>
        );
      })}
    </>
  );
}
export default function AccountShell({
  children,
  user,
  logoutAction,
}: AccountShellProps) {
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Mobile Sidebar */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-72 flex-col bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h1 className="text-2xl font-bold text-orange-500">
              ValidXpress
            </h1>

            <p className="text-sm text-slate-500">
              Customer Portal
            </p>
          </div>

          <button
            onClick={() =>
              setSidebarOpen(false)
            }
            className="rounded-xl p-2 hover:bg-slate-100"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 p-6">
          <NavLinks
  pathname={pathname}
  onNavigate={() => setSidebarOpen(false)}
/>
        </nav>

        <div className="border-t p-6">
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600"
            >
              <LogOut size={18} />

              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Desktop Sidebar */}

      <aside className="fixed hidden h-screen w-72 border-r bg-white lg:flex lg:flex-col">
        <div className="border-b p-8">
          <h1 className="text-3xl font-bold text-orange-500">
            ValidXpress
          </h1>

          <p className="mt-2 text-slate-500">
            Customer Portal
          </p>
        </div>

        <nav className="flex-1 space-y-2 p-6">
          <NavLinks
  pathname={pathname}
  onNavigate={() => setSidebarOpen(false)}
/>
        </nav>

        <div className="border-t p-6">
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600"
            >
              <LogOut size={18} />

              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Wrapper */}

      <div className="lg:ml-72">
        {/* Mobile Header */}

        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-5 shadow-sm lg:hidden">
          <button
            onClick={() =>
              setSidebarOpen(true)
            }
            className="rounded-xl p-2 hover:bg-slate-100"
          >
            <Menu size={24} />
          </button>

          <h2 className="text-lg font-bold">
            ValidXpress
          </h2>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </header>

        {/* Desktop Header */}

<header className="hidden h-24 items-center justify-between border-b bg-white px-10 lg:flex">
  <div>
    <p className="text-sm font-medium uppercase tracking-wider text-orange-500">
      Customer Portal
    </p>

    <h2 className="mt-1 text-3xl font-bold text-slate-900">
      Welcome back, {user.name}
    </h2>

    <p className="mt-1 text-slate-500">
      Manage your shipments and account.
    </p>
  </div>

  <div className="flex items-center gap-5">
    <div className="text-right">
      <p className="font-semibold text-slate-900">
        {user.name}
      </p>

      <p className="text-sm text-slate-500">
        {user.email}
      </p>
    </div>

    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-lg font-bold text-white shadow-lg">
      {user.name.charAt(0).toUpperCase()}
    </div>
  </div>
</header>

{/* Mobile Welcome */}

<div className="border-b bg-white px-5 py-6 lg:hidden">
  <p className="text-sm uppercase tracking-widest text-orange-500">
    Customer Portal
  </p>

  <h2 className="mt-2 text-2xl font-bold">
    Hi, {user.name}
  </h2>

  <p className="mt-1 text-slate-500">
    Manage your shipments anywhere.
  </p>
</div>

{/* Main Content */}

<main className="min-h-[calc(100vh-96px)] p-4 md:p-6 lg:p-10">
  <div className="mx-auto max-w-7xl">
    {children}
  </div>
</main>

</div>
</div>


  );
}