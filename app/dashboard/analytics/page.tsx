import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/prisma";

import StatsCard from "@/components/dashboard/StatsCard";

import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Users,
  AlertTriangle,
} from "lucide-react";

export default async function AnalyticsPage() {
  await requireAdmin();

  const [
    totalShipments,
    totalCustomers,
    pending,
    inTransit,
    delivered,
    delayed,
    returned,
    failed,
  ] = await Promise.all([
    prisma.shipment.count(),

    prisma.user.count({
      where: {
        role: "CUSTOMER",
      },
    }),

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

    prisma.shipment.count({
      where: {
        status: "DELAYED",
      },
    }),

    prisma.shipment.count({
      where: {
        status: "RETURNED",
      },
    }),

    prisma.shipment.count({
      where: {
        status: "FAILED",
      },
    }),
  ]);

  const deliveryRate =
    totalShipments === 0
      ? 0
      : Math.round(
          (delivered / totalShipments) * 100
        );

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          Analytics
        </h1>

        <p className="mt-2 text-slate-500">
          Shipment performance and business overview.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
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

      {/* Status Overview */}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            Shipment Status
          </h2>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between">
              <span>Pending</span>
              <strong>{pending}</strong>
            </div>

            <div className="flex justify-between">
              <span>In Transit</span>
              <strong>{inTransit}</strong>
            </div>

            <div className="flex justify-between">
              <span>Delivered</span>
              <strong>{delivered}</strong>
            </div>

            <div className="flex justify-between">
              <span>Delayed</span>
              <strong>{delayed}</strong>
            </div>

            <div className="flex justify-between">
              <span>Returned</span>
              <strong>{returned}</strong>
            </div>

            <div className="flex justify-between">
              <span>Failed</span>
              <strong>{failed}</strong>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            Delivery Performance
          </h2>

          <div className="mt-8 flex flex-col items-center">
            <div className="text-6xl font-bold text-green-600">
              {deliveryRate}%
            </div>

            <p className="mt-4 text-slate-500">
              Overall Delivery Success Rate
            </p>

            <div className="mt-8 w-full rounded-full bg-slate-200">
              <div
                className="h-4 rounded-full bg-green-500 transition-all"
                style={{
                  width: `${deliveryRate}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <AlertTriangle className="text-orange-500" />

          <h2 className="text-xl font-semibold">
            Operational Summary
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">
              Pending Shipments
            </p>

            <p className="mt-2 text-3xl font-bold">
              {pending}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">
              Delayed Shipments
            </p>

            <p className="mt-2 text-3xl font-bold text-orange-600">
              {delayed}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">
              Failed Deliveries
            </p>

            <p className="mt-2 text-3xl font-bold text-red-600">
              {failed}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}