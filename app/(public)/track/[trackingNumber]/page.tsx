import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import ShipmentDetails from "@/components/shipment/ShipmentDetails";

interface PageProps {
  params: Promise<{
    trackingNumber: string;
  }>;
}

export default async function TrackingDetailsPage({
  params,
}: PageProps) {
  const { trackingNumber } = await params;

  const shipment = await prisma.shipment.findUnique({
    where: {
      trackingNumber,
    },
    include: {
      trackingEvents: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!shipment) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <ShipmentDetails shipment={shipment} />
    </main>
  );
}