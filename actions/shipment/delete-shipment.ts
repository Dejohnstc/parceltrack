"use server";

import { revalidatePath } from "next/cache";

import { deleteShipment } from "@/services/shipment/deleteShipment";

export async function deleteShipmentAction(id: string) {
  try {
    const result = await deleteShipment(id);

    if (!result.success) {
      return result;
    }

    // Refresh dashboard data
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/shipments");

    return {
      success: true,
      message: result.message,
    };
  } catch (error) {
    console.error("Delete Shipment Error:", error);

    return {
      success: false,
      message: "An unexpected error occurred while deleting the shipment.",
    };
  }
}