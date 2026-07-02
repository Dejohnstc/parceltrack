"use server";

import { ShipmentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { updateShipmentStatus } from "@/services/shipment/updateShipmentStatus";

export async function updateShipmentStatusAction(
  shipmentId: string,
  status: ShipmentStatus,
  location: string,
  description: string
) {
  try {
    await updateShipmentStatus({
      shipmentId,
      status,
      location,
      description,
    });

    revalidatePath(`/dashboard/shipments/${shipmentId}`);

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
    };
  }
}