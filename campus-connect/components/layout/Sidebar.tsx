import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { menuItems } from '@/constant';
import { Button } from '../ui/button';
import { LogOut, X } from 'lucide-react';
import { getStoredUser } from '@/utils/auth';
import { useMemo } from 'react';

interface SidebarProps {
   handleLogout: () => void;
   isOpen?: boolean;
   onClose?: () => void;
}
const Sidebar: React.FC<SidebarProps> = ({ handleLogout, isOpen = true, onClose }) => {
   const router = useRouter();
   const user = getStoredUser();

   // Filter menu items based on user role
   const filteredMenuItems = useMemo(() => {
      if (user?.role === 'student') {
         // Hide "Post a Job" for students
         return menuItems.filter(item => item.href !== '/post-job');
      }
      return menuItems;
   }, [user?.role]);

   return (
      <>
         {/* Overlay for mobile */}
         {isOpen && (
            <div
               className="fixed inset-0 bg-black/50 z-40 lg:hidden"
               onClick={onClose}
            />
         )}

         <aside className={`w-64 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-0 flex flex-col z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0`}>
            {/* Logo */}
            <div className="p-3 border-b border-gray-200 flex items-center justify-between">
               <Link href="/" className="flex items-center gap-2">
                  <Image src="/assets/icons/campusConnect_logo.png" alt="CampusConnect Logo" width={30} height={30} />
                  <span className="text-xl font-bold text-gray-900">
                     <span className="text-brand-color">campus</span>Connect
                  </span>
               </Link>

               {/* Close button for mobile */}
               <button
                  onClick={onClose}
                  className="lg:hidden p-2 ml-6 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close menu"
               >
                  <X className="w-5 h-5 text-gray-700" />
               </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
               <ul className="space-y-2">
                  {filteredMenuItems.map((item, index) => {
                     const isActive = router.pathname === item.href;
                     const Icon = item.icon;

                     return (
                        <li key={index}>
                           <Link
                              href={item.href}
                              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                 ? 'bg-gray-100 text-gray-900 font-semibold'
                                 : 'text-gray-700 hover:bg-gray-50'
                                 }`}
                           >
                              <Icon className="w-5 h-5" />
                              <span className="font-medium">{item.label}</span>
                           </Link>
                        </li>
                     );
                  })}

                  <button onClick={handleLogout} className='flex w-full cursor-pointer hover:bg-red-50 bg-red-50 hover:text-red-800 text-red-600 items-center gap-3 px-4 py-3 rounded-lg transition-colors'>
                     <LogOut className='w-5 h-5' />
                     <div className='' >Logout</div>
                  </button>
               </ul>
            </nav>
         </aside>
      </>
   );
};

export default Sidebar;
