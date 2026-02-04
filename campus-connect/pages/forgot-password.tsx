import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { CheckCircle, XCircle, Loader2, Mail, ArrowRight, KeyIcon } from 'lucide-react';
import api from '@/utils/api';

type VerificationStatus = 'loading' | 'success' | 'error';

const ForgotPasswordPage = () => {
   const router = useRouter();
   const { token } = router.query;
   const [status, setStatus] = useState<VerificationStatus>('loading');
   const [message, setMessage] = useState('');
   const [countdown, setCountdown] = useState(5);

   useEffect(() => {
      if (token) {
         verifyEmailToken(token as string);
      }
   }, [token]);

   // Countdown for auto-redirect on success
   useEffect(() => {
      if (status === 'success' && countdown > 0) {
         const timer = setTimeout(() => {
            setCountdown(countdown - 1);
         }, 1000);
         return () => clearTimeout(timer);
      } else if (status === 'success' && countdown === 0) {
         router.push('/login');
      }
   }, [status, countdown, router]);

   const verifyEmailToken = async (verificationToken: string) => {
      try {
         setStatus('loading');
         const response = await api.get(
            `/auth/verify-email/${verificationToken}`
         );

         if (response.data.success) {
            setStatus('success');
            setMessage(response.data.message || 'Email verified successfully!');
         } else {
            setStatus('error');
            setMessage(response.data.message || 'Verification failed');
         }
      } catch (error: any) {
         setStatus('error');
         setMessage(
            error.response?.data?.message ||
            'Invalid or expired verification token. Please try again.'
         );
      }
   };

   const handleResendVerification = () => {
      // You can implement resend verification logic here
      router.push('/signup');
   };

   return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
         <div className="max-w-md w-full">
            {/* Card Container */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
               {/* Header with gradient */}
               <div className="text-black bg-white px-8 pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600/20 backdrop-blur-sm rounded-full mb-4">
                     <KeyIcon className="w-10 h-10 text-green-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-black mb-2">
                     Forgot password?
                  </h1>
                  <p className="text-muted-foreground text-sm">
                     Enter your email to receive password reset instructions
                  </p>
               </div>

               {/* Content */}
               <div className="p-8">
                  {/* Form */}
                  <form onSubmit={handleResendVerification}>
                     <div className="mb-6">
                        <label
                           htmlFor="email"
                           className="block text-sm font-medium text-gray-700 mb-2"
                        >
                           Email Address
                        </label>
                        <input
                           type="email"
                           id="email"
                           name="email"
                           required
                           placeholder='Enter your email address'
                           className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                        />
                     </div>
                     <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
                     >
                        Resend Verification
                     </button>
                  </form>

                  {/* Success State */}
                  {status === 'success' && (
                     <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 animate-bounce">
                           <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">
                           Password reset link sent! 🎉
                        </h2>
                        <p className="text-gray-600 mb-6">
                           {message}
                        </p>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                           <p className="text-green-800 text-sm">
                              A password reset link has been sent to your email. Please check your inbox.
                           </p>
                        </div>

                        <Link
                           href="/login"
                           className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-400 text-white font-semibold px-8 py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                           Continue to Login
                           <ArrowRight className="w-5 h-5" />
                        </Link>
                     </div>
                  )}

                  {/* Error State */}
                  {status === 'error' && (
                     <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                           <XCircle className="w-10 h-10 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">
                           Verification Failed
                        </h2>
                        <p className="text-gray-600 mb-6">
                           {message}
                        </p>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                           <p className="text-red-800 text-sm mb-2 font-medium">
                              Common reasons for verification failure:
                           </p>
                           <ul className="text-red-700 text-sm text-left space-y-1">
                              <li>• The verification link has expired</li>
                              <li>• The link has already been used</li>
                              <li>• The verification token is invalid</li>
                           </ul>
                        </div>

                        <div className="space-y-3">
                           <button
                              onClick={handleResendVerification}
                              className="w-full bg-gradient-to-r from-green-600 to-green-400 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                           >
                              Request New Verification Link
                           </button>
                           <Link
                              href="/login"
                              className="block w-full text-center border-2 border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:border-green-600 hover:text-green-600 transition-colors duration-200"
                           >
                              Back to Login
                           </Link>
                        </div>
                     </div>
                  )}
               </div>

               {/* Footer */}
               <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
                  <p className="text-center text-sm text-gray-600">
                     Need help?{' '}
                     <Link href="#" className="text-green-600 hover:text-green-700 font-medium">
                        Contact Support
                     </Link>
                  </p>
               </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-center">
               <p className="text-gray-600 text-sm">
                  © 2026 Campus Connect. All rights reserved.
               </p>
            </div>
         </div>
      </div>
   );
};

export default ForgotPasswordPage;
