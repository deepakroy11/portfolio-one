import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { ContactEmailTemplate } from "@/components/email-template";

// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return new Response("Resend API key missing", { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    const { name, email, message } = await req.json();

    // Validate the request data
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    //TODO: Need to comfigure the Domain on Resent and Hostinger
    const { data, error } = await resend.emails.send({
      from: `Portfolio Contact <${process.env.FROM_EMAIL}>`,
      to: [process.env.CONTACT_EMAIL || "deepakroy11@gmail.com"],
      subject: `New Contact Form Message from ${name}`,
      react: ContactEmailTemplate({ name, email, message }),
      replyTo: email,
    });

    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
