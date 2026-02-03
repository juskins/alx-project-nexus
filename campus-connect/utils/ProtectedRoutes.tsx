import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isAuthenticated } from "./auth";

interface ProtectedRoutesProps {
   children: React.ReactNode;
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
   const router = useRouter();
   const [isChecking, setIsChecking] = useState(true);

   useEffect(() => {
      // Only run on client side
      const token = isAuthenticated();

      if (!token) {
         router.push('/login');
      } else {
         setIsChecking(false);
      }
   }, [router]);

   // Show nothing while checking authentication
   if (isChecking) {
      return (
         <div className="flex items-center justify-center min-h-screen">
            <div className="text-gray-600">Loading...</div>
         </div>
      );
   }

   return <>{children}</>;
};

export default ProtectedRoutes;
