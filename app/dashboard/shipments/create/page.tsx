import ShipmentForm from "@/components/shipment/ShipmentForm";

export default function CreateShipmentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Create Shipment
        </h1>

        <p className="mt-2 text-slate-500">
          Create a new shipment and generate a tracking number.
        </p>
      </div>

      <ShipmentForm />
    </div>
  );
}