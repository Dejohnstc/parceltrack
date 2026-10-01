import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const trackingNumber =
      request.nextUrl.searchParams
        .get("trackingNumber")
        ?.trim();

    if (!trackingNumber) {
      return NextResponse.json(
        {
          success: false,
          message: "Tracking number is required.",
        },
        { status: 400 }
      );
    }

    /* ---------------------------------------------------------------------- */
    /*                           Find Shipment                                */
    /* ---------------------------------------------------------------------- */

    const shipment = await prisma.shipment.findUnique({
      where: {
        trackingNumber,
      },
      include: {
        payment: true,
      },
    });

    if (!shipment) {
      return NextResponse.json(
        {
          success: false,
          message: "Shipment not found. Please check your tracking number.",
        },
        { status: 404 }
      );
    }

    /* ---------------------------------------------------------------------- */
    /*                    Get Or Create Payment                               */
    /* ---------------------------------------------------------------------- */

    let payment = shipment.payment;

    // Existing shipment may not have a payment record yet.
    if (!payment) {
      if (
        shipment.shippingCost === null ||
        shipment.shippingCost === undefined ||
        shipment.shippingCost <= 0
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "A shipping fee has not been configured for this shipment. Please contact support.",
          },
          { status: 400 }
        );
      }

      try {
        payment = await prisma.shipmentPayment.create({
          data: {
            shipmentId: shipment.id,
            amount: shipment.shippingCost,
            currency: shipment.currency ?? "USD",
            status: "UNPAID",
          },
        });
      } catch (error: unknown) {
        // Another request may have created the payment
        // at the same time because shipmentId is unique.
        if (
          typeof error === "object" &&
          error !== null &&
          "code" in error &&
          error.code === "P2002"
        ) {
          payment = await prisma.shipmentPayment.findUnique({
            where: {
              shipmentId: shipment.id,
            },
          });
        } else {
          throw error;
        }
      }
    }

    if (!payment) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to initialize shipment payment.",
        },
        { status: 500 }
      );
    }

    /* ---------------------------------------------------------------------- */
    /*                           Return Details                               */
    /* ---------------------------------------------------------------------- */

    return NextResponse.json({
      success: true,

      shipment: {
        id: shipment.id,
        trackingNumber: shipment.trackingNumber,
        referenceNumber: shipment.referenceNumber,
        receiverName: shipment.receiverName,
        origin: shipment.origin,
        destination: shipment.destination,
        currentLocation: shipment.currentLocation,
        status: shipment.status,
      },

      payment: {
        id: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        paymentMethod: payment.paymentMethod,
        transactionRef: payment.transactionRef,
        submittedAt: payment.submittedAt,
        approvedAt: payment.approvedAt,
        rejectedAt: payment.rejectedAt,
      },
    });
  } catch (error) {
    console.error(
      "Shipment payment lookup error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while checking the shipment payment.",
      },
      { status: 500 }
    );
  }
}