import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { Resend } from "resend";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Check payload size limit (max 50KB)
    if (JSON.stringify(body).length > 50000) {
      return NextResponse.json(
        { error: "Payload size limit exceeded." },
        { status: 413 }
      );
    }

    // Validate request schema
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, company, phone, service, budget, message, hp_website } =
      result.data;

    // Honeypot anti-spam check
    if (hp_website && hp_website.length > 0) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const formattedDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const subject = `New Project Inquiry: ${service} — ${name}`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a; }
            .card { background-color: #ffffff; max-width: 620px; margin: 0 auto; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
            .header { background-color: #7A1F2B; color: #ffffff; padding: 28px 32px; }
            .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
            .header p { margin: 0; font-size: 13px; color: #fecdd3; }
            .content { padding: 28px 32px; }
            .row { display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding: 10px 0; font-size: 13px; }
            .label { color: #64748b; font-weight: 600; width: 35%; }
            .value { color: #0f172a; font-weight: 700; width: 65%; text-align: right; word-break: break-word; }
            .message-block { margin-top: 16px; padding: 16px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; font-size: 13px; line-height: 1.6; color: #334155; }
            .footer { padding: 16px 32px; background-color: #f8fafc; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1>New Client Inquiry</h1>
              <p>Submitted via luciecreatives.in • ${formattedDate} IST</p>
            </div>
            <div class="content">
              <div class="row">
                <div class="label">Client Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="row">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="row">
                <div class="label">Phone Number</div>
                <div class="value">${phone ? `<a href="tel:${phone}">${phone}</a>` : "Not provided"}</div>
              </div>
              <div class="row">
                <div class="label">Company / Brand</div>
                <div class="value">${company || "Not provided"}</div>
              </div>
              <div class="row">
                <div class="label">Selected Service</div>
                <div class="value">${service}</div>
              </div>
              <div class="row">
                <div class="label">Budget Range</div>
                <div class="value">${budget || "Not specified"}</div>
              </div>
              <div class="message-block">
                <strong>Project Brief / Message:</strong><br />
                ${message.replace(/\n/g, "<br />")}
              </div>
            </div>
            <div class="footer">
              Lucie Creatives Lead Delivery System • Delivered to hello@luciecreatives.in
            </div>
          </div>
        </body>
      </html>
    `;

    const textContent = `
NEW CLIENT INQUIRY — LUCIE CREATIVES
====================================
Service: ${service}
Submitted: ${formattedDate} IST

Client Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Company: ${company || "Not provided"}
Budget: ${budget || "Not specified"}

Message:
${message}
====================================
    `;

    let emailSent = false;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "Lucie Creatives Inquiries <inquiries@luciecreatives.in>",
          to: "hello@luciecreatives.in",
          replyTo: email,
          subject,
          html: htmlContent,
          text: textContent,
        });
        emailSent = true;
        console.log(`[Contact] Inquiry delivered via Resend for ${name} (${service})`);
      } catch (resendError) {
        console.error("[Contact] Resend delivery error:", resendError);
      }
    }

    if (!emailSent && process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || `"Lucie Creatives Inquiries" <${process.env.SMTP_USER}>`,
          to: "hello@luciecreatives.in",
          replyTo: email,
          subject,
          html: htmlContent,
          text: textContent,
        });
        emailSent = true;
        console.log(`[Contact] Inquiry delivered via SMTP for ${name} (${service})`);
      } catch (smtpError) {
        console.error("[Contact] SMTP delivery error:", smtpError);
      }
    }

    if (!emailSent) {
      console.log(`[Contact Lead Captured] ${name} <${email}> | Service: ${service} | Budget: ${budget || "N/A"}`);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out. The Lucie Creatives team will contact you shortly.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Contact] Unexpected error processing inquiry:", error);
    return NextResponse.json(
      {
        error: "An unexpected error occurred while processing your request. Please email us directly at hello@luciecreatives.in.",
      },
      { status: 500 }
    );
  }
}
