import {
  Clock3,
  Globe2,
  ShieldCheck,
  Headphones,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: Globe2,
    title: "Global Logistics Network",
    description:
      "Operate across more than 220 countries with a dependable international delivery infrastructure.",
  },
  {
    icon: Clock3,
    title: "Lightning Fast Delivery",
    description:
      "Smart routing and optimized operations ensure your shipments arrive on schedule.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Every shipment is protected with secure handling, verification and real-time monitoring.",
  },
  {
    icon: Headphones,
    title: "24/7 Expert Support",
    description:
      "Dedicated logistics specialists are available around the clock whenever you need assistance.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-white py-28">

      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,.05),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* LEFT */}

          <div>

            <span className="inline-flex rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">

              Why Businesses Choose ParcelTrack

            </span>

            <h2 className="mt-6 text-5xl font-black tracking-tight text-slate-900">

              Delivering More Than
              <span className="block text-orange-500">
                Just Packages
              </span>

            </h2>

            <p className="mt-8 text-xl leading-9 text-slate-600">

              Combining intelligent shipment tracking,
              enterprise-grade logistics technology and a
              worldwide delivery network to keep your business
              moving with confidence.

            </p>

            <div className="mt-14 grid gap-8 sm:grid-cols-2">

              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-500 hover:-translate-y-2 hover:border-orange-400 hover:shadow-xl"
                  >

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 transition group-hover:bg-orange-500">

                      <Icon
                        size={30}
                        className="text-orange-500 group-hover:text-white"
                      />

                    </div>

                    <h3 className="mt-6 text-xl font-bold text-slate-900">

                      {feature.title}

                    </h3>

                    <p className="mt-4 leading-8 text-slate-600">

                      {feature.description}

                    </p>

                  </div>
                );
              })}

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative">

            {/* Floating Card */}

            <div className="absolute -left-8 top-8 z-20 rounded-2xl border border-white/10 bg-white px-5 py-4 shadow-2xl">

              <div className="flex items-center gap-3">

                <CheckCircle2
                  className="text-green-500"
                  size={22}
                />

                <div>

                  <p className="text-xs uppercase text-slate-500">
                    Shipment Status
                  </p>

                  <h4 className="font-bold">
                    Active & Secure
                  </h4>

                </div>

              </div>

            </div>

            <div className="rounded-[36px] bg-slate-950 p-10 text-white shadow-[0_35px_90px_rgba(0,0,0,.35)]">

              <h3 className="text-4xl font-black">

                Logistics Performance

              </h3>

              <p className="mt-3 text-slate-400">

                Real-time operational performance across our
                worldwide delivery network.

              </p>

              <div className="mt-12 space-y-8">

                {[
                  ["Successful Deliveries", "99.8%", "w-[99%]", "bg-green-500"],
                  ["Live Tracking Accuracy", "99.9%", "w-full", "bg-orange-500"],
                  ["Customer Satisfaction", "98.9%", "w-[98%]", "bg-blue-500"],
                ].map(([title, value, width, color]) => (

                  <div key={title}>

                    <div className="mb-3 flex justify-between">

                      <span>{title}</span>

                      <strong>{value}</strong>

                    </div>

                    <div className="h-3 rounded-full bg-white/10">

                      <div
                        className={`h-3 rounded-full ${width} ${color}`}
                      />

                    </div>

                  </div>

                ))}

              </div>

              <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-slate-400">

                      Monthly Shipments

                    </p>

                    <h2 className="mt-2 text-5xl font-black">

                      84,215

                    </h2>

                  </div>

                  <ArrowRight
                    className="text-orange-500"
                    size={40}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}