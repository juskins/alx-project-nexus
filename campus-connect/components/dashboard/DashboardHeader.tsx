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

               {/* User initials */}
               <div onClick={() => router.push('/profile')} className="w-10 h-10 bg-gray-300 hover:ring-2 hover:ring-orange-500 transition-all cursor-pointer rounded-full flex items-center justify-center">
                  <span className="text-gray-700 font-medium">{user?.name?.charAt(0).toUpperCase() + user?.name?.charAt(1).toUpperCase()}</span>
               </div>

               {/* Type of profile indicator (e.g student) */}
               <p className="text-gray-700 font-medium">{user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} Profile</p>
            </div>
         </div>
      </header>
   );
};

export default DashboardHeader;
