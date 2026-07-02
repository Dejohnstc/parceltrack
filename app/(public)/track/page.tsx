import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import TrackingSearch from "@/components/tracking/TrackingSearch";

export default function TrackPage() {
  return (
    <>
      <Navbar />

      <main className="bg-slate-100 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <TrackingSearch />
        </div>
      </main>

      <Footer />
    </>
  );
}