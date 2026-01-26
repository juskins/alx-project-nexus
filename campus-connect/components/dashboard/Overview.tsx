import { Briefcase, FileText, CheckCircle } from 'lucide-react';

const Overview = () => {
  const stats = [
    {
      icon: Briefcase,
      label: 'Active Jobs',
      value: '12',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      icon: FileText,
      label: 'Applied Jobs',
      value: '7',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
    {
      icon: CheckCircle,
      label: 'Completed Jobs',
      value: '5',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
  ];

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
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
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
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
