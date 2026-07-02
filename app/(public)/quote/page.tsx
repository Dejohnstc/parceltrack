import PageHeader from "@/components/common/PageHeader";

export default function QuotePage() {
  return (
    <main className="container mx-auto py-16">
      <PageHeader
        title="Request a Quote"
        description="Tell us about your shipment and we'll prepare a quote."
      />

      <div className="mt-10 rounded-xl border bg-white p-8">
        Quote request form coming soon.
      </div>
    </main>
  );
}