import ResetPasswordEmail from "@/lib/email/templates/ResetPassword";

import { sendMail } from "@/lib/sendMail";

export async function sendResetPasswordEmail(
  email: string,
  name: string,
  token: string
) {
  const resetUrl =
    `${process.env.APP_URL}/reset-password/${token}`;

  await sendMail({
    to: email,

    subject: "Reset Your ParcelTrack Password",

    react: (
      <ResetPasswordEmail
        name={name}
        resetUrl={resetUrl}
      />
    ),
  });
}