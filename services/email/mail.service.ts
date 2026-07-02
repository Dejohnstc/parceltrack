import { ReactElement } from "react";
import { render } from "@react-email/render";

import { resend } from "@/lib/resend";

interface SendMailOptions {
  to: string;
  subject: string;
  react: ReactElement;
}

export async function sendMail({
  to,
  subject,
  react,
}: SendMailOptions) {
  const html = await render(react);

  return resend.emails.send({
    from: process.env.MAIL_FROM!,
    to,
    subject,
    html,
  });
}