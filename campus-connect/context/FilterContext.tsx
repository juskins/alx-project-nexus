import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import api from '@/utils/api';
import { toast } from 'sonner';
import { FilterContextType, Job } from '@/interfaces';
import { getTimeAgo } from '@/lib/helpers';
import { useFetch } from '@/hooks/useFetch';


const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [category, setCategory] = useState('');
  const [pay, setPay] = useState('');
  const [duration, setDuration] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [search, setSearch] = useState('');
  const [allJobs, setAllJobs] = useState<Job[]>([]);


  const params = useMemo(() => {
    const p: any = {};

    if (category) p.category = category;
    if (duration) p.duration = duration;
    if (time) p.time = time;
    if (location) p.location = location;
    if (search) p.search = search;

    if (pay && pay !== "0") {
      if (pay === "10-15") {
        p.minPay = 10;
        p.maxPay = 15;
      } else if (pay === "15-20") {
        p.minPay = 15;
        p.maxPay = 20;
      } else if (pay === "20-25") {
        p.minPay = 20;
        p.maxPay = 25;
      } else if (pay === "25+") {
        p.minPay = 25;
      }
    }

    return p;
  }, [category, pay, duration, time, location, search]);


  const { data, loading, error, refetch } = useFetch<any>('/jobs', params);

  // Transform the data for your UI
  useEffect(() => {
    if (!data?.success) return;

    const transformedJobs = data.data.map((job: any) => ({
      ...job,
      pay: `$${job.payRate}/hour`,
      postedTime: getTimeAgo(job.createdAt),
    }));

    setAllJobs(transformedJobs);
  }, [data]);


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


  // Refresh jobs function
  const refreshJobs = () => {
    refetch();
  };



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
