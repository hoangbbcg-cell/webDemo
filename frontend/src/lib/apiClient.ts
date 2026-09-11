import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

import { useAuthStore } from "../features/auth/stores/authStores";

type RetryRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

type RefreshResponse = {
  accessToken: string;
};

let isRefreshing = false;

let refreshPromise: Promise<RefreshResponse> | null = null;

export const apiClient = axios.create({
  baseURL: "https://webdemo-production-1ec5.up.railway.app",
  withCredentials: true,
});

let csrfToken: string | null = null;

export const setCsrfToken = (token: string) => {
  csrfToken = token;
};

// ==================================================
// REQUEST INTERCEPTOR
// ==================================================

apiClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  const method = config.method?.toLowerCase();

  const needsCsrf =
    method === "post" ||
    method === "put" ||
    method === "patch" ||
    method === "delete";

  if (needsCsrf && csrfToken) {
    config.headers["x-csrf-token"] = csrfToken;
  }

  return config;
});

// ==================================================
// REFRESH ACCESS TOKEN
// ==================================================

const refreshAccessToken = async (): Promise<RefreshResponse> => {
  const response = await axios.post<RefreshResponse>(
    "http://localhost:4000/api/users/refresh",
    {},
    {
      withCredentials: true,
    },
  );

  return response.data;
};

// ==================================================
// RESPONSE INTERCEPTOR
// ==================================================

apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config as RetryRequestConfig;

    const isAccessTokenExpired =
      error.response?.status === 401 &&
      error.response?.data?.code === "ACCESS_TOKEN_EXPIRED";

    if (!isAccessTokenExpired || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!isRefreshing) {
        isRefreshing = true;

        refreshPromise = refreshAccessToken()
          .then((tokens) => {
            useAuthStore.getState().setAccessToken(tokens.accessToken);

            return tokens;
          })
          .finally(() => {
            isRefreshing = false;
            refreshPromise = null;
          });
      }

      const tokens = await refreshPromise!;

      originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;

      return apiClient(originalRequest);
    } catch (refreshError) {
      useAuthStore.getState().clearAuth();

      window.location.href = "/login";

      return Promise.reject(refreshError);
    }
  },
);
