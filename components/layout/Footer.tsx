import Container from "./Container";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t bg-slate-950 text-white">
      <Container className="py-16">

        <div className="grid gap-10 md:grid-cols-4">

          <div>
            <Logo />

            <p className="mt-5 text-sm leading-7 text-slate-400">
              Professional parcel tracking and logistics platform built for
              speed, security and reliability.
            </p>
          </div>

          <div>
            <h3 className="mb-5 font-semibold">Company</h3>

            <ul className="space-y-3 text-slate-400">
              <li>About</li>
              <li>Services</li>
              <li>Pricing</li>
              <li>Careers</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-semibold">Support</h3>

            <ul className="space-y-3 text-slate-400">
              <li>Track Parcel</li>
              <li>Contact</li>
              <li>FAQs</li>
              <li>Help Center</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-semibold">Newsletter</h3>

            <input
              className="w-full rounded-xl bg-slate-900 p-3 outline-none"
              placeholder="Email address"
            />

            <button className="mt-3 w-full rounded-xl bg-orange-500 py-3 font-semibold">
              Subscribe
            </button>
          </div>

        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} ParcelTrack. All rights reserved.
        </div>

      </Container>
    </footer>
  );
}