import ShipmentForm from "@/components/shipment/ShipmentForm";

export default function CreateShipmentPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}

      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 p-8 text-white shadow-xl">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.25em] text-orange-100">
            Shipment Management
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Create Shipment
          </h1>

          <p className="mt-4 text-lg text-orange-100">
            Register a new shipment, assign the sender and
            receiver, and automatically generate a tracking
            number for real-time parcel monitoring.
          </p>
        </div>
      </div>

      <ShipmentForm />
    </div>
  );
}