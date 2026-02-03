import express from 'express';
import { uploadImage } from '../controllers/uploadController';
import { protect } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = express.Router();

// Upload image endpoint
router.post('/', protect, upload.single('image'), uploadImage);

export default router;
