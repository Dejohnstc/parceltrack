import { prisma } from "@/lib/prisma";

import { requireAdmin } from "@/lib/auth/require-admin";
import { updateShipmentSchema } from "@/lib/validations/update-shipment";
import { sendShipmentStatusEmail } from "@/services/email/sendShipmentStatusEmail";

export async function updateShipment(
  id: string,
  data: unknown
) {
  // Protect this action
  await requireAdmin();

  const parsed = updateShipmentSchema.safeParse(data);
console.log("PARSED:", parsed);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: parsed.error.flatten(),
    };
  }

  const shipment = await prisma.shipment.findUnique({
    
    where: {
      id,
    },
  });

  if (!shipment) {
    return {
      success: false,
      message: "Shipment not found.",
    };
  }
console.log("SHIPMENT FOUND:", shipment);
  const {
    status,
    currentLocation,
    description,
    expectedDelivery,
  } = parsed.data;

  // Nothing changed
  if (
    shipment.status === status &&
    shipment.currentLocation === currentLocation &&
    shipment.expectedDelivery?.getTime() ===
      expectedDelivery?.getTime()
  ) {
    return {
      success: false,
      message: "No changes were made.",
    };
  }

  // Update shipment
  await prisma.shipment.update({
    where: {
      id,
    },
    data: {
      status,
      currentLocation,
      expectedDelivery,
    },
  });

  // Create tracking event
  await prisma.trackingEvent.create({
    data: {
      shipmentId: id,
      status,
      location: currentLocation,
      description,
    },
  });
console.log("TRACKING EVENT CREATED");
  // Activity log
  await prisma.activityLog.create({
    data: {
      shipmentId: id,
      action: "SHIPMENT_UPDATED",
      description: `Shipment updated to ${status.replaceAll(
        "_",
        " "
      )}.`,
    },
  });

  await sendShipmentStatusEmail({
  email: shipment.receiverEmail,
  name: shipment.receiverName,
  trackingNumber: shipment.trackingNumber,
  status: status.replaceAll("_", " "),
  location: currentLocation,
  description,
});

  const updatedShipment = await prisma.shipment.update({
  where: {
    id,
  },
  data: {
    status,
    currentLocation,
    expectedDelivery,
  },
});

console.log("UPDATED SHIPMENT:", updatedShipment);
  return {
    success: true,
    message: "Shipment updated successfully.",
    shipment: updatedShipment,
  };
}