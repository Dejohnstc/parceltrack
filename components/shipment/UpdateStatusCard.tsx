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

  function handleUpdate() {
    startTransition(async () => {
      const result = await updateShipmentStatusAction(
        shipmentId,
        status,
        location,
        description
      );

      if (!result.success) {
  toast.error(
    "message" in result
      ? result.message
      : "Failed to update shipment."
  );
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
          onChange={(e) =>
            setStatus(e.target.value as ShipmentStatus)
          }
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
        placeholder="Update Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button
        onClick={handleUpdate}
        disabled={isPending}
      >
        {isPending ? "Updating..." : "Update Status"}
      </Button>
    </div>
  );
}