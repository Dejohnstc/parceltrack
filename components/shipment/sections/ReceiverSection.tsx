import { UseFormReturn } from "react-hook-form";

import { ShipmentInput } from "@/lib/validations/shipment";
import { Input } from "@/components/ui/input";

interface ReceiverSectionProps {
  form: UseFormReturn<ShipmentInput>;
}

export default function ReceiverSection({
  form,
}: ReceiverSectionProps) {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-xl font-bold">
          Receiver Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Enter the recipient&apos;s  contact information.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <Input
          {...form.register("receiverName")}
          placeholder="Full Name"
        />

        <Input
          type="email"
          {...form.register("receiverEmail")}
          placeholder="Email Address"
        />

        <Input
          {...form.register("receiverPhone")}
          placeholder="Phone Number"
        />

        <Input
          {...form.register("receiverAddress")}
          placeholder="Street Address"
          className="md:col-span-2"
        />

      </div>

    </section>
  );
}