import { prisma } from "@/lib/prisma";
import { generateTrackingNumber } from "@/lib/tracking";
import { shipmentSchema } from "@/lib/validations/shipment";

export async function createShipment(data: unknown) {
  const parsed = shipmentSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten(),
    };
  }

  const shipment = await prisma.shipment.create({
    data: {
      ...parsed.data,
      trackingNumber: generateTrackingNumber(),
      currentLocation: parsed.data.origin,
    },
  });

  return {
    success: true,
    shipment,
  };
}