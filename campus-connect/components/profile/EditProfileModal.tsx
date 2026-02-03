import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import axios from 'axios';
import { getAuthToken } from '@/utils/auth';
import { toast } from 'sonner';

interface EditProfileModalProps {
   isOpen: boolean;
   onClose: () => void;
   userData: {
      name: string;
      email: string;
      bio?: string;
      phone?: string;
      department?: string;
      studentId?: string;
      skills?: string[];
      linkedin?: string;
      website?: string;
   };
   onSuccess: () => void;
}

const EditProfileModal = ({ isOpen, onClose, userData, onSuccess }: EditProfileModalProps) => {
   const [formData, setFormData] = useState({
      name: '',
      bio: '',
      phone: '',
      department: '',
      studentId: '',
      skills: [] as string[],
      linkedin: '',
      website: '',
   });
   const [skillInput, setSkillInput] = useState('');
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if (isOpen && userData) {
         setFormData({
            name: userData.name || '',
            bio: userData.bio || '',
            phone: userData.phone || '',
            department: userData.department || '',
            studentId: userData.studentId || '',
            skills: userData.skills || [],
            linkedin: userData.linkedin || '',
            website: userData.website || '',
         });
      }
   }, [isOpen, userData]);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleAddSkill = () => {
      if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
         setFormData(prev => ({
            ...prev,
            skills: [...prev.skills, skillInput.trim()],
         }));
         setSkillInput('');
      }
   };

   const handleRemoveSkill = (skillToRemove: string) => {
      setFormData(prev => ({
         ...prev,
         skills: prev.skills.filter(skill => skill !== skillToRemove),
      }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
         setLoading(true);
         const token = getAuthToken();

         if (!token) {
            toast.error('Please login to update profile');
            return;
         }

         const response = await axios.put(
            'http://localhost:5000/api/users/profile',
            formData,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );

         if (response.data.success) {
            toast.success('Profile updated successfully!');
            onSuccess();
            onClose();
         }
      } catch (error: any) {
         console.error('Error updating profile:', error);
         const errorMessage = error.response?.data?.message || 'Failed to update profile';
         toast.error(errorMessage);
      } finally {
         setLoading(false);
      }
   };

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
         <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
               <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
               <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={loading}
               >
                  <X className="w-6 h-6" />
               </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
               {/* Name */}
               <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                     Full Name *
                  </label>
                  <input
                     type="text"
                     id="name"
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     required
                     className="w-full px-4 text-gray-900 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-color focus:border-transparent"
                     placeholder="Enter your full name"
                  />
               </div>

               {/* Bio */}
               <div>
                  <label htmlFor="bio" className="block text-sm font-semibold text-gray-700 mb-2">
                     Bio
                  </label>
                  <textarea
                     id="bio"
                     name="bio"
                     value={formData.bio}
                     onChange={handleChange}
                     rows={4}
                     maxLength={500}
                     className="w-full px-4 text-gray-900 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-color focus:border-transparent resize-none"
                     placeholder="Tell us about yourself..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                     {formData.bio.length}/500 characters
                  </p>
               </div>

               {/* Phone */}
               <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                     Phone Number
                  </label>
                  <input
                     type="tel"
                     id="phone"
                     name="phone"
                     value={formData.phone}
                     onChange={handleChange}
                     className="w-full px-4 text-gray-900 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-color focus:border-transparent"
                     placeholder="+1 (234) 567-8900"
                  />
               </div>

               {/* Department */}
               <div>
                  <label htmlFor="department" className="block text-sm font-semibold text-gray-700 mb-2">
                     Department
                  </label>
                  <input
                     type="text"
                     id="department"
                     name="department"
                     value={formData.department}
                     onChange={handleChange}
                     className="w-full px-4 text-gray-900 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-color focus:border-transparent"
                     placeholder="e.g., Computer Science"
                  />
               </div>

               {/* Student ID */}
               <div>
                  <label htmlFor="studentId" className="block text-sm font-semibold text-gray-700 mb-2">
                     Student ID
                  </label>
                  <input
                     type="text"
                     id="studentId"
                     name="studentId"
                     value={formData.studentId}
                     onChange={handleChange}
                     className="w-full px-4 text-gray-900 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-color focus:border-transparent"
                     placeholder="e.g., CS2024001"
                  />
               </div>

               {/* Skills */}
               <div>
                  <label htmlFor="skills" className="block text-sm font-semibold text-gray-700 mb-2">
                     Skills
                  </label>
                  <div className="flex gap-2 mb-2">
                     <input
                        type="text"
                        id="skills"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={(e) => {
                           if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddSkill();
                           }
                        }}
                        className="flex-1 px-4 text-gray-900 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-color focus:border-transparent"
                        placeholder="Add a skill and press Enter"
                     />
                     <button
                        type="button"
                        onClick={handleAddSkill}
                        className="px-4 text-gray-900 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                     >
                        Add
                     </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                     {formData.skills.map((skill, index) => (
                        <span
                           key={index}
                           className="px-3 py-1.5 bg-brand-color/10 text-brand-color text-sm rounded-full border border-brand-color/20 flex items-center gap-2"
                        >
                           {skill}
                           <button
                              type="button"
                              onClick={() => handleRemoveSkill(skill)}
                              className="hover:text-red-600 transition-colors"
                           >
                              <X className="w-3 h-3" />
                           </button>
                        </span>
                     ))}
                  </div>
               </div>

               {/* LinkedIn */}
               <div>
                  <label htmlFor="linkedin" className="block text-sm font-semibold text-gray-700 mb-2">
                     LinkedIn Profile
                  </label>
                  <input
                     type="url"
                     id="linkedin"
                     name="linkedin"
                     value={formData.linkedin}
                     onChange={handleChange}
                     className="w-full text-gray-900 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-color focus:border-transparent"
                     placeholder="https://linkedin.com/in/yourprofile"
                  />
               </div>

               {/* Website */}
               <div>
                  <label htmlFor="website" className="block text-sm font-semibold text-gray-700 mb-2">
                     Personal Website
                  </label>
                  <input
                     type="url"
                     id="website"
                     name="website"
                     value={formData.website}
                     onChange={handleChange}
                     className="w-full text-gray-900 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-color focus:border-transparent"
                     placeholder="https://yourwebsite.com"
                  />
               </div>

               {/* Action Buttons */}
               <div className="flex gap-4 pt-4 border-t border-gray-200">
                  <button
                     type="button"
                     onClick={onClose}
                     disabled={loading}
                     className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                     Cancel
                  </button>
                  <button
                     type="submit"
                     disabled={loading}
                     className="flex-1 px-6 py-3 bg-brand-color hover:bg-brand-color/90 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                     {loading ? (
                        <>
                           <Loader2 className="w-5 h-5 animate-spin" />
                           Saving...
                        </>
                     ) : (
                        'Save Changes'
                     )}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default EditProfileModal;
