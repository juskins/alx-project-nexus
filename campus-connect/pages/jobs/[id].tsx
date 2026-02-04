import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'sonner';
import api from '@/utils/api';
import { JobDetails } from '@/interfaces';
import { getStoredUser } from '@/utils/auth';
import { useFetch } from '@/hooks/useFetch';

const JobDetailsPage = () => {
   const router = useRouter();
   const { id } = router.query;
   const [error, setError] = useState<string | null>(null);
   const [loading, setLoading] = useState(true);
   const [isApplying, setIsApplying] = useState(false);
   const user = getStoredUser();
   const { data: job, loading: jobLoading, error: jobError, refetch } = useFetch<any>(`/jobs/${id}`);

   useEffect(() => {
      if (id) {
         refetch();
      }
   }, [id, isApplying]);



   const handleApply = async () => {
      try {
         setIsApplying(true);
         setError(null);

         const response = await api.post(`/jobs/apply/${id}`);

         if (response.data.success) {
            toast.success(response.data.message);
         }
      } catch (error: any) {
         console.error('Error applying for job:', error);
         const errorMessage = error.response?.data?.message || 'Failed to apply for job';
         setError(errorMessage);
         toast.error(errorMessage);
      } finally {
         setIsApplying(false);
      }
   };

   // Loading state
   if (jobLoading) {
      return (
         <DashboardLayout>
            <div className="max-w-7xl h-full mx-auto px-8 py-12">
               <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-brand-color" />
                  <span className="ml-3 text-gray-600">Loading job details...</span>
               </div>
            </div>
         </DashboardLayout>
      );
   }

   // Error state
   if (jobError || !job?.data) {
      return (
         <DashboardLayout>
            <div className="max-w-7xl mx-auto px-8 py-12">
               <div className="text-center py-12">
                  <p className="text-red-500 text-lg mb-4">{jobError || 'Job not found'}</p>
                  <button
                     onClick={() => router.push('/find-jobs')}
                     className="px-6 py-2 bg-brand-color hover:bg-brand-color/90 text-white rounded-lg transition-colors"
                  >
                     Back to Jobs
                  </button>
               </div>
            </div>
         </DashboardLayout>
      );
   }

   return (
      <DashboardLayout>
         <div className="max-w-5xl mx-auto px-8 py-8">
            {/* Back Button */}
            <button
               onClick={() => router.back()}
               className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
               <ArrowLeft className="w-5 h-5" />
               <span className="font-medium">Back to Jobs</span>
            </button>

            {/* Main Content Container */}
            <div className="bg-white rounded-md overflow-hidden">
               {/* Left Column - Job Details */}
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  <div className="lg:col-span-2 p-8 lg:p-12 border-1 border-gray-200 ">
                     {/* Job Title */}
                     <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                        {job.data.title}
                     </h1>

                     {/* Job Image */}
                     <div className="mb-8">
                        <Image
                           src={job.data.image}
                           alt={job.data.title}
                           width={500}
                           height={300}
                           className="w-full h-auto object-cover rounded-lg"
                        />
                     </div>

                     {/* Job Description */}
                     <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                           {job.data.description}
                        </p>
                     </div>

                     {/* Job Details Grid */}
                     <div className="grid grid-cols-2 gap-6 mb-8">
                        {/* Pay Rate */}
                        <div>
                           <p className="text-sm text-gray-500 mb-1">Pay Rate</p>
                           <p className="text-lg font-bold text-gray-900">${job.data.payRate}/hour</p>
                        </div>

                        {/* Location */}
                        <div>
                           <p className="text-sm text-gray-500 mb-1">Location</p>
                           <p className="text-lg font-bold text-gray-900">{job.data.address}</p>
                        </div>

                        {/* Duration */}
                        <div>
                           <p className="text-sm text-gray-500 mb-1">Duration</p>
                           <p className="text-lg font-bold text-gray-900">{job.data.duration}</p>
                        </div>

                        {/* Time */}
                        <div>
                           <p className="text-sm text-gray-500 mb-1">Preferred Time</p>
                           <p className="text-lg font-bold text-gray-900">{job.data.time}</p>
                        </div>

                        {/* Job Type */}
                        <div>
                           <p className="text-sm text-gray-500 mb-1">Job Type</p>
                           <p className="text-lg font-bold text-gray-900">{job.data.type}</p>
                        </div>

                        {/* Category */}
                        <div>
                           <p className="text-sm text-gray-500 mb-1">Category</p>
                           <p className="text-lg font-bold text-gray-900">{job.data.category}</p>
                        </div>
                     </div>
                  </div>

                  {/* Right Column - Poster Info & Actions */}
                  <div className="lg:col-span-1 bg-gray-50 p-8 lg:p-6 lg:py-0 ">
                     {user?.role === 'student' && (
                        job.data.applicants?.includes(user._id) ? <div className="w-full bg-green-400/20 text-green-600 w-full py-2 px-6 rounded-md transition-all duration-200 shadow-sm text-center mb-4">Applied</div> : (
                           <button onClick={handleApply} className="w-full bg-brand-color hover:bg-brand-color/80 text-white font-semibold py-2 px-6 rounded-md transition-all duration-200 shadow-sm hover:shadow-md mb-4">
                              {isApplying ? 'Applying...' : 'Apply Now'}
                           </button>
                        )
                     )}

                     {/* Message Poster Button */}
                     <button onClick={() => router.push(`/messages`)} className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 px-6 rounded-md transition-all duration-200 border-1 border-gray-300 hover:border-gray-400 mb-8">
                        Message Poster
                     </button>

                     {/* Poster Information */}
                     <div className="text-center bg-white p-6">
                        <div className="relative inline-block mb-4">
                           <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-gradient-to-br from-brand-color to-orange-400 flex items-center justify-center">
                              <span className="text-white text-3xl font-bold">
                                 {job.data.postedBy?.name?.charAt(0).toUpperCase() || 'U'}
                              </span>
                           </div>
                           {/* Online Status Indicator */}
                           <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-3 border-white rounded-full"></div>
                        </div>

                        {/* Poster Name */}
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                           {job.data.postedBy?.name || 'Unknown User'}
                        </h3>

                        {/* Role */}
                        <p className="text-sm text-gray-600 mb-2 capitalize">
                           {job.data.postedBy?.role || 'Employer'}
                        </p>

                        {/* Department */}
                        <p className="text-sm text-gray-600 mb-2">
                           {job.data.postedBy?.department}
                        </p>

                        {/* Contact Info */}
                        <p className="text-xs text-gray-500">
                           Contact via CampusConnect Messages
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </DashboardLayout>
   );
};

export default JobDetailsPage;
