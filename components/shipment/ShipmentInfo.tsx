import {
  Calendar,
  MapPin,
  Package,
  Truck,
  User,
} from "lucide-react";

import {
  Shipment,
  ShipmentStatus,
  TrackingEvent,
} from "@prisma/client";

import TrackingTimeline from "./TrackingTimeline";

interface ShipmentInfoProps {
  shipment: Shipment & {
    trackingEvents: TrackingEvent[];
  };
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

function badge(status: ShipmentStatus) {
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
export default function ShipmentInfo({
  shipment,
}: ShipmentInfoProps) {
  return (
    <div className="space-y-8 pb-10">
      {/* Premium Hero */}

<section className="overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white shadow-2xl">
  <div className="grid gap-8 p-8 lg:grid-cols-2 lg:p-10">

    <div>
      <p className="uppercase tracking-[0.3em] text-orange-100">
        Shipment Tracking
      </p>

      <h1 className="mt-3 text-4xl font-bold">
        {shipment.trackingNumber}
      </h1>

      <div className="mt-6">
       <span
  className={`inline-flex items-center rounded-full px-5 py-2 text-sm font-bold shadow-sm ${badge(
    shipment.status
  )}`}
>
          {shipment.status.replaceAll("_", " ")}
        </span>
      </div>

      <div className="mt-8 space-y-4">

        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5" />

          <span>
            {shipment.currentLocation}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5" />

          <span>
            {shipment.expectedDelivery
              ? shipment.expectedDelivery.toLocaleDateString()
              : "Expected delivery unavailable"}
          </span>
        </div>

      </div>
    </div>

    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-center gap-3">

        <Truck className="h-8 w-8" />

        <div>

          <p className="text-orange-100">
            Delivery Progress
          </p>

        <h2>
  <span className="text-6xl font-bold">
    {progressMap[shipment.status]}%
  </span>
</h2>

        </div>

      </div>

      <div className="mt-8 h-4 rounded-full bg-white/20">

        <div
          className="h-4 rounded-full bg-white transition-all duration-700"
          style={{
            width: `${progressMap[shipment.status]}%`,
          }}
        />

      </div>

      <p className="mt-6 text-orange-100">
        Your shipment is currently
        <strong>
          {" "}
          {shipment.status.replaceAll("_", " ")}
        </strong>
        .
      </p>

    </div>

  </div>
</section>

      {/* Route Overview */}

<section className="rounded-3xl bg-white p-8 shadow-lg">
  <div className="mb-8 flex items-center gap-3">
    <MapPin className="h-7 w-7 text-orange-500" />

    <h2 className="text-2xl font-bold">
      Shipment Route
    </h2>
  </div>

  <div className="grid gap-6 lg:grid-cols-3">
    <div className="rounded-2xl border bg-slate-50 p-6">
      <p className="text-sm uppercase tracking-wider text-slate-500">
        Origin
      </p>

      <h3 className="mt-3 text-xl font-bold">
        {shipment.origin}
      </h3>
    </div>

    <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
      <p className="text-sm uppercase tracking-wider text-orange-500">
        Current Location
      </p>

      <h3 className="mt-3 text-xl font-bold text-orange-600">
        {shipment.currentLocation}
      </h3>
    </div>

    <div className="rounded-2xl border bg-slate-50 p-6">
      <p className="text-sm uppercase tracking-wider text-slate-500">
        Destination
      </p>

      <h3 className="mt-3 text-xl font-bold">
        {shipment.destination}
      </h3>
    </div>
  </div>
</section>

{/* Package Information */}

<section className="rounded-3xl bg-white p-8 shadow-lg">
  <div className="mb-8 flex items-center gap-3">
    <Package className="h-7 w-7 text-orange-500" />

    <h2 className="text-2xl font-bold">
      Package Information
    </h2>
  </div>

  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

    <div className="rounded-2xl border p-5">
      <p className="text-sm text-slate-500">
        Service
      </p>

      <h3 className="mt-2 text-lg font-semibold">
        {shipment.service || "-"}
      </h3>
    </div>

    <div className="rounded-2xl border p-5">
      <p className="text-sm text-slate-500">
        Package Type
      </p>

      <h3 className="mt-2 text-lg font-semibold">
        {shipment.packageType || "-"}
      </h3>
    </div>

    <div className="rounded-2xl border p-5">
      <p className="text-sm text-slate-500">
        Weight
      </p>

      <h3 className="mt-2 text-lg font-semibold">
        {shipment.weight ?? "-"} kg
      </h3>
    </div>

    <div className="rounded-2xl border p-5">
      <p className="text-sm text-slate-500">
        Pieces
      </p>

      <h3 className="mt-2 text-lg font-semibold">
        {shipment.pieces ?? "-"}
      </h3>
    </div>

    <div className="rounded-2xl border p-5">
      <p className="text-sm text-slate-500">
        Expected Delivery
      </p>

      <h3 className="mt-2 text-lg font-semibold">
        {shipment.expectedDelivery
          ? shipment.expectedDelivery.toLocaleDateString()
          : "-"}
      </h3>
    </div>

    <div className="rounded-2xl border p-5">
      <p className="text-sm text-slate-500">
        Description
      </p>

      <h3 className="mt-2 text-lg font-semibold">
        {shipment.packageDescription || "-"}
      </h3>
    </div>

  </div>
</section>

{/* Sender & Receiver */}

<div className="grid gap-8 xl:grid-cols-2">

  <section className="rounded-3xl bg-white p-8 shadow-lg">

    <div className="mb-8 flex items-center gap-3">
      <User className="h-7 w-7 text-orange-500" />

      <h2 className="text-2xl font-bold">
        Sender Information
      </h2>
    </div>

    <div className="space-y-5">

      <div>
        <p className="text-sm text-slate-500">
          Full Name
        </p>

        <h3 className="font-semibold">
          {shipment.senderName}
        </h3>
      </div>

      <div>
        <p className="text-sm text-slate-500">
          Email
        </p>

        <h3>{shipment.senderEmail}</h3>
      </div>

      <div>
        <p className="text-sm text-slate-500">
          Phone
        </p>

        <h3>{shipment.senderPhone || "-"}</h3>
      </div>

      <div>
        <p className="text-sm text-slate-500">
          Address
        </p>

        <h3>{shipment.senderAddress || "-"}</h3>
      </div>

    </div>

  </section>

  <section className="rounded-3xl bg-white p-8 shadow-lg">

    <div className="mb-8 flex items-center gap-3">
      <User className="h-7 w-7 text-orange-500" />

      <h2 className="text-2xl font-bold">
        Receiver Information
      </h2>
    </div>

    <div className="space-y-5">

      <div>
        <p className="text-sm text-slate-500">
          Full Name
        </p>

        <h3 className="font-semibold">
          {shipment.receiverName}
        </h3>
      </div>

      <div>
        <p className="text-sm text-slate-500">
          Email
        </p>

        <h3>{shipment.receiverEmail}</h3>
      </div>

      <div>
        <p className="text-sm text-slate-500">
          Phone
        </p>

        <h3>{shipment.receiverPhone || "-"}</h3>
      </div>

      <div>
        <p className="text-sm text-slate-500">
          Address
        </p>

        <h3>{shipment.receiverAddress || "-"}</h3>
      </div>

    </div>

  </section>

</div>

      <TrackingTimeline
        currentStatus={shipment.status}
        events={shipment.trackingEvents}
      />
    </div>
  );
}