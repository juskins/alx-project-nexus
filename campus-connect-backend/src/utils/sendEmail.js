import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
   // Explicit configuration often works better on Render to avoid port-blocking timeouts
   const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use SSL for port 465
      auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASSWORD,
      },
      connectionTimeout: 10000, // 10 seconds timeout
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
