import { Bell, Eye, Mail, Calendar, CheckCircle } from 'lucide-react';

const RecentNotifications = () => {
  const notifications = [
    {
      icon: Bell,
      message: 'New job opening: Library Assistant needed!',
      time: '5 min ago',
    },
    {
      icon: Eye,
      message: "Your application for 'Event Setup Crew' has been viewed.",
      time: '2 hours ago',
    },
    {
      icon: Mail,
      message: "Message from Campus Groundskeeping regarding 'Tree Planting' job.",
      time: 'Yesterday',
    },
    {
      icon: Calendar,
      message: 'You have 2 new job recommendations based on your profile.',
      time: '3 days ago',
    },
    {
      icon: CheckCircle,
      message: "Your job 'Research Assistant' has been posted successfully.",
      time: '5 days ago',
    },
  ];

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Notifications</h2>
      <div className="border relative border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-white/5 text-gray-900 text-xl font-semibold backdrop-blur-sm absolute top-0 left-0 m-auto text-center w-full h-full flex items-center justify-center border border-gray-200 rounded-xl">Notification feature coming soon...</div>
        {notifications.map((notification, index) => {
          const Icon = notification.icon;
          return (
            <div
              key={index}
              className={`flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors ${index !== notifications.length - 1 ? 'border-b border-gray-200' : ''
                }`}
            >
              <div className="flex-shrink-0 mt-1">
                <Icon className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{notification.message}</p>
              </div>
              <div className="flex-shrink-0">
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RecentNotifications;
