import { useState } from 'react';
import Link from 'next/link';
import { Mail, University, UniversityIcon } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/router';
import api from '@/utils/api';

const Signup = () => {
   const [role, setRole] = useState('student');
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });
   const [error, setError] = useState('');
   const [isSigningUp, setIsSigningUp] = useState(false);
   const router = useRouter();

   const signupUser = async () => {
      try {
         setIsSigningUp(true);
         const response = await api.post('/auth/register/', { role, email, password, name: username });
         console.log(response.data);
         setIsSigningUp(false);
         toast.success('User created successfully, check your email to verify your account', { position: "top-right" });
         router.push('/login');

      } catch (error: any) {
         console.error(error);
         if (error) {
            toast.error(error.response.data.message || 'error', { position: "top-right" });
         }
         setError(error.response.data.message || 'error');
         setIsSigningUp(false);
      }
      finally {
         setError('');
      }
   };



   // Check if form is valid
   const isFormValid =
      email.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      username.trim() !== "";

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (password !== confirmPassword) {
         toast.error('Passwords do not match', { position: "top-right" });
         return;
      }
      if (isFormValid) {
         signupUser();
      }
   };

   return (
      <div className='min-h-screen m-auto'>
         <div className='bg-white h-screen shadow-2xl w-full grid lg:grid-cols-2'>
            {/* Left Side - Promotional Content */}
            <div className="relative p-8 lg:p-12 w-full hidden lg:flex flex-col justify-center text-white overflow-hidden">
               {/* Dark overlay */}
               <div className="absolute z-40 inset-0 bg-black/70 "></div>
               {/* Background image slideshow */}
               <div className="absolute inset-0 w-full h-full">
                  {/* Campus illustration placeholder */}
                  <div className="w-full h-full bg-cover bg-bottom" style={{ backgroundImage: "url('/assets/images/loginBg.png')" }}>
                  </div>
               </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="p-4 bg-[#F3F4F6] lg:p-8 shadow-2xl sm:w-4/5 lg:max-h-full lg:w-full lg:h-full  m-auto space-y-6 flex flex-col justify-center">
               <div className="max-w-md mx-auto w-full">
                  {/* Header */}
                  <div className="text-center mb-8">
                     <h1 className="text-2xl font-bold text-gray-900 mb-3 ">
                        Create Your Account
                     </h1>
                     <p className="text-gray-600">
                        Join CampusConnect and start your journey today!
                     </p>
                  </div>

                  <form onSubmit={handleSubmit} className="md:space-y-6 space-y-4">
                     <div className="grid md:grid-cols-2 gap-4">
                        {/* Name Input */}
                        <div>
                           <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                              Full Name
                           </label>
                           <input
                              type="username"
                              id="username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              placeholder="Enter your full name"
                              className="w-full text-gray-700 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-color focus:border-transparent"
                              required
                           />
                        </div>

                        {/* Email Input */}
                        <div>
                           <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                              Email
                           </label>
                           <input
                              type="email"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="your.email@university.edu"
                              className="w-full text-gray-700 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-color focus:border-transparent"
                              required
                           />
                        </div>
                     </div>

                     {/* Password Input */}
                     <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                           Password
                        </label>
                        <div className="relative">
                           <input
                              type={showPassword.password ? "text" : "password"}
                              id="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Enter your password"
                              className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-color focus:border-transparent"
                              required
                           />
                           <button
                              type="button"
                              onClick={() => setShowPassword({ ...showPassword, password: !showPassword.password })}
                              className="absolute inset-y-0 right-3 cursor-pointer flex items-center text-gray-400"
                           >
                              {showPassword ? 'Hide' : 'Show'}
                           </button>
                        </div>
                     </div>

                     {/* Confirm Password Input */}
                     <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                           Confirm Password
                        </label>
                        <div className="relative">
                           <input
                              type={showPassword.confirmPassword ? "text" : "password"}
                              id="confirmPassword"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="Confirm your password"
                              className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-color focus:border-transparent"
                              required
                           />
                           <button
                              type="button"
                              onClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })}
                              className="absolute inset-y-0 right-3 cursor-pointer flex items-center text-gray-400"
                           >
                              {showPassword.confirmPassword ? 'Hide' : 'Show'}
                           </button>
                        </div>
                     </div>

                     {/* Login Button */}
                     <button
                        type="submit"
                        className={`${!isFormValid && 'cursor-not-allowed'} w-full bg-brand-green gap-4 items-center flex justify-center cursor-pointer hover:bg-brand-color text-white font-semibold py-3 rounded-lg transition-colors ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                     // disabled={!isFormValid}
                     >
                        {isSigningUp ? 'Signing Up...' : <><UniversityIcon className="ml-2" size={20} />
                           <span>Sign Up with University Email</span></>}
                     </button>

                     {/* User Type Selection */}
                     <div className='flex items-center gap-2'>
                        <label className="block text-sm font-medium text-gray-700">
                           I am a
                        </label>
                        <div className="flex gap-6 text-sm">
                           <label className="flex items-center cursor-pointer">
                              <input
                                 type="radio"
                                 name="role"
                                 value="student"
                                 checked={role === 'student'}
                                 onChange={(e) => setRole(e.target.value)}
                                 className="w-4 h-4 text-brand-color border-gray-300 focus:ring-brand-color accent-brand-color"
                              />
                              <span className="ml-2 text-gray-700">Student</span>
                           </label>
                           <label className="flex items-center cursor-pointer">
                              <input
                                 type="radio"
                                 name="role"
                                 value="employer"
                                 checked={role === 'employer'}
                                 onChange={(e) => setRole(e.target.value)}
                                 className="w-4 h-4 text-brand-color border-gray-300 focus:ring-brand-color accent-brand-color"
                              />
                              <span className="ml-2 text-gray-700">Employer</span>
                           </label>
                        </div>
                     </div>

                     <div className='flex gap-2 items-center'>
                        <input
                           type="checkbox"
                           id="terms"
                           required
                           className="w-4 h-4 text-brand-color border-gray-300 focus:ring-brand-color accent-brand-color"
                        />
                        <label className="block text-sm font-medium text-gray-700">
                           I agree to the
                           <Link href="/terms" className="text-brand-color font-medium hover:text-brand-green mx-1">Terms of Service</Link>
                           and
                           <Link href="/privacy" className="text-brand-color font-medium hover:text-brand-green mx-1">Privacy Policy</Link>
                        </label>
                     </div>



                     {/* Divider */}
                     <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                           <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                           <span className="px-4 text-gray-500">OR</span>
                        </div>
                     </div>

                     {/* Google Sign In */}
                     <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg transition-colors"
                     >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                           <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                           />
                           <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                           />
                           <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                           />
                           <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                           />
                        </svg>
                        Sign Up with Google
                     </button>

                     {/* Sign Up Link */}
                     <div className="text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="text-brand-green font-bold hover:text-brand-green">
                           Sign In
                        </Link>
                     </div>
                  </form>
               </div>
            </div>


         </div>
      </div>
   );
};

export default Signup;
