import multer from 'multer';
import path from 'path';

import fs from 'fs';

const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
   fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, uploadDir);
   },
   filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
   },
});

const fileFilter = (
   req,
   file,
   cb
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
         ),
         false
      );
   }
};

export const upload = multer({
   storage,
   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
   fileFilter,
});
