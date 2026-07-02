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
  try {
    const html = await render(react);

  

    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to,
      subject,
      html,
    });



    return result;
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    throw error;
  }
}