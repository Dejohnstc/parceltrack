"use client";

import Link from "next/link";
import { Menu, User, CreditCard } from "lucide-react";
import { useState } from "react";

import Container from "./Container";
import Logo from "./Logo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Track", href: "/track" },
  { label: "Shipment Fee", href: "/shipment-fee" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-lg">
      <Container className="flex h-20 items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-slate-600 transition hover:text-orange-500"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            className="rounded-xl border border-slate-300 px-5 py-2.5 font-medium transition hover:bg-slate-100"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-orange-500 px-5 py-2.5 font-medium text-white transition hover:bg-orange-600"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu />
        </button>
      </Container>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t bg-white lg:hidden">
          <Container className="flex flex-col py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-slate-700 transition hover:text-orange-500"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/login"
              className="mt-4 flex items-center gap-2 rounded-lg border p-3 transition hover:bg-slate-50"
              onClick={() => setOpen(false)}
            >
              <User size={18} />
              Login
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}