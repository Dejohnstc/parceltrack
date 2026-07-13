import { Text, Button } from "@react-email/components";

import EmailLayout from "./EmailLayout";

interface VerifyEmailProps {
  name: string;
  verifyUrl: string;
}

export default function VerifyEmail({
  name,
  verifyUrl,
}: VerifyEmailProps) {
  return (
    <EmailLayout
      preview="Verify your ValidXpress account"
      title="Verify Your Email"
    >
      <Text>Hello {name},</Text>

      <Text>
        Welcome to ValidXprress! Thank you for creating an account.
      </Text>

      <Text>
        Please verify your email address by clicking the button below.
      </Text>

      <Button
        href={verifyUrl}
        style={{
          background: "#f97316",
          color: "#ffffff",
          padding: "14px 28px",
          borderRadius: "8px",
          textDecoration: "none",
          display: "inline-block",
          marginTop: "20px",
          fontWeight: "600",
        }}
      >
        Verify Email
      </Button>

      <Text style={{ marginTop: "30px" }}>
        If you didn&apos;t create this account, you can safely ignore this email.
      </Text>

      <Text>
        Thank you,
        <br />
        <strong>ValidXpress Team</strong>
      </Text>
    </EmailLayout>
  );
}