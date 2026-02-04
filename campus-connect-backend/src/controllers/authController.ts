import User from "../models/User";
import { Request, Response } from 'express';
import sendEmail from "../utils/sendEmail";
import { generateToken } from "../utils/generateToken";
import crypto, { BinaryLike } from 'crypto';
import { AuthRequest } from "../middleware/auth";


export const register = async (req: Request, res: Response): Promise<void | Response> => {
   try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password || !role) {
         return res.status(400).json({ message: 'All fields are required' });
      }

      // Check if user exists
      const userExists = await User.findOne({ email });
      if (userExists) {
         res.status(400).json({ message: 'User already exists', success: false });
         return;
      }

      // Create verification token
      const verificationToken = crypto.randomBytes(20).toString('hex');

      // Create user
      const user = await User.create({
         name,
         email,
         password,
         role: role || 'student',
         verificationToken,
      });

      // Send verification email
      const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
      const message = `Please verify your email by clicking: ${verificationUrl}`;

      try {
         await sendEmail({
            email: user.email,
            subject: 'Email Verification - Campus Connect',
            message,
            html: `
          <h1>Welcome to Campus Connect!</h1>
          <p>Please verify your email by clicking the link below:</p>
          <a href="${verificationUrl}">Verify Email</a>
        `,
         });
      } catch (error) {
         console.error('Email send error:', error);
      }

      res.status(201).json({
         success: true,
         message: 'User registered successfully. Please check your email to verify your account.',
         data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id.toString()),
         },
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message || 'Server error',
      });
   }
};




// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response): Promise<void> => {
   try {
      const { email, password } = req.body;

      // Validate email & password
      if (!email || !password) {
         res.status(400).json({
            success: false,
            message: 'Please provide email and password',
         });
         return;
      }

      // Check for user
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
         res.status(401).json({ message: 'Invalid credentials', success: false });
         return;
      }

      // Check if user is verified
      if (!user.isVerified) {
         res.status(401).json({ message: 'User not verified', success: false });
         return;
      }

      // Check if password is correct
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
         res.status(401).json({ message: 'Invalid credentials', success: false });
         return;
      }

      // Generate token
      const token = generateToken(user._id.toString());

      res.status(200).json({
         success: true,
         message: 'User logged in successfully',
         data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            isVerified: user.isVerified,
            token,
         },
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message || 'Server error',
      });
   }
}



// @desc    Verify email
// @route   GET /api/auth/verify-email/:token
// @access  Public
export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
   try {
      const { token } = req.params;

      const user = await User.findOne({ verificationToken: token });

      if (!user) {
         res.status(400).json({
            success: false,
            message: 'Invalid verification token',
         });
         return;
      }

      user.isVerified = true;
      user.verificationToken = undefined;
      await user.save();

      res.status(200).json({
         success: true,
         message: 'Email verified successfully',
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message || 'Server error',
      });
   }
};



// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
   try {
      const { email } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
         res.status(404).json({
            success: false,
            message: 'User not found',
         });
         return;
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(20).toString('hex');

      // Hash token and set to resetPasswordToken field
      user.resetPasswordToken = crypto
         .createHash('sha256')
         .update(resetToken)
         .digest('hex');

      // Set expire (10 minutes)
      user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);

      await user.save();

      // Create reset url
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

      const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please click: ${resetUrl}`;

      try {
         await sendEmail({
            email: user.email,
            subject: 'Password Reset - Campus Connect',
            message,
            html: `
          <h1>Password Reset Request</h1>
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <a href="${resetUrl}">Reset Password</a>
          <p>This link will expire in 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `,
         });

         res.status(200).json({
            success: true,
            message: 'Password reset email sent',
         });
      } catch (error) {
         user.resetPasswordToken = undefined;
         user.resetPasswordExpire = undefined;
         await user.save();

         res.status(500).json({
            success: false,
            message: 'Email could not be sent',
         });
      }
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message || 'Server error',
      });
   }
};


// @desc    Reset password
// @route   PUT /api/auth/reset-password/:token
// @access  Public
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
   try {
      const resetPasswordToken = crypto
         .createHash('sha256')
         .update(req?.params?.token as BinaryLike)
         .digest('hex');

      const user = await User.findOne({
         resetPasswordToken,
         resetPasswordExpire: { $gt: Date.now() },
      });

      if (!user) {
         res.status(400).json({
            success: false,
            message: 'Invalid or expired token',
         });
         return;
      }

      // Set new password
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      res.status(200).json({
         success: true,
         message: 'Password reset successful',
         data: {
            token: generateToken(user._id.toString()),
         },
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message || 'Server error',
      });
   }
};



// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: Request, res: Response): Promise<void> => {
   const authReq = req as AuthRequest;
   try {
      const user = await User.findById(authReq.user?._id);

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


// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req: Request, res: Response): Promise<void> => {
   const authReq = req as AuthRequest;
   try {
      // Since we're using JWT (stateless authentication), 
      // the actual logout happens on the client side by removing the token
      // This endpoint is mainly for logging purposes or if you want to implement token blacklisting

      res.status(200).json({
         success: true,
         message: 'User logged out successfully',
         data: null,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message || 'Server error',
      });
   }
};
