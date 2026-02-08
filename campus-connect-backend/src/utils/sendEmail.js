import emailjs from '@emailjs/nodejs';

const sendEmail = async (options) => {
   const serviceId = process.env.EMAILJS_SERVICE_ID;
   const templateId = process.env.EMAILJS_TEMPLATE_ID;
   const publicKey = process.env.EMAILJS_PUBLIC_KEY;
   const privateKey = process.env.EMAILJS_PRIVATE_KEY;

   console.log(`Attempting to send email to: ${options.email} using EmailJS`);

   if (!serviceId || !templateId || !publicKey || !privateKey) {
      console.error('Missing EmailJS configuration in environment variables');
      return;
   }

   try {
      const templateParams = {
         to_email: options.email,
         subject: options.subject,
         message: options.html || options.message,
         // You can add more specific params here for your EmailJS template
      };

      const result = await emailjs.send(
         serviceId,
         templateId,
         templateParams,
         {
            publicKey,
            privateKey,
         }
      );

      console.log('Email sent successfully via EmailJS');
      console.log('EmailJS Result:', result.text);
      return result;
   } catch (error) {
      console.error('sendEmail Error (EmailJS):', error);
      throw error;
   }
};

export default sendEmail;


