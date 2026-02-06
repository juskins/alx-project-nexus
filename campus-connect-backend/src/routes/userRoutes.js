import express from 'express';
import { updateProfile, updateAvatar, getUserProfile, getMyProfile } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', protect, getMyProfile);
router.put('/profile', protect, updateProfile);
router.put('/avatar', protect, updateAvatar);
router.get('/:id', getUserProfile);

export default router;
