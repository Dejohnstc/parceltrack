"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createShipment } from "@/services/shipment/createShipment";

export async function createShipmentAction(data: unknown) {
  const result = await createShipment(data);

  if (!result.success || !result.shipment) {
    return result;
  }

  revalidatePath("/dashboard/shipments");

  redirect(`/dashboard/shipments/${result.shipment.id}`);
}