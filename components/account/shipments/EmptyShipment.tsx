import { Package } from "lucide-react";

export default function EmptyShipment() {
  return (
    <div className="rounded-3xl bg-white py-20 text-center shadow-lg">
      <Package className="mx-auto h-16 w-16 text-slate-300" />

      <h2 className="mt-6 text-2xl font-bold">
        No Shipments Found
      </h2>

      <p className="mt-3 text-slate-500">
        There are no shipments matching your search or filter.
      </p>
    </div>
  );
}