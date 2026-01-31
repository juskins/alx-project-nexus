import { Search } from 'lucide-react';
import { useFilter } from '@/context/FilterContext';

const JobSearchHeader = () => {
  const { search, setSearch } = useFilter();
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">
        Find Your Next Campus Job
      </h1>
      <p className="text-gray-600 mb-6">
        Browse available micro-jobs and filter to find opportunities that fit your schedule and skills.
      </p>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search jobs by keyword, role, or department..."
          className="w-full text-gray-900 pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-color focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default JobSearchHeader;
