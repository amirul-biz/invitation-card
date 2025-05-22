
import { serverConfig } from "@/app/config/config-app-environment";
import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(request: Request) {
  const body = await request.json();

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Hello ${body.name},</h2>
      <p>Welcome to <strong>E-Jemputan</strong>!</p>
      <p>We're glad to have you on board.</p>
      <p>
        <a href="https://www.sizodevelops.com" style="background-color: #03A4FF; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px;">
          Visit Our Website
        </a>
      </p>
      <p>Thanks,<br />The E-Jemputan Develops Team</p>
    </div>
  `;

  const message = {
    from: `ScanA Team <${process.env.EMAIL_FROM}>`,
    to: body.email,
    subject: "Selamat Datang Ke E-Jemputan",
    html: htmlContent,
    headers: {
      "X-Entity-Ref-ID": "newmail",
    },
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: serverConfig.serverEmail,
      pass: serverConfig.serverPassword, // ⚠️ Avoid hardcoding this
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.sendMail(message);
    return NextResponse.json(
      { message: "Email Sent Successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

