import express from 'express';
import {
   getConversations,
   getMessages,
   sendMessage,
} from '../controllers/messageController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.use(protect);

router.get('/conversations', getConversations);
router.get('/conversation/:id', getMessages);
router.post('/', sendMessage);

export default router;