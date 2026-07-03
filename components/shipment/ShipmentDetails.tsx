import {
  Shipment,
  TrackingEvent,
} from "@prisma/client";

import ShipmentInfo from "./ShipmentInfo";
import UpdateStatusCard from "./UpdateStatusCard";

interface ShipmentDetailsProps {
  shipment: Shipment & {
    trackingEvents: TrackingEvent[];
  };

  isAdmin?: boolean;
}

export default function ShipmentDetails({
  shipment,
  isAdmin = false,
}: ShipmentDetailsProps) {
  if (!isAdmin) {
    return <ShipmentInfo shipment={shipment} />;
  }

  return (
    <>
      {/* Mobile Update Card */}

      <div className="mb-6 lg:hidden">
        <UpdateStatusCard
          shipmentId={shipment.id}
          currentStatus={shipment.status}
          currentLocation={shipment.currentLocation}
        />
      </div>

      {/* Desktop Layout */}

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="order-2 lg:order-1 lg:col-span-2">
          <ShipmentInfo shipment={shipment} />
        </div>

        <div className="order-1 hidden lg:block">
          <div className="sticky top-6">
            <UpdateStatusCard
              shipmentId={shipment.id}
              currentStatus={shipment.status}
              currentLocation={shipment.currentLocation}
            />
          </div>
        </div>
      </div>
    </>
  );
}