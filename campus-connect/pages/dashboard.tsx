import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Overview from '@/components/dashboard/Overview';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentNotifications from '@/components/dashboard/RecentNotifications';
import Footer from '@/components/layout/Footer';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
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
