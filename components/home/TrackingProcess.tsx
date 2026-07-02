import {
  PackagePlus,
  Truck,
  MapPinned,
  House,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: PackagePlus,
    title: "Shipment Created",
    description:
      "Your parcel is registered and receives a unique tracking number instantly.",
  },
  {
    icon: Truck,
    title: "Picked Up",
    description:
      "A courier collects the shipment and transports it to the nearest logistics hub.",
  },
  {
    icon: MapPinned,
    title: "In Transit",
    description:
      "Follow every movement in real time with live tracking and automated updates.",
  },
  {
    icon: House,
    title: "Delivered",
    description:
      "Your shipment arrives safely with delivery confirmation and proof of receipt.",
  },
];

export default function TrackingProcess() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-28">

      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,.05),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">
            Shipment Journey
          </span>

          <h2 className="mt-6 text-5xl font-black tracking-tight text-slate-900">

            Track Every Stage
            <span className="block text-orange-500">
              From Pickup To Delivery
            </span>

          </h2>

          <p className="mt-8 text-xl leading-9 text-slate-600">

            Our intelligent logistics platform keeps you informed from the
            moment your shipment is created until it safely reaches its destination.

          </p>

        </div>

        {/* Timeline */}

        <div className="relative mt-24">

          {/* Line */}

          <div className="absolute left-0 right-0 top-16 hidden h-1 rounded-full bg-orange-100 lg:block" />

          <div className="grid gap-10 lg:grid-cols-4">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="group relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm transition duration-500 hover:-translate-y-3 hover:border-orange-400 hover:shadow-2xl"
                >

                  {/* Glow */}

                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-orange-100 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

                  {/* Number */}

                  <div className="absolute left-8 top-0 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-orange-500 text-lg font-black text-white shadow-lg">

                    {index + 1}

                  </div>

                  {/* Icon */}

                  <div className="mt-8 flex h-18 w-18 items-center justify-center rounded-3xl bg-orange-100 transition group-hover:bg-orange-500">

                    <Icon
                      size={34}
                      className="text-orange-500 group-hover:text-white"
                    />

                  </div>

                  <h3 className="mt-8 text-2xl font-bold text-slate-900">

                    {step.title}

                  </h3>

                  <p className="mt-5 leading-8 text-slate-600">

                    {step.description}

                  </p>

                  <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-orange-500">

                    <CheckCircle2 size={18} />

                    Verified Stage

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* Bottom Banner */}

        <div className="mt-24 rounded-[36px] bg-slate-950 px-12 py-14 text-white">

          <div className="grid items-center gap-10 lg:grid-cols-2">

            <div>

              <h3 className="text-4xl font-black">

                Real-Time Tracking Powered By ParcelTrack

              </h3>

              <p className="mt-5 leading-8 text-slate-300">

                Every shipment event is recorded instantly, giving you
                complete visibility, automated notifications and accurate
                delivery updates anywhere in the world.

              </p>

            </div>

            <div className="flex justify-center lg:justify-end">

              <button className="flex items-center gap-3 rounded-2xl bg-orange-500 px-8 py-4 font-semibold transition hover:bg-orange-600">

                Start Tracking

                <ArrowRight size={20} />

              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}