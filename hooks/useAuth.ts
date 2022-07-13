import { useEffect } from 'react';
import Router from 'next/router';

import { useUser } from './useUser';

export const useAuth = () => {
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (user === null && !isLoading) {
      Router.push('/auth/login');
    }
  }, [user, isLoading]);

  return { user, isLoading };
};
