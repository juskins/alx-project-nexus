import JobSearchHeader from '@/components/jobs/JobSearchHeader';
import FilterBar from '@/components/jobs/FilterBar';
import JobCard from '@/components/jobs/JobCard';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FilterProvider, useFilter } from '@/context/FilterContext';
import { Loader2 } from 'lucide-react';

const FindJobsContent = () => {
   const { filteredJobs, clearAll, loading, error } = useFilter();


   return (
      <DashboardLayout>
         <div className="max-w-7xl mx-auto px-8 overflow-hidden">
            <JobSearchHeader />
            <FilterBar />

            {/* Job Listings */}
            <div className="mb-6">
               <h2 className="text-2xl font-bold text-gray-900">
                  Recent Job Openings{' '}
                  <span className="text-gray-500 font-normal">({loading ? '...' : filteredJobs.length})</span>
               </h2>
            </div>

            {/* Loading State */}
            {loading && (
               <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-brand-color" />
                  <span className="ml-3 text-gray-600">Loading jobs...</span>
               </div>
            )}

            {/* Error State */}
            {error && !loading && (
               <div className="col-span-full text-center py-12">
                  <p className="text-red-500 text-lg mb-4">{error}</p>
                  <button
                     onClick={() => window.location.reload()}
                     className="px-6 py-2 bg-brand-color hover:bg-brand-color/90 text-white rounded-lg transition-colors"
                  >
                     Retry
                  </button>
               </div>
            )}

            {/* Jobs Grid */}
            {!loading && !error && (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {filteredJobs.length > 0 ? (
                     filteredJobs.map((job, index) => {
                        const IconComponent = job.icon;
                        return (
                           <JobCard
                              key={job._id}
                              _id={job._id}
                              jobIndex={index}
                              image={job.image}
                              category={job.category}
                              department={job.department}
                              location={job.location}
                              title={job.title}
                              pay={job.pay || `$${job.payRate}/hour`}
                              address={job.address}
                              type={job.type}
                              postedTime={job.postedTime || 'Recently'}
                              icon={IconComponent ? <IconComponent /> : undefined}
                           />
                        );
                     })
                  ) : (
                     <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 text-lg">No jobs found matching your filters.</p>
                        <button
                           onClick={clearAll}
                           className="mt-4 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                        >
                           Clear Filters
                        </button>
                     </div>
                  )}
               </div>
            )}
         </div>
      </DashboardLayout>
   );
};

const FindJobs = () => {
   return (
      <FilterProvider>
         <FindJobsContent />
      </FilterProvider>
   );
};

export default FindJobs;
