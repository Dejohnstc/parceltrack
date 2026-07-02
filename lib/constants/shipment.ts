import { ShipmentStatus } from "@prisma/client";

export const SERVICES = [
  "Express",
  "Standard",
  "Economy",
  "Overnight",
] as const;

export { ShipmentStatus };