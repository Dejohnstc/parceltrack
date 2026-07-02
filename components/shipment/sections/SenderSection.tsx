import { UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { ShipmentInput } from "@/lib/validations/shipment";

interface SenderSectionProps {
  form: UseFormReturn<ShipmentInput>;
}

export default function SenderSection({
  form,
}: SenderSectionProps) {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold">
          Sender Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Enter the sender&apos;s contact information.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <Input
          {...form.register("senderName")}
          placeholder="Full Name"
        />

        <Input
          type="email"
          {...form.register("senderEmail")}
          placeholder="Email Address"
        />

        <Input
          {...form.register("senderPhone")}
          placeholder="Phone Number"
        />

        <Input
          {...form.register("senderAddress")}
          placeholder="Street Address"
          className="md:col-span-2"
        />

      </div>
    </section>
  );
}