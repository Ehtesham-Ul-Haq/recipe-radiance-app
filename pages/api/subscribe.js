import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    // Set up your SMTP transport
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

    // Set up email data
    const mailOptions = {
      from: `"Recipe Radiance" <${process.env.SMTP_USER}>`, // Sender address
      to: email, // List of recipients
      subject: 'Thank you for subscribing!', // Subject line
      text: 'You have successfully subscribed to our newsletter!', // Plain text body
      html: '<p>You have successfully subscribed to our newsletter!</p>', // HTML body
    };

    try {
      // Send mail
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Subscribed successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Error sending email.' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
