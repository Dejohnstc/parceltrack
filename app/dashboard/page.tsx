import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/require-admin";

import StatsCard from "@/components/dashboard/StatsCard";
import ShipmentTable from "@/components/tables/ShipmentTable";
import ShipmentToolbar from "@/components/tables/ShipmentToolbar";
import { Prisma } from "@prisma/client";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react";

interface DashboardPageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  // Protect Dashboard
  const user = await requireAdmin();

  const { search = "" } = await searchParams;

  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const searchFilter: Prisma.ShipmentWhereInput = search
  ? {
      OR: [
        {
          trackingNumber: {
            contains: search,
          },
        },
        {
          senderName: {
            contains: search,
          },
        },
        {
          receiverName: {
            contains: search,
          },
        },
        {
          destination: {
            contains: search,
          },
        },
        {
          origin: {
            contains: search,
          },
        },
        {
          currentLocation: {
            contains: search,
          },
        },
      ],
    }
  : {};

  const [
    totalShipments,
    pendingShipments,
    inTransitShipments,
    deliveredShipments,
    totalCustomers,
    shipments,
  ] = await Promise.all([
    prisma.shipment.count(),

    prisma.shipment.count({
      where: {
        status: "PENDING",
      },
    }),

    prisma.shipment.count({
      where: {
        status: "IN_TRANSIT",
      },
    }),

    prisma.shipment.count({
      where: {
        status: "DELIVERED",
      },
    }),

    prisma.user.count({
      where: {
        role: "CUSTOMER",
      },
    }),

    prisma.shipment.findMany({
      where: searchFilter,

      orderBy: {
        createdAt: "desc",
      },

      take: 20,
    }),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
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
      </div>

      {/* Statistics */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
        <StatsCard
          title="Total Shipments"
          value={totalShipments}
          icon={<Package size={28} />}
        />

        <StatsCard
          title="Customers"
          value={totalCustomers}
          icon={<Users size={28} />}
          color="bg-purple-500"
        />

        <StatsCard
          title="In Transit"
          value={inTransitShipments}
          icon={<Truck size={28} />}
          color="bg-blue-500"
        />

        <StatsCard
          title="Delivered"
          value={deliveredShipments}
          icon={<CheckCircle size={28} />}
          color="bg-green-500"
        />

        <StatsCard
          title="Pending"
          value={pendingShipments}
          icon={<Clock size={28} />}
          color="bg-yellow-500"
        />
      </div>

      {/* Recent Shipments */}

      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-semibold">
            Recent Shipments
          </h2>

          <p className="text-slate-500">
            Search, review, update and manage parcel movement.
          </p>
        </div>

        <ShipmentToolbar search={search} />

        <ShipmentTable shipments={shipments} />
      </section>
    </div>
  );
}