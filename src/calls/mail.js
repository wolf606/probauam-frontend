"use server";
import nodemailer from "nodemailer";

const smtpSettings = {
    host: process.env.MAIL_SERVER,
    port: parseInt(process.env.MAIL_PORT),
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  };

export const handleEmailFire = async (sender, subject, html) => {
    const transporter = nodemailer.createTransport(smtpSettings);
    const mailOptions = {
      from: sender,
      to: process.env.MAIL_DEFAULT_SENDER,
      subject: subject,
      html: html,
    };
    const info = await transporter.sendMail(mailOptions);
    return info;
  }