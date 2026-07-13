import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Img,
  Hr,
  Link,
  Preview,
} from "@react-email/components";

interface EmailLayoutProps {
  preview: string;
  title: string;
  children: React.ReactNode;
  companyName?: string;
  logo?: string;
  supportEmail?: string;
}

export default function EmailLayout({
  preview,
  title,
  children,
  companyName = "ValidXpress",
  logo,
  supportEmail = "support@validxpress.com",
}: EmailLayoutProps) {
  return (
    <Html>
      <Head />

      <Preview>{preview}</Preview>

      <Body
        style={{
          backgroundColor: "#f3f4f6",
          fontFamily:
            "Arial, Helvetica, sans-serif",
          padding: "40px 0",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            maxWidth: "650px",
            margin: "0 auto",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
          }}
        >
          {/* Header */}

          <Section
            style={{
              background:
                "linear-gradient(90deg,#f97316,#ea580c)",
              textAlign: "center",
              padding: "40px",
            }}
          >
            {logo && (
              <Img
                src={logo}
                alt={companyName}
                width="80"
                style={{
                  margin: "0 auto 18px",
                }}
              />
            )}

            <Text
              style={{
                color: "#ffffff",
                fontSize: "30px",
                fontWeight: "700",
                margin: 0,
              }}
            >
              {companyName}
            </Text>

            <Text
              style={{
                color: "#ffedd5",
                marginTop: "10px",
                fontSize: "16px",
              }}
            >
              Smart Logistics & Shipment Tracking
            </Text>
          </Section>

          {/* Content */}

          <Section
            style={{
              padding: "40px",
            }}
          >
            <Text
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#111827",
                marginBottom: "30px",
              }}
            >
              {title}
            </Text>

            {children}
          </Section>

          <Hr />

          {/* Footer */}

          <Section
            style={{
              padding: "30px 40px",
              background: "#fafafa",
            }}
          >
            <Text
              style={{
                color: "#6b7280",
                fontSize: "14px",
                lineHeight: 1.8,
              }}
            >
              Need help?
            </Text>

            <Text
              style={{
                color: "#111827",
                fontSize: "15px",
                marginTop: "8px",
              }}
            >
              <Link
                href={`mailto:${supportEmail}`}
              >
                {supportEmail}
              </Link>
            </Text>

            <Text
              style={{
                color: "#9ca3af",
                marginTop: "30px",
                fontSize: "13px",
              }}
            >
              © {new Date().getFullYear()}{" "}
              {companyName}. All rights
              reserved.
            </Text>

            <Text
              style={{
                color: "#9ca3af",
                fontSize: "12px",
                marginTop: "10px",
              }}
            >
              This email was sent
              automatically. Please do not
              reply directly to this message.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}