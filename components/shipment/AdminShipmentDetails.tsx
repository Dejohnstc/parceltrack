import {
  Shipment,
  TrackingEvent,
} from "@prisma/client";

import ShipmentInfo from "./ShipmentInfo";
import UpdateStatusCard from "./UpdateStatusCard";

interface AdminShipmentDetailsProps {
  shipment: Shipment & {
    trackingEvents: TrackingEvent[];
  };
}

export default function AdminShipmentDetails({
  shipment,
}: AdminShipmentDetailsProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <ShipmentInfo shipment={shipment} />
      </div>

      <div className="sticky top-6 h-fit">
        <UpdateStatusCard
          shipmentId={shipment.id}
          currentStatus={shipment.status}
          currentLocation={shipment.currentLocation}
        />
      </div>
    </div>
  );
}