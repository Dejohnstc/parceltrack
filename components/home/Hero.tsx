"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Search,
  Package,
  Globe2,
  ShieldCheck,
  ArrowRight,
  PlayCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function Hero() {
  const router = useRouter();

  const [trackingNumber, setTrackingNumber] =
    useState("");

  function handleTrack() {
    if (!trackingNumber.trim()) return;

    router.push(
      `/track/${trackingNumber.trim()}`
    );
  }

  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,.12),transparent_35%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24">

        <div className="grid w-full items-center gap-20 lg:grid-cols-2">

          {/* LEFT */}

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-sm font-semibold text-orange-300 backdrop-blur-xl">

              <Sparkles size={16} />

              Trusted by logistics teams worldwide

            </div>

            <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-white lg:text-7xl">

              Deliver With

              <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent">

                Confidence.

              </span>

              Track Every Parcel.

            </h1>

            <p className="mt-8 max-w-2xl text-xl leading-9 text-slate-300">

              Enterprise-grade shipment tracking built for modern logistics.
              Monitor every parcel in real time with secure global delivery,
              instant status updates and intelligent shipment management.

            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-4">

              <button
                onClick={handleTrack}
                className="flex items-center gap-3 rounded-2xl bg-orange-500 px-8 py-4 font-semibold text-white transition duration-300 hover:scale-105 hover:bg-orange-600"
              >
                Track Shipment

                <ArrowRight size={20} />
              </button>

              <button className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-xl transition hover:bg-white/10">

                <PlayCircle size={22} />

                Watch Demo

              </button>

            </div>

            {/* Tracking */}

            <div className="mt-12 rounded-3xl border border-white/10 bg-white/10 p-4 shadow-[0_30px_80px_rgba(0,0,0,.45)] backdrop-blur-2xl">

              <div className="flex flex-col gap-4 md:flex-row">

                <input
                  value={trackingNumber}
                  onChange={(e) =>
                    setTrackingNumber(
                      e.target.value
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleTrack();
                    }
                  }}
                  placeholder="Enter Tracking Number"
                  className="flex-1 rounded-2xl border border-white/10 bg-white px-6 py-5 text-lg outline-none focus:border-orange-500"
                />

                <button
                  onClick={handleTrack}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-10 py-5 font-semibold text-white transition hover:bg-orange-600"
                >
                  <Search size={22} />

                  Track Now

                </button>

              </div>

            </div>

            {/* Stats */}

            <div className="mt-12 grid grid-cols-3 gap-6">

              <div>

                <h3 className="text-4xl font-black text-white">

                  150+

                </h3>

                <p className="mt-2 text-slate-400">

                  Countries Served

                </p>

              </div>

              <div>

                <h3 className="text-4xl font-black text-white">

                  98.7%

                </h3>

                <p className="mt-2 text-slate-400">

                  On-Time Delivery

                </p>

              </div>

              <div>

                <h3 className="text-4xl font-black text-white">

                  24/7

                </h3>

                <p className="mt-2 text-slate-400">

                  Live Support

                </p>

              </div>

            </div>

            {/* Features */}

            <div className="mt-12 flex flex-wrap gap-8">

              <div className="flex items-center gap-3 text-slate-300">

                <Package className="text-orange-500" />

                Express Shipping

              </div>

              <div className="flex items-center gap-3 text-slate-300">

                <Globe2 className="text-orange-500" />

                Worldwide Logistics

              </div>

              <div className="flex items-center gap-3 text-slate-300">

                <ShieldCheck className="text-orange-500" />

                Secure Tracking

              </div>

              <div className="flex items-center gap-3 text-slate-300">

                <TrendingUp className="text-orange-500" />

                Live Updates

              </div>

            </div>
</div>
        

                   {/* RIGHT */}

          <div className="relative hidden lg:flex items-center justify-center">

            {/* Floating Card */}
            <div className="absolute -left-10 top-10 z-20 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 animate-pulse rounded-full bg-green-500" />

                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-300">
                    Live Tracking
                  </p>

                  <p className="font-semibold text-white">
                    Shipment Active
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Stats */}

            <div className="absolute -right-6 bottom-10 z-20 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl shadow-2xl">

              <p className="text-sm text-slate-300">
                Monthly Shipments
              </p>

              <h3 className="mt-2 text-3xl font-black text-white">
                24,891
              </h3>

              <p className="mt-1 text-sm text-green-400">
                ▲ 18.4% this month
              </p>

            </div>

            {/* Main Card */}

            <div className="relative w-full max-w-lg overflow-hidden rounded-[32px] border border-white/10 bg-white/10 p-8 backdrop-blur-2xl shadow-[0_40px_120px_rgba(0,0,0,.45)]">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-300">
                    Tracking Number
                  </p>

                  <h3 className="mt-1 text-2xl font-black text-white">
                    PT904728195
                  </h3>

                </div>

                <div className="rounded-full bg-green-500/20 px-4 py-2 text-green-400 font-semibold">
                  ● LIVE
                </div>

              </div>

              {/* Progress */}

              <div className="mt-10">

                <div className="mb-2 flex justify-between text-sm text-slate-300">
                  <span>Delivery Progress</span>

                  <span>74%</span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-white/10">

                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-orange-400 to-orange-600" />

                </div>

              </div>

              {/* Timeline */}

              <div className="mt-10 space-y-6">

                {[
  { step: "Shipment Created", done: true },
  { step: "Picked Up", done: true },
  { step: "Sorting Facility", done: true },
  { step: "In Transit", done: true },
  { step: "Customs Clearance", done: false },
  { step: "Out For Delivery", done: false },
  { step: "Delivered", done: false },
].map(({ step, done }) => (
  <div
    key={step}
    className="flex items-center gap-4"
  >
    <div
      className={`flex h-6 w-6 items-center justify-center rounded-full ${
        done
          ? "bg-green-500"
          : "bg-white/20"
      }`}
    >
      {done && (
        <div className="h-2 w-2 rounded-full bg-white" />
      )}
    </div>

    <span
      className={`font-medium ${
        done
          ? "text-white"
          : "text-slate-400"
      }`}
    >
      {step}
    </span>
  </div>
))}

              </div>

              {/* Location */}

              <div className="mt-10 rounded-2xl bg-white/5 p-6">

                <p className="text-sm text-slate-400">
                  Current Location
                </p>

                <h4 className="mt-2 text-xl font-bold text-white">
                  Frankfurt Distribution Center
                </h4>

                <p className="mt-2 text-sm text-slate-400">
                  Next Destination: London Gateway Hub
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}  