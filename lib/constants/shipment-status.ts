export const SHIPMENT_STATUSES = [
  "Pending",
  "Shipment Created",
  "Picked Up",
  "At Origin Facility",
  "In Transit",
  "Arrived At Hub",
  "Customs Clearance",
  "Out For Delivery",
  "Delivered",
  "Delayed",
  "Failed Delivery",
  "Returned",
] as const;

export type ShipmentStatus =
  (typeof SHIPMENT_STATUSES)[number];