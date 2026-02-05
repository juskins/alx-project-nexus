import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Job from '../models/Job';
import { AuthRequest } from '../middleware/auth';

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private (Employer/Admin)
export const createJob = async (
   req: Request,
   res: Response
): Promise<void> => {
   const authReq = req as AuthRequest;
   try {
      const jobData = {
         ...authReq.body,
         postedBy: authReq.user?._id,
      };

      const job = await Job.create(jobData);

      res.status(201).json({
         success: true,
         data: job,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message || 'Server error',
      });
   }
};


// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req: Request, res: Response): Promise<void> => {
   try {
      const {
         category,
         location,
         duration,
         time,
         search,
         minPay,
         maxPay,
         page = 1,
         limit = 10,
      } = req.query;

      const query: any = { status: 'active' };

      // Filters
      if (category) query.category = category;
      if (location) query.location = location;
      if (duration) query.duration = duration;
      if (time) query.time = time;

      // Pay range filter
      if (minPay || maxPay) {
         query.payRate = {};
         if (minPay) query.payRate.$gte = Number(minPay);
         if (maxPay) query.payRate.$lte = Number(maxPay);
      }

      // Search across multiple fields
      if (search) {
         const searchRegex = { $regex: search as string, $options: 'i' };
         query.$or = [
            { title: searchRegex },
            { description: searchRegex },
            { department: searchRegex },
            { category: searchRegex },
            { type: searchRegex },
            { address: searchRegex },
         ];
      }

      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;

      const jobs = await Job.find(query)
         .populate('postedBy', 'name email avatar')
         .sort({ createdAt: -1 })
         .skip(skip)
         .limit(limitNum);

      const total = await Job.countDocuments(query);

      res.status(200).json({
         success: true,
         count: jobs.length,
         total,
         page: pageNum,
         pages: Math.ceil(total / limitNum),
         data: jobs,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message || 'Server error',
      });
   }
};


// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
export const getJob = async (req: Request, res: Response): Promise<void> => {
   try {
      const job = await Job.findById(req.params.id).populate(
         'postedBy',
         'name email avatar department role'
      );

      if (!job) {
         res.status(404).json({
            success: false,
            message: 'Job not found',
         });
         return;
      }

      res.status(200).json({
         success: true,
         data: job,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message || 'Server error',
      });
   }
};


// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Owner/Admin)
export const updateJob = async (
   req: Request,
   res: Response
): Promise<void> => {
   const authReq = req as AuthRequest;
   try {
      let job = await Job.findById(authReq.params.id);

      if (!job) {
         res.status(404).json({
            success: false,
            message: 'Job not found',
         });
         return;
      }

      // Check ownership
      if (
         job.postedBy.toString() !== authReq.user?._id.toString() &&
         authReq.user?.role !== 'employer' || authReq.user?.role !== 'admin'
      ) {
         res.status(403).json({
            success: false,
            message: 'Not authorized to update this job',
         });
         return;
      }

      job = await Job.findByIdAndUpdate(authReq.params.id, authReq.body, {
         new: true,
         runValidators: true,
      });

      res.status(200).json({
         success: true,
         data: job,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message || 'Server error',
      });
   }
};



// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Owner/Admin)
export const deleteJob = async (
   req: Request,
   res: Response
): Promise<void> => {
   const authReq = req as AuthRequest;
   try {
      const job = await Job.findById(authReq.params.id);

      if (!job) {
         res.status(404).json({
            success: false,
            message: 'Job not found',
         });
         return;
      }

      // Check ownership
      if (
         job.postedBy.toString() !== authReq.user?._id.toString() &&
         authReq.user?.role !== 'employer' || authReq.user?.role !== 'admin'
      ) {
         res.status(403).json({
            success: false,
            message: 'Not authorized to delete this job',
         });
         return;
      }

      await job.deleteOne();

      res.status(200).json({
         success: true,
         message: 'Job deleted successfully',
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message || 'Server error',
      });
   }
};



// @desc    Get my posted jobs
// @route   GET /api/jobs/my-jobs
// @access  Private
export const getMyJobs = async (
   req: Request,
   res: Response
): Promise<void> => {
   const authReq = req as AuthRequest;
   try {
      const jobs = await Job.find({ postedBy: authReq.user?._id }).sort({
         createdAt: -1,
      });

      res.status(200).json({
         success: true,
         count: jobs.length,
         data: jobs,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message || 'Server error',
      });
   }
};


// @desc    Get dashboard stats
// @route   GET /api/jobs/stats
// @access  Private
export const getDashboardStats = async (
   req: Request,
   res: Response
): Promise<void> => {
   const authReq = req as AuthRequest;
   try {
      const userRole = authReq.user?.role;

      if (userRole === 'employer' || userRole === 'admin') {
         // Employer/Admin stats - jobs they posted
         const postedJobs = await Job.countDocuments({
            postedBy: authReq.user?._id,
         });

         const activeJobs = await Job.countDocuments({
            postedBy: authReq.user?._id,
            status: 'active',
         });

         // TODO: Add completed jobs count when job completion is implemented
         const completedJobs = 0;
         const ongoingJobs = activeJobs;

         res.status(200).json({
            success: true,
            data: {
               postedJobs,
               ongoingJobs,
               completedJobs,
               activeJobs,
            },
         });
      } else {
         // Student stats - jobs they applied to
         const activeJobs = await Job.countDocuments({ status: 'active' });

         // Count jobs where the user is in the applicants array
         const appliedJobs = await Job.countDocuments({
            applicants: authReq.user?._id,
         });

         // TODO: Add completed jobs count when job completion is implemented
         const completedJobs = 0;
         const ongoingJobs = appliedJobs;
         const postedJobs = 0; // Students don't post jobs

         res.status(200).json({
            success: true,
            data: {
               postedJobs,
               ongoingJobs,
               completedJobs,
               activeJobs,
               appliedJobs,
            },
         });
      }
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message || 'Server error',
      });
   }
};


// @desc    Apply for a job
// @route   POST /api/jobs/:id/apply
// @access  Private (Students only)
export const applyForJob = async (
   req: Request,
   res: Response
): Promise<void> => {
   const authReq = req as AuthRequest;
   try {
      const job = await Job.findById(authReq.params.id);

      if (!job) {
         res.status(404).json({
            success: false,
            message: 'Job not found',
         });
         return;
      }

      // Prevent job owner from applying to their own job
      if (job.postedBy.toString() === authReq.user?._id.toString()) {
         res.status(403).json({
            success: false,
            message: 'You cannot apply to your own job posting',
         });
         return;
      }

      // Check if user has already applied
      const hasApplied = job.applicants.some(
         (applicantId: any) => applicantId.toString() === authReq.user?._id.toString()
      );

      if (hasApplied) {
         res.status(400).json({
            success: false,
            message: 'You have already applied for this job',
         });
         return;
      }

      // Add user to applicants array
      if (!authReq.user?._id) {
         res.status(401).json({
            success: false,
            message: 'User not authenticated',
         });
         return;
      }

      job.applicants.push(authReq.user._id);
      await job.save();

      res.status(200).json({
         success: true,
         message: 'Successfully applied for the job',
         data: job,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message || 'Server error',
      });
   }
};
