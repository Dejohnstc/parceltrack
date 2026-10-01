import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PaymentMethod, ShipmentPaymentStatus } from "@prisma/client";

const allowedCrypto: Record<string, string> = {
  BTC: "Bitcoin",
  USDT_TRC20: "TRC20",
  USDT_ERC20: "ERC20",
  ETH: "Ethereum",
  LTC: "Litecoin",
  SOL: "Solana",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      paymentId,
      paymentMethod,
      cryptoCurrency,
      cryptoNetwork,
    } = body;

    // --------------------------------------------------
    // Basic validation
    // --------------------------------------------------

    if (!paymentId) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment ID is required.",
        },
        { status: 400 }
      );
    }

    if (paymentMethod !== "CRYPTO") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment method.",
        },
        { status: 400 }
      );
    }

    if (
      typeof cryptoCurrency !== "string" ||
      !allowedCrypto[cryptoCurrency]
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid cryptocurrency selected.",
        },
        { status: 400 }
      );
    }

    const expectedNetwork = allowedCrypto[cryptoCurrency];

    if (cryptoNetwork !== expectedNetwork) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid cryptocurrency network.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Find payment
    // --------------------------------------------------

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
          message: "Payment record not found.",
        },
        { status: 404 }
      );
    }

    // --------------------------------------------------
    // Prevent duplicate submissions
    // --------------------------------------------------

    if (payment.status === ShipmentPaymentStatus.PAID) {
      return NextResponse.json(
        {
          success: false,
          message: "This shipment fee has already been paid.",
        },
        { status: 409 }
      );
    }

    if (payment.status === ShipmentPaymentStatus.PENDING) {
      return NextResponse.json({
        success: true,
        message:
          "Your payment has already been submitted and is awaiting verification.",
        payment: {
          id: payment.id,
          status: payment.status,
        },
      });
    }

    // --------------------------------------------------
    // Only unpaid/rejected payments can be submitted
    // --------------------------------------------------

    if (
      payment.status !== ShipmentPaymentStatus.UNPAID &&
      payment.status !== ShipmentPaymentStatus.REJECTED
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This payment cannot currently be submitted.",
        },
        { status: 409 }
      );
    }

    // --------------------------------------------------
    // Record crypto payment submission
    // --------------------------------------------------

    const submittedAt = new Date();

    const updatedPayment = await prisma.$transaction(
      async (tx) => {
        const updated = await tx.shipmentPayment.update({
          where: {
            id: payment.id,
          },
          data: {
            status: ShipmentPaymentStatus.PENDING,
            paymentMethod: PaymentMethod.CRYPTO,
            cryptoCurrency,
            cryptoNetwork,
            submittedAt,
            rejectedAt: null,
          },
        });

        await tx.activityLog.create({
          data: {
            shipmentId: payment.shipmentId,
            action: "PAYMENT_SUBMITTED",
            description:
              `Customer submitted a ${cryptoCurrency} (${cryptoNetwork}) ` +
              `shipment fee payment for verification.`,
          },
        });

        return updated;
      }
    );

    return NextResponse.json({
      success: true,
      message:
        "Payment submitted successfully. Your payment is now awaiting verification.",
      payment: {
        id: updatedPayment.id,
        status: updatedPayment.status,
        paymentMethod: updatedPayment.paymentMethod,
        cryptoCurrency: updatedPayment.cryptoCurrency,
        cryptoNetwork: updatedPayment.cryptoNetwork,
        submittedAt: updatedPayment.submittedAt,
      },
    });
  } catch (error) {
    console.error("Shipment payment submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while submitting your payment.",
      },
      { status: 500 }
    );
  }
}