import { NextResponse } from "next/server";
import { createShipment } from "@/services/shipment.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await createShipment(body);

    if (!result.success) {
      return NextResponse.json(result, {
        status: 400,
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}