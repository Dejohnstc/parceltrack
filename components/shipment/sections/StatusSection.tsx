"use client";

import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import { ShipmentStatus } from "@prisma/client";

import { ShipmentInput } from "@/lib/validations/shipment";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface StatusSectionProps {
  form: UseFormReturn<ShipmentInput>;
  isPending: boolean;
  mode: "create" | "edit";
}

const statuses: ShipmentStatus[] = [
  "PENDING",
  "CREATED",
  "PICKED_UP",
  "ORIGIN_FACILITY",
  "IN_TRANSIT",
  "ARRIVED_HUB",
  "CUSTOMS",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "DELAYED",
  "FAILED",
  "RETURNED",
];

export default function StatusSection({
  form,
  isPending,
  mode,
}: StatusSectionProps) {
  const router = useRouter();

  // CREATE MODE
  if (mode === "create") {
    return (
      <div className="mt-8 flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isPending}
        >
          {isPending
            ? "Creating Shipment..."
            : "Create Shipment"}
        </Button>
      </div>
    );
  }

  // EDIT MODE
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">
          Shipment Status
        </h2>

        <p className="mt-1 text-slate-500">
          Update the shipment progress and tracking
          information.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Status */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Shipment Status
          </label>

          <select
            {...form.register("status")}
            className="w-full rounded-xl border bg-white p-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          >
            {statuses.map((status) => (
              <option
                key={status}
                value={status}
              >
                {status.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </div>

        {/* Expected Delivery */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Expected Delivery
          </label>

          <Input
            type="date"
            {...form.register("expectedDelivery", {
              valueAsDate: true,
            })}
            className="focus:ring-2 focus:ring-orange-200"
          />
        </div>

        {/* Current Location */}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Current Location
          </label>

          <Input
            {...form.register("currentLocation")}
            placeholder="Current shipment location..."
          />
        </div>

        {/* Tracking Description */}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Tracking Description
          </label>

          <textarea
            {...form.register("description")}
            rows={4}
            placeholder="Describe the latest shipment update..."
            className="w-full rounded-xl border p-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          />
        </div>

      </div>

      <div className="mt-8 flex justify-end gap-4">

        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isPending}
        >
          {isPending
            ? "Updating Shipment..."
            : "Update Shipment"}
        </Button>

      </div>
    </section>
  );
}