import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import { CLIENT_ID } from "./config";
import { getRefreshToken, removeRefreshToken } from "./refreshTokenStore";
import { storeToken, removeToken } from "./tokenStore";
import { removeAuthData } from "./authStore";
import { removeUser } from "./userStore";

export type MethodType = "get" | "post" | "put" | "delete";

const api = axios.create({
  baseURL: "https://dadoseconomicos.ideflorbio.pa.gov.br",
});

// 🔥 CONTROLE GLOBAL
let isRefreshing = false;
let failedQueue: any[] = [];

function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

// 🔥 INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers = originalRequest.headers || {};
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              resolve(api.request(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log("🔄 Tentando refresh do token...");

        const newToken = await refreshAccessToken();

        if (!newToken) {
          throw new Error("Falha no refresh");
        }

        processQueue(null, newToken);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        return api.request(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// 🔥 REFRESH TOKEN
async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    return null;
  }

  try {
    const response = await api.post(
      "/oauth2/token",
      qs.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: CLIENT_ID,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const newAccessToken = response.data.access_token;

    await storeToken(newAccessToken);

    if (response.data.refresh_token) {
      localStorage.setItem("refresh_token", response.data.refresh_token);
    }

    localStorage.setItem("authData", JSON.stringify(response.data));

    console.log("✅ Token renovado com sucesso");

    return newAccessToken;
  } catch (error: any) {
  console.error("❌ Falha no refresh token", error?.response?.data);

  // 🔥 limpa TUDO (resolve seu problema de token preso)
  localStorage.clear();

  window.location.href = "/login";

  return null;
}
}

// 🔥 CLASSE API
export default class ConnectionAPI {
  static async call<T>(
    url: string,
    method: MethodType,
    body?: unknown,
    tokenOverride?: string
  ): Promise<T> {
    const token = tokenOverride ?? localStorage.getItem("token");

    const config: AxiosRequestConfig = {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "Content-Type": "application/json",
      },
    };

    if (method === "get" || method === "delete") {
      return (await api[method]<T>(url, config)).data;
    }

    return (await api[method]<T>(url, body, config)).data;
  }

  static async connect<T>(
    url: string,
    method: MethodType,
    body?: unknown
  ): Promise<T> {
    try {
      return await this.call<T>(url, method, body);
    } catch (error: any) {
      if (error.response) {
        throw error;
      }
      throw new Error("ERROR_NETWORK");
    }
  }
}

// 🔥 HELPERS
export const connectionAPIGet = async <T>(url: string): Promise<T> =>
  ConnectionAPI.connect<T>(url, "get");

export const connectionAPIDelete = async <T>(url: string): Promise<T> =>
  ConnectionAPI.connect<T>(url, "delete");

export const connectionAPIPost = async <T, B = unknown>(url: string, body: B): Promise<T> =>
  ConnectionAPI.connect<T>(url, "post", body);

export const connectionAPIPut = async <T, B = unknown>(url: string, body?: B): Promise<T> =>
  ConnectionAPI.connect<T>(url, "put", body);