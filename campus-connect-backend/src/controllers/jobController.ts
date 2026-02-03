import { Request, Response } from 'express';
import Job from '../models/Job';
import { AuthRequest } from '../middleware/auth';

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private (Employer/Admin)
export const createJob = async (
   req: AuthRequest,
   res: Response
): Promise<void> => {
   try {
      const jobData = {
         ...req.body,
         postedBy: req.user?._id,
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

      // Search
      if (search) {
         query.$text = { $search: search as string };
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
   req: AuthRequest,
   res: Response
): Promise<void> => {
   try {
      let job = await Job.findById(req.params.id);

      if (!job) {
         res.status(404).json({
            success: false,
            message: 'Job not found',
         });
         return;
      }

      // Check ownership
      if (
         job.postedBy.toString() !== req.user?._id.toString() &&
         req.user?.role !== 'employer' || req.user?.role !== 'admin'
      ) {
         res.status(403).json({
            success: false,
            message: 'Not authorized to update this job',
         });
         return;
      }

      job = await Job.findByIdAndUpdate(req.params.id, req.body, {
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
   req: AuthRequest,
   res: Response
): Promise<void> => {
   try {
      const job = await Job.findById(req.params.id);

      if (!job) {
         res.status(404).json({
            success: false,
            message: 'Job not found',
         });
         return;
      }

      // Check ownership
      if (
         job.postedBy.toString() !== req.user?._id.toString() &&
         req.user?.role !== 'admin' || req.user?.role !== 'employer'
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
   req: AuthRequest,
   res: Response
): Promise<void> => {
   try {
      const jobs = await Job.find({ postedBy: req.user?._id }).sort({
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
   req: AuthRequest,
   res: Response
): Promise<void> => {
   try {
      const userRole = req.user?.role;

      if (userRole === 'employer' || userRole === 'admin' || userRole === 'student') {
         // Employer/Admin stats
         // const activeJobs = await Job.countDocuments({
         //    postedBy: req.user?._id,
         //    status: 'active',
         // });

         const activeJobs = await Job.countDocuments({ status: 'active' });

         // TODO: Add application counts when application model is created
         const totalApplications = 0;
         const pendingApplications = 0;

         res.status(200).json({
            success: true,
            data: {
               activeJobs,
               totalApplications,
               pendingApplications,
            },
         });
      } else {
         // Student stats
         const activeJobs = await Job.countDocuments({ status: 'active' });

         // TODO: Add applied/completed counts when application model is created
         const appliedJobs = 0;
         const completedJobs = 0;

         res.status(200).json({
            success: true,
            data: {
               activeJobs,
               appliedJobs,
               completedJobs,
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
