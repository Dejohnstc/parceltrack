import Link from "next/link";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

import { Button } from "@/components/ui/button";

export default async function CustomerShipmentsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Prevent admins from using customer pages
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
      <div>
        <h1 className="text-3xl font-bold">
          My Shipments
        </h1>

        <p className="mt-2 text-slate-500">
          View all shipments assigned to your account.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-left">
                Tracking Number
              </th>

              <th className="p-4 text-left">
                Origin
              </th>

              <th className="p-4 text-left">
                Destination
              </th>

              <th className="p-4 text-left">
                Current Location
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {shipments.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-16 text-center text-slate-500"
                >
                  No shipments found.
                </td>
              </tr>
            ) : (
              shipments.map((shipment) => (
                <tr
                  key={shipment.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="p-4 font-semibold">
                    {shipment.trackingNumber}
                  </td>

                  <td className="p-4">
                    {shipment.origin}
                  </td>

                  <td className="p-4">
                    {shipment.destination}
                  </td>

                  <td className="p-4">
                    {shipment.currentLocation}
                  </td>

                  <td className="p-4">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      {shipment.status.replaceAll(
                        "_",
                        " "
                      )}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <Button asChild size="sm">
                      <Link
                        href={`/track/${shipment.trackingNumber}`}
                      >
                        Track
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}