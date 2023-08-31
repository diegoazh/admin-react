import Keycloak from 'keycloak-js';
import { createContext, useEffect, useRef, useState } from 'react';
import { IAuthContext } from '../interfaces';

const client = new Keycloak({
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  url: import.meta.env.VITE_KEYCLOAK_URL,
});

export const AuthContext = createContext<IAuthContext>({
  client: undefined,
  isAuthenticated: false,
});

export const useAuth = () => {
  const isKeycloakInitialized = useRef(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let timeoutId: number | undefined = undefined;

    if (!isKeycloakInitialized.current) {
      isKeycloakInitialized.current = true;
      client
        .init({
          onLoad: 'login-required',
          checkLoginIframe: false,
        })
        .then((authenticated) => {
          if (authenticated) {
            setIsAuthenticated(authenticated);
            console.info('User is authenticated');
          } else {
            setIsAuthenticated(false);
            console.info('User is not authenticated');
          }

          timeoutId = setTimeout(async () => {
            try {
              const refreshed = await client.updateToken(30);
              if (refreshed) {
                console.info('Token refreshed:' + refreshed);
              } else {
                console.warn(
                  `Token not refreshed, valid for ${Math.round(
                    (client.tokenParsed?.exp || 0) +
                      (client?.timeSkew || 0) -
                      new Date().getTime() / 1000
                  )} seconds`
                );
              }
            } catch (error) {
              console.error('Failed to refresh token:', error);
            }
          }, 28000);
        })
        .catch((error) => {
          setIsAuthenticated(false);
          console.error('Failed to initialize keycloak adapter:', error);
        });
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return { isAuthenticated, client };
};
