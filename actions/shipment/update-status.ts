"use server";

import { ShipmentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { updateShipment } from "@/services/shipment/updateShipment";

export async function updateShipmentStatusAction(
  shipmentId: string,
  status: ShipmentStatus,
  location: string,
  description: string
) {
  

 

  const result = await updateShipment(shipmentId, {
    status,
    currentLocation: location,
    description,
  });

 

  if (!result.success) {
    return result;
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/shipments");
  revalidatePath(`/dashboard/shipments/${shipmentId}`);

  return {
    success: true,
  };
}