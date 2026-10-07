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
    const message = (formData.get("message") as string)?.trim() || (formData.get("coverLetter") as string)?.trim() || "";
    const cvFile = formData.get("cv") as File | null;

    // Field validation - required fields: Name*, Email*, Total experience*, Notice period*, Current location*, CV upload*
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

    const formattedDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const applicantMessage = message || "Application submitted via the Lucie Creatives career portal. CV document attached for evaluation.";

    // =========================================================================
    // 1. INTERNAL TEAM NOTIFICATION TEMPLATE (Delivered TO hello@luciecreatives.in)
    // =========================================================================
    const internalHtml = `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light only" />
  <meta name="supported-color-schemes" content="light only" />
  <title>New Application – Lucie Creatives</title>
</head>

<body style="margin:0;padding:0;background-color:#f4f1f1;-webkit-text-size-adjust:100%;">

  <!-- Preheader -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#ffffff;">
    ${name} just applied for ${roleTitle} at Lucie Creatives.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
         style="background-color:#f4f1f1;">
    <tr>
      <td align="center" style="padding:32px 12px;">

        <!-- Main Card -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
               style="width:100%;max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;">

          <!-- Maroon Top Bar -->
          <tr>
            <td height="8"
                style="height:8px;line-height:8px;font-size:0;background-color:#800000;">
              &nbsp;
            </td>
          </tr>

          <!-- Logo -->
          <tr>
            <td align="left"
                style="padding:36px 40px 8px 40px;background-color:#ffffff;">

              <img
                src="https://res.cloudinary.com/oct7txvw/image/upload/f_auto,q_auto,w_400/v1791402408/lucie-creatives/brand/lucie-creatives-logo-transparent.png"
                alt="Lucie Creatives."
                width="190"
                style="display:block;width:190px;max-width:100%;height:auto;border:0;outline:none;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:bold;color:#800000;"
              />

            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td style="padding:28px 40px 0 40px;font-family:Arial,Helvetica,sans-serif;">

              <p style="margin:0 0 10px 0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#800000;font-weight:bold;">
                New Application &bull; Internal
              </p>

              <h1 style="margin:0;font-size:28px;line-height:36px;color:#1a1a1a;font-weight:800;">
                ${name} applied for ${roleTitle}.
              </h1>

              <p style="margin:10px 0 0 0;font-size:14px;color:#777777;">
                Submitted on ${formattedDate} IST
              </p>

            </td>
          </tr>

          <!-- Applicant Details -->
          <tr>
            <td style="padding:28px 40px 0 40px;">

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                     style="background-color:#fbf5f5;border:1px solid #ecd6d6;border-radius:12px;">

                <tr>
                  <td style="padding:20px 24px;font-family:Arial,Helvetica,sans-serif;">

                    <p style="margin:0 0 14px 0;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#800000;font-weight:bold;">
                      Applicant Details
                    </p>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">

                      <!-- Name -->
                      <tr>
                        <td width="36%" valign="top"
                            style="padding:7px 0;font-size:14px;color:#777777;">
                          Full Name
                        </td>

                        <td valign="top"
                            style="padding:7px 0;font-size:14px;color:#1a1a1a;font-weight:bold;">
                          ${name}
                        </td>
                      </tr>

                      <!-- Email -->
                      <tr>
                        <td valign="top"
                            style="padding:7px 0;font-size:14px;color:#777777;">
                          Email
                        </td>

                        <td valign="top"
                            style="padding:7px 0;font-size:14px;font-weight:bold;">
                          <a
                            href="mailto:${email}"
                            style="color:#800000;text-decoration:none;"
                          >
                            ${email}
                          </a>
                        </td>
                      </tr>

                      <!-- Phone -->
                      <tr>
                        <td valign="top"
                            style="padding:7px 0;font-size:14px;color:#777777;">
                          Phone / WhatsApp
                        </td>

                        <td valign="top"
                            style="padding:7px 0;font-size:14px;color:#1a1a1a;font-weight:bold;">
                          ${phone ? `<a href="tel:${phone}" style="color:#1a1a1a;text-decoration:none;">${phone}</a>` : "Not provided"}
                        </td>
                      </tr>

                      <!-- Role -->
                      <tr>
                        <td valign="top"
                            style="padding:7px 0;font-size:14px;color:#777777;">
                          Role
                        </td>

                        <td valign="top"
                            style="padding:7px 0;font-size:14px;color:#1a1a1a;font-weight:bold;">
                          ${roleTitle}
                        </td>
                      </tr>

                      <!-- Experience -->
                      <tr>
                        <td valign="top"
                            style="padding:7px 0;font-size:14px;color:#777777;">
                          Experience
                        </td>

                        <td valign="top"
                            style="padding:7px 0;font-size:14px;color:#1a1a1a;font-weight:bold;">
                          ${experience}
                        </td>
                      </tr>

                      <!-- Location -->
                      <tr>
                        <td valign="top"
                            style="padding:7px 0;font-size:14px;color:#777777;">
                          Location
                        </td>

                        <td valign="top"
                            style="padding:7px 0;font-size:14px;color:#1a1a1a;font-weight:bold;">
                          ${location}${city ? ` (${city})` : ""}
                        </td>
                      </tr>

                      <!-- Notice Period -->
                      <tr>
                        <td valign="top"
                            style="padding:7px 0;font-size:14px;color:#777777;">
                          Notice Period
                        </td>

                        <td valign="top"
                            style="padding:7px 0;font-size:14px;color:#1a1a1a;font-weight:bold;">
                          ${noticePeriod}
                        </td>
                      </tr>

                      ${currentSalary || expectedSalary ? `
                      <!-- Salary Details -->
                      <tr>
                        <td valign="top"
                            style="padding:7px 0;font-size:14px;color:#777777;">
                          Salary (Current / Exp)
                        </td>

                        <td valign="top"
                            style="padding:7px 0;font-size:14px;color:#1a1a1a;font-weight:bold;">
                          ${currentSalary ? `₹${currentSalary}` : "N/A"} / <span style="color:#800000;">${expectedSalary ? `₹${expectedSalary}` : "N/A"}</span>
                        </td>
                      </tr>
                      ` : ""}

                      <!-- Portfolio -->
                      <tr>
                        <td valign="top"
                            style="padding:7px 0;font-size:14px;color:#777777;">
                          Portfolio
                        </td>

                        <td valign="top"
                            style="padding:7px 0;font-size:14px;font-weight:bold;word-break:break-all;">

                          ${portfolio && portfolio !== "Not provided" ? `
                          <a
                            href="${portfolio}"
                            target="_blank"
                            style="color:#800000;text-decoration:underline;"
                          >
                            ${portfolio}
                          </a>
                          ` : `<span style="color:#777777;font-weight:normal;">Not provided</span>`}

                        </td>
                      </tr>

                      <!-- Attached CV -->
                      <tr>
                        <td valign="top"
                            style="padding:7px 0;font-size:14px;color:#777777;">
                          Attached CV
                        </td>

                        <td valign="top"
                            style="padding:7px 0;font-size:14px;color:#1a1a1a;font-weight:bold;">
                          ${fileName} (${fileSizeKb} KB)
                        </td>
                      </tr>

                    </table>

                  </td>
                </tr>

              </table>

            </td>
          </tr>

          <!-- Applicant Message -->
          <tr>
            <td style="padding:24px 40px 0 40px;font-family:Arial,Helvetica,sans-serif;">

              <p style="margin:0 0 10px 0;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#800000;font-weight:bold;">
                Message from Applicant
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>

                  <td style="border-left:4px solid #800000;padding:6px 0 6px 16px;font-size:15px;line-height:24px;color:#333333;">
                    ${applicantMessage}
                  </td>

                </tr>
              </table>

            </td>
          </tr>

          <!-- CTA Buttons -->
          <tr>
            <td align="left" style="padding:32px 40px 0 40px;">

              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>

                  <!-- Reply -->
                  <td align="center"
                      bgcolor="#800000"
                      style="border-radius:10px;">

                    <a
                      href="mailto:${email}?subject=Your%20application%20at%20Lucie%20Creatives"
                      style="display:inline-block;padding:14px 26px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:10px;"
                    >
                      Reply to ${name} &rarr;
                    </a>

                  </td>

                  ${portfolio && portfolio !== "Not provided" ? `
                  <td width="12">&nbsp;</td>

                  <!-- Portfolio -->
                  <td align="center"
                      style="border:2px solid #800000;border-radius:10px;">

                    <a
                      href="${portfolio}"
                      target="_blank"
                      style="display:inline-block;padding:12px 24px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#800000;text-decoration:none;border-radius:10px;"
                    >
                      View Portfolio
                    </a>

                  </td>
                  ` : ""}

                </tr>
              </table>

            </td>
          </tr>

          <!-- Internal Note -->
          <tr>
            <td style="padding:28px 40px 36px 40px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:#888888;">

              This is an internal hiring notification from the Lucie Creatives website.
              The applicant has already received an automatic confirmation email.

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center"
                style="background-color:#800000;padding:28px 40px;font-family:Arial,Helvetica,sans-serif;">

              <p style="margin:0 0 6px 0;font-size:16px;font-weight:bold;color:#ffffff;">
                Lucie Creatives.
              </p>

              <p style="margin:0 0 14px 0;font-size:13px;line-height:20px;color:#f0caca;">
                Creative work, built with care.
              </p>

              <p style="margin:0;font-size:12px;line-height:18px;color:#e2a8a8;">

                <a
                  href="https://luciecreatives.in"
                  style="color:#ffffff;text-decoration:underline;"
                >
                  Website
                </a>

                &nbsp;&bull;&nbsp;

                <a
                  href="https://instagram.com/luciecreatives"
                  style="color:#ffffff;text-decoration:underline;"
                >
                  Instagram
                </a>

                &nbsp;&bull;&nbsp;

                <a
                  href="mailto:hello@luciecreatives.in"
                  style="color:#ffffff;text-decoration:underline;"
                >
                  Contact
                </a>

              </p>

              <p style="margin:16px 0 0 0;font-size:11px;line-height:17px;color:#d99a9a;">
                Internal notification &bull; Hiring form<br />
                &copy; 2026 Lucie Creatives. All rights reserved.
              </p>

            </td>
          </tr>

        </table>
        <!-- /Main Card -->

      </td>
    </tr>
  </table>

</body>
</html>
    `;

    // =========================================================================
    // 2. APPLICANT AUTO-CONFIRMATION TEMPLATE (Delivered TO candidate email)
    // =========================================================================
    const candidateHtml = `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light only" />
    <meta name="supported-color-schemes" content="light only" />
    <title>Application Received – Lucie Creatives</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f1f1;-webkit-text-size-adjust:100%;">
    <!-- Preheader -->
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#ffffff;">
      Thanks for applying to Lucie Creatives. We've received your application.
    </div>

    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      style="background-color:#f4f1f1;"
    >
      <tr>
        <td align="center" style="padding:32px 12px;">
          <!-- Card -->
          <table
            role="presentation"
            width="600"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="width:100%;max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;"
          >
            <!-- Maroon top bar -->
            <tr>
              <td height="8" style="height:8px;line-height:8px;font-size:0;background-color:#800000;">&nbsp;</td>
            </tr>

            <!-- Logo -->
            <tr>
              <td align="left" style="padding:36px 40px 8px 40px;background-color:#ffffff;">
                <img
                  src="https://res.cloudinary.com/oct7txvw/image/upload/f_auto,q_auto,w_400/v1791402408/lucie-creatives/brand/lucie-creatives-logo-transparent.png"
                  alt="Lucie Creatives."
                  width="190"
                  style="display:block;width:190px;max-width:100%;height:auto;border:0;outline:none;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:bold;color:#800000;"
                />
              </td>
            </tr>

            <!-- Heading -->
            <tr>
              <td style="padding:28px 40px 0 40px;font-family:Arial,Helvetica,sans-serif;">
                <p
                  style="margin:0 0 10px 0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#800000;font-weight:bold;"
                >
                  Application Received
                </p>
                <h1 style="margin:0;font-size:30px;line-height:38px;color:#1a1a1a;font-weight:800;">
                  Thanks for applying, ${name}.
                </h1>
              </td>
            </tr>

            <!-- Intro -->
            <tr>
              <td
                style="padding:16px 40px 0 40px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:26px;color:#444444;"
              >
                We've received your application for the
                <strong style="color:#800000;">${roleTitle}</strong> position at <strong>Lucie Creatives</strong>. Our
                team will go through your details and portfolio carefully.
              </td>
            </tr>

            <!-- Submitted details -->
            <tr>
              <td style="padding:28px 40px 0 40px;">
                <table
                  role="presentation"
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="background-color:#fbf5f5;border:1px solid #ecd6d6;border-radius:12px;"
                >
                  <tr>
                    <td style="padding:20px 24px;font-family:Arial,Helvetica,sans-serif;">
                      <p
                        style="margin:0 0 14px 0;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#800000;font-weight:bold;"
                      >
                        Your Submission
                      </p>
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td width="38%" style="padding:6px 0;font-size:14px;color:#777777;">Name</td>
                          <td style="padding:6px 0;font-size:14px;color:#1a1a1a;font-weight:bold;">${name}</td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0;font-size:14px;color:#777777;">Email</td>
                          <td style="padding:6px 0;font-size:14px;color:#1a1a1a;font-weight:bold;">${email}</td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0;font-size:14px;color:#777777;">Role</td>
                          <td style="padding:6px 0;font-size:14px;color:#800000;font-weight:bold;">${roleTitle}</td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0;font-size:14px;color:#777777;">Portfolio</td>
                          <td style="padding:6px 0;font-size:14px;color:#800000;font-weight:bold;">
                            ${portfolio && portfolio !== "Not provided" ? `<a href="${portfolio}" target="_blank" style="color:#800000;text-decoration:underline;">${portfolio}</a>` : "Not provided"}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- What happens next -->
            <tr>
              <td style="padding:32px 40px 0 40px;font-family:Arial,Helvetica,sans-serif;">
                <h2 style="margin:0 0 16px 0;font-size:18px;color:#1a1a1a;">What happens next</h2>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td width="36" valign="top" style="padding-bottom:14px;">
                      <div
                        style="width:28px;height:28px;line-height:28px;border-radius:14px;background-color:#800000;color:#ffffff;text-align:center;font-size:13px;font-weight:bold;"
                      >
                        1
                      </div>
                    </td>
                    <td valign="top" style="padding-bottom:14px;font-size:15px;line-height:23px;color:#444444;">
                      <strong style="color:#1a1a1a;">Review</strong> – we go through your application and work.
                    </td>
                  </tr>
                  <tr>
                    <td width="36" valign="top" style="padding-bottom:14px;">
                      <div
                        style="width:28px;height:28px;line-height:28px;border-radius:14px;background-color:#800000;color:#ffffff;text-align:center;font-size:13px;font-weight:bold;"
                      >
                        2
                      </div>
                    </td>
                    <td valign="top" style="padding-bottom:14px;font-size:15px;line-height:23px;color:#444444;">
                      <strong style="color:#1a1a1a;">Shortlist</strong> – shortlisted candidates get a call or a small
                      task.
                    </td>
                  </tr>
                  <tr>
                    <td width="36" valign="top">
                      <div
                        style="width:28px;height:28px;line-height:28px;border-radius:14px;background-color:#800000;color:#ffffff;text-align:center;font-size:13px;font-weight:bold;"
                      >
                        3
                      </div>
                    </td>
                    <td valign="top" style="font-size:15px;line-height:23px;color:#444444;">
                      <strong style="color:#1a1a1a;">Decision</strong> – you'll hear from us within
                      <strong>5–7 working days</strong>.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- CTA button -->
            <tr>
              <td align="left" style="padding:32px 40px 0 40px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="center" bgcolor="#800000" style="border-radius:10px;">
                      <a
                        href="https://luciecreatives.in"
                        style="display:inline-block;padding:14px 30px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:10px;"
                      >
                        Visit Lucie Creatives &rarr;
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Note -->
            <tr>
              <td
                style="padding:28px 40px 36px 40px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#777777;"
              >
                Have something to add? Just reply to this email and it will reach our team directly.
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                align="center"
                style="background-color:#800000;padding:28px 40px;font-family:Arial,Helvetica,sans-serif;"
              >
                <p style="margin:0 0 6px 0;font-size:16px;font-weight:bold;color:#ffffff;">Lucie Creatives.</p>
                <p style="margin:0 0 14px 0;font-size:13px;line-height:20px;color:#f0caca;">
                  Creative work, built with care.
                </p>
                <p style="margin:0;font-size:12px;line-height:18px;color:#e2a8a8;">
                  <a href="https://luciecreatives.in" style="color:#ffffff;text-decoration:underline;">Website</a>
                  &nbsp;&bull;&nbsp;
                  <a href="https://instagram.com/luciecreatives" style="color:#ffffff;text-decoration:underline;"
                    >Instagram</a
                  >
                  &nbsp;&bull;&nbsp;
                  <a href="mailto:hello@luciecreatives.in" style="color:#ffffff;text-decoration:underline;">Contact</a>
                </p>
                <p style="margin:16px 0 0 0;font-size:11px;line-height:17px;color:#d99a9a;">
                  You received this email because you applied at Lucie Creatives.<br />
                  &copy; 2026 Lucie Creatives. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
          <!-- /Card -->
        </td>
      </tr>
    </table>
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
Applicant Message: ${applicantMessage}
Attached CV: ${fileName} (${fileSizeKb} KB)
============================================
    `;

    // 1. Primary: Try Resend if API key is provided
    let emailSent = false;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const toEmail = process.env.RESEND_TO_EMAIL || "hello@luciecreatives.in";
        const fromEmail = process.env.RESEND_FROM_EMAIL || "Lucie Creatives Careers <careers@luciecreatives.in>";

        // Send INTERNAL notification to the team with CV attached
        const result = await resend.emails.send({
          from: fromEmail,
          to: toEmail,
          replyTo: email,
          subject: `New application: ${roleTitle} — ${name}`,
          html: internalHtml,
          text: textContent,
          attachments: [
            {
              filename: fileName,
              content: cvBuffer,
            },
          ],
        });

        if (result.error) {
          console.error("[Careers] Resend API error:", result.error);
        } else {
          emailSent = true;
          console.log(`[Careers] Internal application email sent via Resend for ${name} (${roleTitle}) -> ID: ${result.data?.id}`);
        }

        // Send APPLICANT confirmation email
        if (email && email.includes("@")) {
          try {
            await resend.emails.send({
              from: fromEmail,
              to: email,
              replyTo: "hello@luciecreatives.in",
              subject: `Application Received – Lucie Creatives`,
              html: candidateHtml,
              text: textContent,
            });
            console.log(`[Careers] Applicant confirmation sent to ${email}`);
          } catch (applicantErr) {
            console.error("[Careers] Error sending confirmation to candidate:", applicantErr);
          }
        }
      } catch (resendError) {
        console.error("[Careers] Resend delivery exception:", resendError);
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
          subject: `New application: ${roleTitle} — ${name}`,
          html: internalHtml,
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
