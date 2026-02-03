import { Response } from 'express';
import cloudinary from '../config/cloudinary';
import { AuthRequest } from '../middleware/auth';
import fs from 'fs';

// @desc    Upload image to Cloudinary
// @route   POST /api/upload
// @access  Private
export const uploadImage = async (
   req: AuthRequest,
   res: Response
): Promise<void> => {
   try {
      if (!req.file) {
         res.status(400).json({
            success: false,
            message: 'No file uploaded',
         });
         return;
      }

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
         folder: 'campus-connect/jobs',
         resource_type: 'auto',
      });

      // Delete local file after upload
      fs.unlinkSync(req.file.path);

      res.status(200).json({
         success: true,
         url: result.secure_url,
         public_id: result.public_id,
      });
   } catch (error: any) {
      console.error('Upload error:', error);

      // Clean up file if upload fails
      if (req.file && fs.existsSync(req.file.path)) {
         fs.unlinkSync(req.file.path);
      }

      res.status(500).json({
         success: false,
         message: error.message || 'Image upload failed',
      });
   }
};
