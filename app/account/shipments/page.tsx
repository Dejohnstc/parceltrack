import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

import ShipmentsContent from "@/components/account/shipments/ShipmentContent";

export default async function CustomerShipmentsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "CUSTOMER") {
    redirect("/dashboard");
  }

  const shipments = await prisma.shipment.findMany({
    where: {
      customerId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      {/* Hero */}

      <div className="rounded-3xl bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 p-8 text-white shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-orange-100">
              Customer Portal
            </p>

            <h1 className="mt-3 text-4xl font-bold">
              My Shipments
            </h1>

            <p className="mt-3 text-orange-100">
              View, search and track every shipment
              assigned to your account.
            </p>
          </div>

          <div className="rounded-3xl bg-white/10 p-6 text-center backdrop-blur">
            <p className="text-sm text-orange-100">
              Total Shipments
            </p>

            <h2 className="mt-2 text-5xl font-bold">
              {shipments.length}
            </h2>
          </div>
        </div>
      </div>

      {/* Search • Filter • Table • Mobile Cards */}

      <ShipmentsContent shipments={shipments} />
    </div>
  );
}