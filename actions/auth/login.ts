"use server";

import { redirect } from "next/navigation";

import { loginUser } from "@/services/auth.service";
import { setSessionCookie } from "@/lib/cookies";

export async function loginAction(data: unknown) {
  const result = await loginUser(data);

  if (!result.success || !result.token || !result.user) {
    return result;
  }

  await setSessionCookie(result.token);

  if (
    result.user.role === "ADMIN" ||
    result.user.role === "STAFF"
  ) {
    redirect("/dashboard");
  }

  redirect("/account");
}