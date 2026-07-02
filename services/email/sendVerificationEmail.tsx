import VerifyEmail from "@/lib/email/templates/VerifyEmail";
import { sendMail } from "@/lib/sendMail";

export async function sendVerificationEmail(
  email: string,
  name: string,
  token: string
) {
  const verifyUrl =
    `${process.env.APP_URL}/verify-email/${token}`;

  await sendMail({
    to: email,
    subject: "Verify Your ParcelTrack Account",
    react: (
      <VerifyEmail
        name={name}
        verifyUrl={verifyUrl}
      />
    ),
  });
}