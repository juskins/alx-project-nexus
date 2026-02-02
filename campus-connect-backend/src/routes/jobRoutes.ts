import express from 'express';
import {
   createJob,
   getJobs,
   getJob,
   updateJob,
   deleteJob,
   getMyJobs,
} from '../controllers/jobController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.route('/')
   .get(getJobs)
   .post(protect, authorize('employer', 'admin'), createJob);

router.get('/my-jobs', protect, getMyJobs);

router.route('/:id')
   .get(getJob)
   .put(protect, updateJob)
   .delete(protect, deleteJob);

export default router;