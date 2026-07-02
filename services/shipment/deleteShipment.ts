import { prisma } from "@/lib/prisma";

import { requireAdmin } from "@/lib/auth/require-admin";

export async function deleteShipment(id: string) {
  // Protect this action
  await requireAdmin();

  const shipment = await prisma.shipment.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      trackingNumber: true,
    },
  });

  if (!shipment) {
    return {
      success: false,
      message: "Shipment not found.",
    };
  }

  await prisma.$transaction(async (tx) => {
    // Delete tracking history
    await tx.trackingEvent.deleteMany({
      where: {
        shipmentId: id,
      },
    });

    // Delete activity logs
    await tx.activityLog.deleteMany({
      where: {
        shipmentId: id,
      },
    });

    // Delete shipment
    await tx.shipment.delete({
      where: {
        id,
      },
    });
  });

  return {
    success: true,
    message: `Shipment ${shipment.trackingNumber} deleted successfully.`,
  };
}