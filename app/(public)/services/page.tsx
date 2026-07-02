import PageHeader from "@/components/common/PageHeader";

export default function ServicesPage() {
  const services = [
    {
      title: "Express Delivery",
      description:
        "Fast and secure express shipping for urgent deliveries.",
    },
    {
      title: "Standard Shipping",
      description:
        "Affordable shipping solution for everyday deliveries.",
    },
    {
      title: "International Freight",
      description:
        "Worldwide parcel and freight transportation services.",
    },
    {
      title: "Warehousing",
      description:
        "Secure storage and inventory management solutions.",
    },
    {
      title: "Package Tracking",
      description:
        "Real-time shipment tracking from pickup to delivery.",
    },
    {
      title: "Business Logistics",
      description:
        "Custom logistics solutions for businesses of every size.",
    },
  ];

  return (
    <main className="container mx-auto py-16">
      <PageHeader
        title="Our Services"
        description="Reliable logistics and courier services tailored to your needs."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h2 className="text-xl font-semibold">
              {service.title}
            </h2>

            <p className="mt-3 text-slate-600">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}