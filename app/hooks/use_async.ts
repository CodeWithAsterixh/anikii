import { useState, useCallback, useRef } from "react";

export interface IAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  is_empty: boolean;
}

export function use_async<T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  options: { immediate?: boolean; initial_data?: T } = {}
) {
  const [state, set_state] = useState<IAsyncState<T>>({
    data: options.initial_data || null,
    loading: false,
    error: null,
    is_empty: false,
  });

  const last_args = useRef<any[]>([]);

  const execute = useCallback(
    async (...args: any[]) => {
      last_args.current = args;
      set_state((prev) => ({ ...prev, loading: true, error: null }));
      
      try {
        const response = await asyncFunction(...args);
        
        // Handle empty data patterns
        // If it's an envelope { data: ... }, check the nested data
        const payload = (response && typeof response === 'object' && 'data' in response) 
          ? (response as any).data 
          : response;

        const is_empty = !payload || 
          (Array.isArray(payload) && payload.length === 0) ||
          (typeof payload === 'object' && Object.keys(payload).length === 0);

        set_state({ 
          data: response, 
          loading: false, 
          error: null, 
          is_empty 
        });
        return response;
      } catch (error: any) {
        set_state({ 
          data: null, 
          loading: false, 
          error: error instanceof Error ? error : new Error(String(error)), 
          is_empty: false 
        });
        return null;
      }
    },
    [asyncFunction]
  );

  const retry = useCallback(() => {
    return execute(...last_args.current);
  }, [execute]);

  return { 
    ...state, 
    execute, 
    retry,
    is_error: !!state.error,
    is_loading: state.loading,
    is_success: !!state.data && !state.error && !state.loading
  };
}
