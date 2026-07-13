import { Text, Button } from "@react-email/components";

import EmailLayout from "./EmailLayout";

interface WelcomeEmailProps {
  name: string;
  loginUrl: string;
  companyName?: string;
  logo?: string;
  supportEmail?: string;
}

export default function WelcomeEmail({
  name,
  loginUrl,
  companyName,
  logo,
  supportEmail,
}: WelcomeEmailProps) {
  return (
    <EmailLayout
      preview="Welcome to ValidXpress"
      title={`Welcome, ${name}!`}
      companyName={companyName}
      logo={logo}
      supportEmail={supportEmail}
    >
      <Text>
        Your account has been created
        successfully.
      </Text>

      <Text>
        You can now log in to track
        shipments, manage deliveries, and
        receive shipment updates.
      </Text>

      <Button
        href={loginUrl}
        style={{
          background: "#f97316",
          color: "#fff",
          padding: "14px 26px",
          borderRadius: "8px",
          textDecoration: "none",
          marginTop: "20px",
          display: "inline-block",
        }}
      >
        Login to Your Account
      </Button>

      <Text style={{ marginTop: "30px" }}>
        Thank you for choosing us.
      </Text>
    </EmailLayout>
  );
}