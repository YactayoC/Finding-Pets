import useSWR, { SWRConfiguration } from 'swr';
import type { TPublication } from 'types';

export const useSWRPublications = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<TPublication[] | any>(`/api${url}`, config);

  return {
    publications: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};

export const useSWRUser = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<TPublication[] | any>(`/api${url}`, config);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};
