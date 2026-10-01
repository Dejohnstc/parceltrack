"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Package,
  Loader2,
  AlertCircle,
  MapPin,
  ArrowRight,
  DollarSign,
  CheckCircle2,
  Clock3,
  Building2,
  Bitcoin,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";

interface ShipmentResult {
  shipment: {
    id: string;
    trackingNumber: string;
    referenceNumber: string | null;
    receiverName: string;
    origin: string;
    destination: string;
    currentLocation: string;
    status: string;
  };

  payment: {
    id: string;
    amount: number;
    currency: string;
    status: string;
    paymentMethod: string | null;
    transactionRef: string | null;
    submittedAt: string | null;
    approvedAt: string | null;
    rejectedAt: string | null;
  };
}

type PaymentMethod = "BANK_TRANSFER" | "CRYPTO";

export default function ShipmentFeePage() {
  const [trackingNumber, setTrackingNumber] = useState("");

  const [result, setResult] =
    useState<ShipmentResult | null>(null);

  const [loading, setLoading] = useState(false);
const router = useRouter();
  const [error, setError] = useState("");

  const [showPayment, setShowPayment] =
    useState(false);

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod | null>(null);

  async function handleSearch(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const value = trackingNumber.trim();

    if (!value) {
      setError("Please enter your tracking number.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setShowPayment(false);
    setPaymentMethod(null);

    try {
      const response = await fetch(
        `/api/shipment-payment?trackingNumber=${encodeURIComponent(
          value
        )}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message ||
            "Unable to find your shipment."
        );
        return;
      }

      setResult(data);
    } catch (error) {
      console.error(
        "Shipment payment lookup error:",
        error
      );

      setError(
        "Something went wrong while checking your shipment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function formatStatus(status: string) {
    return status
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  }

  const isPaid =
    result?.payment.status === "PAID";

  const isPending =
    result?.payment.status === "PENDING";

  const canPay =
    result?.payment.status === "UNPAID" ||
    result?.payment.status === "REJECTED";

  function openPayment() {
    if (!result || !canPay) return;

    setShowPayment(true);
    setPaymentMethod(null);
  }

  function goBackToPaymentSummary() {
    setPaymentMethod(null);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">

        {/* Header */}

        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100">
            <Package className="h-8 w-8 text-purple-600" />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Shipment Fee
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-slate-500">
            Enter your tracking number to view your
            shipment fee and payment status.
          </p>
        </div>

        {/* Tracking Search */}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg md:p-8">
          <form
            onSubmit={handleSearch}
            className="space-y-5"
          >
            <div className="space-y-2">
              <label
                htmlFor="trackingNumber"
                className="text-sm font-semibold text-slate-700"
              >
                Tracking Number
              </label>

              <input
                id="trackingNumber"
                type="text"
                value={trackingNumber}
                onChange={(event) =>
                  setTrackingNumber(
                    event.target.value
                  )
                }
                placeholder="Enter your tracking number"
                autoComplete="off"
                className="h-12 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Checking Shipment...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  Check Shipment Fee
                </>
              )}
            </button>
          </form>
        </div>

        {/* Shipment Result */}

        {result && !showPayment && (
          <div className="mt-8 space-y-6">

            {/* Shipment Card */}

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
              <div className="border-b border-slate-200 bg-slate-900 px-6 py-5 text-white md:px-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                      Tracking Number
                    </p>

                    <h2 className="mt-1 text-xl font-bold">
                      {result.shipment.trackingNumber}
                    </h2>
                  </div>

                  <span className="w-fit rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold">
                    {formatStatus(
                      result.shipment.status
                    )}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8">

                <div className="mb-6">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Recipient
                  </p>

                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {result.shipment.receiverName}
                  </p>
                </div>

                <div className="grid gap-4 rounded-2xl bg-slate-50 p-5 md:grid-cols-[1fr_auto_1fr] md:items-center">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <MapPin className="h-4 w-4" />
                      Origin
                    </div>

                    <p className="mt-2 font-semibold text-slate-900">
                      {result.shipment.origin}
                    </p>
                  </div>

                  <ArrowRight className="hidden h-5 w-5 text-slate-400 md:block" />

                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <MapPin className="h-4 w-4" />
                      Destination
                    </div>

                    <p className="mt-2 font-semibold text-slate-900">
                      {result.shipment.destination}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Current Location
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {result.shipment.currentLocation}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Card */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg md:p-8">

              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Shipping Fee
                  </h2>

                  <p className="text-sm text-slate-500">
                    Payment status for this shipment
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-6 text-center">
                <p className="text-sm font-medium text-slate-500">
                  Amount Due
                </p>

                <p className="mt-2 text-4xl font-bold text-slate-900">
                  {result.payment.currency}{" "}
                  {result.payment.amount.toFixed(2)}
                </p>
              </div>

              <div className="mt-5">

                {isPaid ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-5">
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-green-600" />

                    <div>
                      <p className="font-bold text-green-900">
                        Payment Received
                      </p>

                      <p className="mt-1 text-sm text-green-700">
                        Your shipping fee has been
                        received and recorded.
                      </p>
                    </div>
                  </div>

                ) : isPending ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                    <Clock3 className="h-6 w-6 shrink-0 text-amber-600" />

                    <div>
                      <p className="font-bold text-amber-900">
                        Awaiting Admin Approval
                      </p>

                      <p className="mt-1 text-sm text-amber-700">
                        Your payment submission has
                        been received and is awaiting
                        verification.
                      </p>
                    </div>
                  </div>

                ) : (
                  <div className="rounded-2xl border border-purple-200 bg-purple-50 p-5">

                    <p className="font-bold text-purple-900">
                      Payment Required
                    </p>

                    <p className="mt-1 text-sm text-purple-700">
                      Your shipment has an outstanding
                      shipping fee.
                    </p>

                    <button
                      type="button"
                      onClick={openPayment}
                      className="mt-5 h-12 w-full rounded-xl bg-purple-600 px-5 font-semibold text-white transition hover:bg-purple-700"
                    >
                      Pay Shipment Fee
                    </button>

                  </div>
                )}

              </div>
            </div>
          </div>
        )}

        {/* Payment Methods */}

        {result && showPayment && (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg md:p-8">

            {!paymentMethod ? (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setShowPayment(false)
                  }
                  className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Shipment
                </button>

                <div className="mb-7">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Choose Payment Method
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Select how you would like to pay
                    your shipping fee.
                  </p>
                </div>

                <div className="space-y-4">

                  {/* Bank Transfer */}

                  <button
                    type="button"
                    onClick={() =>
                      setPaymentMethod(
                        "BANK_TRANSFER"
                      )
                    }
                    className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 p-5 text-left transition hover:border-purple-400 hover:bg-purple-50"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                      <Building2 className="h-6 w-6 text-blue-600" />
                    </div>

                    <div>
                      <p className="font-bold text-slate-900">
                        Bank Transfer
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Contact support for payment
                        information.
                      </p>
                    </div>
                  </button>

                  {/* Cryptocurrency */}

                  <button
  type="button"
  onClick={() => {
    if (!result) return;

    router.push(
      `/shipment-fee/crypto?trackingNumber=${encodeURIComponent(
        result.shipment.trackingNumber
      )}`
    );
  }}
  className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 p-5 text-left transition hover:border-purple-400 hover:bg-purple-50"
>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100">
                      <Bitcoin className="h-6 w-6 text-orange-600" />
                    </div>

                    <div>
                      <p className="font-bold text-slate-900">
                        Cryptocurrency
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Pay using an available
                        cryptocurrency.
                      </p>
                    </div>
                  </button>

                </div>
              </>
            ) : (
              <PaymentMethodDetails
                method={paymentMethod}
                result={result}
                onBack={goBackToPaymentSummary}
              />
            )}
          </div>
        )}

        <p className="mt-6 text-center text-sm text-slate-500">
          Make sure you enter your tracking number
          exactly as provided.
        </p>
      </div>
    </main>
  );
}

function PaymentMethodDetails({
  method,
  result,
  onBack,
}: {
  method: PaymentMethod;
  result: ShipmentResult;
  onBack: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Payment Methods
      </button>

      {/* Bank Transfer */}

      {method === "BANK_TRANSFER" && (
        <>
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Bank Transfer
              </h2>

              <p className="text-sm text-slate-500">
                Payment information
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <div className="flex items-start gap-4">
              <MessageCircle className="mt-1 h-6 w-6 shrink-0 text-blue-600" />

              <div>
                <h3 className="font-bold text-blue-900">
                  Contact Support
                </h3>

                <p className="mt-2 text-sm leading-6 text-blue-800">
                  Please contact our support team for
                  the bank transfer information required
                  to complete your shipping fee payment.
                </p>

                <p className="mt-4 text-sm font-semibold text-blue-900">
                  Amount to pay:{" "}
                  {result.payment.currency}{" "}
                  {result.payment.amount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.Tawk_API?.maximize?.();
              }
            }}
            className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 font-semibold text-white transition hover:bg-purple-700"
          >
            <MessageCircle className="h-5 w-5" />
            Contact Support
          </button>
        </>
      )}

      {/* Cryptocurrency */}

      {method === "CRYPTO" && (
        <>
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
              <Bitcoin className="h-6 w-6 text-orange-600" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Cryptocurrency
              </h2>

              <p className="text-sm text-slate-500">
                Cryptocurrency payment
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
            <h3 className="font-bold text-orange-900">
              Crypto Payment
            </h3>

            <p className="mt-2 text-sm leading-6 text-orange-800">
              Cryptocurrency payment instructions
              will be displayed here once the crypto
              payment settings are configured.
            </p>

            <p className="mt-4 text-sm font-semibold text-orange-900">
              Amount to pay:{" "}
              {result.payment.currency}{" "}
              {result.payment.amount.toFixed(2)}
            </p>
          </div>
        </>
      )}
    </div>
  );
}