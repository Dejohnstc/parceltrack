import { Text, Button } from "@react-email/components";

import EmailLayout from "./EmailLayout";

interface ResetPasswordEmailProps {
  name: string;
  resetUrl: string;
}

export default function ResetPasswordEmail({
  name,
  resetUrl,
}: ResetPasswordEmailProps) {
  return (
    <EmailLayout
      preview="Reset your ParcelTrack password"
      title="Reset Your Password"
    >
      <Text>Hello {name},</Text>

      <Text>
        We received a request to reset your ParcelTrack
        account password.
      </Text>

      <Text>
        Click the button below to create a new password.
      </Text>

      <Button
        href={resetUrl}
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
        Reset Password
      </Button>

      <Text style={{ marginTop: "30px" }}>
        This reset link expires in 30 minutes.
      </Text>

      <Text>
        If you didn&apos;t  request this password reset, you can
        safely ignore this email.
      </Text>
    </EmailLayout>
  );
}