import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendOTP = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const htmlBody = `
    <h2>🔐 Your OTP for EduSheetX Verification</h2>
    <p>Hello,</p>
    <p>Your One-Time Password (OTP) is:</p>
    <div style="font-size: 24px; font-weight: bold; margin: 12px 0; color: #2b2b2b;">
      ${otp}
    </div>
    <p>This OTP is valid for <strong>5 minutes</strong>. After that, it will expire automatically and cannot be used.</p>
    <p>If you did not request this, please ignore this email.</p>
    <br />
    <p style="font-size: 0.9em; color: #888;">Sent by EduSheetX Verification System</p>
  `;

  await transporter.sendMail({
    from: `"EduSheetX OTP" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `Your OTP for EduSheetX Verification`,
    html: htmlBody,
  });
};
