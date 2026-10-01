import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  ShipmentPaymentStatus,
} from "@prisma/client";
import { requireAdmin } from "@/lib/auth/require-admin";

const validStatuses: ShipmentPaymentStatus[] = [
  ShipmentPaymentStatus.PENDING,
  ShipmentPaymentStatus.PAID,
  ShipmentPaymentStatus.REJECTED,
  ShipmentPaymentStatus.UNPAID,
];

function isPaymentStatus(
  value: string
): value is ShipmentPaymentStatus {
  return validStatuses.includes(
    value as ShipmentPaymentStatus
  );
}

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const requestedStatus =
      request.nextUrl.searchParams.get("status") ??
      ShipmentPaymentStatus.PENDING;

    if (!isPaymentStatus(requestedStatus)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment status.",
        },
        { status: 400 }
      );
    }

    const payments =
      await prisma.shipmentPayment.findMany({
        where: {
          status: requestedStatus,
        },
        include: {
          shipment: {
            select: {
              id: true,
              trackingNumber: true,
              referenceNumber: true,
              receiverName: true,
              receiverEmail: true,
              origin: true,
              destination: true,
              status: true,
              shippingCost: true,
              currency: true,
            },
          },
        },
        orderBy: {
          submittedAt: "desc",
        },
      });

    return NextResponse.json({
      success: true,
      payments,
    });
  } catch (error) {
    console.error(
      "Admin payments lookup error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load payments.",
      },
      { status: 500 }
    );
  }
}