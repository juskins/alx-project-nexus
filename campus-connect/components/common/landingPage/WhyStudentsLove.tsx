import { DollarSign, User, Clock } from 'lucide-react';

const WhyStudentsLove = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Earn Money Flexibly',
      description: 'Find short-term gigs that fit perfectly around your classes and study schedule.',
    },
    {
      icon: User,
      title: 'Gain Practical Skills',
      description: 'Enhance your resume with real-world experience relevant to your field of study.',
    },
    {
      icon: Clock,
      title: 'Work On Campus',
      description: 'Conveniently find jobs right within your university environment, saving commute time.',
    },
  ];

  return (
    <section className="w-full bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Students Love CampusConnect
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Unlock a world of opportunities designed to fit your academic life.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-xs">
              <div className="mb-6">
                <benefit.icon className="w-12 h-12 text-brand-color" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyStudentsLove;
