import { useState, useEffect, useCallback } from 'react';

export const useHttp = <T, P = void>({
  functionToCall,
  autoExecute = true,
}: {
  functionToCall: P extends void ? () => Promise<T> : (params: P) => Promise<T>;
  autoExecute?: boolean;
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const makeHttpRequest = useCallback(
    async (params?: P) => {
      try {
        setLoading(true);
        setError(null);
        let response: T;
        if (params !== undefined) {
          // Function that takes parameters
          response = await (functionToCall as (params: P) => Promise<T>)(
            params,
          );
        } else {
          // Function that takes no parameters
          response = await (functionToCall as () => Promise<T>)();
        }
        setData(response);
      } catch (err: unknown) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [functionToCall],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  const refetch = useCallback(async () => {
    makeHttpRequest();
  }, [makeHttpRequest]);

  useEffect(() => {
    if (autoExecute) {
      makeHttpRequest();
    }
  }, [autoExecute, makeHttpRequest]);

  return {
    loading,
    data,
    error,
    refetch,
    makeHttpRequest,
    reset,
  };
};
