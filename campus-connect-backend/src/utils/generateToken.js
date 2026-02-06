import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
   const jwtSecret = process.env.JWT_SECRET;

   if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
   }

   const token = jwt.sign(
      { id: userId },
      jwtSecret,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
   );

   return token;
};
