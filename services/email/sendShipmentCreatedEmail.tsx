import ShipmentCreatedEmail from "@/lib/email/templates/ShipmentCreated";
import { sendMail } from "@/lib/sendMail";

interface SendShipmentCreatedEmailProps {
  email: string;
  name: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  expectedDelivery?: Date | null;
}

export async function sendShipmentCreatedEmail({
  email,
  name,
  trackingNumber,
  origin,
  destination,
  expectedDelivery,
}: SendShipmentCreatedEmailProps) {
  await sendMail({
    to: email,
    subject: `Your Shipment Has Been Created • ${trackingNumber}`,
    react: (
      <ShipmentCreatedEmail
        name={name}
        trackingNumber={trackingNumber}
        origin={origin}
        destination={destination}
        expectedDelivery={expectedDelivery}
      />
    ),
  });
}