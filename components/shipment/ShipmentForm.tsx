"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shipment, ShipmentStatus } from "@prisma/client";

import {
  shipmentSchema,
  ShipmentInput,
} from "@/lib/validations/shipment";

import { createShipmentAction } from "@/actions/shipment/create-shipment";
import { updateShipmentAction } from "@/actions/shipment/update-shipment";

import SenderSection from "./sections/SenderSection";
import ReceiverSection from "./sections/ReceiverSection";
import ShipmentSection from "./sections/ShipmentSection";
import PackageSection from "./sections/PackageSection";
import StatusSection from "./sections/StatusSection";

interface ShipmentFormProps {
  shipment?: Shipment;
  mode?: "create" | "edit";
}

export default function ShipmentForm({
  shipment,
  mode = "create",
}: ShipmentFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ShipmentInput>({
    resolver: zodResolver(shipmentSchema),

    defaultValues: {
      senderName: shipment?.senderName ?? "",
      senderEmail: shipment?.senderEmail ?? "",
      senderPhone: shipment?.senderPhone ?? "",
      senderAddress: shipment?.senderAddress ?? "",

      receiverName: shipment?.receiverName ?? "",
      receiverEmail: shipment?.receiverEmail ?? "",
      receiverPhone: shipment?.receiverPhone ?? "",
      receiverAddress: shipment?.receiverAddress ?? "",

      origin: shipment?.origin ?? "",
      destination: shipment?.destination ?? "",

      weight: shipment?.weight ?? 0,
      service: shipment?.service ?? "Express",

      packageType: shipment?.packageType ?? "",
      packageDescription:
        shipment?.packageDescription ?? "",

      pieces: shipment?.pieces ?? 1,

      expectedDelivery:
        shipment?.expectedDelivery ?? undefined,

      status:
        shipment?.status ??
        ShipmentStatus.PENDING,
    },
  });

  async function onSubmit(values: ShipmentInput) {
    startTransition(async () => {
      if (mode === "edit" && shipment) {
        await updateShipmentAction(
          shipment.id,
          values
        );
      } else {
        await createShipmentAction(values);
      }
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8"
    >
      <SenderSection form={form} />

      <ReceiverSection form={form} />

      <ShipmentSection form={form} />

      <PackageSection form={form} />

      <StatusSection
        form={form}
        isPending={isPending}
        mode={mode}
      />
    </form>
  );
}