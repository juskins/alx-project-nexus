import { Search, Megaphone } from 'lucide-react';
import Link from 'next/link';

const QuickActions = () => {
  const actions = [
    {
      icon: Search,
      title: 'Explore New Opportunities',
      description: 'Browse hundreds of micro-jobs available on campus.',
      href: '/find-jobs',
      iconColor: 'text-brand-color',
    },
    {
      icon: Megaphone,
      title: 'List a New Job',
      description: 'Quickly create and post a new job for students.',
      href: '/post-job',
      iconColor: 'text-brand-color',
    },
  ];

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              href={action.href}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  <Icon className={`w-12 h-12 ${action.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {action.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActions;
