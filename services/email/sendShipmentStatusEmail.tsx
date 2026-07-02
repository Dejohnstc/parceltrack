import ShipmentStatusEmail from "@/lib/email/templates/ShipmentStatusEmail";
import { sendMail } from "@/lib/sendMail";

interface SendShipmentStatusEmailProps {
  email: string;
  name: string;
  trackingNumber: string;
  status: string;
  location: string;
  description: string;
}

export async function sendShipmentStatusEmail({
  email,
  name,
  trackingNumber,
  status,
  location,
  description,
}: SendShipmentStatusEmailProps) {
  await sendMail({
    to: email,
    subject: `Shipment Update • ${trackingNumber}`,
    react: (
      <ShipmentStatusEmail
        name={name}
        trackingNumber={trackingNumber}
        status={status}
        location={location}
        description={description}
      />
    ),
  });
}