import express from 'express';
import {
   createJob,
   getJobs,
   getJob,
   updateJob,
   deleteJob,
   getMyJobs,
   getDashboardStats,
   applyForJob,
} from '../controllers/jobController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
   .get(getJobs)
   .post(protect, authorize('employer', 'admin'), createJob);

router.get('/my-jobs', protect, getMyJobs);
router.post('/apply/:id', protect, authorize('student'), applyForJob);
router.get('/stats', protect, getDashboardStats);

router.route('/:id')
   .get(getJob)
   .put(protect, updateJob)
   .delete(protect, authorize('employer', 'admin'), deleteJob);

export default router;
