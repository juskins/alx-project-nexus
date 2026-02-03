import { useRouter } from "next/navigation";
import DashboardHeader from "../dashboard/DashboardHeader";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { logoutUser } from "@/utils/auth";
import { toast } from "sonner";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
   const [isLoggingOut, setIsLoggingOut] = useState(false);
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const router = useRouter();

   const handleLogout = async () => {
      try {
         setIsLoggingOut(true);
         const response = await logoutUser();
         if (response.success) {
            toast.success(response.message);
            setTimeout(() => {
               router.push('/login');
            }, 5000);
         }
      } catch (error) {
         console.error('Logout error:', error);
      } finally {
         setIsLoggingOut(false);
      }
   };

   const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
   };

   const closeSidebar = () => {
      setIsSidebarOpen(false);
   };

   return (
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
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

         <Sidebar
            handleLogout={handleLogout}
            isOpen={isSidebarOpen}
            onClose={closeSidebar}
         />
         <DashboardHeader onMenuClick={toggleSidebar} />

         <main className="lg:ml-64 pt-20 pb-8">
            {children}
         </main>

         <div className="lg:ml-64">
            <Footer />
         </div>
      </div>
   );
}


export default DashboardLayout;