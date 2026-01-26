import { Search, Briefcase, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: 'Discover Jobs',
      description: 'Browse a wide range of micro-jobs tailored for university students, from research support to event staffing.',
    },
    {
      icon: Briefcase,
      title: 'Apply with Ease',
      description: 'Submit applications quickly and directly through the platform with your existing profile.',
    },
    {
      icon: CheckCircle,
      title: 'Get Paid & Gain Experience',
      description: 'Complete tasks, earn money flexibly, and build valuable skills that boost your resume.',
    },
  ];

  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How CampusConnect Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting started is simple. Discover, apply, and gain experience in just a few steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center bg-gray-50 p-6 rounded-lg shadow-xs">
              <div className="mb-6">
                <step.icon className="w-12 h-12 text-brand-color" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
