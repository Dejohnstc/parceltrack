"use client";

import { useState, useTransition } from "react";
import { ShipmentStatus } from "@prisma/client";
import { toast } from "sonner";

import { updateShipmentStatusAction } from "@/actions/shipment/update-status";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UpdateStatusCardProps {
  shipmentId: string;
  currentStatus: ShipmentStatus;
  currentLocation: string;
}

export default function UpdateStatusCard({
  shipmentId,
  currentStatus,
  currentLocation,
}: UpdateStatusCardProps) {
  const [status, setStatus] = useState(currentStatus);
  const [location, setLocation] = useState(currentLocation);
  const [description, setDescription] = useState("");

  const [isPending, startTransition] = useTransition();
const statusDescriptions: Record<ShipmentStatus, string> = {
  PENDING: "Shipment has been created and is awaiting processing.",
  CREATED: "Shipment has been successfully created.",
  PICKED_UP: "Shipment has been picked up from the sender.",
  ORIGIN_FACILITY: "Shipment has arrived at the origin facility.",
  IN_TRANSIT: "Shipment is currently in transit to its destination.",
  ARRIVED_HUB: "Shipment has arrived at the regional distribution hub.",
  CUSTOMS: "Shipment is currently undergoing customs clearance.",
  OUT_FOR_DELIVERY: "Shipment is out for delivery.",
  DELIVERED: "Shipment has been delivered successfully.",
  DELAYED: "Shipment has been delayed due to operational reasons.",
  FAILED: "Delivery attempt was unsuccessful.",
  RETURNED: "Shipment is being returned to the sender.",
};

  function handleUpdate() {
    startTransition(async () => {
     const result = await updateShipmentStatusAction(
  shipmentId,
  status,
  location,
  description.trim() ||
    `Shipment status updated to ${status.replaceAll("_", " ")}.`
);

   if (!result.success) {
  const message =
    "errors" in result &&
    result.errors?.fieldErrors?.description?.[0]
      ? result.errors.fieldErrors.description[0]
      : "message" in result
      ? result.message
      : "Failed to update shipment.";

  toast.error(message);
  return;
}

      toast.success("Shipment updated successfully.");
    });
  }

  return (
    <div className="space-y-5 rounded-xl border bg-white p-6">
      <h2 className="text-xl font-semibold">
        Update Shipment Status
      </h2>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Status
        </label>

        <select
          className="w-full rounded-md border px-3 py-2"
          value={status}
          onChange={(e) => {
  const newStatus = e.target.value as ShipmentStatus;

  setStatus(newStatus);

  if (!description.trim()) {
    setDescription(statusDescriptions[newStatus]);
  }
}}
        >
          {Object.values(ShipmentStatus).map((item) => (
            <option
              key={item}
              value={item}
            >
              {item.replaceAll("_", " ")}
            </option>
          ))}
        </select>
      </div>

      <Input
        placeholder="Current Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <Input
  placeholder="Tracking update..."
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>

<p className="text-xs text-slate-500">
  This message will appear in the customer&apos;s tracking timeline and email.
</p>

      <Button
        onClick={handleUpdate}
        disabled={isPending}
      >
        {isPending ? "Updating..." : "Update Status"}
      </Button>
    </div>
  );
}