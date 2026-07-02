import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/require-admin";

import PageHeader from "@/components/common/PageHeader";
import ShipmentTable from "@/components/tables/ShipmentTable";
import { Button } from "@/components/ui/button";

export default async function ShipmentsPage() {
  // Protect this page
  const user = await requireAdmin();

  const shipments = await prisma.shipment.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Shipment Management"
        description={`Welcome back, ${user.name}. Manage, monitor and update all shipments from one place.`}
        action={
          <Button asChild>
            <Link href="/dashboard/shipments/create">
              Create Shipment
            </Link>
          </Button>
        }
      />

      <ShipmentTable shipments={shipments} />
    </div>
  );
}