import jwt from "jsonwebtoken";

export const generateToken = (userId: string): string => {
   const jwtSecret = process.env.JWT_SECRET;

   if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
   }

   // Use type assertion for the expiresIn value since it's a valid time string
   const token = jwt.sign(
      { id: userId },
      jwtSecret,
      { expiresIn: (process.env.JWT_EXPIRE || '7d') as any }
   );

   return token;
};