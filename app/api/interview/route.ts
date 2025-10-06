import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { recipientEmail, interviewDate, interviewTime, location } = await req.json();

    if (!recipientEmail || !interviewDate || !interviewTime || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "crediblehealthsolutions.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // true for port 465
      auth: {
        user: process.env.SMTP_USER || "excel@crediblehealthsolutions.com",
        pass: process.env.SMTP_PASS || "CredibleHealthSol1@",
      },
    });

    // Compose message
    const mailOptions = {
      from: process.env.FROM_EMAIL || '"Credible Health Solutions" <excel@crediblehealthsolutions.com>',
      to: recipientEmail,
      subject: "Interview Invitation - Credible Health Solutions",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Interview Invitation</h2>
          <p>Dear Candidate,</p>
          <p>We are pleased to inform you that your interview has been scheduled as follows:</p>
          <ul>
            <li><strong>Date:</strong> ${interviewDate}</li>
            <li><strong>Time:</strong> ${interviewTime}</li>
            <li><strong>Location:</strong> ${location}</li>
          </ul>
          <p>Please ensure you are available and prepared at the scheduled time.</p>
          <p>Best regards,<br/>
          <strong>Credible Health Solutions Team</strong></p>
        </div>
      `,
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error: any) {
    console.error("Email sending failed:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
