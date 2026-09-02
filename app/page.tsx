import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TrackingProcess from "@/components/home/TrackingProcess";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "Global Shipment & Package Tracking",
  description:
    "Track your shipment worldwide with ValidXpress. Get real-time package tracking, shipment status updates, delivery information, and secure logistics solutions.",
  alternates: {
    canonical: "https://www.validxpress.net",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <TrackingProcess />
        <Stats />
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </>
  );
}