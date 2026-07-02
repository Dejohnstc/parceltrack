import {
  Plane,
  Truck,
  Ship,
  PackageCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Air Freight",
    description:
      "Time-critical international air cargo with end-to-end tracking and priority handling.",
    features: [
      "Priority Cargo",
      "Global Network",
      "Express Customs",
    ],
  },
  {
    icon: Truck,
    title: "Ground Logistics",
    description:
      "Reliable nationwide transportation backed by intelligent route optimization.",
    features: [
      "Next-Day Delivery",
      "Fleet Tracking",
      "Scheduled Routes",
    ],
  },
  {
    icon: Ship,
    title: "Ocean Freight",
    description:
      "Scalable sea freight solutions for commercial cargo and international trade.",
    features: [
      "Container Shipping",
      "Port-to-Port",
      "Cost Efficient",
    ],
  },
  {
    icon: PackageCheck,
    title: "Express Delivery",
    description:
      "Premium same-day and next-day delivery services with live parcel monitoring.",
    features: [
      "Same Day",
      "Real-Time Updates",
      "Guaranteed Delivery",
    ],
  },
];

export default function Services() {
  return (
    <section className="relative overflow-hidden bg-white py-28">
      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,.06),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <span className="inline-flex rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">

            Premium Logistics Services

          </span>

          <h2 className="mt-6 text-5xl font-black tracking-tight text-slate-900">

            Everything You Need To
            <span className="block text-orange-500">
              Move Freight Worldwide
            </span>

          </h2>

          <p className="mt-8 text-xl leading-9 text-slate-600">

            From express parcel delivery to international freight,
            ParcelTrack provides enterprise logistics solutions with
            complete shipment visibility.

          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-4">

          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-500 hover:-translate-y-3 hover:border-orange-400 hover:shadow-2xl"
              >
                {/* Glow */}

                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-orange-100 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

                {/* Icon */}

                <div className="relative flex h-18 w-18 items-center justify-center rounded-3xl bg-orange-100 transition group-hover:bg-orange-500">

                  <Icon
                    size={34}
                    className="text-orange-500 group-hover:text-white"
                  />

                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">

                  {service.title}

                </h3>

                <p className="mt-4 leading-8 text-slate-600">

                  {service.description}

                </p>

                <div className="mt-8 space-y-3">

                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-orange-500"
                      />

                      <span className="text-sm font-medium text-slate-700">
                        {feature}
                      </span>
                    </div>
                  ))}

                </div>

                <button className="mt-10 flex items-center gap-2 font-semibold text-orange-500 transition group-hover:gap-3">

                  Learn More

                  <ArrowRight size={18} />

                </button>

              </div>
            );
          })}

        </div>

        {/* Bottom Statistics */}

        <div className="mt-24 rounded-[36px] bg-slate-950 px-10 py-14">

          <div className="grid gap-10 text-center md:grid-cols-4">

            <div>
              <h3 className="text-5xl font-black text-white">
                150+
              </h3>

              <p className="mt-2 text-slate-400">
                Countries Covered
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-black text-white">
                1M+
              </h3>

              <p className="mt-2 text-slate-400">
                Deliveries Completed
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-black text-white">
                99%
              </h3>

              <p className="mt-2 text-slate-400">
                Customer Satisfaction
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-black text-white">
                24/7
              </h3>

              <p className="mt-2 text-slate-400">
                Logistics Support
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}