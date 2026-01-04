import { useState, useCallback } from "react";

export interface IAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function use_async<T>(asyncFunction: (...args: any[]) => Promise<T>) {
  const [state, setState] = useState<IAsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      setState({ data: null, loading: true, error: null });
      try {
        const response = await asyncFunction(...args);
        setState({ data: response, loading: false, error: null });
        return response;
      } catch (error: any) {
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [asyncFunction]
  );

  return { ...state, execute };
}
