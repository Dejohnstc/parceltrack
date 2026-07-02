import {
  MapPin,
  Package,
  User,
} from "lucide-react";

import {
  Shipment,
  TrackingEvent,
} from "@prisma/client";

import TrackingTimeline from "./TrackingTimeline";

interface ShipmentInfoProps {
  shipment: Shipment & {
    trackingEvents: TrackingEvent[];
  };
}

export default function ShipmentInfo({
  shipment,
}: ShipmentInfoProps) {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="rounded-xl border bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {shipment.trackingNumber}
            </h1>

            <p className="mt-2 text-slate-500">
              Shipment Details
            </p>
          </div>

          <span className="rounded-full bg-blue-100 px-5 py-2 font-medium text-blue-700">
            {shipment.status.replaceAll("_", " ")}
          </span>
        </div>
      </div>

      {/* Sender & Receiver */}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-6">
          <div className="mb-5 flex items-center gap-3">
            <User />
            <h2 className="text-xl font-semibold">
              Sender
            </h2>
          </div>

          <div className="space-y-2">
            <p>{shipment.senderName}</p>
            <p>{shipment.senderEmail}</p>
            <p>{shipment.senderPhone || "-"}</p>
            <p>{shipment.senderAddress || "-"}</p>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <div className="mb-5 flex items-center gap-3">
            <User />
            <h2 className="text-xl font-semibold">
              Receiver
            </h2>
          </div>

          <div className="space-y-2">
            <p>{shipment.receiverName}</p>
            <p>{shipment.receiverEmail}</p>
            <p>{shipment.receiverPhone || "-"}</p>
            <p>{shipment.receiverAddress || "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Route */}

      <div className="rounded-xl border bg-white p-6">
        <div className="mb-6 flex items-center gap-3">
          <MapPin />
          <h2 className="text-xl font-semibold">
            Shipment Route
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <p className="text-sm text-slate-500">
              Origin
            </p>

            <p className="font-semibold">
              {shipment.origin}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Current Location
            </p>

            <p className="font-semibold text-blue-600">
              {shipment.currentLocation}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Destination
            </p>

            <p className="font-semibold">
              {shipment.destination}
            </p>
          </div>
        </div>
      </div>

      {/* Package */}

      <div className="rounded-xl border bg-white p-6">
        <div className="mb-6 flex items-center gap-3">
          <Package />
          <h2 className="text-xl font-semibold">
            Package Information
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <div>
            <p className="text-sm text-slate-500">
              Service
            </p>

            <p>{shipment.service || "-"}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Weight
            </p>

            <p>{shipment.weight ?? "-"} kg</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Pieces
            </p>

            <p>{shipment.pieces ?? "-"}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Expected Delivery
            </p>

            <p>
              {shipment.expectedDelivery
                ? shipment.expectedDelivery.toLocaleDateString()
                : "-"}
            </p>
          </div>
        </div>
      </div>

      <TrackingTimeline
        currentStatus={shipment.status}
        events={shipment.trackingEvents}
      />
    </div>
  );
}