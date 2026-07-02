export const SERVICE_TYPES = [
  "Express",
  "Standard",
  "Economy",
  "Same Day",
  "Overnight",
] as const;

export type ServiceType =
  (typeof SERVICE_TYPES)[number];