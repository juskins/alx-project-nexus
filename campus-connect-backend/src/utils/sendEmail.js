import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
   // Simplified for production reliability with Gmail
   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASSWORD,
      }
   });

   const mailOptions = {
      from: process.env.EMAIL_USER, // Gmail often blocks if 'from' doesn't match the auth user
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html || options.message,
   };

   await transporter.sendMail(mailOptions);
}

export default sendEmail;
