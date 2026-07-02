import { UseFormReturn } from "react-hook-form";

import { ShipmentInput } from "@/lib/validations/shipment";
import { Input } from "@/components/ui/input";

interface PackageSectionProps {
  form: UseFormReturn<ShipmentInput>;
}

export default function PackageSection({
  form,
}: PackageSectionProps) {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-xl font-bold">
          Package Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Enter details about the shipment.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <Input
          {...form.register("weight", {
            valueAsNumber: true,
          })}
          type="number"
          step="0.1"
          min="0"
          placeholder="Weight (kg)"
        />

        <Input
          {...form.register("pieces", {
            valueAsNumber: true,
          })}
          type="number"
          min="1"
          placeholder="Number of Pieces"
        />

        <Input
          {...form.register("service")}
          placeholder="Service (Express, Standard)"
        />

        <Input
          {...form.register("packageType")}
          placeholder="Package Type"
        />

        <Input
          {...form.register("packageDescription")}
          placeholder="Package Description"
          className="md:col-span-2"
        />

      </div>

    </section>
  );
}