import Link from "next/link";
import { Shipment } from "@prisma/client";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface MobileShipmentCardsProps {
  shipments: Shipment[];
}

function badge(status: string) {
  switch (status) {
    case "DELIVERED":
      return "bg-green-100 text-green-700";

    case "IN_TRANSIT":
      return "bg-blue-100 text-blue-700";

    case "OUT_FOR_DELIVERY":
      return "bg-purple-100 text-purple-700";

    case "CUSTOMS":
      return "bg-orange-100 text-orange-700";

    case "PENDING":
      return "bg-yellow-100 text-yellow-700";

    case "DELAYED":
      return "bg-red-100 text-red-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function MobileShipmentCards({
  shipments,
}: MobileShipmentCardsProps) {
  return (
    <>
      {shipments.map((shipment) => (
        <div
          key={shipment.id}
          className="rounded-3xl bg-white p-6 shadow-lg"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Tracking Number
              </p>

              <h2 className="mt-1 text-xl font-bold">
                {shipment.trackingNumber}
              </h2>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${badge(
                shipment.status
              )}`}
            >
              {shipment.status.replaceAll("_", " ")}
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 text-slate-600">
              <Truck className="h-5 w-5 text-orange-500" />

              <span>
                {shipment.origin} → {shipment.destination}
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-600">
              <MapPin className="h-5 w-5 text-orange-500" />

              <span>{shipment.currentLocation}</span>
            </div>

            <div className="flex items-center gap-3 text-slate-600">
              <Calendar className="h-5 w-5 text-orange-500" />

              <span>
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "medium",
                }).format(new Date(shipment.createdAt))}
              </span>
            </div>
          </div>

          <Button
            asChild
            className="mt-6 w-full rounded-2xl"
          >
            <Link
              href={`/track/${shipment.trackingNumber}`}
            >
              Track Shipment

              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      ))}
    </>
  );
}