import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (
   req,
   res,
   next
) => {
   try {
      let token;

      if (
         req.headers.authorization &&
         req.headers.authorization.startsWith('Bearer')
      ) {
         token = req.headers.authorization.split(' ')[1];
      }

      if (!token) {
         res.status(401).json({
            success: false,
            message: 'Not authorized to access this route',
         });
         return;
      }

      try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         req.user = (await User.findById(decoded.id)) || null;

         if (!req.user) {
            res.status(401).json({
               success: false,
               message: 'User not found',
            });
            return;
         }

         next();
      } catch (error) {
         res.status(401).json({
            success: false,
            message: 'Not authorized to access this route',
         });
      }
   } catch (error) {
      res.status(500).json({
         success: false,
         message: 'Server error',
      });
   }
};

export const authorize = (...roles) => {
   return (req, res, next) => {
      if (!req.user || !roles.includes(req.user.role)) {
         res.status(403).json({
            success: false,
            message: `User role ${req.user?.role} is not authorized to access this route`,
         });
         return;
      }
      next();
   };
};
