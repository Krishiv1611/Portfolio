import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;
    const name = payload.name?.trim() ?? "";
    const email = payload.email?.trim() ?? "";
    const message = payload.message?.trim() ?? "";

    if (name.length < 2 || !emailPattern.test(email) || message.length < 10) {
      return NextResponse.json(
        { message: "Please provide a valid name, email, and message." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

    if (!apiKey || !to) {
      return NextResponse.json(
        { message: "Contact form is configured, but email environment variables are missing." },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#0f172a">
          <h2>New portfolio inquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
        </div>
      `
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    return NextResponse.json({ message: "Message sent. I will get back to you soon." });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to send message." },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
