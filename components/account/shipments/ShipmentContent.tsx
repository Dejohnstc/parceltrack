"use client";

import { useMemo, useState } from "react";
import { Shipment } from "@prisma/client";

import ShipmentFilters from "./ShipmentFilters";
import ShipmentTable from "./ShipmentTable";
import MobileShipmentCards from "./MobileShipmentCard";
import EmptyShipment from "./EmptyShipment";

interface ShipmentsContentProps {
  shipments: Shipment[];
}

export default function ShipmentsContent({
  shipments,
}: ShipmentsContentProps) {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("ALL");

  const filteredShipments = useMemo(() => {
    return shipments.filter((shipment) => {
      const matchesSearch =
        shipment.trackingNumber
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "ALL" ||
        shipment.status === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [shipments, search, status]);

  return (
    <div className="space-y-6">

      <ShipmentFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      {filteredShipments.length === 0 ? (
        <EmptyShipment />
      ) : (
        <>
          <div className="hidden lg:block">
            <ShipmentTable
              shipments={filteredShipments}
            />
          </div>

          <div className="space-y-5 lg:hidden">
            <MobileShipmentCards
              shipments={filteredShipments}
            />
          </div>
        </>
      )}

    </div>
  );
}