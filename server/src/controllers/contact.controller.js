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

export async function sendContactMessage(req, res) {
  const { firstName, lastName, email, phone, howHeard, problem } = req.body;

  // Determine recipients
  const adminEmail = process.env.CONTACT_RECEIVER || process.env.SMTP_FROM;
  const userEmail = email; // Email from the user who submitted the form

  // Combine recipients, ensuring no empty entries if one is missing
  const mailRecipients = [adminEmail, userEmail].filter(Boolean).join(', ');

  // Build email content
  const mailOptions = {
    from: `"Contact Form" <${process.env.SMTP_FROM}>`,
    to: mailRecipients, 
    subject: 'New Contact Form Submission',
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>How did you hear about us?:</strong> ${howHeard}</p>
      <p><strong>Problem/Message:</strong> ${problem}</p>
    `,
  };

  console.log('Attempting to send email with options:', mailOptions);

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);
    
    res.status(200).json({ success: true, message: 'Contact message sent successfully' });
  } catch (error) {
    console.error('Contact email send error:', error);
    res.status(500).json({ message: 'Failed to send contact message' });
  }
} 