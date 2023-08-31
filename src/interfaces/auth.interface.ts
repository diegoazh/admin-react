import Keycloak from 'keycloak-js';

export interface IAuthContext {
  client: Keycloak | undefined;
  isAuthenticated: boolean;
}
