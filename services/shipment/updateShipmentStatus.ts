import { prisma } from "@/lib/prisma";
import { ShipmentStatus } from "@prisma/client";

interface UpdateShipmentStatusInput {
  shipmentId: string;
  status: ShipmentStatus;
  location: string;
  description: string;
}

export async function updateShipmentStatus({
  shipmentId,
  status,
  location,
  description,
}: UpdateShipmentStatusInput) {
  const shipment = await prisma.shipment.update({
    where: {
      id: shipmentId,
    },
    data: {
      status,
      currentLocation: location,
    },
  });

  await prisma.trackingEvent.create({
    data: {
      shipmentId,
      status,
      location,
      description,
    },
  });

  return shipment;
}