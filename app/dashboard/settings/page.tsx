import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/prisma";

import CompanySettingsForm from "@/components/settings/CompanySettingsForm";

export default async function SettingsPage() {
  await requireAdmin();

  let settings =
    await prisma.companySettings.findFirst();

  if (!settings) {
    settings =
      await prisma.companySettings.create({
        data: {
          companyName: "ParcelTrack",
          supportEmail:
            "support@parceltrack.com",
          supportPhone:
            "+1 (000) 000-0000",
          primaryColor: "#f97316",
          logo: "",
        },
      });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Company Settings
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your company information and
          branding.
        </p>
      </div>

      <CompanySettingsForm
        settings={settings}
      />
    </div>
  );
}