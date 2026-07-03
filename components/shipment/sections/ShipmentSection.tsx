import { UseFormReturn } from "react-hook-form";
import {
  MapPin,
  Flag,
  Calendar,
} from "lucide-react";

import { ShipmentInput } from "@/lib/validations/shipment";
import { Input } from "@/components/ui/input";

interface ShipmentSectionProps {
  form: UseFormReturn<ShipmentInput>;
}

export default function ShipmentSection({
  form,
}: ShipmentSectionProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl md:p-8">
      {/* Header */}

      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
          <MapPin className="h-7 w-7 text-green-600" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Shipment Route
          </h2>

          <p className="mt-1 text-slate-500">
            Define the shipment origin, destination and
            expected delivery schedule.
          </p>
        </div>
      </div>

      {/* Route */}

      <div className="grid gap-6 md:grid-cols-2">

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <MapPin className="h-4 w-4 text-green-600" />
            Origin
          </label>

          <Input
            {...form.register("origin")}
            placeholder="New York, USA"
            className="h-12 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Flag className="h-4 w-4 text-red-500" />
            Destination
          </label>

          <Input
            {...form.register("destination")}
            placeholder="London, United Kingdom"
            className="h-12 rounded-xl"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Calendar className="h-4 w-4 text-orange-500" />
            Expected Delivery Date
          </label>

          <Input
            type="date"
            {...form.register("expectedDelivery", {
              valueAsDate: true,
            })}
            className="h-12 rounded-xl"
          />
        </div>

      </div>

      {/* Route Preview */}

      <div className="mt-8 rounded-2xl border bg-slate-50 p-6">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">

          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Origin
            </p>

            <p className="mt-1 font-semibold">
              {form.watch("origin") || "Not specified"}
            </p>
          </div>

          <div className="hidden h-1 w-20 rounded-full bg-orange-500 md:block" />

          <div className="rounded-full bg-orange-500 p-3 text-white">
            <MapPin className="h-5 w-5" />
          </div>

          <div className="hidden h-1 w-20 rounded-full bg-orange-500 md:block" />

          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Destination
            </p>

            <p className="mt-1 font-semibold">
              {form.watch("destination") ||
                "Not specified"}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}