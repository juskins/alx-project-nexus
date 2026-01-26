import { Bell, CirclePlus, User } from 'lucide-react';
import Image from 'next/image';

const DashboardHeader = () => {
   return (
      <header className="bg-white border-b border-gray-200 px-8 py-3 fixed top-0 right-0 left-64 z-10">
         <div className="flex items-center justify-end gap-4">
            {/* Notification Bell */}
            <button className="p-2 bg-brand-color hover:bg-brand-color/80 rounded-lg transition-colors">
               <CirclePlus className="w-5 h-5 text-white" />
            </button>

            {/* User Icon */}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
               <User className="w-5 h-5 text-gray-700" />
            </button>

            {/* User Avatar */}
            <button className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden hover:ring-2 hover:ring-orange-500 transition-all">
               <Image
                  src="/assets/images/profile.jpg"
                  alt="User"
                  className="w-full h-full object-cover bg-bottom"
                  width={40}
                  height={40}
                  onError={(e) => {
                     e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23666"%3E%3Cpath d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/%3E%3C/svg%3E';
                  }}
               />
            </button>
         </div>
      </header>
   );
};

export default DashboardHeader;
