"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bitcoin,
  Check,
  ChevronDown,
  Copy,
  Loader2,
  Wallet,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface ShipmentPayment {
  id: string;
  amount: number;
  currency: string;
  status: string;
}

interface ShipmentData {
  trackingNumber: string;
  receiverName: string;
}

interface PaymentResponse {
  success: boolean;
  shipment: ShipmentData;
  payment: ShipmentPayment;
  message?: string;
}
interface PaymentResult {
  success: boolean;
  shipment: {
    id: string;
    trackingNumber: string;
    referenceNumber: string | null;
    receiverName: string;
    origin: string;
    destination: string;
    currentLocation: string | null;
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
type CryptoCoin =
  | "BTC"
  | "USDT_TRC20"
  | "USDT_ERC20"
  | "ETH"
  | "LTC"
  | "SOL";

const coins: {
  id: CryptoCoin;
  name: string;
  network: string;
}[] = [
  {
    id: "BTC",
    name: "Bitcoin",
    network: "Bitcoin",
  },
  {
    id: "USDT_TRC20",
    name: "USDT",
    network: "TRC20",
  },
  {
    id: "USDT_ERC20",
    name: "USDT",
    network: "ERC20",
  },
  {
    id: "ETH",
    name: "Ethereum",
    network: "Ethereum",
  },
  {
    id: "LTC",
    name: "Litecoin",
    network: "Litecoin",
  },
  {
    id: "SOL",
    name: "Solana",
    network: "Solana",
  },
];

/*
 * IMPORTANT:
 * Replace these placeholder values with your actual wallet addresses.
 */
const walletAddresses: Record<CryptoCoin, string> = {
  BTC: "bc1qdnvvck9l6j9me62nzx0ny5z35kl8tjh2t070yy",
  USDT_TRC20: "TNYpJXKw29kNrn8DdiM3BzyrFaHQCfv5sD",
  USDT_ERC20: "0xcb0b9e43c1827f71f0e3abf775744ccfafbe8787",
  ETH: "0x8f017bB9E71C4e0Ed5094CBC86cCfD2b782f1A27",
  LTC: "LKTK1KgySgHopefqCzndvX7NcDQA3ZJAar",
  SOL: "AGaMYRd7X9LCiJTg9UqGNzkBk7sMrDcayd84F29EhkTJ",
};

export default function CryptoPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const trackingNumber =
    searchParams.get("trackingNumber")?.trim() ?? "";

  const [shipment, setShipment] =
    useState<ShipmentData | null>(null);

  const [payment, setPayment] =
    useState<ShipmentPayment | null>(null);

  const [loading, setLoading] = useState(true);
const [result, setResult] = useState<PaymentResult | null>(null);
  const [error, setError] = useState("");

  const [selectedCoin, setSelectedCoin] =
    useState<CryptoCoin | null>(null);

  const [copied, setCopied] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  useEffect(() => {
  if (!trackingNumber) {
    return;
  }

  let cancelled = false;

  async function loadPayment() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/shipment-payment?trackingNumber=${encodeURIComponent(
          trackingNumber
        )}`,
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (cancelled) return;

      if (!response.ok || !data.success) {
        setError(
          data.message || "Unable to load shipment payment information."
        );
        return;
      }

      setResult(data);
    } catch (error) {
      if (cancelled) return;

      console.error("Crypto payment lookup error:", error);
      setError(
        "Something went wrong while loading the shipment payment."
      );
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  }

  loadPayment();

  return () => {
    cancelled = true;
  };
}, [trackingNumber]);

  async function copyWallet() {
    if (!selectedCoin) return;

    const wallet =
      walletAddresses[selectedCoin];

    if (
      !wallet ||
      wallet.startsWith("YOUR_")
    ) {
      return;
    }

    try {
      await navigator.clipboard.writeText(wallet);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch (error) {
      console.error(
        "Unable to copy wallet address:",
        error
      );
    }
  }

  async function handlePaid() {
    if (
      !payment ||
      !selectedCoin ||
      !copied
    ) {
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      /*
       * This endpoint will be created next.
       * It changes the payment from UNPAID to PENDING.
       */
      const response = await fetch(
        "/api/shipment-payment/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentId: payment.id,
            paymentMethod: "CRYPTO",
            cryptoCurrency: selectedCoin,
            cryptoNetwork:
              coins.find(
                (coin) =>
                  coin.id === selectedCoin
              )?.network,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message ||
            "Unable to submit payment."
        );
        return;
      }

      setSubmitted(true);

      setPayment((current) =>
        current
          ? {
              ...current,
              status: "PENDING",
            }
          : current
      );
    } catch (error) {
      console.error(
        "Crypto payment submission error:",
        error
      );

      setError(
        "Something went wrong while submitting your payment."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="mx-auto flex max-w-2xl items-center justify-center rounded-3xl border border-slate-200 bg-white p-12 shadow-lg">
          <div className="flex items-center gap-3 text-slate-600">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading payment information...
          </div>
        </div>
      </main>
    );
  }

  if (error && !payment) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-2xl rounded-3xl border border-red-200 bg-white p-8 shadow-lg">
          <p className="text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              router.push("/shipment-fee")
            }
            className="mt-6 flex items-center gap-2 font-semibold text-purple-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shipment Fee
          </button>
        </div>
      </main>
    );
  }

  if (!payment || !shipment) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">

        {/* Back */}

        <button
          type="button"
          onClick={() =>
            router.push(
              `/shipment-fee?trackingNumber=${encodeURIComponent(
                trackingNumber
              )}`
            )
          }
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shipment Fee
        </button>

        {/* Header */}

        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100">
            <Bitcoin className="h-8 w-8 text-orange-600" />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Cryptocurrency Payment
          </h1>

          <p className="mt-3 text-slate-500">
            Select a cryptocurrency to view the
            payment wallet.
          </p>
        </div>

        {/* Payment Summary */}

        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Tracking Number
              </p>

              <p className="mt-1 font-bold text-slate-900">
                {shipment.trackingNumber}
              </p>
            </div>

            <div className="sm:text-right">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Shipping Fee
              </p>

              <p className="mt-1 text-xl font-bold text-purple-600">
                {payment.currency}{" "}
                {payment.amount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Already Submitted */}

        {submitted ||
        payment.status === "PENDING" ? (
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center shadow-lg">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
              <Check className="h-7 w-7 text-amber-600" />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-amber-900">
              Payment Submitted
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-amber-800">
              Your payment has been submitted and is
              awaiting verification by our payment team.
            </p>

            <p className="mt-5 text-sm font-semibold text-amber-900">
              Status: Awaiting Admin Approval
            </p>
          </div>
        ) : payment.status === "PAID" ? (
          <div className="rounded-3xl border border-green-200 bg-green-50 p-8 text-center shadow-lg">
            <Check className="mx-auto h-12 w-12 text-green-600" />

            <h2 className="mt-4 text-2xl font-bold text-green-900">
              Payment Received
            </h2>

            <p className="mt-2 text-green-700">
              This shipment fee has already been
              approved.
            </p>
          </div>
        ) : (
          <>
            {/* Coin Selection */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg md:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  Select Cryptocurrency
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Choose the cryptocurrency and network
                  you want to use for payment.
                </p>
              </div>

              <div className="space-y-3">
                {coins.map((coin) => {
                  const isSelected =
                    selectedCoin === coin.id;

                  return (
                    <div
                      key={coin.id}
                      className={`overflow-hidden rounded-2xl border transition ${
                        isSelected
                          ? "border-orange-400 bg-orange-50"
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCoin(
                            isSelected
                              ? null
                              : coin.id
                          );
                          setCopied(false);
                        }}
                        className="flex w-full items-center justify-between p-5 text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                            {coin.id === "BTC" ? (
                              <Bitcoin className="h-6 w-6 text-orange-500" />
                            ) : (
                              <Wallet className="h-5 w-5 text-slate-600" />
                            )}
                          </div>

                          <div>
                            <p className="font-bold text-slate-900">
                              {coin.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {coin.network}
                            </p>
                          </div>
                        </div>

                        <ChevronDown
                          className={`h-5 w-5 text-slate-400 transition-transform ${
                            isSelected
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>

                      {/* Wallet Dropdown */}

                      {isSelected && (
                        <div className="border-t border-slate-200 p-5">

                          <div className="mb-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Payment Wallet
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              Send the required payment to
                              the wallet below.
                            </p>
                          </div>

                          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <div className="break-all font-mono text-sm text-slate-800">
                              {walletAddresses[
                                coin.id
                              ]}
                            </div>

                            <button
                              type="button"
                              onClick={copyWallet}
                              disabled={
                                walletAddresses[
                                  coin.id
                                ].startsWith(
                                  "YOUR_"
                                )
                              }
                              className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {copied ? (
                                <>
                                  <Check className="h-4 w-4" />
                                  Wallet Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="h-4 w-4" />
                                  Copy Wallet Address
                                </>
                              )}
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={handlePaid}
                            disabled={
                              !copied ||
                              submitting
                            }
                            className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
                          >
                            {submitting ? (
                              <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              "I Have Paid"
                            )}
                          </button>

                          {!copied && (
                            <p className="mt-3 text-center text-xs text-slate-500">
                              Copy the wallet address above
                              before submitting payment.
                            </p>
                          )}

                          {error && (
                            <p className="mt-4 text-center text-sm text-red-600">
                              {error}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        <p className="mt-6 text-center text-xs text-slate-500">
          Always verify the selected cryptocurrency and
          network before sending funds.
        </p>
      </div>
    </main>
  );
}