"use client";

import {
  Package,
  Globe2,
  Truck,
  Smile,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    icon: Package,
    number: "2.8M+",
    title: "Packages Delivered",
    description:
      "Millions of shipments successfully delivered with precision and reliability.",
  },
  {
    icon: Globe2,
    number: "220+",
    title: "Countries Connected",
    description:
      "Global logistics coverage spanning every major international market.",
  },
  {
    icon: Truck,
    number: "1,500+",
    title: "Delivery Fleet",
    description:
      "Modern transport vehicles operating around the clock worldwide.",
  },
  {
    icon: Smile,
    number: "98.9%",
    title: "Customer Satisfaction",
    description:
      "Businesses and individuals trust ParcelTrack every single day.",
  },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-28 text-white">

      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,.08),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex rounded-full bg-orange-500/10 px-5 py-2 text-sm font-semibold text-orange-400">

            Trusted Worldwide

          </span>

          <h2 className="mt-6 text-5xl font-black tracking-tight">

            Numbers That Speak
            <span className="block text-orange-500">
              For Themselves
            </span>

          </h2>

          <p className="mt-8 text-xl leading-9 text-slate-300">

            Every shipment, every destination and every satisfied customer
            reflects our commitment to building a world-class logistics
            network.

          </p>

        </div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 lg:grid-cols-4">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-500 hover:-translate-y-3 hover:border-orange-500 hover:shadow-[0_25px_60px_rgba(249,115,22,.18)]"
              >

                {/* Glow */}

                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-orange-500/20 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10">

                  <Icon
                    size={32}
                    className="text-orange-500"
                  />

                </div>

                <h3 className="mt-8 text-5xl font-black text-white">

                  {stat.number}

                </h3>

                <h4 className="mt-4 text-xl font-bold">

                  {stat.title}

                </h4>

                <p className="mt-4 leading-8 text-slate-400">

                  {stat.description}

                </p>

                <div className="mt-8 flex items-center gap-2 font-semibold text-orange-400">

                  Learn More

                  <ArrowUpRight
                    size={18}
                    className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                  />

                </div>

              </div>
            );
          })}

        </div>

        {/* Bottom Banner */}

        <div className="mt-24 rounded-[36px] border border-white/10 bg-white/5 px-10 py-12 backdrop-blur-xl">

          <div className="grid items-center gap-10 lg:grid-cols-3">

            <div>

              <h3 className="text-4xl font-black">

                Delivering Confidence
              </h3>

              <p className="mt-4 text-slate-300 leading-8">

                Our technology, global partnerships and logistics expertise
                help businesses move shipments faster and smarter.

              </p>

            </div>

            <div className="text-center">

              <h2 className="text-6xl font-black text-orange-500">

                99.98%

              </h2>

              <p className="mt-2 text-slate-300">

                Tracking Accuracy

              </p>

            </div>

            <div className="text-center">

              <h2 className="text-6xl font-black text-orange-500">

                24/7

              </h2>

              <p className="mt-2 text-slate-300">

                Customer Support

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}