import Link from "next/link";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

import StatsCard from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";

import {
  Package,
  Truck,
  CheckCircle,
  Clock,
} from "lucide-react";

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Prevent admins/staff from using the customer portal
  if (user.role !== "CUSTOMER") {
    redirect("/dashboard");
  }

  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const [
    total,
    pending,
    inTransit,
    delivered,
    shipments,
  ] = await Promise.all([
    prisma.shipment.count({
      where: {
        customerId: user.id,
      },
    }),

    prisma.shipment.count({
      where: {
        customerId: user.id,
        status: "PENDING",
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

    prisma.shipment.findMany({
      where: {
        customerId: user.id,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 5,
    }),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          My Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome back,{" "}
          <span className="font-semibold">
            {user.name}
          </span>
        </p>

        <p className="mt-1 text-sm text-slate-400">
          {today}
        </p>
      </div>

      {/* Statistics */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="My Shipments"
          value={total}
          icon={<Package size={28} />}
        />

        <StatsCard
          title="Pending"
          value={pending}
          icon={<Clock size={28} />}
          color="bg-yellow-500"
        />

        <StatsCard
          title="In Transit"
          value={inTransit}
          icon={<Truck size={28} />}
          color="bg-blue-500"
        />

        <StatsCard
          title="Delivered"
          value={delivered}
          icon={<CheckCircle size={28} />}
          color="bg-green-500"
        />
      </div>

      {/* Recent Shipments */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b p-6">
          <h2 className="text-xl font-semibold">
            Recent Shipments
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest shipment activity.
          </p>
        </div>

        {shipments.length === 0 ? (
          <div className="flex flex-col items-center py-16">
            <Package className="mb-4 h-12 w-12 text-slate-300" />

            <h3 className="text-lg font-semibold">
              No Shipments Yet
            </h3>

            <p className="mt-2 text-slate-500">
              Shipments assigned to your account
              will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {shipments.map((shipment) => (
              <div
                key={shipment.id}
                className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-semibold">
                    {shipment.trackingNumber}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {shipment.origin} →{" "}
                    {shipment.destination}
                  </p>

                  <p className="mt-2 text-sm">
                    Status:{" "}
                    <span className="font-medium">
                      {shipment.status.replaceAll(
                        "_",
                        " "
                      )}
                    </span>
                  </p>
                </div>

                <Button asChild>
                  <Link
                    href={`/track/${shipment.trackingNumber}`}
                  >
                    View Tracking
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}