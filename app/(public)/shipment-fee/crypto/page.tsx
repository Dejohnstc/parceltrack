import { Suspense } from "react";
import CryptoPaymentClient from "./CryptoPaymentClient";

function CryptoPaymentLoading() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="animate-pulse space-y-5">
            <div className="h-8 w-64 rounded-lg bg-slate-200" />
            <div className="h-4 w-96 max-w-full rounded bg-slate-200" />
            <div className="h-32 rounded-2xl bg-slate-100" />
            <div className="h-20 rounded-2xl bg-slate-100" />
          </div>
        </div>
      </div>
    </main>
  );
}



export default function CryptoPaymentPage() {
  return (
    <Suspense fallback={<CryptoPaymentLoading />}>
      <CryptoPaymentClient />
    </Suspense>
  );
}