import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/require-admin";

import ShipmentForm from "@/components/shipment/ShipmentForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditShipmentPage({
  params,
}: Props) {
  // Protect this page
  await requireAdmin();

  const { id } = await params;

  const shipment = await prisma.shipment.findUnique({
    where: {
      id,
    },
  });

  if (!shipment) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          Edit Shipment
        </h1>

        <p className="mt-2 text-slate-500">
          Tracking Number:
          <span className="ml-2 font-semibold text-slate-700">
            {shipment.trackingNumber}
          </span>
        </p>

        <p className="mt-2 text-slate-500">
          Update shipment information, package details,
          delivery route and status.
        </p>
      </div>

      {/* Form */}

      <ShipmentForm
        shipment={shipment}
        mode="edit"
      />
    </div>
  );
}