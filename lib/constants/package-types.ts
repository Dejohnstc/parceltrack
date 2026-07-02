export const PACKAGE_TYPES = [
  "Document",
  "Parcel",
  "Pallet",
  "Freight",
  "Electronics",
  "Fragile",
] as const;

export type PackageType =
  (typeof PACKAGE_TYPES)[number];