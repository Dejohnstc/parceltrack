import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Package,
  Truck,
} from "lucide-react";

import { Shipment, ShipmentStatus } from "@prisma/client";

interface CurrentShipmentCardProps {
  shipment: Shipment | null;
}

const progressMap: Record<ShipmentStatus, number> = {
  PENDING: 5,
  CREATED: 10,
  PICKED_UP: 25,
  ORIGIN_FACILITY: 40,
  IN_TRANSIT: 60,
  ARRIVED_HUB: 75,
  CUSTOMS: 85,
  OUT_FOR_DELIVERY: 95,
  DELIVERED: 100,
  DELAYED: 60,
  FAILED: 100,
  RETURNED: 100,
};

const badgeMap: Record<ShipmentStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CREATED: "bg-blue-100 text-blue-700",
  PICKED_UP: "bg-indigo-100 text-indigo-700",
  ORIGIN_FACILITY: "bg-cyan-100 text-cyan-700",
  IN_TRANSIT: "bg-blue-100 text-blue-700",
  ARRIVED_HUB: "bg-purple-100 text-purple-700",
  CUSTOMS: "bg-orange-100 text-orange-700",
  OUT_FOR_DELIVERY: "bg-green-100 text-green-700",
  DELIVERED: "bg-emerald-100 text-emerald-700",
  DELAYED: "bg-red-100 text-red-700",
  FAILED: "bg-red-100 text-red-700",
  RETURNED: "bg-slate-200 text-slate-700",
};

export default function CurrentShipmentCard({
  shipment,
}: CurrentShipmentCardProps) {
  if (!shipment) {
    return (
      <section className="rounded-3xl bg-white p-10 shadow-lg">
        <div className="flex flex-col items-center py-10">
          <Package className="mb-5 h-16 w-16 text-slate-300" />

          <h2 className="text-2xl font-bold">
            No Active Shipment
          </h2>

          <p className="mt-3 max-w-md text-center text-slate-500">
            Once a shipment is assigned to your account,
            you&apos;ll be able to monitor it here in real time.
          </p>
        </div>
      </section>
    );
  }

  const progress = progressMap[shipment.status];

  return (
    <section className="rounded-3xl bg-white p-8 shadow-lg">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Truck className="h-8 w-8 text-orange-500" />

            <div>
              <p className="text-sm uppercase tracking-wider text-slate-500">
                Current Shipment
              </p>

              <h2 className="text-3xl font-bold">
                {shipment.trackingNumber}
              </h2>
            </div>
          </div>

          <span
            className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${badgeMap[shipment.status]}`}
          >
            {shipment.status.replaceAll("_", " ")}
          </span>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-slate-600">
              <MapPin className="h-5 w-5 text-orange-500" />

              {shipment.currentLocation}
            </div>

            <div className="flex items-center gap-3 text-slate-600">
              <Calendar className="h-5 w-5 text-orange-500" />

              {shipment.expectedDelivery
                ? new Intl.DateTimeFormat("en-US", {
                    dateStyle: "long",
                  }).format(
                    new Date(
                      shipment.expectedDelivery
                    )
                  )
                : "Not available"}
            </div>
          </div>
        </div>

        <div className="w-full max-w-md space-y-6">
          <div>
            <div className="mb-2 flex justify-between text-sm font-medium">
              <span>Delivery Progress</span>

              <span>{progress}%</span>
            </div>

            <div className="h-3 rounded-full bg-slate-200">
              <div
                className="h-3 rounded-full bg-orange-500 transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          <Link
            href={`/track/${shipment.trackingNumber}`}
            className="flex items-center justify-center gap-3 rounded-2xl bg-orange-500 px-6 py-4 font-semibold text-white transition hover:bg-orange-600"
          >
            Continue Tracking

            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}