import Sidebar from '@/components/layout/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Overview from '@/components/dashboard/Overview';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentNotifications from '@/components/dashboard/RecentNotifications';
import Footer from '@/components/layout/Footer';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
   const [isLoggingOut, setIsLoggingOut] = useState(false);
   const router = useRouter();
   const handleLogout = () => {
      setIsLoggingOut(true);
      setTimeout(() => {
         router.push('/login');
      }, 3000);
   };
   return (
      <div className="min-h-screen bg-gray-50">
         {/* Logout loading overlay */}
         {isLoggingOut && (
            <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center">
               <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-nuruDeep mx-auto"></div>
                  <div className="space-y-2">
                     <p className="text-lg font-semibold text-foreground">Logging out...</p>
                     <p className="text-sm text-foreground">Please wait while we securely log you out</p>
                  </div>
               </div>
            </div>
         )}

         <Sidebar handleLogout={handleLogout} />
         <DashboardHeader />

         <main className="ml-64 pt-20 pb-8">
            <div className="max-w-7xl mx-auto px-8">
               <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

               <Overview />
               <QuickActions />
               <RecentNotifications />
            </div>
         </main>

         <div className="ml-64">
            <Footer />
         </div>
      </div>
   );
};

export default Dashboard;
