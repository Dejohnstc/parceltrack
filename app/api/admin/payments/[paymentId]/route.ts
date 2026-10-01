import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ShipmentPaymentStatus } from "@prisma/client";
import { requireAdmin } from "@/lib/auth/require-admin";

interface RouteProps {
  params: Promise<{
    paymentId: string;
  }>;
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteProps
) {
  try {
    const admin = await requireAdmin();

    const { paymentId } = await params;

    const body = await request.json();

    const action = body.action;

    if (action !== "approve" && action !== "reject") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment action.",
        },
        { status: 400 }
      );
    }

    const payment = await prisma.shipmentPayment.findUnique({
      where: {
        id: paymentId,
      },
      include: {
        shipment: true,
      },
    });

    if (!payment) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment not found.",
        },
        { status: 404 }
      );
    }

    if (payment.status !== ShipmentPaymentStatus.PENDING) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Only pending payments can be approved or rejected.",
        },
        { status: 409 }
      );
    }

    if (action === "reject") {
      const rejectionReason =
        typeof body.reason === "string"
          ? body.reason.trim()
          : "";

      const updatedPayment = await prisma.$transaction(
        async (tx) => {
          const updated = await tx.shipmentPayment.update({
            where: {
              id: paymentId,
            },
            data: {
              status: ShipmentPaymentStatus.REJECTED,
              rejectedAt: new Date(),
            },
          });

          await tx.activityLog.create({
            data: {
              shipmentId: payment.shipmentId,
              action: "PAYMENT_REJECTED",
              description:
                `Payment rejected by admin.${
                  rejectionReason
                    ? ` Reason: ${rejectionReason}`
                    : ""
                }`,
            },
          });

          return updated;
        }
      );

      return NextResponse.json({
        success: true,
        message: "Payment rejected successfully.",
        payment: updatedPayment,
      });
    }

    const updatedPayment = await prisma.$transaction(
      async (tx) => {
        const updated = await tx.shipmentPayment.update({
          where: {
            id: paymentId,
          },
          data: {
            status: ShipmentPaymentStatus.PAID,
            approvedAt: new Date(),
            approvedBy: admin.id,
            rejectedAt: null,
          },
        });

        await tx.activityLog.create({
          data: {
            shipmentId: payment.shipmentId,
            action: "PAYMENT_APPROVED",
            description:
              "Shipment fee payment was approved by an administrator.",
          },
        });

        return updated;
      }
    );

    return NextResponse.json({
      success: true,
      message: "Payment approved successfully.",
      payment: updatedPayment,
    });
  } catch (error) {
    console.error("Admin payment action error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to process the payment.",
      },
      { status: 500 }
    );
  }
}