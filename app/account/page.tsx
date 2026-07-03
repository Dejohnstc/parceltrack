import Link from "next/link";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import HeroCard from "@/components/account/dashboard/HeroCard";
import StatsGrid from "@/components/account/dashboard/StatsGrid";
import CurrentShipmentCard from "@/components/account/dashboard/CurrentShipmentCard";
import QuickTrackCard from "@/components/account/dashboard/QuickTrackCard";
import RecentActivity from "@/components/account/dashboard/RecentActivity";

import {
  Package,
  ArrowRight,
} from "lucide-react";


export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

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
  latestShipment,
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

  prisma.shipment.findFirst({
    where: {
      customerId: user.id,
    },

    orderBy: {
      updatedAt: "desc",
    },
  }),
]);

const recentEvents = latestShipment
  ? await prisma.trackingEvent.findMany({
      where: {
        shipmentId: latestShipment.id,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 5,
    })
  : [];

  return (
    <div className="space-y-8 px-4 py-6 md:px-8">
      {/* Header */}
<HeroCard
  name={user.name}
  today={today}
  activeShipments={inTransit}
/>

      {/* Stats */}

      <StatsGrid
  total={total}
  pending={pending}
  inTransit={inTransit}
  delivered={delivered}
/>
<CurrentShipmentCard shipment={latestShipment} />

<QuickTrackCard />

<RecentActivity events={recentEvents} />
      {/* Shipments */}

      <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
        <div className="border-b px-6 py-5">
          <h2 className="text-2xl font-bold">
            Recent Shipments
          </h2>

          <p className="mt-1 text-slate-500">
            Your latest shipment activity.
          </p>
        </div>

        {shipments.length === 0 ? (
          <div className="flex flex-col items-center py-16">
            <Package className="mb-5 h-14 w-14 text-slate-300" />

            <h3 className="text-xl font-semibold">
              No Shipments Yet
            </h3>

            <p className="mt-2 text-center text-slate-500">
              Shipments assigned to your account
              will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {shipments.map((shipment) => (
              <div
                key={shipment.id}
                className="flex flex-col gap-6 p-6 transition hover:bg-slate-50 md:flex-row md:items-center md:justify-between"
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-bold">
                    {shipment.trackingNumber}
                  </h3>

                  <p className="text-slate-500">
                    {shipment.origin} →{" "}
                    {shipment.destination}
                  </p>

                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      shipment.status === "DELIVERED"
                        ? "bg-green-100 text-green-700"
                        : shipment.status ===
                          "IN_TRANSIT"
                        ? "bg-blue-100 text-blue-700"
                        : shipment.status ===
                          "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {shipment.status.replaceAll(
                      "_",
                      " "
                    )}
                  </span>
                </div>

                <Button
                  asChild
                  className="rounded-xl"
                >
                  <Link
                    href={`/track/${shipment.trackingNumber}`}
                  >
                    View Tracking

                    <ArrowRight className="ml-2 h-4 w-4" />
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