export default function TrustedPartners() {
  const partners = [
    "Amazon",
    "FedEx",
    "DHL",
    "UPS",
    "Maersk",
    "Alibaba",
    "Shopify",
    "Microsoft",
  ];

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24">

      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,.08),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="inline-flex rounded-full bg-orange-500/10 px-5 py-2 text-sm font-semibold text-orange-400">

            Global Partnerships

          </span>

          <h2 className="mt-6 text-5xl font-black tracking-tight text-white">

            Trusted By
            <span className="block text-orange-500">
              Industry Leaders
            </span>

          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-slate-300">

            ParcelTrack works alongside businesses,
            logistics providers and enterprise partners
            around the world to deliver secure, reliable
            and intelligent shipping solutions.

          </p>

        </div>

        {/* Logo Grid */}

        <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">

          {partners.map((partner) => (

            <div
              key={partner}
              className="group rounded-3xl border border-white/10 bg-white/5 px-8 py-10 text-center backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-orange-500 hover:bg-white/10"
            >

              <h3 className="text-2xl font-black tracking-wide text-white transition group-hover:text-orange-400">

                {partner}

              </h3>

            </div>

          ))}

        </div>

        {/* Bottom Banner */}

        <div className="mt-24 rounded-[36px] border border-white/10 bg-white/5 px-12 py-14 backdrop-blur-xl">

          <div className="grid items-center gap-10 lg:grid-cols-3">

            <div>

              <h3 className="text-4xl font-black text-white">

                Growing Together

              </h3>

              <p className="mt-5 leading-8 text-slate-300">

                We continuously expand our logistics
                partnerships to provide faster deliveries,
                greater shipment visibility and seamless
                international transportation.

              </p>

            </div>

            <div className="text-center">

              <h2 className="text-6xl font-black text-orange-500">

                220+

              </h2>

              <p className="mt-2 text-slate-300">

                Countries Connected

              </p>

            </div>

            <div className="text-center">

              <h2 className="text-6xl font-black text-orange-500">

                1,200+

              </h2>

              <p className="mt-2 text-slate-300">

                Global Business Partners

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}