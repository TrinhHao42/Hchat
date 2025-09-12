import { useState, useEffect } from "react";
import connectServer from "@/configs/connectServer";

interface ConnectOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  [key: string]: any;
}

interface useFetchDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const useFetchData = <T = any>(url: string, options?: ConnectOptions): useFetchDataResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result: T = await connectServer(url, options);
        if (isMounted) setData(result);
      } catch (err: any) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
};

export default useFetchData;
