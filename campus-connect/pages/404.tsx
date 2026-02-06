import Link from 'next/link';
import Image from 'next/image';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
   return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
         <div className="max-w-4xl w-full text-center space-y-8">
            {/* Visual Element */}
            <div className="relative w-full max-w-md mx-auto aspect-square overflow-hidden rounded-3xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
               <Image
                  src="/assets/404-illustration.png"
                  alt="404 - Page Not Found"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-3xl"
               />
            </div>

            {/* Text Content */}
            <div className="space-y-4">
               <h1 className="text-8xl md:text-9xl font-black text-brand-color tracking-tighter">
                  404
               </h1>
               <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Oops! You've wandered off campus.
               </h2>
               <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
                  The page you're looking for might have been moved, deleted, or perhaps it never existed in the first place. Let's get you back on track!
               </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
               <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-8 py-4 bg-brand-color hover:bg-brand-color/90 text-white font-bold rounded-2xl shadow-lg shadow-brand-color/20 transition-all active:scale-95 w-full sm:w-auto text-center justify-center"
               >
                  <Home className="w-5 h-5" />
                  Go to Dashboard
               </Link>
               <button
                  onClick={() => window.history.back()}
                  className="flex items-center gap-2 px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-all active:scale-95 w-full sm:w-auto text-center justify-center"
               >
                  <ArrowLeft className="w-5 h-5" />
                  Go Back
               </button>
            </div>

            {/* Brand Footer */}
            <div className="pt-12">
               <div className="flex items-center justify-center gap-2">
                  <Image src="/assets/icons/campusConnect_logo.png" alt="Logo" width={24} height={24} />
                  <span className="text-sm font-bold tracking-tight text-gray-900">
                     <span className="text-brand-color">campus</span>Connect
                  </span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default NotFound;