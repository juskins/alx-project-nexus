import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/utils/api';
import { toast } from 'sonner';
import { FilterContextType, Job } from '@/interfaces';
import { getTimeAgo } from '@/lib/helpers';


const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [category, setCategory] = useState('');
  const [pay, setPay] = useState('');
  const [duration, setDuration] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [search, setSearch] = useState('');
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearAll = () => {
    setCategory('');
    setPay('');
    setDuration('');
    setTime('');
    setLocation('');
    setSearch('');
  };

  const addJob = (job: Job) => {
    setAllJobs(prevJobs => [job, ...prevJobs]);
  };

  // Fetch jobs from API
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters
      const params: any = {};
      if (category) params.category = category;
      if (duration) params.duration = duration;
      if (time) params.time = time;
      if (location) params.location = location;
      if (search) params.search = search;

      // Add pay range filter
      if (pay && pay !== '0') {
        if (pay === '10-15') {
          params.minPay = 10;
          params.maxPay = 15;
        } else if (pay === '15-20') {
          params.minPay = 15;
          params.maxPay = 20;
        } else if (pay === '20-25') {
          params.minPay = 20;
          params.maxPay = 25;
        } else if (pay === '25+') {
          params.minPay = 25;
        }
      }

      const response = await api.get('/jobs', {
        params,
      });

      if (response.data.success) {
        // Transform jobs to match frontend format
        const transformedJobs = response.data.data.map((job: any) => ({
          ...job,
          pay: `$${job.payRate}/hour`,
          postedTime: getTimeAgo(job.createdAt),
        }));

        setAllJobs(transformedJobs);
      }
    } catch (error: any) {
      console.error('Error fetching jobs:', error);
      setError(error.response?.data?.message || 'Failed to fetch jobs');
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };



  // Refresh jobs function
  const refreshJobs = () => {
    fetchJobs();
  };

  // Fetch jobs on mount and when filters change
  useEffect(() => {
    fetchJobs();
  }, [category, pay, duration, time, location, search]);

  return (
    <FilterContext.Provider
      value={{
        category,
        setCategory,
        pay,
        setPay,
        duration,
        setDuration,
        time,
        setTime,
        location,
        setLocation,
        search,
        setSearch,
        clearAll,
        filteredJobs: allJobs, // Now using API-filtered results
        addJob,
        allJobs,
        loading,
        error,
        refreshJobs,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
