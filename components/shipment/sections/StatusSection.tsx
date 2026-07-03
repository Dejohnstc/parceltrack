"use client";

import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import {
  ShipmentStatus,
} from "@prisma/client";

import {
  Save,
  X,
  Truck,
  Calendar,
  MapPin,
  FileText,
} from "lucide-react";

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

  /* ---------------- CREATE ---------------- */

  if (mode === "create") {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Ready to Create Shipment
            </h2>

            <p className="mt-2 text-slate-500">
              Review the shipment information before
              generating the tracking number.
            </p>

          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="h-12 rounded-xl"
            >
              <X className="mr-2 h-5 w-5" />
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending}
              className="h-12 rounded-xl bg-orange-500 px-8 hover:bg-orange-600"
            >
              <Save className="mr-2 h-5 w-5" />

              {isPending
                ? "Creating Shipment..."
                : "Create Shipment"}
            </Button>

          </div>

        </div>

      </section>
    );
  }

  /* ---------------- EDIT ---------------- */

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">

      <div className="mb-8 flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">

          <Truck className="h-7 w-7 text-orange-500" />

        </div>

        <div>

          <h2 className="text-2xl font-bold">
            Shipment Status
          </h2>

          <p className="mt-1 text-slate-500">
            Update shipment progress and tracking
            information.
          </p>

        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Status */}

        <div className="space-y-2">

          <label className="flex items-center gap-2 text-sm font-semibold">

            <Truck className="h-4 w-4 text-orange-500" />

            Shipment Status

          </label>

          <select
            {...form.register("status")}
            className="h-12 w-full rounded-xl border bg-white px-4 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
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

        {/* Delivery */}

        <div className="space-y-2">

          <label className="flex items-center gap-2 text-sm font-semibold">

            <Calendar className="h-4 w-4 text-orange-500" />

            Expected Delivery

          </label>

          <Input
            type="date"
            className="h-12 rounded-xl"
            {...form.register("expectedDelivery", {
              valueAsDate: true,
            })}
          />

        </div>

        {/* Current Location */}

        <div className="space-y-2 md:col-span-2">

          <label className="flex items-center gap-2 text-sm font-semibold">

            <MapPin className="h-4 w-4 text-orange-500" />

            Current Location

          </label>

          <Input
            className="h-12 rounded-xl"
            placeholder="Current shipment location..."
            {...form.register("currentLocation")}
          />

        </div>

        {/* Description */}

        <div className="space-y-2 md:col-span-2">

          <label className="flex items-center gap-2 text-sm font-semibold">

            <FileText className="h-4 w-4 text-orange-500" />

            Tracking Description

          </label>

          <textarea
            rows={5}
            placeholder="Describe the latest shipment update..."
            className="w-full rounded-xl border p-4 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            {...form.register("description")}
          />

        </div>

      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-end">

        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="h-12 rounded-xl"
        >
          <X className="mr-2 h-5 w-5" />
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isPending}
          className="h-12 rounded-xl bg-orange-500 px-8 hover:bg-orange-600"
        >
          <Save className="mr-2 h-5 w-5" />

          {isPending
            ? "Updating Shipment..."
            : "Update Shipment"}
        </Button>

      </div>

    </section>
  );
}