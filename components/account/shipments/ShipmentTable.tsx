import Link from "next/link";
import { Shipment } from "@prisma/client";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ShipmentTableProps {
  shipments: Shipment[];
}

export default function ShipmentTable({
  shipments,
}: ShipmentTableProps) {
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

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
      <table className="min-w-full">
        <thead className="border-b bg-slate-50">
          <tr>
            <th className="px-6 py-5 text-left text-sm font-semibold text-slate-600">
              Tracking Number
            </th>

            <th className="px-6 py-5 text-left text-sm font-semibold text-slate-600">
              Route
            </th>

            <th className="px-6 py-5 text-left text-sm font-semibold text-slate-600">
              Current Location
            </th>

            <th className="px-6 py-5 text-left text-sm font-semibold text-slate-600">
              Status
            </th>

            <th className="px-6 py-5 text-right text-sm font-semibold text-slate-600">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {shipments.map((shipment) => (
            <tr
              key={shipment.id}
              className="border-b transition hover:bg-orange-50"
            >
              <td className="px-6 py-5">
                <div>
                  <p className="font-bold text-slate-900">
                    {shipment.trackingNumber}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Created{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "medium",
                    }).format(new Date(shipment.createdAt))}
                  </p>
                </div>
              </td>

              <td className="px-6 py-5">
                <div className="font-medium">
                  {shipment.origin}
                </div>

                <div className="text-sm text-slate-500">
                  →
                  {" "}
                  {shipment.destination}
                </div>
              </td>

              <td className="px-6 py-5 text-slate-600">
                {shipment.currentLocation}
              </td>

              <td className="px-6 py-5">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badge(
                    shipment.status
                  )}`}
                >
                  {shipment.status.replaceAll("_", " ")}
                </span>
              </td>

              <td className="px-6 py-5 text-right">
                <Button
                  asChild
                  className="rounded-xl"
                >
                  <Link
                    href={`/track/${shipment.trackingNumber}`}
                  >
                    Track

                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}