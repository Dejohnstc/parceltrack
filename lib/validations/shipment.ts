import { z } from "zod";
import { ShipmentStatus } from "@prisma/client";

export const shipmentSchema = z.object({
  /* -------------------------------------------------------------------------- */
  /*                                   Sender                                   */
  /* -------------------------------------------------------------------------- */

  senderName: z
    .string()
    .min(2, "Sender name is required."),

  senderEmail: z
    .string()
    .email("Invalid sender email."),

  senderPhone: z.string().optional(),

  senderAddress: z.string().optional(),

  /* -------------------------------------------------------------------------- */
  /*                                  Receiver                                  */
  /* -------------------------------------------------------------------------- */

  receiverName: z
    .string()
    .min(2, "Receiver name is required."),

  receiverEmail: z
    .string()
    .email("Invalid receiver email."),

  receiverPhone: z.string().optional(),

  receiverAddress: z.string().optional(),

  /* -------------------------------------------------------------------------- */
  /*                                    Route                                   */
  /* -------------------------------------------------------------------------- */

  origin: z
    .string()
    .min(2, "Origin is required."),

  destination: z
    .string()
    .min(2, "Destination is required."),

  currentLocation: z.string().optional(),

  /* -------------------------------------------------------------------------- */
  /*                                   Package                                  */
  /* -------------------------------------------------------------------------- */

  weight: z.coerce
    .number()
    .positive("Weight must be greater than 0."),

  service: z
    .string()
    .min(2, "Service is required."),

  packageType: z.string().optional(),

  packageDescription: z.string().optional(),

  pieces: z.coerce
    .number()
    .int()
    .positive()
    .default(1),

  /* -------------------------------------------------------------------------- */
  /*                                  Delivery                                  */
  /* -------------------------------------------------------------------------- */

  expectedDelivery: z.date().optional(),

  /* -------------------------------------------------------------------------- */
  /*                              Tracking Update                               */
  /* -------------------------------------------------------------------------- */

  description: z.string().optional(),

  status: z.nativeEnum(ShipmentStatus),
});

export type ShipmentInput = z.input<
  typeof shipmentSchema
>;

export type ShipmentData = z.output<
  typeof shipmentSchema
>;