import { Briefcase, CheckCircle, Clock, FileText, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { getAuthToken, getStoredUser } from '@/utils/auth';
import { useRouter } from 'next/router';
import { DashboardStats } from '@/interfaces';
import { useFetch } from '@/hooks/useFetch';



const Overview = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const { data: stats, loading, error, refetch } = useFetch<any>('/jobs/stats');

  useEffect(() => {
    const user = getStoredUser();
    setUserRole(user?.role || null);
  }, []);

  // Define stats based on user role
  const getStatsConfig = () => {
    if (userRole === 'employer' || userRole === 'admin') {
      return [
        {
          icon: Briefcase,
          label: 'Active Jobs',
          value: stats?.data?.activeJobs || 0,
          bgColor: 'bg-green-50',
          iconColor: 'text-green-600',
        },
        {
          icon: FileText,
          label: 'Total Applications',
          value: stats?.data?.totalApplications || 0,
          bgColor: 'bg-orange-50',
          iconColor: 'text-orange-600',
        },
        {
          icon: CheckCircle,
          label: 'Pending Reviews',
          value: stats?.data?.pendingApplications || 0,
          bgColor: 'bg-blue-50',
          iconColor: 'text-blue-600',
        },
      ];
    } else {
      // Student view
      return [
        {
          icon: Briefcase,
          label: 'Available Jobs',
          value: stats?.data?.activeJobs || 0,
          bgColor: 'bg-green-50',
          iconColor: 'text-green-600',
        },
        {
          icon: FileText,
          label: 'Applied Jobs',
          value: stats?.data?.appliedJobs || 0,
          bgColor: 'bg-orange-50',
          iconColor: 'text-orange-600',
        },
        {
          icon: CheckCircle,
          label: 'Completed Jobs',
          value: stats?.data?.completedJobs || 0,
          bgColor: 'bg-blue-50',
          iconColor: 'text-blue-600',
        },
      ];
    }
  };

  const statsConfig = getStatsConfig();

  if (loading) {
    return (
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-brand-color" />
          <span className="ml-2 text-gray-600">Loading stats...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-600">{error}</p>
          {!error.includes('Session expired') && (
            <button
              onClick={refetch}
              className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
            >
              Retry
            </button>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsConfig.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${stat.bgColor} rounded-xl p-6 border border-gray-200`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    {stat.label}
                  </p>
                  <p className="text-4xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`p - 2 rounded - lg ${stat.bgColor} `}>
                  <Icon className={`w - 6 h - 6 ${stat.iconColor} `} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Overview;
