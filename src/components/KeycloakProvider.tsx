import { ReactNode } from 'react';
import { AuthContext, useAuth } from '../hooks';
export const KeycloakProvider = ({
  children,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactNode;
}) => {
  const auth = useAuth();

  return (
    <>
      <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
    </>
  );
};
