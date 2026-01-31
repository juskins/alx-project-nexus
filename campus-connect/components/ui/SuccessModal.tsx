import { CheckCircle, X } from 'lucide-react';
import { useEffect } from 'react';

interface SuccessModalProps {
   isOpen: boolean;
   onClose: () => void;
   title?: string;
   message?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
   isOpen,
   onClose,
   title = "Success!",
   message = "Your action was completed successfully."
}) => {
   useEffect(() => {
      if (isOpen) {
         // Prevent body scroll when modal is open
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
         <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 animate-in fade-in zoom-in duration-300">
            {/* Close button */}
            <button
               onClick={onClose}
               className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
               aria-label="Close"
            >
               <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Success Icon */}
            <div className="flex justify-center mb-6">
               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in duration-500 delay-100">
                  <CheckCircle className="w-12 h-12 text-green-600" />
               </div>
            </div>

            {/* Content */}
            <div className="text-center">
               <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {title}
               </h2>
               <p className="text-gray-600 mb-6">
                  {message}
               </p>

               {/* Action Button */}
               <button
                  onClick={onClose}
                  className="w-full py-3 px-6 bg-brand-color hover:bg-brand-color/90 text-white font-semibold rounded-lg transition-colors"
               >
                  Continue
               </button>
            </div>
         </div>
      </div>
   );
};

export default SuccessModal;
