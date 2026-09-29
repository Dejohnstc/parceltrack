import Link from "next/link";

import Container from "./Container";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t bg-slate-950 text-white">
      <Container className="py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Logo />

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Professional parcel tracking and logistics platform built for
              speed, security and reliability.
            </p>

            <Link
              href="/track"
              className="mt-6 inline-flex items-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Track Your Shipment
            </Link>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 font-semibold text-white">
              Company
            </h3>

            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link
                  href="/about"
                  className="transition hover:text-orange-400"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/services"
                  className="transition hover:text-orange-400"
                >
                  Our Services
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-orange-400"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="transition hover:text-orange-400"
                >
                  Home
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-5 font-semibold text-white">
              Support
            </h3>

            <ul className="space-y-3 text-sm text-slate-400">

              <li>
                <Link
                  href="/track"
                  className="transition hover:text-orange-400"
                >
                  Track Parcel
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-orange-400"
                >
                  Contact Support
                </Link>
              </li>

              <li>
                <a
                  href="https://tawk.to/chat/6abaaae14c69e23447f4d503/1k3kin0mq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-orange-400"
                >
                  Live Chat
                </a>
              </li>

              <li>
                <a
                  href="tel:+14156367424"
                  className="transition hover:text-orange-400"
                >
                  +1 (415) 636-7424
                </a>
              </li>

            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h3 className="mb-5 font-semibold text-white">
              Stay Connected
            </h3>

            <p className="mb-4 text-sm leading-6 text-slate-400">
              Get important shipment updates and logistics information
              delivered to your inbox.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-3"
            >
              <input
                type="email"
                placeholder="Email address"
                aria-label="Email address"
                className="w-full rounded-xl border border-slate-800 bg-slate-900 p-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-orange-500"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                Subscribe
              </button>
            </form>

            <a
              href="mailto:support@validxpress.com"
              className="mt-4 block text-sm text-slate-400 transition hover:text-orange-400"
            >
              support@validxpress.com
            </a>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-6 text-center text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:text-left">

          <p>
            © {new Date().getFullYear()} ValidXpress. All rights reserved.
          </p>

          <div className="flex justify-center gap-6 md:justify-end">
            <Link
              href="/"
              className="transition hover:text-orange-400"
            >
              Privacy
            </Link>

            <Link
              href="/"
              className="transition hover:text-orange-400"
            >
              Terms
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-orange-400"
            >
              Support
            </Link>
          </div>

        </div>

      </Container>
    </footer>
  );
}