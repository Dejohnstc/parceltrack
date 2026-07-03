import { redirect } from "next/navigation";
import {
  User,
  Mail,
  ShieldCheck,
  Calendar,
  Package,
  Truck,
  CheckCircle,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "CUSTOMER") {
    redirect("/dashboard");
  }

  const [
    totalShipments,
    inTransit,
    delivered,
  ] = await Promise.all([
    prisma.shipment.count({
      where: {
        customerId: user.id,
      },
    }),

    prisma.shipment.count({
      where: {
        customerId: user.id,
        status: "IN_TRANSIT",
      },
    }),

    prisma.shipment.count({
      where: {
        customerId: user.id,
        status: "DELIVERED",
      },
    }),
  ]);

  return (
    <div className="space-y-8">

      {/* Hero */}

      <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white shadow-xl">

        <div className="flex flex-col items-center gap-6 md:flex-row">

          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/20 text-5xl font-bold backdrop-blur">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1">

            <h1 className="text-4xl font-bold">
              {user.name}
            </h1>

            <p className="mt-2 text-orange-100">
              {user.email}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">

              <span className="rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur">
                Customer
              </span>

              <span className="rounded-full bg-green-500/30 px-4 py-2 text-sm">
                Verified Account
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Information */}

      <div className="grid gap-8 lg:grid-cols-2">

        {/* Personal */}

        <div className="rounded-3xl bg-white p-8 shadow-lg">

          <h2 className="mb-8 text-2xl font-bold">
            Personal Information
          </h2>

          <div className="space-y-6">

            <div className="flex items-center gap-4">

              <User className="text-orange-500" />

              <div>

                <p className="text-sm text-slate-500">
                  Full Name
                </p>

                <p className="font-semibold">
                  {user.name}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <Mail className="text-orange-500" />

              <div>

                <p className="text-sm text-slate-500">
                  Email Address
                </p>

                <p className="font-semibold">
                  {user.email}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <ShieldCheck className="text-orange-500" />

              <div>

                <p className="text-sm text-slate-500">
                  Account Role
                </p>

                <p className="font-semibold">
                  {user.role}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <Calendar className="text-orange-500" />

              <div>

                <p className="text-sm text-slate-500">
                  Member Since
                </p>

                <p className="font-semibold">
                  {new Intl.DateTimeFormat(
                    "en-US",
                    {
                      dateStyle: "long",
                    }
                  ).format(
                    new Date(user.createdAt)
                  )}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Shipment Statistics */}

        <div className="rounded-3xl bg-white p-8 shadow-lg">

          <h2 className="mb-8 text-2xl font-bold">
            Shipment Statistics
          </h2>

          <div className="space-y-6">

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-5">

              <div className="flex items-center gap-4">

                <Package className="text-orange-500" />

                <span>Total Shipments</span>

              </div>

              <span className="text-2xl font-bold">
                {totalShipments}
              </span>

            </div>

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-5">

              <div className="flex items-center gap-4">

                <Truck className="text-blue-500" />

                <span>In Transit</span>

              </div>

              <span className="text-2xl font-bold">
                {inTransit}
              </span>

            </div>

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-5">

              <div className="flex items-center gap-4">

                <CheckCircle className="text-green-500" />

                <span>Delivered</span>

              </div>

              <span className="text-2xl font-bold">
                {delivered}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Security */}

      <div className="rounded-3xl bg-white p-8 shadow-lg">

        <h2 className="text-2xl font-bold">
          Account Security
        </h2>

        <p className="mt-3 text-slate-500">
          Your account is protected using encrypted
          authentication and secure login sessions.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border p-6">

            <h3 className="font-semibold">
              Email Verification
            </h3>

            <p className="mt-2 text-green-600">
              Verified
            </p>

          </div>

          <div className="rounded-2xl border p-6">

            <h3 className="font-semibold">
              Password
            </h3>

            <p className="mt-2 text-slate-500">
              Protected
            </p>

          </div>

          <div className="rounded-2xl border p-6">

            <h3 className="font-semibold">
              Session
            </h3>

            <p className="mt-2 text-slate-500">
              Active
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}