import axios, { AxiosRequestConfig } from "axios";

export type MethodType = "get" | "post" | "put" | "delete";



export default class ConnectionAPI {
  static async call<T>(url: string, method: MethodType, body?: unknown): Promise<T> {
    const token = localStorage.getItem("token");

    const config: AxiosRequestConfig = {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "Content-Type": "application/json",
      },
    };


    switch (method) {
      case "get":
      case "delete":
        return (await axios[method]<T>(url, config)).data;

      case "post":
      case "put":
      default:
        return (await axios[method]<T>(url, body, config)).data;
    }
  }

  static async connect<T>(url: string, method: MethodType, body?: unknown): Promise<T> {
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

export const connectionAPIGet = async <T>(url: string): Promise<T> =>
  ConnectionAPI.connect<T>(url, "get");

export const connectionAPIDelete = async <T>(url: string): Promise<T> =>
  ConnectionAPI.connect<T>(url, "delete");

export const connectionAPIPost = async <T, B = unknown>(url: string, body: B): Promise<T> =>
  ConnectionAPI.connect<T>(url, "post", body);

export const connectionAPIPut = async <T, B = unknown>(url: string, body?: B): Promise<T> =>
  ConnectionAPI.connect<T>(url, "put", body);