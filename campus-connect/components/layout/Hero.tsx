import { GraduationCap } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';

const Hero = () => {
   return (
      <section className="relative w-full bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url('/assets/images/herobg.png')` }}>
         {/* Background pattern overlay */}
         <div className="absolute z-0 inset-0 bg-white bg-cover bg-center opacity-10" />

         <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center max-w-4xl mx-auto">
               {/* Icon */}
               <div className="flex justify-center mb-8">
                  <Image src="/assets/icons/campusConnect_logo.png" alt="CampusConnect Logo" width={60} height={60} />
               </div>

               {/* Main Heading */}
               <h1 className="text-3xl md:text-4xl lg:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Your Gateway to On-Campus Opportunities
               </h1>

               {/* Subheading */}
               <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
                  Connect with university micro-jobs, earn money, and build valuable skills right where you learn.
               </p>

               {/* CTA Buttons */}
               <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button className="px-8 bg-brand-color hover:bg-brand-green text-white font-semibold rounded-lg shadow-md transition-all hover:shadow-lg">
                     Find Jobs
                  </Button>
                  <Button className="px-8 bg-white border border-gray-900 hover:bg-black hover:text-white text-gray-900 font-semibold rounded-lg shadow-md transition-all hover:shadow-lg">
                     Post a Job
                  </Button>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Hero;
