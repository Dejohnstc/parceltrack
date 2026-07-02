import Link from "next/link";
import {
  Shipment,
  ShipmentStatus,
} from "@prisma/client";
import {
  Eye,
  Pencil,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import DeleteShipmentDialog from "@/components/shipment/DeleteShipmentDialog";

interface ShipmentTableProps {
  shipments: Shipment[];
}

function getStatusColor(status: ShipmentStatus) {
  switch (status) {
    case ShipmentStatus.PENDING:
      return "bg-gray-100 text-gray-700";

    case ShipmentStatus.CREATED:
      return "bg-indigo-100 text-indigo-700";

    case ShipmentStatus.PICKED_UP:
      return "bg-blue-100 text-blue-700";

    case ShipmentStatus.ORIGIN_FACILITY:
      return "bg-cyan-100 text-cyan-700";

    case ShipmentStatus.IN_TRANSIT:
      return "bg-yellow-100 text-yellow-700";

    case ShipmentStatus.ARRIVED_HUB:
      return "bg-purple-100 text-purple-700";

    case ShipmentStatus.CUSTOMS:
      return "bg-pink-100 text-pink-700";

    case ShipmentStatus.OUT_FOR_DELIVERY:
      return "bg-orange-100 text-orange-700";

    case ShipmentStatus.DELIVERED:
      return "bg-green-100 text-green-700";

    case ShipmentStatus.DELAYED:
      return "bg-amber-100 text-amber-700";

    case ShipmentStatus.FAILED:
      return "bg-red-100 text-red-700";

    case ShipmentStatus.RETURNED:
      return "bg-red-100 text-red-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function ShipmentTable({
  shipments,
}: ShipmentTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-xl font-semibold">
          Recent Shipments
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          View, edit and manage parcel movement.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-left">Tracking</th>
              <th className="p-4 text-left">Sender</th>
              <th className="p-4 text-left">Receiver</th>
              <th className="p-4 text-left">Current Location</th>
              <th className="p-4 text-left">Destination</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {shipments.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-16 text-center"
                >
                  <div className="flex flex-col items-center">
                    <MapPin className="mb-4 h-12 w-12 text-slate-300" />

                    <h3 className="text-lg font-semibold">
                      No Shipments Found
                    </h3>

                    <p className="mt-2 text-slate-500">
                      Create your first shipment to get
                      started.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              shipments.map((shipment) => (
                <tr
                  key={shipment.id}
                  className="border-t transition hover:bg-slate-50"
                >
                  <td className="p-4 font-semibold">
                    {shipment.trackingNumber}
                  </td>

                  <td className="p-4">
                    {shipment.senderName}
                  </td>

                  <td className="p-4">
                    {shipment.receiverName}
                  </td>

                  <td className="p-4">
                    {shipment.currentLocation}
                  </td>

                  <td className="p-4">
                    {shipment.destination}
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                        shipment.status
                      )}`}
                    >
                      {shipment.status.replaceAll(
                        "_",
                        " "
                      )}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                      >
                        <Link
                          href={`/dashboard/shipments/${shipment.id}`}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                      >
                        <Link
                          href={`/dashboard/shipments/${shipment.id}/edit`}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </Button>

                      <DeleteShipmentDialog
                        shipmentId={shipment.id}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}