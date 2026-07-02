import { NextResponse } from "next/server";

import { loginUser } from "@/services/auth.service";
import { setSessionCookie } from "@/lib/cookies";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await loginUser(body);

    if (!result.success) {
      return NextResponse.json(result, {
        status: 401,
      });
    }

    if (!result.success || !result.token) {
  return NextResponse.json(result, { status: 401 });
}

await setSessionCookie(result.token);

    return NextResponse.json({
      success: true,
      user: result.user,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}