import { UseFormReturn } from "react-hook-form";

import { ShipmentInput } from "@/lib/validations/shipment";
import { Input } from "@/components/ui/input";

interface ShipmentSectionProps {
  form: UseFormReturn<ShipmentInput>;
}

export default function ShipmentSection({
  form,
}: ShipmentSectionProps) {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-xl font-bold">
          Shipment Route
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Enter the shipment origin, destination and expected delivery date.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <Input
          {...form.register("origin")}
          placeholder="Origin"
        />

        <Input
          {...form.register("destination")}
          placeholder="Destination"
        />

        <Input
          type="date"
          {...form.register("expectedDelivery", {
            valueAsDate: true,
          })}
          className="md:col-span-2"
        />

      </div>

    </section>
  );
}