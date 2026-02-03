import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import EditProfileModal from '@/components/profile/EditProfileModal';
import Image from 'next/image';
import { Mail, Linkedin, Link as LinkIcon, Star, Loader2 } from 'lucide-react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getAuthToken } from '@/utils/auth';
import { toast } from 'sonner';

interface UserProfile {
   _id: string;
   name: string;
   email: string;
   role: string;
   bio?: string;
   avatar?: string;
   phone?: string;
   department?: string;
   studentId?: string;
   skills?: string[];
   linkedin?: string;
   website?: string;
   createdAt: string;
}

interface ProfileStats {
   completedJobs: number;
   ongoingJobs: number;
   postedJobs: number;
}

const Profile = () => {
   const router = useRouter();
   const [user, setUser] = useState<UserProfile | null>(null);
   const [stats, setStats] = useState<ProfileStats>({
      completedJobs: 0,
      ongoingJobs: 0,
      postedJobs: 0,
   });
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

   useEffect(() => {
      fetchProfile();
      fetchStats();
   }, []);

   const fetchProfile = async () => {
      try {
         setLoading(true);
         const token = getAuthToken();

         if (!token) {
            router.push('/login');
            return;
         }

         const response = await axios.get('http://localhost:5000/api/users/profile', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });

         if (response.data.success) {
            setUser(response.data.data);
         }
      } catch (error: any) {
         console.error('Error fetching profile:', error);
         const errorMessage = error.response?.data?.message || 'Failed to load profile';
         setError(errorMessage);
         toast.error(errorMessage);

         if (error.response?.status === 401) {
            router.push('/login');
         }
      } finally {
         setLoading(false);
      }
   };

   const fetchStats = async () => {
      try {
         const token = getAuthToken();
         if (!token) return;

         // Fetch user's posted jobs
         const jobsResponse = await axios.get('http://localhost:5000/api/jobs/my-jobs', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });

         if (jobsResponse.data.success) {
            setStats(prev => ({
               ...prev,
               postedJobs: jobsResponse.data.count || 0,
            }));
         }

         // TODO: Fetch applied jobs and completed jobs when application system is implemented
      } catch (error) {
         console.error('Error fetching stats:', error);
      }
   };

   // Get university info from email domain
   const getUniversityInfo = () => {
      if (!user?.email) return 'University Student';
      const domain = user.email.split('@')[1];
      return domain ? `${domain.split('.')[0]} University` : 'University Student';
   };

   // Get initials for avatar
   const getInitials = () => {
      if (!user?.name) return 'U';
      return user.name
         .split(' ')
         .map(n => n[0])
         .join('')
         .toUpperCase()
         .slice(0, 2);
   };

   // Loading state
   if (loading) {
      return (
         <DashboardLayout>
            <div className="max-w-7xl mx-auto px-8 py-12">
               <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-brand-color" />
                  <span className="ml-3 text-gray-600">Loading profile...</span>
               </div>
            </div>
         </DashboardLayout>
      );
   }

   // Error state
   if (error || !user) {
      return (
         <DashboardLayout>
            <div className="max-w-7xl mx-auto px-8 py-12">
               <div className="text-center py-12">
                  <p className="text-red-500 text-lg mb-4">{error || 'Profile not found'}</p>
                  <button
                     onClick={() => router.push('/dashboard')}
                     className="px-6 py-2 bg-brand-color hover:bg-brand-color/90 text-white rounded-lg transition-colors"
                  >
                     Back to Dashboard
                  </button>
               </div>
            </div>
         </DashboardLayout>
      );
   }

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
                           <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 bg-gradient-to-br from-brand-color to-orange-400 flex items-center justify-center">
                              {user.avatar ? (
                                 <Image
                                    src={user.avatar}
                                    alt={user.name}
                                    width={128}
                                    height={128}
                                    className="w-full h-full object-cover"
                                 />
                              ) : (
                                 <span className="text-white text-4xl font-bold">
                                    {getInitials()}
                                 </span>
                              )}
                           </div>
                           {/* Online Status */}
                           <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                        </div>
                     </div>

                     {/* Name and University */}
                     <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h1>
                        <p className="text-sm text-gray-600 capitalize">{user.role}</p>
                        <p className="text-sm text-gray-500">{getUniversityInfo()}</p>
                     </div>

                     {/* Bio */}
                     {user.bio && (
                        <p className="text-sm text-gray-700 text-center leading-relaxed mb-6">
                           {user.bio}
                        </p>
                     )}

                     {/* Edit Profile Button */}
                     <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="w-full bg-brand-color hover:bg-brand-color/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-8"
                     >
                        Edit Profile
                     </button>

                     {/* Skills Section */}
                     {user.skills && user.skills.length > 0 && (
                        <div className="mb-8">
                           <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
                           <div className="flex flex-wrap gap-2">
                              {user.skills.map((skill, index) => (
                                 <span
                                    key={index}
                                    className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-200"
                                 >
                                    {skill}
                                 </span>
                              ))}
                           </div>
                        </div>
                     )}

                     {/* Contact Information */}
                     <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                        <div className="space-y-3">
                           <a
                              href={`mailto:${user.email}`}
                              className="flex items-center gap-3 text-sm text-brand-color hover:text-brand-color/80 transition-colors"
                           >
                              <Mail className="w-4 h-4" />
                              <span>{user.email}</span>
                           </a>
                           {user.linkedin && (
                              <a
                                 href={user.linkedin}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="flex items-center gap-3 text-sm text-brand-color hover:text-brand-color/80 transition-colors"
                              >
                                 <Linkedin className="w-4 h-4" />
                                 <span>LinkedIn Profile</span>
                              </a>
                           )}
                           {user.website && (
                              <a
                                 href={user.website}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="flex items-center gap-3 text-sm text-brand-color hover:text-brand-color/80 transition-colors"
                              >
                                 <LinkIcon className="w-4 h-4" />
                                 <span>Personal Website</span>
                              </a>
                           )}
                        </div>
                     </div>

                     {/* Department */}
                     {user.department && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                           <p className="text-sm text-gray-600">Department</p>
                           <p className="text-base font-semibold text-gray-900">{user.department}</p>
                        </div>
                     )}

                     {/* Student ID */}
                     {user.studentId && (
                        <div className="mt-4">
                           <p className="text-sm text-gray-600">Student ID</p>
                           <p className="text-base font-semibold text-gray-900">{user.studentId}</p>
                        </div>
                     )}
                  </div>
               </div>

               {/* Right Content - Stats and History */}
               <div className="lg:col-span-2 space-y-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-3 gap-4">
                     {/* Completed Jobs */}
                     <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                        <div className="text-3xl font-bold text-brand-color mb-1">
                           {stats.completedJobs}
                        </div>
                        <div className="text-sm text-gray-600">Completed Jobs</div>
                     </div>

                     {/* Ongoing Jobs */}
                     <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                        <div className="text-3xl font-bold text-brand-color mb-1">
                           {stats.ongoingJobs}
                        </div>
                        <div className="text-sm text-gray-600">Ongoing Jobs</div>
                     </div>

                     {/* Posted Jobs */}
                     <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                        <div className="text-3xl font-bold text-brand-color mb-1">
                           {stats.postedJobs}
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
                     {(user.role === 'employer' || user.role === 'admin') && (
                        <button
                           onClick={() => router.push('/post-job')}
                           className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-300 transition-colors"
                        >
                           Post a New Job
                        </button>
                     )}
                  </div>

                  {/* Job History Placeholder */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                     <h2 className="text-xl font-bold text-gray-900 mb-6">Job History</h2>
                     <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">
                           Job history will be available when the application system is implemented.
                        </p>
                        <button
                           onClick={() => router.push('/find-jobs')}
                           className="px-6 py-2 bg-brand-color hover:bg-brand-color/90 text-white rounded-lg transition-colors"
                        >
                           Browse Jobs
                        </button>
                     </div>
                  </div>

                  {/* Ratings & Reviews Placeholder */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                     <h2 className="text-xl font-bold text-gray-900 mb-4">Ratings & Reviews</h2>
                     <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">
                           Reviews will be available when the rating system is implemented.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Edit Profile Modal */}
         {user && (
            <EditProfileModal
               isOpen={isEditModalOpen}
               onClose={() => setIsEditModalOpen(false)}
               userData={user}
               onSuccess={() => {
                  fetchProfile();
                  fetchStats();
               }}
            />
         )}
      </DashboardLayout>
   );
};

export default Profile;
