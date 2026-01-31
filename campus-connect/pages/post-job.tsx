import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Edit3, DollarSign, FileText, Upload, Eye } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

const PostJob = () => {
   const [formData, setFormData] = useState({
      jobTitle: '',
      jobDescription: '',
      payRate: '',
      category: '',
      location: '',
      duration: '',
   });

   const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
         ...prev,
         [name]: value
      }));
   };

   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         setUploadedFiles(Array.from(e.target.files));
      }
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      // Handle form submission
   };

   const handlePreview = () => {
      console.log('Preview job posting:', formData);
      // Handle preview
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
                        Job Title
                     </label>
                     <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        placeholder="e.g., Campus Tour Guide"
                        className="w-full px-4 text-gray-700 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-color focus:border-transparent outline-none transition-all"
                     />
                  </div>

                  {/* Job Description */}
                  <div>
                     <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">
                        Job Description
                     </label>
                     <textarea
                        id="jobDescription"
                        name="jobDescription"
                        value={formData.jobDescription}
                        onChange={handleInputChange}
                        placeholder="Describe the tasks, responsibilities, and benefits of this job..."
                        rows={6}
                        className="w-full px-4 text-gray-700 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-color focus:border-transparent outline-none transition-all resize-none"
                     />
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
                           Pay Rate
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
                              className="w-full text-gray-700 pl-8 pr-16 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-color focus:border-transparent outline-none transition-all"
                           />
                           <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">/hr</span>
                        </div>
                     </div>

                     {/* Category */}
                     <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                           Category
                        </label>

                        {/* Category Dropdown */}
                        <Select
                           value={formData?.category}
                           onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                           <SelectTrigger className="w-full  bg-white py-6 text-gray-700">
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
                     </div>

                     {/* Location */}
                     <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                           Location
                        </label>
                        <input
                           type="text"
                           id="location"
                           name="location"
                           value={formData.location}
                           onChange={handleInputChange}
                           placeholder="e.g., Campus Library, Building A"
                           className="w-full text-gray-700 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-color focus:border-transparent outline-none transition-all"
                        />
                     </div>
                  </div>

                  {/* Duration */}
                  <div className="max-w-xs">
                     <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                        Duration
                     </label>
                     <Select
                        value={formData?.duration}
                        onValueChange={(value) => setFormData({ ...formData, duration: value })}
                     >
                        <SelectTrigger className="w-full  bg-white py-6 text-gray-700">
                           <SelectValue placeholder="Select a duration" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                              <SelectLabel>Select Duration</SelectLabel>
                              <SelectItem value="1-2-hours">1-2 hours</SelectItem>
                              <SelectItem value="2-4-hours">2-4 hours</SelectItem>
                              <SelectItem value="4-8-hours">4-8 hours</SelectItem>
                              <SelectItem value="full-day">Full day</SelectItem>
                              <SelectItem value="ongoing">Ongoing</SelectItem>
                           </SelectGroup>
                        </SelectContent>
                     </Select>
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
      </DashboardLayout>
   );
};

export default PostJob;
