import { Text, Button } from "@react-email/components";

import EmailLayout from "./EmailLayout";

interface ShipmentStatusEmailProps {
  name: string;
  trackingNumber: string;
  status: string;
  location: string;
  description: string;
}

export default function ShipmentStatusEmail({
  name,
  trackingNumber,
  status,
  location,
  description,
}: ShipmentStatusEmailProps) {
  return (
    <EmailLayout
      preview="Your shipment has been updated"
      title="Shipment Status Updated"
    >
      <Text>Hello {name},</Text>

      <Text>
        Your shipment has received a new tracking update.
      </Text>

      <Text>
        <strong>Tracking Number:</strong>{" "}
        {trackingNumber}
      </Text>

      <Text>
        <strong>Status:</strong> {status}
      </Text>

      <Text>
        <strong>Current Location:</strong> {location}
      </Text>

      <Text>
        <strong>Update:</strong> {description}
      </Text>

      <Button
        href={`${process.env.APP_URL}/track/${trackingNumber}`}
        style={{
          background: "#f97316",
          color: "#fff",
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
        Thank you for choosing ValidXpress.
      </Text>
    </EmailLayout>
  );
}