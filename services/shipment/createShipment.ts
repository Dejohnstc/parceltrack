import { prisma } from "@/lib/prisma";
import { ShipmentStatus } from "@prisma/client";
import { sendShipmentCreatedEmail } from "@/services/email/sendShipmentCreatedEmail";
import { requireAdmin } from "@/lib/auth/require-admin";
import { generateTrackingNumber } from "@/lib/tracking";
import { shipmentSchema } from "@/lib/validations/shipment";

export async function createShipment(data: unknown) {
  // Protect this action
  await requireAdmin();

  const parsed = shipmentSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: parsed.error.flatten(),
    };
  }

  const {
    senderName,
    senderEmail,
    senderPhone,
    senderAddress,

    receiverName,
    receiverEmail,
    receiverPhone,
    receiverAddress,

    origin,
    destination,

    weight,
    service,
    packageType,
    packageDescription,
    pieces,

    expectedDelivery,
  } = parsed.data;

  // Link shipment to customer if they already have an account
  const customer = await prisma.user.findUnique({
    where: {
      email: receiverEmail,
    },
    select: {
      id: true,
    },
  });

  // Generate a unique tracking number
  let trackingNumber = generateTrackingNumber();

  while (
    await prisma.shipment.findUnique({
      where: {
        trackingNumber,
      },
    })
  ) {
    trackingNumber = generateTrackingNumber();
  }

  const shipment = await prisma.$transaction(async (tx) => {
    const createdShipment = await tx.shipment.create({
      data: {
        trackingNumber,

        customerId: customer?.id,

        // Sender
        senderName,
        senderEmail,
        senderPhone,
        senderAddress,

        // Receiver
        receiverName,
        receiverEmail,
        receiverPhone,
        receiverAddress,

        // Route
        origin,
        destination,
        currentLocation: origin,

        // Package
        weight,
        service,
        packageType,
        packageDescription,
        pieces,

        // Delivery
        expectedDelivery,

        // Status
        status: ShipmentStatus.PENDING,
      },
    });

    await tx.trackingEvent.create({
      data: {
        shipmentId: createdShipment.id,
        status: ShipmentStatus.PENDING,
        location: origin,
        description: "Shipment created successfully.",
      },
    });

    await tx.activityLog.create({
      data: {
        shipmentId: createdShipment.id,
        action: "SHIPMENT_CREATED",
        description: `Shipment ${trackingNumber} was created.`,
      },
    });

    return createdShipment;
  });

 await sendShipmentCreatedEmail({
  email: receiverEmail,
  name: receiverName,
  trackingNumber: shipment.trackingNumber,
  origin,
  destination,
  expectedDelivery,
});

  return {
    success: true,
    message: "Shipment created successfully.",
    shipment,
  };
}