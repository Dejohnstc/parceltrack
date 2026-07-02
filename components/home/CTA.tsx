import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-orange-500 py-24">
      <div className="mx-auto max-w-5xl px-6 text-center text-white">
        <h2 className="text-4xl font-bold lg:text-5xl">
          Ready to Track Your Shipment?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-orange-100">
          Get real-time shipment updates, delivery notifications, and complete
          visibility from pickup to delivery.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/track"
            className="rounded-xl bg-white px-8 py-4 font-semibold text-orange-500 transition hover:bg-slate-100"
          >
            Track Shipment
          </Link>

          <Link
            href="/register"
            className="rounded-xl border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-orange-500"
          >
            Create Account
          </Link>
        </div>
      </div>
    </section>
  );
}