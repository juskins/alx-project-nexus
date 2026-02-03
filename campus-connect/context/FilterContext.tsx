import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/utils/api';
import { toast } from 'sonner';

interface Job {
  _id: string;
  image: string;
  category: string;
  department: string;
  address: string;
  location: string;
  title: string;
  payRate: number;
  pay?: string;
  type: string;
  postedTime?: string;
  duration: string;
  time: string;
  createdAt: string;
  icon?: any;
}

interface FilterContextType {
  category: string;
  setCategory: (value: string) => void;
  pay: string;
  setPay: (value: string) => void;
  duration: string;
  setDuration: (value: string) => void;
  time: string;
  setTime: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  clearAll: () => void;
  filteredJobs: Job[];
  search: string;
  setSearch: (value: string) => void;
  addJob: (job: Job) => void;
  allJobs: Job[];
  loading: boolean;
  error: string | null;
  refreshJobs: () => void;
}

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

  // Helper function to calculate time ago
  const getTimeAgo = (date: string) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInMs = now.getTime() - posted.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) > 1 ? 's' : ''} ago`;
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
