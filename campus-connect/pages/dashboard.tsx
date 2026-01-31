import Overview from '@/components/dashboard/Overview';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentNotifications from '@/components/dashboard/RecentNotifications';
import DashboardLayout from '@/components/layout/DashboardLayout';

const Dashboard = () => {
   return (
      <DashboardLayout>
         <div className="max-w-7xl mx-auto px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
            <Overview />
            <QuickActions />
            <RecentNotifications />
         </div>
      </DashboardLayout>

   );
};

export default Dashboard;
