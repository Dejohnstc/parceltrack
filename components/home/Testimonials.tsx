import {
  Star,
  Quote,
  ArrowRight,
} from "lucide-react";

const testimonials = [
  {
    name: "Michael Johnson",
    company: "Global Imports Ltd.",
    message:
      "ParcelTrack has completely transformed the way we manage international shipments. The tracking is fast, accurate and reliable.",
  },
  {
    name: "Sarah Williams",
    company: "E-Commerce Store",
    message:
      "Our customers love the real-time updates. Deliveries are smoother and our support requests have dropped dramatically.",
  },
  {
    name: "David Brown",
    company: "Retail Distributor",
    message:
      "We've shipped thousands of packages through ParcelTrack. The platform gives us complete visibility from pickup to delivery.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-white py-28">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,.06),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">
            Client Success Stories
          </span>

          <h2 className="mt-6 text-5xl font-black tracking-tight text-slate-900">
            Trusted By Companies
            <span className="block text-orange-500">
              Around The World
            </span>
          </h2>

          <p className="mt-8 text-xl leading-9 text-slate-600">
            Businesses rely on ParcelTrack every day to move freight,
            monitor deliveries and keep customers informed with
            real-time shipment visibility.
          </p>

        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {testimonials.map((item) => (

            <div
              key={item.name}
              className="group relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm transition duration-500 hover:-translate-y-3 hover:border-orange-400 hover:shadow-2xl"
            >

              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-orange-100 opacity-0 blur-3xl transition group-hover:opacity-100" />

              <Quote
                className="text-orange-500"
                size={42}
              />

              <div className="mt-6 flex">

                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-orange-400 text-orange-400"
                  />
                ))}

              </div>

             <p className="mt-8 leading-8 text-slate-600 italic">
  &ldquo;{item.message}&rdquo;
</p>

              <div className="mt-10 flex items-center justify-between">

                <div>

                  <h4 className="text-lg font-bold text-slate-900">
                    {item.name}
                  </h4>

                  <p className="text-slate-500">
                    {item.company}
                  </p>

                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-xl font-bold text-white">
                  {item.name.charAt(0)}
                </div>

              </div>

            </div>

          ))}

        </div>

        {/* Bottom Trust Banner */}

        <div className="mt-24 rounded-[36px] bg-slate-950 px-12 py-14 text-white">

          <div className="grid items-center gap-10 lg:grid-cols-2">

            <div>

              <h3 className="text-4xl font-black">
                Join Thousands Of Businesses
              </h3>

              <p className="mt-5 leading-8 text-slate-300">
                Experience enterprise-grade shipment tracking,
                automated notifications and complete logistics
                visibility with ParcelTrack.
              </p>

            </div>

            <div className="flex justify-center lg:justify-end">

              <button className="flex items-center gap-3 rounded-2xl bg-orange-500 px-8 py-4 font-semibold transition hover:bg-orange-600">

                Get Started Today

                <ArrowRight size={20} />

              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}