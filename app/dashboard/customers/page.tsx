import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/require-admin";

import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";

import {
  Eye,
  Package,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default async function CustomersPage() {
  await requireAdmin();

  const customers = await prisma.user.findMany({
    where: {
      role: "CUSTOMER",
    },

    include: {
      shipments: {
        select: {
          id: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Customers"
        description="Manage all registered customers."
      />

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-center">
                Verified
              </th>
              <th className="p-4 text-center">
                Shipments
              </th>
              <th className="p-4 text-left">Joined</th>
              <th className="p-4 text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-10 text-center text-slate-500"
                >
                  No customers found.
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="p-4">
                    <div>
                      <p className="font-semibold">
                        {customer.name}
                      </p>

                      <p className="text-xs text-slate-500">
                        {customer.role}
                      </p>
                    </div>
                  </td>

                  <td className="p-4">
                    {customer.email}
                  </td>

                  <td className="p-4 text-center">
                    {customer.emailVerified ? (
                      <CheckCircle2 className="mx-auto h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="mx-auto h-5 w-5 text-red-500" />
                    )}
                  </td>

                  <td className="p-4 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                      <Package className="h-4 w-4" />

                      {customer.shipments.length}
                    </div>
                  </td>

                  <td className="p-4">
                    {customer.createdAt.toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-end">
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                      >
                        <Link
                          href={`/dashboard/customers/${customer.id}`}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </Button>
                    </div>
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