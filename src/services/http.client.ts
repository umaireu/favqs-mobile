import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import {
  FAVQ_EXTERNAL_API_BASE_URL,
  FAVQ_INTERNAL_API_BASE_URL,
  FAVQ_EXTERNAL_API_KEY,
  ENABLE_NETWORK_LOGGING,
} from '@env';

// Network logging for development
import { startNetworkLogging } from 'react-native-network-logger';

// Start network logging in development
if (ENABLE_NETWORK_LOGGING) {
  startNetworkLogging();
}

declare module 'axios' {
  interface AxiosRequestConfig {
    isExternalApi?: boolean;
  }
}

function createHttpClient() {
  const instance = axios.create({
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (config.isExternalApi) {
        config.baseURL = FAVQ_EXTERNAL_API_BASE_URL;
        config.headers[
          'Authorization'
        ] = `Token token=${FAVQ_EXTERNAL_API_KEY}`;
      } else {
        config.baseURL = FAVQ_INTERNAL_API_BASE_URL;
      }
      return config;
    },
    (error: unknown) => {
      return Promise.reject(
        error instanceof Error ? error : new Error(String(error)),
      );
    },
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: unknown) => {
      let _err: Error;
      if (error instanceof AxiosError) {
        const errorMessage = error.message || 'Network error occurred';
        const networkError = new Error(errorMessage);
        networkError.name = error.code ?? 'NetworkError';
        _err = networkError;
      } else if (error instanceof Error) {
        _err = error;
      } else {
        _err = new Error('An unknown error occurred');
      }
      return Promise.reject(_err);
    },
  );

  return instance;
}

export const httpClient = createHttpClient();
