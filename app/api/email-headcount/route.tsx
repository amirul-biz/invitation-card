import { emailConfig, serverConfig } from "@/app/config/config-app-environment";
import { RsvpData } from "@/app/elements/speech-carousel/speech-carousel.ui";
import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data: RsvpData[] = body.data;

    const isAttendList = data.filter((rsvp) => rsvp.isAttend);
    const totalGuestCount = isAttendList.reduce(
      (sum, rsvp) => sum + rsvp.total_person,
      0
    );

    const guestListHtml = isAttendList
      .map((rsvp, index) => {
        return `<li style="margin-bottom: 6px;">
          ${index + 1}. <strong>${rsvp.name}</strong> — <em>${
          rsvp.total_person
        } tetamu</em>
        </li>`;
      })
      .join("");

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #fff8f5; padding: 30px; border-radius: 12px; max-width: 600px; margin: auto; color: #333; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #4caf50; font-size: 24px; margin: 0;">📋 Senarai Kehadiran Tetamu</h2>
          <p style="margin-top: 8px; font-size: 14px; color: #777;">Nama dan bilangan tetamu yang akan hadir</p>
        </div>

        <div style="margin-bottom: 20px; padding: 20px; background-color: #e0f7fa; border-left: 5px solid #00796b; border-radius: 8px;">
          <strong style="font-size: 18px;">Jumlah keseluruhan tetamu yang akan hadir: ${totalGuestCount} orang</strong>
        </div>

        <ul style="list-style: none; padding: 0;">
          ${guestListHtml}
        </ul>
      </div>
    `;

    const message = {
      from: "Kad Kawen Online",
      to: emailConfig.organizerEmailList,
      subject: "Bilangan Kehadiran Tetamu Terkini",
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

    await transporter.sendMail(message);

    return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 });

  } catch (err: any) {
    console.error("Email send error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
