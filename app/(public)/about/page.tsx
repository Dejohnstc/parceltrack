import Link from "next/link";

import {
  ArrowRight,
  Globe2,
  PackageCheck,
  ShieldCheck,
  Target,
  Truck,
  Users,
  Zap,
} from "lucide-react";

import PageHeader from "@/components/common/PageHeader";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-orange-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-300">
              <Globe2 className="h-4 w-4" />
              About ValidXpress
            </div>

            <PageHeader
              title="Moving What Matters, Wherever It Needs to Go."
              description="ValidXpress combines modern shipment tracking technology with dependable logistics management to make every delivery more visible, organized, and connected."
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
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
              Who We Are
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Logistics built around visibility and trust.
            </h2>

            <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
              <p>
                ValidXpress is a shipment tracking and logistics platform
                designed to make the movement of parcels easier to understand
                from dispatch through delivery.
              </p>

              <p>
                We bring shipment information together in one place, giving
                customers access to tracking updates, delivery progress,
                shipment details, and important status information.
              </p>

              <p>
                Our approach combines technology, structured logistics
                management, and customer-focused support to create a smoother
                shipping experience for individuals and businesses.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] bg-gradient-to-br from-orange-500 to-orange-700 p-1 shadow-2xl">
              <div className="rounded-[1.8rem] bg-slate-950 p-8 text-white sm:p-10">
                <Globe2 className="h-12 w-12 text-orange-400" />

                <h3 className="mt-8 text-2xl font-bold">
                  Connected Logistics
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  From shipment creation to final delivery, ValidXpress is
                  designed to provide a clear view of where a shipment is and
                  how it is progressing.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <PackageCheck className="h-6 w-6 text-orange-400" />
                    <p className="mt-3 text-sm text-slate-400">
                      Shipment
                    </p>
                    <p className="mt-1 font-semibold">
                      Visibility
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <ShieldCheck className="h-6 w-6 text-orange-400" />
                    <p className="mt-3 text-sm text-slate-400">
                      Customer
                    </p>
                    <p className="mt-1 font-semibold">
                      Support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                <Target className="h-7 w-7" />
              </div>

              <h2 className="mt-7 text-2xl font-bold text-slate-900">
                Our Mission
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                Our mission is to simplify the shipping experience by
                connecting reliable logistics management with accessible
                tracking technology. We aim to give customers clearer
                information throughout the journey of their shipments.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                <Zap className="h-7 w-7" />
              </div>

              <h2 className="mt-7 text-2xl font-bold text-slate-900">
                Our Vision
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                We envision a more connected delivery experience where
                customers and businesses can easily access meaningful shipment
                information and stay informed as their packages move through
                the logistics process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            What Guides Us
          </p>

          <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Built around the things that matter.
          </h2>

          <p className="mt-5 leading-7 text-slate-600">
            Every part of the ValidXpress experience is designed around
            clarity, reliability, security, and customer service.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <ValueCard
            icon={<ShieldCheck className="h-7 w-7" />}
            title="Reliability"
            description="We focus on providing dependable shipment information and organized logistics processes."
          />

          <ValueCard
            icon={<PackageCheck className="h-7 w-7" />}
            title="Transparency"
            description="Customers should be able to understand the status and progress of their shipments."
          />

          <ValueCard
            icon={<Users className="h-7 w-7" />}
            title="Customer First"
            description="We put clear communication and accessible support at the center of the customer experience."
          />

          <ValueCard
            icon={<Zap className="h-7 w-7" />}
            title="Innovation"
            description="We use modern technology to make shipment management and tracking easier."
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
                The ValidXpress Experience
              </p>

              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                A simpler way to follow every shipment.
              </h2>

              <p className="mt-5 leading-8 text-slate-400">
                Shipment information can change throughout the delivery
                journey. ValidXpress brings those updates together so that
                customers can follow the progress of their shipments without
                unnecessary complexity.
              </p>

              <Link
                href="/track"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-semibold text-white transition hover:bg-orange-600"
              >
                Check Shipment Status
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-4">
              <Step
                number="01"
                title="Shipment Created"
                description="Shipment details are recorded and a tracking number is generated."
              />

              <Step
                number="02"
                title="Shipment Updates"
                description="As the shipment progresses, tracking events and location information can be updated."
              />

              <Step
                number="03"
                title="Delivery Progress"
                description="Customers can follow the shipment's journey toward its destination."
              />

              <Step
                number="04"
                title="Delivered"
                description="The tracking journey is completed when the shipment reaches its destination."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Logistics CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-orange-500 to-orange-700 px-8 py-12 shadow-2xl sm:px-12 lg:px-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="text-white">
              <div className="flex items-center gap-3">
                <Truck className="h-8 w-8" />

                <span className="font-semibold">
                  ValidXpress Logistics
                </span>
              </div>

              <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
                Your shipment journey, clearly connected.
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-orange-50">
                Whether you&apos;re checking a shipment, managing delivery
                information, or looking for assistance, ValidXpress gives you
                a central place to stay informed.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href="/track"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-orange-600 transition hover:bg-orange-50"
              >
                Track Shipment
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 font-semibold text-white transition hover:bg-white/20"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500 font-bold text-white">
        {number}
      </div>

      <div>
        <h3 className="font-bold text-white">{title}</h3>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}