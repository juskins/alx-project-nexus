import { Request, Response } from 'express';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (
   req: Request,
   res: Response
): Promise<void> => {
   const authReq = req as AuthRequest;
   try {
      const user = await User.findById(authReq.user?._id);

      if (!user) {
         res.status(404).json({
            success: false,
            message: 'User not found',
         });
         return;
      }

      const { name, bio, phone, department, studentId, skills, linkedin, website } = authReq.body;

      user.name = name || user.name;
      user.bio = bio || user.bio;
      user.phone = phone || user.phone;
      user.department = department || user.department;
      user.studentId = studentId || user.studentId;
      user.skills = skills || user.skills;
      user.linkedin = linkedin || user.linkedin;
      user.website = website || user.website;

      const updatedUser = await user.save();

      res.status(200).json({
         success: true,
         data: updatedUser,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message || 'Server error',
      });
   }
};



// @desc    Update user avatar
// @route   PUT /api/users/avatar
// @access  Private
export const updateAvatar = async (
   req: Request,
   res: Response
): Promise<void> => {
   const authReq = req as AuthRequest;
   try {
      const user = await User.findById(authReq.user?._id);

      if (!user) {
         res.status(404).json({
            success: false,
            message: 'User not found',
         });
         return;
      }

      // Avatar URL will be set by upload middleware
      if (authReq.body.avatar) {
         user.avatar = authReq.body.avatar;
         await user.save();
      }

      res.status(200).json({
         success: true,
         data: user,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message || 'Server error',
      });
   }
};


// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Public
export const getUserProfile = async (
   req: Request,
   res: Response
): Promise<void> => {
   const authReq = req as AuthRequest;
   try {
      const user = await User.findById(authReq.params.id).select('-password');

      if (!user) {
         res.status(404).json({
            success: false,
            message: 'User not found',
         });
         return;
      }

      res.status(200).json({
         success: true,
         data: user,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message || 'Server error',
      });
   }
};


// @desc    Get current user's profile
// @route   GET /api/users/profile
// @access  Private
export const getMyProfile = async (
   req: Request,
   res: Response
): Promise<void> => {
   const authReq = req as AuthRequest;
   try {
      const user = await User.findById(authReq.user?._id).select('-password');

      if (!user) {
         res.status(404).json({
            success: false,
            message: 'User not found',
         });
         return;
      }

      res.status(200).json({
         success: true,
         data: user,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message || 'Server error',
      });
   }
};