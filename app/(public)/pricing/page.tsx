import PageHeader from "@/components/common/PageHeader";

export default function PricingPage() {
  return (
    <main className="container mx-auto py-16">
      <PageHeader
        title="Pricing"
        description="Simple and transparent shipping rates."
      />

      <div className="mt-10 rounded-xl border bg-white p-8">
        <p className="text-slate-600">
          Pricing depends on shipment weight, destination,
          service type, and delivery speed.
        </p>
      </div>
    </main>
  );
}