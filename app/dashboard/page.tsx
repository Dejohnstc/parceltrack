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
import Link from "next/link";

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
      {/* Hero */}

<div className="overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 p-8 text-white shadow-xl">
  <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
    <div>
      <p className="text-sm uppercase tracking-[0.25em] text-orange-100">
        Logistics Control Center
      </p>

      <h1 className="mt-3 text-4xl font-bold md:text-5xl">
        Welcome back,
        <br />
        {user.name}
      </h1>

      <p className="mt-4 text-orange-100">
        {today}
      </p>

      <p className="mt-4 max-w-xl text-orange-100">
        Monitor shipments, manage customers and oversee
        every delivery from one centralized dashboard.
      </p>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
        <p className="text-sm text-orange-100">
          Active Shipments
        </p>

        <h2 className="mt-2 text-4xl font-bold">
          {inTransitShipments}
        </h2>
      </div>

      <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
        <p className="text-sm text-orange-100">
          Customers
        </p>

        <h2 className="mt-2 text-4xl font-bold">
          {totalCustomers}
        </h2>
      </div>
    </div>
  </div>
</div>

      {/* Statistics */}

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
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
<section className="grid gap-4 md:grid-cols-3">

  <Link
    href="/dashboard/shipments/create"
    className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
  >
    <Package className="mb-4 text-orange-500" />

    <h3 className="font-bold">
      Create Shipment
    </h3>

    <p className="mt-2 text-sm text-slate-500">
      Register a new shipment.
    </p>
  </Link>

  <Link
    href="/dashboard/customers"
    className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
  >
    <Users className="mb-4 text-purple-500" />

    <h3 className="font-bold">
      Customers
    </h3>

    <p className="mt-2 text-sm text-slate-500">
      Manage customer accounts.
    </p>
  </Link>

  <Link
    href="/dashboard/settings"
    className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
  >
    <Package className="mb-4 text-blue-500" />

    <h3 className="font-bold">
      System Settings
    </h3>

    <p className="mt-2 text-sm text-slate-500">
      Configure ValidXpress.
    </p>
  </Link>

</section>
      {/* Recent Shipments */}

      <section className="rounded-3xl bg-white p-6 shadow-lg">
        <div>
          <h2 className="text-3xl font-bold">
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