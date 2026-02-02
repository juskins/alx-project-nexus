import express from 'express';
import { updateProfile, updateAvatar, getUserProfile } from '../controllers/userController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.put('/profile', protect, updateProfile);
router.put('/avatar', protect, updateAvatar);
router.get('/:id', getUserProfile);

export default router;