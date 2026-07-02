import { NextResponse } from "next/server";
import { registerUser } from "@/services/auth.service";
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await registerUser(body);

    if (!result.success) {
      return NextResponse.json(result, {
        status: 400,
      });
    }

    return NextResponse.json({
      success: true,
      message:
        "Registration successful. Please verify your email.",
    });
  } catch (error) {
  console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}