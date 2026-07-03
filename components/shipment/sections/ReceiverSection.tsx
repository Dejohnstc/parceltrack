import { UseFormReturn } from "react-hook-form";
import {
  User,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import { ShipmentInput } from "@/lib/validations/shipment";
import { Input } from "@/components/ui/input";

interface ReceiverSectionProps {
  form: UseFormReturn<ShipmentInput>;
}

export default function ReceiverSection({
  form,
}: ReceiverSectionProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl md:p-8">
      {/* Header */}

      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
          <User className="h-7 w-7 text-blue-600" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Receiver Information
          </h2>

          <p className="mt-1 text-slate-500">
            Enter the recipient&apos;s contact details.
          </p>
        </div>
      </div>

      {/* Form */}

      <div className="grid gap-6 md:grid-cols-2">

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <User className="h-4 w-4 text-blue-600" />
            Full Name
          </label>

          <Input
            {...form.register("receiverName")}
            placeholder="Jane Smith"
            className="h-12 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Mail className="h-4 w-4 text-blue-600" />
            Email Address
          </label>

          <Input
            type="email"
            {...form.register("receiverEmail")}
            placeholder="jane@example.com"
            className="h-12 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Phone className="h-4 w-4 text-blue-600" />
            Phone Number
          </label>

          <Input
            {...form.register("receiverPhone")}
            placeholder="+1 555 987 6543"
            className="h-12 rounded-xl"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <MapPin className="h-4 w-4 text-blue-600" />
            Street Address
          </label>

          <Input
            {...form.register("receiverAddress")}
            placeholder="456 Market Street, City, Country"
            className="h-12 rounded-xl"
          />
        </div>

      </div>
    </section>
  );
}