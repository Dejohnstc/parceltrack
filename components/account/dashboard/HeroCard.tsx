import {
  CalendarDays,
  Truck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface HeroCardProps {
  name: string;
  today: string;
  activeShipments: number;
}

export default function HeroCard({
  name,
  today,
  activeShipments,
}: HeroCardProps) {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white shadow-2xl">
      <div className="grid gap-10 p-8 lg:grid-cols-2 lg:p-12">
        {/* Left */}

        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-orange-100">
            Customer Dashboard
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight lg:text-5xl">
            Welcome back,
            <br />
            {name}
          </h1>

          <div className="mt-6 flex items-center gap-2 text-orange-100">
            <CalendarDays className="h-5 w-5" />

            <span>{today}</span>
          </div>

          <div className="mt-10">
            <Link
              href="/account/shipments"
              className="inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 font-semibold text-orange-600 transition hover:scale-105"
            >
              View My Shipments

              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center justify-center">
          <div className="w-full max-w-sm rounded-3xl bg-white/10 p-8 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-white/20 p-4">
                <Truck className="h-8 w-8" />
              </div>

              <div>
                <p className="text-orange-100">
                  Active Shipments
                </p>

                <h2 className="mt-2 text-5xl font-bold">
                  {activeShipments}
                </h2>
              </div>
            </div>

            <div className="mt-8 h-3 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white"
                style={{
                  width:
                    activeShipments > 0
                      ? "80%"
                      : "10%",
                }}
              />
            </div>

            <p className="mt-5 text-sm text-orange-100">
              You&apos;re currently tracking{" "}
              <strong>{activeShipments}</strong>{" "}
              shipment
              {activeShipments === 1 ? "" : "s"}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}