import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { jobs } from '@/constant';

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
  filteredJobs: typeof jobs;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [category, setCategory] = useState('');
  const [pay, setPay] = useState('');
  const [duration, setDuration] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  const clearAll = () => {
    setCategory('');
    setPay('');
    setDuration('');
    setTime('');
    setLocation('');
  };

  // Filter jobs based on selected criteria
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Filter by category (job type)
      if (category && job.type !== category) {
        return false;
      }

      // Filter by pay
      if (pay && pay !== '0') {
        const jobPayValue = parseFloat(job.pay.replace(/[^0-9.]/g, ''));
        if (pay === '10-15' && (jobPayValue < 10 || jobPayValue > 15)) return false;
        if (pay === '15-20' && (jobPayValue < 15 || jobPayValue > 20)) return false;
        if (pay === '20-25' && (jobPayValue < 20 || jobPayValue > 25)) return false;
        if (pay === '25+' && jobPayValue < 25) return false;
      }

      

      return true;
    });
  }, [category, pay, duration, time, location]);

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
        clearAll,
        filteredJobs,
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
