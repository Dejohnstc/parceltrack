"use client";

import Link from "next/link";

import {
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ArrowRight,
  Headphones,
  PackageSearch,
  ShieldCheck,
  Globe2,
} from "lucide-react";

import PageHeader from "@/components/common/PageHeader";

declare global {
  interface Window {
    Tawk_API?: {
      maximize?: () => void;
    };
  }
}

export default function ContactPage() {
  function openLiveChat() {
    if (typeof window !== "undefined" && window.Tawk_API?.maximize) {
      window.Tawk_API.maximize();
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-orange-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-300">
              <Headphones className="h-4 w-4" />
              ValidXpress Customer Support
            </div>

            <PageHeader
              title="We're Here to Help"
              description="Whether you need help tracking a shipment, have a delivery question, or need assistance with our services, our support team is ready to help."
            />

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={openLiveChat}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 hover:shadow-orange-500/30"
              >
                <MessageCircle className="h-5 w-5" />
                Start Live Chat
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>

              <a
                href="tel:+14156367424"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                <Phone className="h-5 w-5" />
                Call Support
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Phone */}
          <a
            href="tel:+14156367424"
            className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
              <Phone className="h-7 w-7" />
            </div>

            <p className="mt-6 text-sm font-medium uppercase tracking-wider text-slate-400">
              Phone Support
            </p>

            <h2 className="mt-2 text-xl font-bold text-slate-900">
              +1 (415) 636-7424
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Speak directly or text with our customer support team.
            </p>

            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-600">
              Call us
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </a>

          {/* Email */}
          <a
            href="mailto:support@validxpress.com"
            className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
              <Mail className="h-7 w-7" />
            </div>

            <p className="mt-6 text-sm font-medium uppercase tracking-wider text-slate-400">
              Email Support
            </p>

            <h2 className="mt-2 break-all text-xl font-bold text-slate-900">
              support@validxpress.net
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Send us your questions and our team will get back to you.
            </p>

            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-600">
              Send an email
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </a>

          {/* Live Chat */}
          <button
            type="button"
            onClick={openLiveChat}
            className="group text-left rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600">
              <MessageCircle className="h-7 w-7" />
            </div>

            <p className="mt-6 text-sm font-medium uppercase tracking-wider text-slate-400">
              Live Chat
            </p>

            <h2 className="mt-2 text-xl font-bold text-slate-900">
              Chat With Support
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Need an answer quickly? Start a conversation with our support
              team.
            </p>

            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-600">
              Start conversation
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </section>

      {/* Support Information */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Office */}
          <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
              <MapPin className="h-6 w-6" />
            </div>

            <h2 className="mt-6 text-xl font-bold text-slate-900">
              Head Office
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              130 Loeeroy St
              <br />
              New York, NY 10014
              <br />
              United States
            </p>

            <a
              href="https://www.google.com/maps/search/?api=1&query=130+Loeeroy+St,+New+York,+NY+10014"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
            >
              View on map
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Hours */}
          <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
              <Clock3 className="h-6 w-6" />
            </div>

            <h2 className="mt-6 text-xl font-bold text-slate-900">
              Support Hours
            </h2>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b pb-3">
                <span className="text-slate-500">Monday – Friday</span>
                <span className="font-semibold text-slate-900">
                  9:00 AM – 6:00 PM
                </span>
              </div>

              <div className="flex justify-between gap-4 border-b pb-3">
                <span className="text-slate-500">Saturday</span>
                <span className="font-semibold text-slate-900">
                  10:00 AM – 4:00 PM
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Sunday</span>
                <span className="font-semibold text-slate-900">
                  Closed
                </span>
              </div>
            </div>
          </div>

          {/* Shipment Help */}
          <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-orange-700 p-8 text-white shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
              <PackageSearch className="h-6 w-6" />
            </div>

            <h2 className="mt-6 text-xl font-bold">
              Need Help Tracking?
            </h2>

            <p className="mt-3 text-sm leading-6 text-orange-50">
              Have a tracking number? You can check your shipment status,
              current location, delivery progress and tracking history online.
            </p>

           <Link
  href="/track"
  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
>
  Track Your Shipment
  <ArrowRight className="h-4 w-4" />
</Link>
          </div>
        </div>
      </section>

      {/* Why Contact Us */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-10 md:grid-cols-3">
            <div className="text-center">
              <ShieldCheck className="mx-auto h-10 w-10 text-orange-500" />

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                Secure Support
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Our support channels are designed to help you with your
                shipment information securely.
              </p>
            </div>

            <div className="text-center">
              <Headphones className="mx-auto h-10 w-10 text-orange-500" />

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                Dedicated Assistance
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Get assistance with tracking, deliveries, shipment updates and
                general questions.
              </p>
            </div>

            <div className="text-center">
              <Globe2 className="mx-auto h-10 w-10 text-orange-500" />

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                Global Service
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                ValidXpress provides shipment tracking and logistics support
                through our online platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Still need assistance?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
            Our support team is ready to help. Start a live conversation or
            contact us directly using one of the channels above.
          </p>

          <button
            type="button"
            onClick={openLiveChat}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-7 py-3.5 font-semibold text-white transition hover:bg-orange-600"
          >
            <MessageCircle className="h-5 w-5" />
            Chat With ValidXpress
          </button>
        </div>
      </section>
    </main>
  );
}