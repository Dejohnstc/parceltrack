import PageHeader from "@/components/common/PageHeader";

export default function ContactPage() {
  return (
    <main className="container mx-auto py-16">
      <PageHeader
        title="Contact Us"
        description="We're here to help."
      />

      <div className="mt-10 rounded-xl border bg-white p-8">
        <p>Email: support@parceltrack.com</p>
        <p>Phone: +1 (000) 000-0000</p>
      </div>
    </main>
  );
}