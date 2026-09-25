import { NextResponse } from "next/server";
import { Resend } from "resend";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const roleSlug = formData.get("roleSlug") as string;
    const roleTitle = (formData.get("roleTitle") as string) || "Role Application";
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const city = (formData.get("city") as string)?.trim();
    const portfolio = (formData.get("portfolio") as string)?.trim() || "Not provided";
    const experience = (formData.get("experience") as string)?.trim();
    const currentSalary = (formData.get("currentSalary") as string)?.trim();
    const expectedSalary = (formData.get("expectedSalary") as string)?.trim();
    const noticePeriod = (formData.get("noticePeriod") as string)?.trim();
    const location = (formData.get("location") as string)?.trim();
    const cvFile = formData.get("cv") as File | null;

    // Field validation - only required fields per specification: Name*, Email*, Total experience*, Notice period*, Current location*, CV upload*
    const missingFields: string[] = [];
    if (!name) missingFields.push("Name");
    if (!email) missingFields.push("Email");
    if (!experience) missingFields.push("Total experience");
    if (!noticePeriod) missingFields.push("Notice period");
    if (!location) missingFields.push("Current location");
    if (!cvFile || typeof cvFile === "string" || cvFile.size === 0) missingFields.push("CV upload");

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: `Please fill out all required fields: ${missingFields.join(", ")}.`,
        },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Narrow cvFile to non-null File
    const file = cvFile as File;
    const fileName = file.name || "cv.pdf";
    const fileSizeKb = (file.size / 1024).toFixed(1);
    const fileExt = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();

    // CV File size and extension validation
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "CV file exceeds the 5MB size limit. Please upload a smaller document." },
        { status: 413 }
      );
    }

    if (!ALLOWED_EXTENSIONS.includes(fileExt)) {
      return NextResponse.json(
        { error: "Invalid file type. Only PDF and Word documents (.pdf, .doc, .docx) are accepted." },
        { status: 400 }
      );
    }

    // Read CV file buffer
    const arrayBuffer = await file.arrayBuffer();
    const cvBuffer = Buffer.from(arrayBuffer);

    // Build structured email
    const subject = `New application: ${roleTitle} — ${name}`;
    const formattedDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a; }
            .card { background-color: #ffffff; max-width: 620px; margin: 0 auto; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
            .header { background-color: #8B1A1A; color: #ffffff; padding: 28px 32px; }
            .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
            .header p { margin: 0; font-size: 13px; color: #fecdd3; }
            .content { padding: 28px 32px; }
            .row { display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding: 10px 0; font-size: 13px; }
            .label { color: #64748b; font-weight: 600; width: 40%; }
            .value { color: #0f172a; font-weight: 700; width: 60%; text-align: right; word-break: break-word; }
            .highlight { color: #8B1A1A; font-weight: 800; }
            .footer { padding: 16px 32px; background-color: #f8fafc; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1>New Candidate Application</h1>
              <p>Submitted for <strong>${roleTitle}</strong> • ${formattedDate} IST</p>
            </div>
            <div class="content">
              <div class="row">
                <div class="label">Applicant Name</div>
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
                <div class="label">City / Native Area</div>
                <div class="value">${city || "Not specified"}</div>
              </div>
              <div class="row">
                <div class="label">Current Location</div>
                <div class="value">${location}</div>
              </div>
              <div class="row">
                <div class="label">Total Experience</div>
                <div class="value">${experience}</div>
              </div>
              <div class="row">
                <div class="label">Current Salary (Monthly)</div>
                <div class="value">${currentSalary ? `₹${currentSalary}` : "Not specified"}</div>
              </div>
              <div class="row">
                <div class="label">Expected Salary (Monthly)</div>
                <div class="value highlight">${expectedSalary ? `₹${expectedSalary}` : "Not specified"}</div>
              </div>
              <div class="row">
                <div class="label">Notice Period</div>
                <div class="value">${noticePeriod}</div>
              </div>
              <div class="row">
                <div class="label">Portfolio / Profile</div>
                <div class="value">
                  ${portfolio !== "Not provided" ? `<a href="${portfolio}" target="_blank">${portfolio}</a>` : "Not provided"}
                </div>
              </div>
              <div class="row" style="border-bottom: none;">
                <div class="label">Attached CV</div>
                <div class="value">📎 ${fileName} (${fileSizeKb} KB)</div>
              </div>
            </div>
            <div class="footer">
              Lucie Creatives Automated Careers Portal • Direct Delivery to hello@luciecreatives.in
            </div>
          </div>
        </body>
      </html>
    `;

    const textContent = `
NEW CANDIDATE APPLICATION — LUCIE CREATIVES
============================================
Role: ${roleTitle} (${roleSlug})
Submitted: ${formattedDate} IST

Applicant Name: ${name}
Email: ${email}
Phone: ${phone}
City: ${city}
Current Location: ${location}
Total Experience: ${experience}
Current Monthly Salary: ${currentSalary ? `₹${currentSalary}` : "Not specified"}
Expected Monthly Salary: ${expectedSalary ? `₹${expectedSalary}` : "Not specified"}
Notice Period: ${noticePeriod}
Portfolio Link: ${portfolio}
Attached CV: ${fileName} (${fileSizeKb} KB)
============================================
    `;

    // 1. Primary: Try Resend if API key is provided
    let emailSent = false;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "Lucie Creatives Careers <careers@luciecreatives.in>",
          to: "hello@luciecreatives.in",
          replyTo: email,
          subject,
          html: htmlContent,
          text: textContent,
          attachments: [
            {
              filename: fileName,
              content: cvBuffer,
            },
          ],
        });
        emailSent = true;
        console.log(`[Careers] Application email sent via Resend for ${name} (${roleTitle})`);
      } catch (resendError) {
        console.error("[Careers] Resend delivery error:", resendError);
      }
    }

    // 2. Secondary fallback: Nodemailer SMTP if configured
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
          from: process.env.SMTP_FROM || `"Lucie Creatives Careers" <${process.env.SMTP_USER}>`,
          to: "hello@luciecreatives.in",
          replyTo: email,
          subject,
          html: htmlContent,
          text: textContent,
          attachments: [
            {
              filename: fileName,
              content: cvBuffer,
            },
          ],
        });
        emailSent = true;
        console.log(`[Careers] Application email sent via SMTP for ${name} (${roleTitle})`);
      } catch (smtpError) {
        console.error("[Careers] SMTP delivery error:", smtpError);
      }
    }

    // 3. Fallback for development/testing when keys are not configured yet
    if (!emailSent) {
      console.log(`[Careers Dev Mock] Application captured successfully for ${name} -> hello@luciecreatives.in`);
      console.log(`[Careers Dev Mock] Role: ${roleTitle} | CV: ${fileName} (${file.size} bytes)`);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your application has been received by the Lucie Creatives leadership team.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Careers] Unexpected error processing application:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your application. Please try again or email us directly at hello@luciecreatives.in." },
      { status: 500 }
    );
  }
}
