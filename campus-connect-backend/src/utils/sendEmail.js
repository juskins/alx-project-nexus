import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
   const transporter = nodemailer.createTransport({
      service: 'gmail', // Use 'gmail' service for better preset handling
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
      auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
         rejectUnauthorized: false // This can help with some self-signed certificate issues in dev
      }
   });

   const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html || options.message,
   };

   await transporter.sendMail(mailOptions);
}

export default sendEmail;
