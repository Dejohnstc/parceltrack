import { UseFormReturn } from "react-hook-form";
import {
  Package,
  Scale,
  Boxes,
  Truck,
  FileText,
  DollarSign,
} from "lucide-react";

import { ShipmentInput } from "@/lib/validations/shipment";
import { Input } from "@/components/ui/input";

interface PackageSectionProps {
  form: UseFormReturn<ShipmentInput>;
}

export default function PackageSection({
  form,
}: PackageSectionProps) {
  const shippingCost = form.watch("shippingCost");
  const currency = form.watch("currency");

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

          {form.formState.errors.weight && (
            <p className="text-sm text-red-500">
              {form.formState.errors.weight.message}
            </p>
          )}
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

          {form.formState.errors.pieces && (
            <p className="text-sm text-red-500">
              {form.formState.errors.pieces.message}
            </p>
          )}
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

          {form.formState.errors.service && (
            <p className="text-sm text-red-500">
              {form.formState.errors.service.message}
            </p>
          )}
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

        {/* Shipping Cost */}

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <DollarSign className="h-4 w-4 text-purple-600" />
            Shipping Cost
          </label>

          <Input
            type="number"
            step="0.01"
            min="0.01"
            placeholder="250.00"
            className="h-12 rounded-xl"
            {...form.register("shippingCost", {
              valueAsNumber: true,
            })}
          />

          {form.formState.errors.shippingCost && (
            <p className="text-sm text-red-500">
              {form.formState.errors.shippingCost.message}
            </p>
          )}
        </div>

        {/* Currency */}

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Currency
          </label>

          <select
            className="h-12 w-full rounded-xl border border-input bg-background px-3 text-sm"
            {...form.register("currency")}
          >
            <option value="USD">USD — US Dollar</option>
            <option value="EUR">EUR — Euro</option>
            <option value="GBP">GBP — British Pound</option>
            <option value="CAD">CAD — Canadian Dollar</option>
            <option value="AUD">AUD — Australian Dollar</option>
          </select>
        </div>
      </div>

      {/* Summary */}

      <div className="mt-8 rounded-2xl border bg-slate-50 p-6">
        <h3 className="mb-5 font-semibold text-slate-900">
          Shipment Summary
        </h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

          {/* Weight */}

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Weight
            </p>

            <p className="mt-1 font-semibold">
              {String(form.watch("weight") ?? "-")} kg
            </p>
          </div>

          {/* Pieces */}

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Pieces
            </p>

            <p className="mt-1 text-lg font-bold">
              {Number(form.watch("pieces") ?? 0)} pieces
            </p>
          </div>

          {/* Service */}

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Service
            </p>

            <p className="mt-1 font-semibold">
              {form.watch("service") || "-"}
            </p>
          </div>

          {/* Type */}

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Type
            </p>

            <p className="mt-1 font-semibold">
              {form.watch("packageType") || "-"}
            </p>
          </div>

          {/* Shipping Fee */}

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Shipping Fee
            </p>

            <p className="mt-1 text-lg font-bold text-purple-600">
              {currency || "USD"}{" "}
              {Number(shippingCost ?? 0).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Payment Status */}

        <div className="mt-6 flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <div>
            <p className="font-semibold text-amber-900">
              Payment Status
            </p>

            <p className="text-sm text-amber-700">
              This shipment will require payment of the shipping fee.
            </p>
          </div>

          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-700">
            Unpaid
          </span>
        </div>
      </div>
    </section>
  );
}