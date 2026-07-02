import { Text, Button } from "@react-email/components";

import EmailLayout from "./EmailLayout";

interface ShipmentCreatedEmailProps {
  name: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  expectedDelivery?: Date | null;
}

export default function ShipmentCreatedEmail({
  name,
  trackingNumber,
  origin,
  destination,
  expectedDelivery,
}: ShipmentCreatedEmailProps) {
  return (
    <EmailLayout
      preview="Your shipment has been created"
      title="Shipment Created Successfully"
    >
      <Text>Hello {name},</Text>

      <Text>
        Great news! A shipment has been created for you.
      </Text>

      <Text>
        <strong>Tracking Number:</strong>{" "}
        {trackingNumber}
      </Text>

      <Text>
        <strong>Origin:</strong> {origin}
      </Text>

      <Text>
        <strong>Destination:</strong> {destination}
      </Text>

      <Text>
        <strong>Estimated Delivery:</strong>{" "}
        {expectedDelivery
          ? expectedDelivery.toLocaleDateString()
          : "To Be Announced"}
      </Text>

      <Button
        href={`${process.env.APP_URL}/track/${trackingNumber}`}
        style={{
          background: "#f97316",
          color: "#ffffff",
          padding: "14px 28px",
          borderRadius: "8px",
          textDecoration: "none",
          display: "inline-block",
          marginTop: "20px",
        }}
      >
        Track Shipment
      </Button>

      <Text style={{ marginTop: "30px" }}>
        You will automatically receive email updates whenever your shipment status changes.
      </Text>

      <Text>
        Thank you for choosing ParcelTrack.
      </Text>
    </EmailLayout>
  );
}