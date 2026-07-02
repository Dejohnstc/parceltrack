import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/require-admin";

import ShipmentDetails from "@/components/shipment/ShipmentDetails";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ShipmentDetailsPage({
  params,
}: Props) {
  // Protect this page
  await requireAdmin();

  const { id } = await params;

  const shipment = await prisma.shipment.findUnique({
    where: {
      id,
    },
    include: {
      trackingEvents: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!shipment) {
    notFound();
  }

  return (
    <ShipmentDetails
      shipment={shipment}
      isAdmin
    />
  );
}