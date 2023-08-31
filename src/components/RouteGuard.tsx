/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsWithChildren, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../hooks';

export const RouteGuard = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to={'/'} />;
};
