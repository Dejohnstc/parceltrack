"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  CreditCard,
  ExternalLink,
  Loader2,
  RefreshCw,
  Search,
  XCircle,
} from "lucide-react";

import { toast } from "sonner";

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string | null;
  cryptoCurrency: string | null;
  cryptoNetwork: string | null;
  paymentAddress: string | null;
  transactionRef: string | null;
  submittedAt: string | null;
  approvedAt: string | null;
  rejectedAt: string | null;

  shipment: {
    id: string;
    trackingNumber: string;
    referenceNumber: string | null;
    receiverName: string;
    receiverEmail: string;
    origin: string;
    destination: string;
    status: string;
    shippingCost: number | null;
    currency: string;
  };
}

export default function PaymentsDashboard() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(
    null
  );

  const [status, setStatus] = useState("PENDING");
  const [search, setSearch] = useState("");

  async function loadPayments() {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/admin/payments?status=${status}`,
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to load payments."
        );
      }

      setPayments(data.payments || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to load payments."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
  const timer = window.setTimeout(() => {
    loadPayments();
  }, 0);

  return () => {
    window.clearTimeout(timer);
  };
}, [status]);

  async function handleAction(
    paymentId: string,
    action: "approve" | "reject"
  ) {
    let reason = "";

    if (action === "reject") {
      reason =
        window.prompt(
          "Enter the reason for rejecting this payment:"
        )?.trim() || "";

      if (!reason) {
        toast.error("A rejection reason is required.");
        return;
      }
    }

    const confirmed = window.confirm(
      action === "approve"
        ? "Are you sure you want to approve this payment?"
        : "Are you sure you want to reject this payment?"
    );

    if (!confirmed) return;

    try {
      setProcessingId(paymentId);

      const response = await fetch(
        `/api/admin/payments/${paymentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action,
            reason,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to process payment."
        );
      }

      toast.success(data.message);

      await loadPayments();
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to process payment."
      );
    } finally {
      setProcessingId(null);
    }
  }

  const filteredPayments = payments.filter((payment) => {
    const query = search.toLowerCase();

    return (
      payment.shipment.trackingNumber
        .toLowerCase()
        .includes(query) ||
      payment.shipment.receiverName
        .toLowerCase()
        .includes(query) ||
      payment.shipment.receiverEmail
        .toLowerCase()
        .includes(query) ||
      payment.shipment.referenceNumber
        ?.toLowerCase()
        .includes(query)
    );
  });

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100">
              <CreditCard className="h-6 w-6 text-purple-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Shipment Payments
              </h1>

              <p className="text-sm text-slate-500">
                Review and verify customer shipment fee
                payments.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={loadPayments}
          disabled={loading}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw
            className={`h-4 w-4 ${
              loading ? "animate-spin" : ""
            }`}
          />
          Refresh
        </button>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          {
            value: "PENDING",
            label: "Pending",
            icon: Clock3,
          },
          {
            value: "PAID",
            label: "Paid",
            icon: CheckCircle2,
          },
          {
            value: "REJECTED",
            label: "Rejected",
            icon: XCircle,
          },
          {
            value: "UNPAID",
            label: "Unpaid",
            icon: CreditCard,
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setStatus(item.value)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                status === item.value
                  ? "bg-purple-600 text-white shadow-md"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search tracking number, customer or reference..."
          className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
        />
      </div>

      {/* Payments */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex min-h-64 items-center justify-center">
            <div className="flex items-center gap-3 text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading payments...
            </div>
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
            <CreditCard className="mb-3 h-10 w-10 text-slate-300" />

            <h3 className="font-semibold text-slate-900">
              No payments found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              There are no {status.toLowerCase()} shipment
              payments matching your search.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                    <th className="px-6 py-4">
                      Shipment
                    </th>

                    <th className="px-6 py-4">
                      Customer
                    </th>

                    <th className="px-6 py-4">
                      Amount
                    </th>

                    <th className="px-6 py-4">
                      Method
                    </th>

                    <th className="px-6 py-4">
                      Submitted
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                    {status === "PENDING" && (
                      <th className="px-6 py-4 text-right">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="px-6 py-5">
                        <p className="font-semibold text-slate-900">
                          {payment.shipment.trackingNumber}
                        </p>

                        {payment.shipment.referenceNumber && (
                          <p className="mt-1 text-xs text-slate-500">
                            {payment.shipment.referenceNumber}
                          </p>
                        )}
                      </td>

                      <td className="px-6 py-5">
                        <p className="font-medium text-slate-900">
                          {payment.shipment.receiverName}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {payment.shipment.receiverEmail}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <p className="font-bold text-slate-900">
                          {payment.currency}{" "}
                          {payment.amount.toFixed(2)}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        {payment.paymentMethod ===
                        "CRYPTO" ? (
                          <div>
                            <p className="font-semibold text-slate-900">
                              {payment.cryptoCurrency}
                            </p>

                            <p className="text-xs text-slate-500">
                              {payment.cryptoNetwork}
                            </p>
                          </div>
                        ) : (
                          <span className="text-sm text-slate-700">
                            {payment.paymentMethod ||
                              "—"}
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {payment.submittedAt
                          ? new Date(
                              payment.submittedAt
                            ).toLocaleString()
                          : "—"}
                      </td>

                      <td className="px-6 py-5">
                        <StatusBadge
                          status={payment.status}
                        />
                      </td>

                      {status === "PENDING" && (
                        <td className="px-6 py-5">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              disabled={
                                processingId ===
                                payment.id
                              }
                              onClick={() =>
                                handleAction(
                                  payment.id,
                                  "reject"
                                )
                              }
                              className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                            >
                              <XCircle className="h-4 w-4" />
                              Reject
                            </button>

                            <button
                              type="button"
                              disabled={
                                processingId ===
                                payment.id
                              }
                              onClick={() =>
                                handleAction(
                                  payment.id,
                                  "approve"
                                )
                              }
                              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-green-700 disabled:opacity-50"
                            >
                              {processingId ===
                              payment.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <CheckCircle2 className="h-4 w-4" />
                              )}
                              Approve
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="divide-y divide-slate-100 lg:hidden">
              {filteredPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="space-y-4 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-slate-900">
                        {payment.shipment.trackingNumber}
                      </p>

                      <p className="text-sm text-slate-500">
                        {payment.shipment.receiverName}
                      </p>
                    </div>

                    <StatusBadge
                      status={payment.status}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-slate-500">
                        Amount
                      </p>

                      <p className="mt-1 font-bold">
                        {payment.currency}{" "}
                        {payment.amount.toFixed(2)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Method
                      </p>

                      <p className="mt-1 font-semibold">
                        {payment.cryptoCurrency
                          ? `${payment.cryptoCurrency} (${payment.cryptoNetwork})`
                          : payment.paymentMethod ||
                            "—"}
                      </p>
                    </div>
                  </div>

                  {status === "PENDING" && (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={
                          processingId === payment.id
                        }
                        onClick={() =>
                          handleAction(
                            payment.id,
                            "reject"
                          )
                        }
                        className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-sm font-bold text-red-600"
                      >
                        Reject
                      </button>

                      <button
                        type="button"
                        disabled={
                          processingId === payment.id
                        }
                        onClick={() =>
                          handleAction(
                            payment.id,
                            "approve"
                          )
                        }
                        className="flex-1 rounded-lg bg-green-600 px-3 py-2 text-sm font-bold text-white"
                      >
                        Approve
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "PAID") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
        <CheckCircle2 className="h-3.5 w-3.5" />
        PAID
      </span>
    );
  }

  if (status === "REJECTED") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
        <XCircle className="h-3.5 w-3.5" />
        REJECTED
      </span>
    );
  }

  if (status === "PENDING") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
        <Clock3 className="h-3.5 w-3.5" />
        PENDING
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
      UNPAID
    </span>
  );
}