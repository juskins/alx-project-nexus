import Link from 'next/link';
import { CirclePlus, LogIn } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const Header = () => {
   const router = useRouter();
   return (
      <header className="w-full bg-white border-b border-gray-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
               <Image src="/assets/icons/campusConnect_logo.png" alt="CampusConnect Logo" width={40} height={40} />
               <span className="text-lg sm:text-xl font-bold text-gray-900">
                  <span className="text-brand-color">campus</span>Connect
               </span>
            </Link>

            <div className="flex items-center gap-2 sm:gap-4">
               <Button onClick={() => router.push('/login')} className="px-3 sm:px-4 py-5 flex bg-white hover:bg-black hover:text-white items-center border-2 rounded-md cursor-pointer text-[#171A1FFF] font-medium transition-colors">
                  <span className="mr-0 sm:mr-2"><LogIn /></span>
                  <span className="hidden sm:inline">Login</span>
               </Button>
               <Button onClick={() => router.push('/signup')} className="px-3 sm:px-5 flex items-center py-5 bg-brand-color hover:bg-brand-green text-white rounded-md font-medium transition-colors">
                  <span className="mr-0 sm:mr-2"><CirclePlus size={20} /></span>
                  <span className="hidden sm:inline">Sign Up</span>
               </Button>
            </div>
         </div>
      </header>
   );
};

export default Header;
