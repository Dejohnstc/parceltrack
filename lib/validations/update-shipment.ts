import { ShipmentStatus } from "@prisma/client";
import { z } from "zod";

export const updateShipmentSchema = z.object({
  /* -------------------------------------------------------------------------- */
  /*                             Shipment Status                                */
  /* -------------------------------------------------------------------------- */

  status: z.nativeEnum(ShipmentStatus, {
    message: "Please select a valid shipment status.",
  }),

  /* -------------------------------------------------------------------------- */
  /*                             Current Location                               */
  /* -------------------------------------------------------------------------- */

  currentLocation: z
    .string()
    .trim()
    .min(2, "Current location is required.")
    .max(120, "Location is too long."),

  /* -------------------------------------------------------------------------- */
  /*                           Tracking Description                             */
  /* -------------------------------------------------------------------------- */

  description: z
    .string()
    .trim()
    .min(5, "Tracking description is required.")
    .max(500, "Description is too long."),

  /* -------------------------------------------------------------------------- */
  /*                           Expected Delivery                                */
  /* -------------------------------------------------------------------------- */

  expectedDelivery: z.date().optional(),
});

export type UpdateShipmentInput = z.infer<
  typeof updateShipmentSchema
>;