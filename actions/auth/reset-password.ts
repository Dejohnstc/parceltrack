"use server";

import { resetPassword } from "@/services/auth.service";

export async function resetPasswordAction(
  token: string,
  data: unknown
) {
  return await resetPassword(token, data);
}