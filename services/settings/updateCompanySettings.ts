import { prisma } from "@/lib/prisma";

import { companySettingsSchema } from "@/lib/validations/company-settings";

export async function updateCompanySettings(
  data: unknown
) {
  const parsed =
    companySettingsSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten(),
    };
  }

  let settings =
    await prisma.companySettings.findFirst();

  if (!settings) {
    settings =
      await prisma.companySettings.create({
        data: parsed.data,
      });
  } else {
    settings =
      await prisma.companySettings.update({
        where: {
          id: settings.id,
        },

        data: parsed.data,
      });
  }

  return {
    success: true,
    settings,
  };
}