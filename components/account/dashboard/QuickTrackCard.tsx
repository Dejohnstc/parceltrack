"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Search,
  ArrowRight,
} from "lucide-react";

export default function QuickTrackCard() {
  const router = useRouter();

  const [tracking, setTracking] =
    useState("");

  function handleTrack() {
    if (!tracking.trim()) return;

    router.push(`/track/${tracking}`);
  }

  return (
    <section className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white shadow-xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="uppercase tracking-[0.25em] text-orange-400">
            Quick Track
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Track Any Shipment
          </h2>

          <p className="mt-3 text-slate-300">
            Enter a tracking number to
            instantly view shipment progress.
          </p>
        </div>

        <div className="flex w-full max-w-lg gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              value={tracking}
              onChange={(e) =>
                setTracking(e.target.value)
              }
              placeholder="Tracking Number"
              className="w-full rounded-2xl border border-slate-700 bg-slate-800 py-4 pl-12 pr-4 outline-none transition focus:border-orange-500"
            />
          </div>

          <button
            onClick={handleTrack}
            className="rounded-2xl bg-orange-500 px-6 font-semibold transition hover:bg-orange-600"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}