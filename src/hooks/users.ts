/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { useApi } from './api';

export interface UserModel {
  id: string;
  createdTimestamp: number;
  username: string;
  enabled: boolean;
  totp: boolean;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  disableableCredentialTypes: any[]; // TODO: fix this any type
  requiredActions: any[];
  notBefore: number;
  access: {
    manageGroupMembership: boolean;
    view: boolean;
    mapRoles: boolean;
    impersonate: boolean;
    manage: boolean;
  };
}

const resource = 'users';

export const useUsers = (): { users: UserModel[]; loading: boolean } => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [loading, setIsLoading] = useState(false);
  const fetching = useRef(false);
  const api = useApi();

  useEffect(() => {
    if (!fetching.current) {
      fetching.current = true;
      setIsLoading(true);

      api
        .setResource(resource)
        .find<UserModel>()
        .then((items) => {
          setUsers(items);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });

      setTimeout(() => {
        fetching.current = false;

        if (!import.meta.env.PROD) {
          console.warn(`now you can fetch users again`);
        }
      }, 60000);
    }
  }, [api, setUsers, setIsLoading, fetching]);

  return { users, loading };
};
