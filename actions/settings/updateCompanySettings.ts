"use server";

import { revalidatePath } from "next/cache";

import { updateCompanySettings } from "@/services/settings/updateCompanySettings";

export async function updateCompanySettingsAction(
  data: unknown
) {
  const result =
    await updateCompanySettings(data);

  if (result.success) {
    revalidatePath("/dashboard/settings");
  }

  return result;
}