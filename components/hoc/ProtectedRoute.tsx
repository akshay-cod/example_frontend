// components/ProtectedRoute.tsx
import React, { ReactNode, useEffect } from 'react';
import { useRouter } from '../../contexts/RouterContext';

const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('authToken');
  };

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { navigate } = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('signin'); // Redirect to SignInPage if not authenticated
    }
  }, []);

  if (!isAuthenticated()) {
    return null;
  }

  return <>{children}</>;
};
