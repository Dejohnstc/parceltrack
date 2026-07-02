import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/require-admin";

import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";

import {
  User,
  Mail,
  Calendar,
  Package,
  CheckCircle2,
  XCircle,
  Eye,
} from "lucide-react";

interface CustomerDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CustomerDetailsPage({
  params,
}: CustomerDetailsPageProps) {
  await requireAdmin();

  const { id } = await params;

  const customer = await prisma.user.findUnique({
    where: {
      id,
    },

    include: {
      shipments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!customer) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={customer.name}
        description="Customer profile and shipment history."
      />

      {/* Summary */}

      <div className="grid gap-6 md:grid-cols-4">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <User className="mb-3 h-8 w-8 text-orange-500" />

          <p className="text-sm text-slate-500">
            Customer
          </p>

          <p className="mt-2 font-semibold">
            {customer.name}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <Mail className="mb-3 h-8 w-8 text-blue-500" />

          <p className="text-sm text-slate-500">
            Email Status
          </p>

          <div className="mt-2 flex items-center gap-2">
            {customer.emailVerified ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-green-600" />

                <span className="font-medium">
                  Verified
                </span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-500" />

                <span className="font-medium">
                  Not Verified
                </span>
              </>
            )}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <Package className="mb-3 h-8 w-8 text-green-500" />

          <p className="text-sm text-slate-500">
            Total Shipments
          </p>

          <p className="mt-2 text-3xl font-bold">
            {customer.shipments.length}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <Calendar className="mb-3 h-8 w-8 text-purple-500" />

          <p className="text-sm text-slate-500">
            Joined
          </p>

          <p className="mt-2 font-semibold">
            {customer.createdAt.toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Customer Information */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">
          Customer Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">
              Name
            </p>

            <p className="font-medium">
              {customer.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Email
            </p>

            <p className="font-medium">
              {customer.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Role
            </p>

            <p className="font-medium">
              {customer.role}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Joined
            </p>

            <p className="font-medium">
              {customer.createdAt.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Shipment History */}

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="border-b p-6">
          <h2 className="text-xl font-semibold">
            Shipment History
          </h2>
        </div>

        {customer.shipments.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            This customer has no shipments.
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-left">
                  Tracking
                </th>

                <th className="p-4 text-left">
                  Origin
                </th>

                <th className="p-4 text-left">
                  Destination
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Created
                </th>

                <th className="p-4 text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {customer.shipments.map((shipment) => (
                <tr
                  key={shipment.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="p-4 font-medium">
                    {shipment.trackingNumber}
                  </td>

                  <td className="p-4">
                    {shipment.origin}
                  </td>

                  <td className="p-4">
                    {shipment.destination}
                  </td>

                  <td className="p-4">
                    {shipment.status.replaceAll(
                      "_",
                      " "
                    )}
                  </td>

                  <td className="p-4">
                    {shipment.createdAt.toLocaleDateString()}
                  </td>

                  <td className="p-4 text-right">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                    >
                      <Link
                        href={`/dashboard/shipments/${shipment.id}`}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}