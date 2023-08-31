import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import Keycloak from 'keycloak-js';
import { AuthContext } from './auth';
import { useContext } from 'react';

type ApiResources = 'users' | 'posts' | 'categories' | 'tags';

class Api {
  private readonly _baseUri = import.meta.env.VITE_API_BASE;

  private _resource?: ApiResources;

  private _defaultHeaders?: { authorization: string };

  constructor(
    private readonly _t: TFunction<'translation', undefined>,
    private readonly _client: Keycloak
  ) {}

  setResource(resource: ApiResources): this {
    this._resource = resource;
    return this;
  }

  find<T>(): Promise<T[]> {
    const uri = this._buildDefaultUriAndHeaders();
    return this._processRequest<T[]>(uri);
  }

  findById<T extends string | number, U>(id: T): Promise<U> {
    const uri = this._buildDefaultUriAndHeaders(id);
    return this._processRequest<U>(uri);
  }

  count(): Promise<number> {
    const uri = this._buildDefaultUriAndHeaders();
    return this._processRequest<number>(uri);
  }

  create<T>(resource: Partial<T>): Promise<T> {
    const uri = this._buildDefaultUriAndHeaders();
    return this._processRequest<T>(uri, {
      method: 'POST',
      body: JSON.stringify(resource),
    });
  }

  overwrite<T>(resource: T): Promise<T> {
    const uri = this._buildDefaultUriAndHeaders();
    return this._processRequest(uri, {
      method: 'PUT',
      body: JSON.stringify(resource),
    });
  }

  update<T>(resource: Partial<T>): Promise<T> {
    const uri = this._buildDefaultUriAndHeaders();
    return this._processRequest(uri, {
      method: 'PATCH',
      body: JSON.stringify(resource),
    });
  }

  remove(id?: string | number): Promise<void> {
    const uri = this._buildDefaultUriAndHeaders(id);
    return this._processRequest(uri, {
      method: 'DELETE',
    });
  }

  private _buildDefaultUriAndHeaders(id?: string | number): URL {
    if (!this._baseUri || !this._resource) {
      throw new Error(
        this._t('apiErrors.emptyResource', {
          baseUri: this._baseUri,
          resource: this._resource,
        })
      );
    }

    this._defaultHeaders = {
      authorization: `Bearer ${this._client?.token}`,
    };
    const url = id != null ? `${this._resource}/${id}` : this._resource;

    return new URL(url, this._baseUri);
  }

  private async _processRequest<T = void>(
    uri: URL | RequestInfo,
    options?: RequestInit
  ): Promise<T> {
    const result = await fetch(uri, {
      headers: this._defaultHeaders,
      ...options,
    });
    const jsonResponse = await result.json();

    return jsonResponse.data as T;
  }
}

export const useApi = () => {
  const { t } = useTranslation();
  const { client } = useContext(AuthContext);

  if (!client) {
    throw new Error(t('apiErrors.emptyClient'));
  }

  return new Api(t, client);
};
