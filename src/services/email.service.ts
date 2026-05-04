import nodemailer from 'nodemailer';
import { MailtrapTransport } from 'mailtrap';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN || '';

const transporter = nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
  })
);

export const sendOTP = async (email: string, otp: string) => {
  const mailOptions = {
    from: {
      address: process.env.FROM_EMAIL || 'hello@demomailtrap.co',
      name: 'HobbyHub',
    },
    to: [email],
    subject: 'Password Reset OTP',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #4f46e5; text-align: center;">HobbyHub</h2>
        <p>You requested a password reset. Please use the following One-Time Password (OTP) to reset your password:</p>
        <div style="background-color: #f8fafc; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #1e293b; border-radius: 8px; margin: 20px 0;">
          ${otp}
        </div>
        <p>This OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="font-size: 12px; color: #64748b; text-align: center;">&copy; ${new Date().getFullYear()} HobbyHub. All rights reserved.</p>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
};
