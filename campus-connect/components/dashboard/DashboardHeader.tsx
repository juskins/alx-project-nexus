import { getStoredUser } from '@/utils/auth';
import { Bell, CirclePlus, User, Menu } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface DashboardHeaderProps {
   onMenuClick?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick }) => {
   const router = useRouter();
   const user = getStoredUser();

   return (
      <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-3 fixed top-0 right-0 left-0 lg:left-64 z-10 overflow-hidden">
         <div className="flex items-center justify-between gap-4">
            {/* Hamburger Menu for Mobile */}
            <button
               onClick={onMenuClick}
               className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
               aria-label="Open menu"
            >
               <Menu className="w-6 h-6 text-gray-700" />
            </button>

            {/* Actions - Right side */}
            <div className="flex items-center justify-end gap-2 md:gap-4 ml-auto">
               {/* Post a Job Button */}
               {(user?.role === 'employer' || user?.role === 'admin') && (
                  <button onClick={() => router.push('/post-job')} className="p-2 flex items-center gap-2 bg-brand-color hover:bg-brand-color/80 rounded-lg transition-colors cursor-pointer">
                     <CirclePlus className="w-5 h-5 text-white" />
                     <span className="text-white hidden sm:inline">Post a Job</span>
                  </button>
               )}


               {/* My Profile Button */}
               <button onClick={() => router.push('/profile')} className="p-2 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer">
                  <User className="w-5 h-5 text-gray-700" />
                  <span className="text-gray-700 hidden sm:inline">My Profile</span>
               </button>

               {/* User Avatar */}
               <button onClick={() => router.push('/profile')} className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden hover:ring-2 hover:ring-orange-500 transition-all cursor-pointer">
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
         </div>
      </header>
   );
};

export default DashboardHeader;
