import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendQuoteRequest(req, res) {
  const { insuranceType, firstName, lastName, zipCode, email, refSource, phone } = req.body;

  // Build email content
  const mailOptions = {
    from: `"Quote Request" <${process.env.SMTP_FROM}>`,
    to: `${email}`, // your receiving address
    subject: 'New Quote Request',
    html: `
      <h2>New Quote Request</h2>
      <p><strong>Insurance Type:</strong> ${insuranceType}</p>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Zip Code:</strong> ${zipCode}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Referral Source:</strong> ${refSource}</p>
      <p><strong>Phone:</strong> (${phone.area}) ${phone.prefix}-${phone.line}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Quote request sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ message: 'Failed to send quote request' });
  }
}
