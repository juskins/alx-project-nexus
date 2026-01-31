import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Edit3, DollarSign, FileText, Upload, Eye } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import SuccessModal from '@/components/ui/SuccessModal';
import PreviewModal from '@/components/ui/PreviewModal';
import { useFilter, FilterProvider } from '@/context/FilterContext';
import { useRouter } from 'next/router';

const PostJob = () => {
   const router = useRouter();
   const { addJob } = useFilter();
   const [showSuccessModal, setShowSuccessModal] = useState(false);
   const [showPreviewModal, setShowPreviewModal] = useState(false);

   const [formData, setFormData] = useState({
      jobTitle: '',
      jobDescription: '',
      payRate: '',
      category: '',
      location: '',
      duration: '',
   });

   const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
   const [errors, setErrors] = useState<Record<string, string>>({});

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
         ...prev,
         [name]: value
      }));
      // Clear error when user starts typing
      if (errors[name]) {
         setErrors(prev => ({ ...prev, [name]: '' }));
      }
   };

   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         setUploadedFiles(Array.from(e.target.files));
      }
   };

   const validateForm = () => {
      const newErrors: Record<string, string> = {};

      if (!formData.jobTitle.trim()) {
         newErrors.jobTitle = 'Job title is required';
      }
      if (!formData.jobDescription.trim()) {
         newErrors.jobDescription = 'Job description is required';
      }
      if (!formData.payRate.trim()) {
         newErrors.payRate = 'Pay rate is required';
      }
      if (!formData.category) {
         newErrors.category = 'Category is required';
      }
      if (!formData.location.trim()) {
         newErrors.location = 'Location is required';
      }
      if (!formData.duration) {
         newErrors.duration = 'Duration is required';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
         return;
      }

      // Create new job object
      const newJob = {
         image: '/assets/images/event_cordinators.jpg', // Default image
         category: formData.category,
         department: formData.category,
         address: formData.location,
         location: 'main-campus', // Default location
         title: formData.jobTitle,
         pay: `$${formData.payRate}/hour`,
         type: formData.category,
         postedTime: 'Just now',
         duration: formData.duration,
         time: 'any time', // Default time
      };

      // Add job to the context
      addJob(newJob);

      // Show success modal
      setShowSuccessModal(true);
   };

   const handleSuccessModalClose = () => {
      setShowSuccessModal(false);
      // Redirect to find-jobs page
      router.push('/find-jobs');
   };

   const handlePreview = () => {
      setShowPreviewModal(true);
   };

   return (
      <DashboardLayout>
         <div className="max-w-7xl mx-auto px-8 overflow-hidden">
            {/* Page Header */}
            <div className="mb-8">
               <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
               <p className="text-gray-600">
                  Fill out the details below to list a new opportunity for students on CampusConnect.
               </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
               {/* Job Details Section */}
               <div className="bg-white rounded-lg border border-gray-200 p-8">
                  <div className="flex items-center gap-2 mb-6">
                     <Edit3 className="w-5 h-5 text-gray-700" />
                     <h2 className="text-xl font-semibold text-gray-900">Job Details</h2>
                  </div>

                  {/* Job Title */}
                  <div className="mb-6">
                     <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">
                        Job Title <span className="text-red-500">*</span>
                     </label>
                     <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        placeholder="e.g., Campus Tour Guide"
                        className={`w-full px-4 text-gray-700 py-3 border ${errors.jobTitle ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-brand-color focus:border-transparent outline-none transition-all`}
                     />
                     {errors.jobTitle && (
                        <p className="mt-1 text-sm text-red-500">{errors.jobTitle}</p>
                     )}
                  </div>

                  {/* Job Description */}
                  <div>
                     <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">
                        Job Description <span className="text-red-500">*</span>
                     </label>
                     <textarea
                        id="jobDescription"
                        name="jobDescription"
                        value={formData.jobDescription}
                        onChange={handleInputChange}
                        placeholder="Describe the tasks, responsibilities, and benefits of this job..."
                        rows={6}
                        className={`w-full px-4 text-gray-700 py-3 border ${errors.jobDescription ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-brand-color focus:border-transparent outline-none transition-all resize-none`}
                     />
                     {errors.jobDescription && (
                        <p className="mt-1 text-sm text-red-500">{errors.jobDescription}</p>
                     )}
                  </div>
               </div>

               {/* Compensation & Logistics Section */}
               <div className="bg-white rounded-lg border border-gray-200 p-8">
                  <div className="flex items-center gap-2 mb-6">
                     <DollarSign className="w-5 h-5 text-gray-700" />
                     <h2 className="text-xl font-semibold text-gray-900">Compensation & Logistics</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                     {/* Pay Rate */}
                     <div>
                        <label htmlFor="payRate" className="block text-sm font-medium text-gray-700 mb-2">
                           Pay Rate <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                           <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                           <input
                              type="text"
                              id="payRate"
                              name="payRate"
                              value={formData.payRate}
                              onChange={handleInputChange}
                              placeholder="e.g., 15.00"
                              className={`w-full text-gray-700 pl-8 pr-16 py-3 border ${errors.payRate ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-brand-color focus:border-transparent outline-none transition-all`}
                           />
                           <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">/hr</span>
                        </div>
                        {errors.payRate && (
                           <p className="mt-1 text-sm text-red-500">{errors.payRate}</p>
                        )}
                     </div>

                     {/* Category */}
                     <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                           Category <span className="text-red-500">*</span>
                        </label>

                        {/* Category Dropdown */}
                        <Select
                           value={formData?.category}
                           onValueChange={(value) => {
                              setFormData({ ...formData, category: value });
                              if (errors.category) {
                                 setErrors(prev => ({ ...prev, category: '' }));
                              }
                           }}
                        >
                           <SelectTrigger className={`w-full bg-white py-6 text-gray-700 ${errors.category ? 'border-red-500' : ''}`}>
                              <SelectValue placeholder="Select a category" />
                           </SelectTrigger>

                           <SelectContent>
                              <SelectGroup>
                                 <SelectLabel>Select Category</SelectLabel>
                                 <SelectItem value="Event Planning">Event Planning</SelectItem>
                                 <SelectItem value="Administrative">Administrative</SelectItem>
                                 <SelectItem value="Research">Research</SelectItem>
                                 <SelectItem value="Technology">Technology</SelectItem>
                                 <SelectItem value="Customer Service">Customer Service</SelectItem>
                                 <SelectItem value="Food Service">Food Service</SelectItem>
                                 <SelectItem value="Marketing">Marketing</SelectItem>
                                 <SelectItem value="Freelance">Freelance</SelectItem>
                              </SelectGroup>
                           </SelectContent>
                        </Select>
                        {errors.category && (
                           <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                        )}
                     </div>

                     {/* Location */}
                     <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                           Location <span className="text-red-500">*</span>
                        </label>
                        <input
                           type="text"
                           id="location"
                           name="location"
                           value={formData.location}
                           onChange={handleInputChange}
                           placeholder="e.g., Campus Library, Building A"
                           className={`w-full text-gray-700 px-4 py-3 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-brand-color focus:border-transparent outline-none transition-all`}
                        />
                        {errors.location && (
                           <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                        )}
                     </div>
                  </div>

                  {/* Duration */}
                  <div className="max-w-xs">
                     <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                        Duration <span className="text-red-500">*</span>
                     </label>
                     <Select
                        value={formData?.duration}
                        onValueChange={(value) => {
                           setFormData({ ...formData, duration: value });
                           if (errors.duration) {
                              setErrors(prev => ({ ...prev, duration: '' }));
                           }
                        }}
                     >
                        <SelectTrigger className={`w-full bg-white py-6 text-gray-700 ${errors.duration ? 'border-red-500' : ''}`}>
                           <SelectValue placeholder="Select a duration" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                              <SelectLabel>Select Duration</SelectLabel>
                              <SelectItem value="1-2 hours">1-2 hours</SelectItem>
                              <SelectItem value="2-4 hours">2-4 hours</SelectItem>
                              <SelectItem value="4-8 hours">4-8 hours</SelectItem>
                              <SelectItem value="full day">Full day</SelectItem>
                              <SelectItem value="ongoing">Ongoing</SelectItem>
                           </SelectGroup>
                        </SelectContent>
                     </Select>
                     {errors.duration && (
                        <p className="mt-1 text-sm text-red-500">{errors.duration}</p>
                     )}
                  </div>
               </div>

               {/* Media & Preview Section */}
               <div className="bg-white rounded-lg border border-gray-200 p-8">
                  <div className="flex items-center gap-2 mb-6">
                     <FileText className="w-5 h-5 text-gray-700" />
                     <h2 className="text-xl font-semibold text-gray-900">Media & Preview</h2>
                  </div>

                  {/* Supporting Files */}
                  <div className="mb-6">
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                        Supporting Files
                     </label>
                     <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-brand-color transition-colors">
                        <input
                           type="file"
                           id="fileUpload"
                           multiple
                           onChange={handleFileUpload}
                           className="hidden"
                           accept="image/*,.pdf,.doc,.docx"
                        />
                        <label
                           htmlFor="fileUpload"
                           className="cursor-pointer flex flex-col items-center justify-center"
                        >
                           <Upload className="w-8 h-8 text-gray-400 mb-3" />
                           <span className="text-gray-700 font-medium mb-1">Upload Files</span>
                           <span className="text-sm text-gray-500">
                              {uploadedFiles.length > 0
                                 ? `${uploadedFiles.length} file(s) selected`
                                 : 'No files selected. Max 5MB.'}
                           </span>
                        </label>
                     </div>
                  </div>

                  {/* Preview Button */}
                  <button
                     type="button"
                     onClick={handlePreview}
                     className="w-full py-3 px-6 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                     <Eye className="w-5 h-5" />
                     Preview Job Posting
                  </button>
               </div>

               {/* Action Buttons */}
               <div className="flex items-center justify-end gap-4">
                  <button
                     type="button"
                     className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                  >
                     Cancel
                  </button>
                  <button
                     type="submit"
                     className="px-8 py-3 bg-brand-color hover:bg-brand-color/90 text-white font-semibold rounded-lg transition-colors shadow-sm hover:shadow-md"
                  >
                     Post Job
                  </button>
               </div>
            </form>
         </div>

         {/* Success Modal */}
         <SuccessModal
            isOpen={showSuccessModal}
            onClose={handleSuccessModalClose}
            title="Job Posted Successfully!"
            message="Your job posting has been published and is now visible to students on the Find Jobs page."
         />

         {/* Preview Modal */}
         <PreviewModal
            isOpen={showPreviewModal}
            onClose={() => setShowPreviewModal(false)}
            jobData={formData}
         />
      </DashboardLayout>
   );
};

const PostJobPage = () => {
   return (
      <FilterProvider>
         <PostJob />
      </FilterProvider>
   );
};

export default PostJobPage;
