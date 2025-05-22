import { emailConfig, serverConfig } from "@/app/config/config-app-environment";
import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(request: Request) {
  const body = await request.json();

  const htmlContent = `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #fff8f5; padding: 30px; border-radius: 12px; max-width: 600px; margin: auto; color: #333; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
    <div style="text-align: center; margin-bottom: 20px;">
      <h2 style="color: #e91e63; font-size: 24px; margin: 0;">💌 Salam Bahagia Amirul & Aisyah</h2>
      <p style="margin-top: 8px; font-size: 14px; color: #777;">Satu ucapan ikhlas dari hati</p>
    </div>
    <div style="font-size: 16px; line-height: 1.6; padding: 20px; background: #fff; border-radius: 8px; border: 1px solid #ffd5d5;">
      ${body.ucapan}
    </div>
    <div style="margin-top: 30px; text-align: right; font-size: 16px;">
      <p style="margin: 0;">Ikhlas,</p>
      <strong>${body.name}</strong>
    </div>
  </div>
`;


  const message = {
    from: `Kad Kawen Online`,
    to: emailConfig.brideEmailList,
    subject: "Ucapan Ikhlas Kepada Pengantin",
    html: htmlContent,
    headers: {
      "X-Entity-Ref-ID": "newmail",
    },
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: serverConfig.serverEmail,
      pass: serverConfig.serverPassword, 
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
