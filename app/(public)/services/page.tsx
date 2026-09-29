import Link from "next/link";

import {
  ArrowRight,
  Boxes,
  Building2,
  CheckCircle2,
  Globe2,
  Package,
  PackageCheck,
  Route,
  ShieldCheck,
  Truck,
  Warehouse,
  Zap,
} from "lucide-react";

import PageHeader from "@/components/common/PageHeader";

const services = [
  {
    title: "Express Delivery",
    description:
      "Fast and carefully managed delivery solutions for time-sensitive shipments that need to move efficiently.",
    icon: Zap,
    features: [
      "Priority shipment handling",
      "Fast delivery coordination",
      "Shipment status visibility",
    ],
  },
  {
    title: "Standard Shipping",
    description:
      "Reliable and cost-conscious shipping for everyday packages, documents, and general deliveries.",
    icon: Package,
    features: [
      "Flexible delivery options",
      "Shipment tracking",
      "Organized delivery management",
    ],
  },
  {
    title: "International Freight",
    description:
      "Shipment management designed for parcels and freight moving across international destinations.",
    icon: Globe2,
    features: [
      "International shipment coordination",
      "Freight tracking",
      "Destination visibility",
    ],
  },
  {
    title: "Warehousing",
    description:
      "Secure storage and organized inventory solutions designed to support businesses and their supply chains.",
    icon: Warehouse,
    features: [
      "Secure storage",
      "Inventory organization",
      "Shipment preparation",
    ],
  },
  {
    title: "Package Tracking",
    description:
      "Follow your shipment journey with tracking information designed to keep you informed from dispatch to delivery.",
    icon: Route,
    features: [
      "Tracking number lookup",
      "Shipment status updates",
      "Delivery progress visibility",
    ],
  },
  {
    title: "Business Logistics",
    description:
      "Flexible logistics support for businesses that need dependable shipment management and delivery coordination.",
    icon: Building2,
    features: [
      "Business shipment management",
      "Delivery coordination",
      "Scalable logistics support",
    ],
  },
];

const process = [
  {
    number: "01",
    title: "Shipment Created",
    description:
      "Shipment information is recorded and a unique tracking number is generated.",
  },
  {
    number: "02",
    title: "Pickup & Processing",
    description:
      "The shipment enters the delivery process and its status can be updated as it moves.",
  },
  {
    number: "03",
    title: "In Transit",
    description:
      "Track shipment progress and view available location and status updates.",
  },
  {
    number: "04",
    title: "Delivery",
    description:
      "The shipment reaches its destination and the delivery journey is completed.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-orange-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-300">
              <Truck className="h-4 w-4" />
              ValidXpress Logistics Services
            </div>

            <PageHeader
              title="Logistics Solutions Built Around Your Shipment."
              description="From everyday deliveries to international freight and business logistics, ValidXpress provides a connected approach to shipment management, tracking, and delivery visibility."
            />

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/track"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
              >
                Track a Shipment
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
              What We Provide
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              One platform for a more connected shipping experience.
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-600">
              ValidXpress brings shipment information, tracking visibility, and
              logistics management together to help customers and businesses
              stay informed throughout the delivery journey.
            </p>

            <div className="mt-8 space-y-4">
              <Feature text="Shipment tracking and status visibility" />
              <Feature text="Organized delivery and logistics management" />
              <Feature text="Support for individual and business shipments" />
              <Feature text="Clear shipment information from dispatch to delivery" />
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-slate-200">
            <div className="grid gap-5 sm:grid-cols-2">
              <StatCard
                icon={<PackageCheck className="h-6 w-6" />}
                title="Shipment"
                value="Visibility"
              />

              <StatCard
                icon={<Route className="h-6 w-6" />}
                title="Delivery"
                value="Tracking"
              />

              <StatCard
                icon={<Globe2 className="h-6 w-6" />}
                title="Global"
                value="Logistics"
              />

              <StatCard
                icon={<ShieldCheck className="h-6 w-6" />}
                title="Customer"
                value="Support"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
              Our Services
            </p>

            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Solutions for every stage of the shipment journey.
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Explore the services available through the ValidXpress
              logistics platform.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="group rounded-3xl border border-slate-200 bg-slate-50 p-7 transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:bg-white hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 transition group-hover:bg-orange-500 group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {service.description}
                  </p>

                  <div className="mt-6 space-y-3 border-t border-slate-200 pt-5">
                    {service.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />

                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
                How It Works
              </p>

              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                From shipment creation to delivery.
              </h2>

              <p className="mt-5 leading-8 text-slate-400">
                ValidXpress is designed to make the shipment journey easier to
                follow by organizing important shipment information and
                tracking updates along the way.
              </p>

              <Link
                href="/track"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-semibold text-white transition hover:bg-orange-600"
              >
                Track Your Shipment
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {process.map((item) => (
                <div
                  key={item.number}
                  className="flex gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500 font-bold text-white">
                    {item.number}
                  </div>

                  <div>
                    <h3 className="font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business Logistics */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
          <div className="grid lg:grid-cols-2">
            <div className="bg-gradient-to-br from-orange-500 to-orange-700 p-8 text-white sm:p-12">
              <Building2 className="h-10 w-10" />

              <h2 className="mt-8 text-3xl font-bold">
                Logistics support for growing businesses.
              </h2>

              <p className="mt-5 leading-8 text-orange-50">
                Businesses often need more than a single delivery option.
                ValidXpress provides a centralized approach to shipment
                management and tracking that can support different types of
                delivery needs.
              </p>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-orange-600 transition hover:bg-orange-50"
              >
                Discuss Your Needs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="p-8 sm:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                Business Benefits
              </p>

              <div className="mt-7 space-y-6">
                <Benefit
                  icon={<Boxes className="h-6 w-6" />}
                  title="Organized Shipment Management"
                  description="Keep shipment information structured and accessible throughout the delivery process."
                />

                <Benefit
                  icon={<Route className="h-6 w-6" />}
                  title="Delivery Visibility"
                  description="Follow shipment progress and access available tracking updates."
                />

                <Benefit
                  icon={<ShieldCheck className="h-6 w-6" />}
                  title="Reliable Support"
                  description="Access customer support when you need assistance with shipment information."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
            <Truck className="h-8 w-8" />
          </div>

          <h2 className="mt-7 text-3xl font-bold text-slate-900 sm:text-4xl">
            Ready to follow your shipment?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Use your tracking number to access available shipment status and
            delivery information through ValidXpress.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/track"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
            >
              Track a Shipment
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-orange-500" />

      <span className="text-sm font-medium text-slate-700">
        {text}
      </span>
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
        {icon}
      </div>

      <p className="mt-5 text-sm text-slate-500">{title}</p>

      <p className="mt-1 text-lg font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function Benefit({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
        {icon}
      </div>

      <div>
        <h3 className="font-bold text-slate-900">{title}</h3>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}