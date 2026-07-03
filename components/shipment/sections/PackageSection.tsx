import { UseFormReturn } from "react-hook-form";
import {
  Package,
  Scale,
  Boxes,
  Truck,
  FileText,
} from "lucide-react";

import { ShipmentInput } from "@/lib/validations/shipment";
import { Input } from "@/components/ui/input";

interface PackageSectionProps {
  form: UseFormReturn<ShipmentInput>;
}

export default function PackageSection({
  form,
}: PackageSectionProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl md:p-8">
      {/* Header */}

      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100">
          <Package className="h-7 w-7 text-purple-600" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Package Information
          </h2>

          <p className="mt-1 text-slate-500">
            Enter the shipment specifications and package details.
          </p>
        </div>
      </div>

      {/* Form */}

      <div className="grid gap-6 md:grid-cols-2">

        {/* Weight */}

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Scale className="h-4 w-4 text-purple-600" />
            Weight (kg)
          </label>

          <Input
            type="number"
            step="0.1"
            min="0"
            placeholder="2.5"
            className="h-12 rounded-xl"
            {...form.register("weight", {
              valueAsNumber: true,
            })}
          />
        </div>

        {/* Pieces */}

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Boxes className="h-4 w-4 text-purple-600" />
            Number of Pieces
          </label>

          <Input
            type="number"
            min="1"
            placeholder="1"
            className="h-12 rounded-xl"
            {...form.register("pieces", {
              valueAsNumber: true,
            })}
          />
        </div>

        {/* Service */}

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Truck className="h-4 w-4 text-purple-600" />
            Shipping Service
          </label>

          <Input
            placeholder="Express, Standard, Overnight"
            className="h-12 rounded-xl"
            {...form.register("service")}
          />
        </div>

        {/* Package Type */}

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Package className="h-4 w-4 text-purple-600" />
            Package Type
          </label>

          <Input
            placeholder="Box, Envelope, Pallet..."
            className="h-12 rounded-xl"
            {...form.register("packageType")}
          />
        </div>

        {/* Description */}

        <div className="space-y-2 md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <FileText className="h-4 w-4 text-purple-600" />
            Package Description
          </label>

          <Input
            placeholder="Describe the shipment contents..."
            className="h-12 rounded-xl"
            {...form.register("packageDescription")}
          />
        </div>

      </div>

      {/* Summary */}

      <div className="mt-8 rounded-2xl border bg-slate-50 p-6">
        <h3 className="mb-5 font-semibold text-slate-900">
          Shipment Summary
        </h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Weight
            </p>

            <p className="mt-1 font-semibold">
  {String(form.watch("weight") ?? "-")}
</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Pieces
            </p>

            <p className="mt-1 text-lg font-bold">
  {Number(form.watch("pieces") ?? 0)} pieces
</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Service
            </p>

            <p className="mt-1 font-semibold">
              {form.watch("service") || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Type
            </p>

            <p className="mt-1 font-semibold">
              {form.watch("packageType") || "-"}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}