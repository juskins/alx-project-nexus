import multer, { FileFilterCallback } from 'multer';
import { Request as ExpressRequest } from 'express';
import path from 'path';

const storage = multer.diskStorage({
   destination: (req: ExpressRequest, file: Express.Multer.File, cb) => {
      cb(null, 'uploads/');
   },
   filename: (req: ExpressRequest, file: Express.Multer.File, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
   },
});

const fileFilter = (
   req: ExpressRequest,
   file: Express.Multer.File,
   cb: FileFilterCallback
) => {
   const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
   const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
   );
   const mimetype = allowedTypes.test(file.mimetype);

   if (extname && mimetype) {
      cb(null, true);
   } else {
      cb(
         new Error(
            'Invalid file type. Only JPEG, PNG, PDF, DOC, and DOCX are allowed.'
         ) as any,
         false
      );
   }
};

export const upload = multer({
   storage,
   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
   fileFilter,
});