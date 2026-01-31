import { X, MapPin, DollarSign, Clock, Calendar } from 'lucide-react';
import { useEffect } from 'react';
import Image from 'next/image';

interface PreviewModalProps {
   isOpen: boolean;
   onClose: () => void;
   jobData: {
      jobTitle: string;
      jobDescription: string;
      payRate: string;
      category: string;
      location: string;
      duration: string;
   };
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, jobData }) => {
   useEffect(() => {
      if (isOpen) {
         document.body.style.overflow = 'hidden';
      } else {
         document.body.style.overflow = 'unset';
      }

      return () => {
         document.body.style.overflow = 'unset';
      };
   }, [isOpen]);

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center">
         {/* Backdrop */}
         <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
         />

         {/* Modal */}
         <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 my-8 animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
               <h2 className="text-2xl font-bold text-gray-900">Job Preview</h2>
               <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close"
               >
                  <X className="w-6 h-6 text-gray-500" />
               </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
               {/* Job Card Preview */}
               <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  {/* Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-brand-color to-orange-400 flex items-center justify-center">
                     <span className="text-white text-lg font-semibold">Job Image</span>
                  </div>

                  {/* Job Details */}
                  <div className="p-6">
                     {/* Category Badge */}
                     {jobData.category && (
                        <div className="inline-block px-3 py-1 bg-orange-100 text-brand-color text-sm font-medium rounded-full mb-3">
                           {jobData.category}
                        </div>
                     )}

                     {/* Job Title */}
                     <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {jobData.jobTitle || 'Job Title'}
                     </h3>

                     {/* Job Description */}
                     <p className="text-gray-600 mb-6 leading-relaxed">
                        {jobData.jobDescription || 'Job description will appear here...'}
                     </p>

                     {/* Job Meta Information */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {/* Pay Rate */}
                        {jobData.payRate && (
                           <div className="flex items-center gap-2 text-gray-700">
                              <DollarSign className="w-5 h-5 text-brand-color" />
                              <span className="font-semibold">${jobData.payRate}/hour</span>
                           </div>
                        )}

                        {/* Location */}
                        {jobData.location && (
                           <div className="flex items-center gap-2 text-gray-700">
                              <MapPin className="w-5 h-5 text-brand-color" />
                              <span>{jobData.location}</span>
                           </div>
                        )}

                        {/* Duration */}
                        {jobData.duration && (
                           <div className="flex items-center gap-2 text-gray-700">
                              <Clock className="w-5 h-5 text-brand-color" />
                              <span className="capitalize">{jobData.duration.replace(/-/g, ' ')}</span>
                           </div>
                        )}

                        {/* Posted Time */}
                        <div className="flex items-center gap-2 text-gray-700">
                           <Calendar className="w-5 h-5 text-brand-color" />
                           <span>Just now</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
               <button
                  onClick={onClose}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
               >
                  Close Preview
               </button>
            </div>
         </div>
      </div>
   );
};

export default PreviewModal;
