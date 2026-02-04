import api from "@/utils/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface useFetchResult<T> {
   data: T | null;
   loading: boolean;
   error: string | null;
   refetch: () => void;
}

export const useFetch = <T>(url: string, params?: any): useFetchResult<T> => {
   const [data, setData] = useState<T | null>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   const fetchData = async () => {
      try {
         setLoading(true);
         const response = await api.get(url, { params });
         setData(response.data);
      } catch (error: any) {
         setError(error.response.data.message || 'error');
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchData();
   }, [url, params]);

   return { data, loading, error, refetch: fetchData };
}