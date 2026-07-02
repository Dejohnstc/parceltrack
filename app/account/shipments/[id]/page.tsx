import { redirect, notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

import ShipmentDetails from "@/components/shipment/ShipmentDetails";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function CustomerShipmentDetailsPage({
  params,
}: Props) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "CUSTOMER") {
    redirect("/dashboard");
  }

  const { id } = await params;

  const shipment = await prisma.shipment.findFirst({
    where: {
      id,
      customerId: user.id,
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
      isAdmin={false}
    />
  );
}