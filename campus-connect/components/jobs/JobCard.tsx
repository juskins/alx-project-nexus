import { JobCardProps } from '@/interfaces';
import { MapPin, Tag, Clock, DollarSign } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';


const JobCard = ({
   _id,
   image,
   category,
   department,
   location,
   title,
   pay,
   type,
   postedTime,
   icon,
   address,
}: JobCardProps) => {
   const router = useRouter();

   const handleClick = () => {
      router.push(`/jobs/${_id}`);
   };

   return (
      <div
         onClick={handleClick}
         className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
      >
         {/* Image Header with Gradient Overlay */}
         <div className="relative h-40 bg-black/70 overflow-hidden">
            {image ? (
               <Image
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                  width={400}
                  height={160}
               />
            ) : (
               <div className="absolute inset-0 flex items-center justify-center">
                  {icon || (
                     <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <Tag className="w-8 h-8 text-white" />
                     </div>
                  )}
               </div>
            )}

            {/* Category Badge */}
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
               <span className="text-xs font-semibold text-gray-800">{category}</span>
            </div>
         </div>

         {/* Card Content */}
         <div className="p-5">
            {/* Department and Location */}
            <div className="flex items-start gap-2 mb-3">
               <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                     <MapPin className="w-3 h-3" />
                     {address}
                  </p>
               </div>
            </div>

            {/* Job Title */}
            <h4 className="text-base font-bold text-gray-900 mb-3 line-clamp-2">
               {title}
            </h4>

            {/* Job Details */}
            <div className="space-y-2 mb-4">
               <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700 font-medium">{pay}</span>
               </div>
               <div className="flex items-center gap-2 text-sm">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{type}</span>
               </div>
            </div>

            {/* Posted Time */}
            <div className="flex items-center gap-1.5 text-xs text-gray-500 pt-3 border-t border-gray-100">
               <Clock className="w-3.5 h-3.5" />
               <span>{postedTime}</span>
            </div>
         </div>
      </div>
   );
};

export default JobCard;
