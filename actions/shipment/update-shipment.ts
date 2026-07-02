"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { updateShipment } from "@/services/shipment/updateShipment";

export async function updateShipmentAction(
  id: string,
  data: unknown
) {
  const result = await updateShipment(id, data);

  if (!result.success) {
    return result;
  }

  // Refresh all shipment-related pages
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/shipments");
  revalidatePath(`/dashboard/shipments/${id}`);

  redirect(`/dashboard/shipments/${id}`);
}