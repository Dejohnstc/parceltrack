import { z } from "zod";

export const companySettingsSchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name is required."),

  supportEmail: z
    .string()
    .email("Enter a valid email address."),

  supportPhone: z
    .string()
    .min(5, "Support phone is required."),

  primaryColor: z
    .string()
    .min(4)
    .max(20),

  logo: z.string().optional(),
});

export type CompanySettingsInput =
  z.infer<typeof companySettingsSchema>;