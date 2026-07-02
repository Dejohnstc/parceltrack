import PageHeader from "@/components/common/PageHeader";

export default function AboutPage() {
  return (
    <main className="container mx-auto py-16">
      <PageHeader
        title="About Us"
        description="Delivering parcels safely across the globe."
      />

      <div className="mt-8 max-w-3xl space-y-6 text-slate-600">
        <p>
          We provide reliable courier and logistics services for
          individuals and businesses, combining technology with
          efficient delivery networks.
        </p>

        <p>
          Our mission is to make shipping simple, secure, and
          transparent through real-time tracking and professional
          logistics management.
        </p>
      </div>
    </main>
  );
}