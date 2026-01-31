import { useRouter } from 'next/router';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { jobs } from '@/constant';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

const JobDetails = () => {
   const router = useRouter();
   const { id } = router.query;

   // Get the job based on the ID (index)
   const jobIndex = parseInt(id as string);
   const job = jobs[jobIndex];

   if (!job) {
      return (
         <DashboardLayout>
            <div className="max-w-7xl mx-auto px-8 py-12">
               <p className="text-gray-500">Job not found</p>
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
                     <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                        {job.title}
                     </h1>

                     {/* Job Description */}
                     <div className="mb-8">
                        <p className="text-gray-700 leading-relaxed mb-4">
                           The University IT Services team is seeking a proactive and detail-oriented IT Support
                           Assistant to help manage and maintain campus technology infrastructure. This is an
                           excellent opportunity for students looking to gain practical experience in a dynamic
                           IT environment. Responsibilities include providing technical assistance to students
                           and faculty, troubleshooting hardware and software issues, and assisting with
                           network maintenance.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                           This role requires strong problem-solving skills, a foundational understanding of
                           computer systems, and excellent communication abilities. Training will be provided,
                           making it suitable for students eager to learn and contribute to a vital campus
                           service. Join our team and make a tangible impact on the university's technological
                           landscape!
                        </p>
                     </div>

                     {/* Job Details Grid */}
                     <div className="grid grid-cols-2 gap-6 mb-8">
                        {/* Pay Rate */}
                        <div>
                           <p className="text-sm text-gray-500 mb-1">Pay Rate</p>
                           <p className="text-lg font-bold text-gray-900">{job.pay}</p>
                        </div>

                        {/* Location */}
                        <div>
                           <p className="text-sm text-gray-500 mb-1">Location</p>
                           <p className="text-lg font-bold text-gray-900">{job.address}</p>
                        </div>

                        {/* Duration */}
                        <div>
                           <p className="text-sm text-gray-500 mb-1">Duration</p>
                           <p className="text-lg font-bold text-gray-900">
                              {job.duration || 'Fall Semester 2024'}
                           </p>
                        </div>

                        {/* Hours per Week */}
                        <div>
                           <p className="text-sm text-gray-500 mb-1">Hours per Week</p>
                           <p className="text-lg font-bold text-gray-900">10-15 hours</p>
                        </div>
                     </div>
                  </div>

                  {/* Right Column - Poster Info & Actions */}
                  <div className="lg:col-span-1 bg-gray-50 p-8 lg:p-6 lg:py-0 ">
                     {/* Apply Now Button */}
                     <button className="w-full bg-brand-color hover:bg-brand-color/80 text-white font-semibold py-2 px-6 rounded-md transition-all duration-200 shadow-sm hover:shadow-md mb-4">
                        Apply Now
                     </button>

                     {/* Message Poster Button */}
                     <button className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 px-6 rounded-md transition-all duration-200 border-1 border-gray-300 hover:border-gray-400 mb-8">
                        Message Poster
                     </button>

                     {/* Poster Information */}
                     <div className="text-center bg-white p-6">
                        <div className="relative inline-block mb-4">
                           <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                              <Image
                                 src="/assets/images/professor.jpg"
                                 alt="Professor Alex Kim"
                                 width={96}
                                 height={96}
                                 className="w-full h-full object-cover"
                              />
                           </div>
                           {/* Online Status Indicator */}
                           <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-3 border-white rounded-full"></div>
                        </div>

                        {/* Poster Name */}
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                           Professor Alex Kim
                        </h3>

                        {/* Department */}
                        <p className="text-sm text-gray-600 mb-2">
                           Computer Science Department
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

export default JobDetails;
