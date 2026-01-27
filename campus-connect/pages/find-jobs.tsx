import DashboardHeader from '@/components/dashboard/DashboardHeader';
import JobSearchHeader from '@/components/jobs/JobSearchHeader';
import FilterBar from '@/components/jobs/FilterBar';
import JobCard from '@/components/jobs/JobCard';
import Footer from '@/components/layout/Footer';
import { BookOpen, Briefcase, FlaskConical, Monitor, Users, Utensils, Megaphone, Home } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import DashboardLayout from '@/components/layout/DashboardLayout';

const FindJobs = () => {
  const jobs = [
    {
      image: '/assets/images/event_cordinators.jpg',
      category: 'Student Life Office',
      department: 'Student Life Office',
      location: 'Student Union',
      title: 'Campus Event Coordinators',
      pay: '$15/hour',
      type: 'Event Planning',
      postedTime: '2 hours ago',
    },
     {
       image: '/assets/images/library.jpg',
      category: 'University Library',
      department: 'University Library',
      location: 'Main Campus Library',
      title: 'Library Cataloging Aid',
      pay: '$12.50/hour',
      type: 'Administrative',
      postedTime: '5 hours ago',
      icon: <BookOpen className="w-8 h-8 text-white" />,
    },
    {
      image: '/assets/images/research.jpg',
      category: 'Biology Department',
      department: 'Biology Department',
      location: 'Science Building Lab',
      title: 'Research Assistant Dept.',
      pay: '$18/hour',
      type: 'Research',
      postedTime: '1 day ago',
      icon: <FlaskConical className="w-8 h-8 text-white" />,
    },
     {
        image: '/assets/images/call-center.jpg',
      category: 'Campus IT Services',
      department: 'Campus IT Services',
      location: 'Tech Support Center',
      title: 'IT Help Desk Support',
      pay: '$16/hour',
      type: 'Technology',
      postedTime: '1 day ago',
      icon: <Monitor className="w-8 h-8 text-white" />,
    },
     {
       image: '/assets/images/fitness.jpg',
      category: 'Campus Recreation',
      department: 'Campus Recreation',
      location: 'Campus Gym',
      title: 'Fitness Center Front Desk',
      pay: '$14/hour',
      type: 'Customer Service',
      postedTime: '2 days ago',
      icon: <Users className="w-8 h-8 text-white" />,
    },
    {
      image: '/assets/images/cafeteria.jpg',
      category: 'Dining Services',
      department: 'Dining Services',
      location: 'Student Cafeteria',
      title: 'Cafeteria Kitchen Assistant',
      pay: '$13/hour',
      type: 'Food Service',
      postedTime: '3 days ago',
      icon: <Utensils className="w-8 h-8 text-white" />,
    },
     {
      image: '/assets/images/socialMedia_intern.jpg',
      category: 'University Communications',
      department: 'University Communications',
      location: 'Remote/Hybrid',
      title: 'Social Media Intern',
      pay: '$17/hour',
      type: 'Marketing',
      postedTime: '4 days ago',
      icon: <Megaphone className="w-8 h-8 text-white" />,
    },
    {
      image: '/assets/images/model.jpg',
      category: 'Photography',
      department: 'Photography Club',
      location: 'Campus Dorms',
      title: 'Model for Campus Photo Shoot',
      pay: '$1,000/month (Stipend)',
      type: 'Freelance',
      postedTime: '5 days ago',
      icon: <Home className="w-8 h-8 text-white" />,
    },
  ];

  return (
     <DashboardLayout>
        <div className="max-w-7xl mx-auto px-8">
           <JobSearchHeader />
           <FilterBar />

           {/* Job Listings */}
           <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                 Recent Job Openings{' '}
                 <span className="text-gray-500 font-normal">({jobs.length})</span>
              </h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {jobs.map((job, index) => (
                 <JobCard
                    key={index}
                    image={job.image}
                    category={job.category}
                    department={job.department}
                    location={job.location}
                    title={job.title}
                    pay={job.pay}
                    type={job.type}
                    postedTime={job.postedTime}
                    icon={job.icon}
                 />
              ))}
           </div>
        </div>
       </DashboardLayout>
  );
};

export default FindJobs;
