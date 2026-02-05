"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export async function sendContactEmail(data: ContactFormData) {
  try {
    await resend.emails.send({
      from: "KeraLux <send@keralux.se>",
      to: "info@keralux.se",
      replyTo: data.email,
      subject: `Kontaktformulär: ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Nytt meddelande från kontaktformuläret</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px;"><strong>Namn:</strong> ${data.name}</p>
            <p style="margin: 0 0 10px;"><strong>Email:</strong> ${data.email}</p>
          </div>
          
          <div style="background: #fff; border: 1px solid #e5e5e5; padding: 20px; border-radius: 8px;">
            <p style="margin: 0 0 10px;"><strong>Meddelande:</strong></p>
            <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Skickat via keralux.se kontaktformulär
          </p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Contact email error:", error);
    return { success: false, error: "Kunde inte skicka meddelandet" };
  }
}
