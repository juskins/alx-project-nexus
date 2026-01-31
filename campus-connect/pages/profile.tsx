import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Image from 'next/image';
import { Mail, Linkedin, Link as LinkIcon, Star } from 'lucide-react';
import { useRouter } from 'next/router';

const Profile = () => {
   const router = useRouter();

   // Mock user data - in production, this would come from an API or context
   const userData = {
      name: 'Ava Rodriguez',
      university: 'State University, Class of 2026',
      bio: 'A motivated student passionate about connecting with campus opportunities. I specialize in event coordination and have a strong background in administrative support roles.',
      profileImage: '/assets/images/ava-profile.jpg',
      stats: {
         completedJobs: 15,
         ongoingJobs: 2,
         postedJobs: 0,
      },
      skills: [
         'Event Planning',
         'Data Entry',
         'Social Media Management',
         'Content Creation',
         'Administrative Support',
         'Customer Service',
      ],
      contact: {
         email: 'ava.rodriguez@example.edu',
         linkedin: 'LinkedIn Profile',
         website: 'Personal Website',
      },
      jobHistory: [
         {
            title: 'Campus Tour Guide',
            status: 'completed',
            pay: '$15/hr',
            date: '12-01-2025',
         },
         {
            title: 'Library Assistant (Evening Shift)',
            status: 'ongoing',
            pay: '$14/hr',
            date: '11-12-2024',
         },
         {
            title: 'Student Mentor Program Coordinator',
            status: 'completed',
            pay: '$18/hr',
            date: '10-12-2023',
         },
         {
            title: 'Research Assistant for Psychology Dept.',
            status: 'completed',
            pay: '$16/hr',
            date: '09-12-2023',
         },
         {
            title: 'Front Desk Receptionist',
            status: 'ongoing',
            pay: '$13/hr',
            date: '08-12-2024',
         },
      ],
      reviews: [
         {
            reviewer: 'Prof. Kim',
            comment: 'Ava is an incredibly organized and reliable research assistant. Highly recommended!',
         },
         {
            reviewer: 'Student Affairs Office',
            comment: 'Her event planning skills made our campus orientation a huge success. Excellent communication!',
         },
      ],
      rating: 4.8,
      reviewCount: 25,
   };

   return (
      <DashboardLayout>
         <div className="max-w-7xl mx-auto px-8 overflow-hidden py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               {/* Left Sidebar - Profile Info */}
               <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg border border-gray-200 p-8">
                     {/* Profile Image */}
                     <div className="flex justify-center mb-6">
                        <div className="relative">
                           <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100">
                              <Image
                                 src={userData.profileImage}
                                 alt={userData.name}
                                 width={128}
                                 height={128}
                                 className="w-full h-full object-cover"
                              />
                           </div>
                           {/* Online Status */}
                           <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                        </div>
                     </div>

                     {/* Name and University */}
                     <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">{userData.name}</h1>
                        <p className="text-sm text-gray-600">{userData.university}</p>
                     </div>

                     {/* Bio */}
                     <p className="text-sm text-gray-700 text-center leading-relaxed mb-6">
                        {userData.bio}
                     </p>

                     {/* Edit Profile Button */}
                     <button className="w-full bg-brand-color hover:bg-brand-color/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-8">
                        Edit Profile
                     </button>

                     {/* Skills Section */}
                     <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                           {userData.skills.map((skill, index) => (
                              <span
                                 key={index}
                                 className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-200"
                              >
                                 {skill}
                              </span>
                           ))}
                        </div>
                     </div>

                     {/* Contact Information */}
                     <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                        <div className="space-y-3">
                           <a
                              href={`mailto:${userData.contact.email}`}
                              className="flex items-center gap-3 text-sm text-brand-color hover:text-brand-color/80 transition-colors"
                           >
                              <Mail className="w-4 h-4" />
                              <span>{userData.contact.email}</span>
                           </a>
                           <a
                              href="#"
                              className="flex items-center gap-3 text-sm text-brand-color hover:text-brand-color/80 transition-colors"
                           >
                              <Linkedin className="w-4 h-4" />
                              <span>{userData.contact.linkedin}</span>
                           </a>
                           <a
                              href="#"
                              className="flex items-center gap-3 text-sm text-brand-color hover:text-brand-color/80 transition-colors"
                           >
                              <LinkIcon className="w-4 h-4" />
                              <span>{userData.contact.website}</span>
                           </a>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Right Content - Stats and History */}
               <div className="lg:col-span-2 space-y-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-3 gap-4">
                     {/* Completed Jobs */}
                     <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                        <div className="text-3xl font-bold text-brand-color mb-1">
                           {userData.stats.completedJobs}
                        </div>
                        <div className="text-sm text-gray-600">Completed Jobs</div>
                     </div>

                     {/* Ongoing Jobs */}
                     <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                        <div className="text-3xl font-bold text-brand-color mb-1">
                           {userData.stats.ongoingJobs}
                        </div>
                        <div className="text-sm text-gray-600">Ongoing Jobs</div>
                     </div>

                     {/* Posted Jobs */}
                     <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                        <div className="text-3xl font-bold text-brand-color mb-1">
                           {userData.stats.postedJobs}
                        </div>
                        <div className="text-sm text-gray-600">Posted Jobs</div>
                     </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                     <button
                        onClick={() => router.push('/find-jobs')}
                        className="bg-brand-color hover:bg-brand-color/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                     >
                        Find More Jobs
                     </button>
                     <button
                        onClick={() => router.push('/post-job')}
                        className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-300 transition-colors"
                     >
                        Post a New Job
                     </button>
                  </div>

                  {/* Job History */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                     <h2 className="text-xl font-bold text-gray-900 mb-6">Job History</h2>

                     {/* Table Header */}
                     <div className="overflow-x-auto">
                        <table className="w-full">
                           <thead>
                              <tr className="border-b border-gray-200">
                                 <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                                    Job Title
                                 </th>
                                 <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                                    Status
                                 </th>
                                 <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                                    Pay
                                 </th>
                                 <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                                    Date
                                 </th>
                              </tr>
                           </thead>
                           <tbody>
                              {userData.jobHistory.map((job, index) => (
                                 <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-4 px-4 text-sm text-gray-900">{job.title}</td>
                                    <td className="py-4 px-4">
                                       <span
                                          className={`text-sm ${job.status === 'completed'
                                             ? 'text-gray-600'
                                             : 'text-blue-600'
                                             }`}
                                       >
                                          {job.status}
                                       </span>
                                    </td>
                                    <td className="py-4 px-4 text-sm text-gray-700">{job.pay}</td>
                                    <td className="py-4 px-4 text-sm text-gray-600">{job.date}</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>

                  {/* Ratings & Reviews */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                     <h2 className="text-xl font-bold text-gray-900 mb-4">Ratings & Reviews</h2>

                     {/* Rating Summary */}
                     <div className="flex items-center gap-3 mb-6">
                        <div className="text-4xl font-bold text-brand-color">{userData.rating}</div>
                        <div>
                           <div className="flex items-center gap-1 mb-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                 <Star
                                    key={star}
                                    className={`w-5 h-5 ${star <= Math.floor(userData.rating)
                                       ? 'fill-brand-color text-brand-color'
                                       : star - 0.5 <= userData.rating
                                          ? 'fill-brand-color/50 text-brand-color'
                                          : 'fill-gray-200 text-gray-200'
                                       }`}
                                 />
                              ))}
                           </div>
                           <div className="text-sm text-gray-600">({userData.reviewCount} reviews)</div>
                        </div>
                     </div>

                     {/* Reviews */}
                     <div className="space-y-4">
                        {userData.reviews.map((review, index) => (
                           <div key={index} className="border-t border-gray-100 pt-4">
                              <h4 className="font-semibold text-gray-900 mb-2">{review.reviewer}</h4>
                              <p className="text-sm text-gray-600 italic">{review.comment}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </DashboardLayout>
   );
};

export default Profile;
