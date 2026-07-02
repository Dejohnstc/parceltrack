"use server";

import { forgotPassword } from "@/services/auth.service";

export async function forgotPasswordAction(
  data: unknown
) {
  return await forgotPassword(data);
}