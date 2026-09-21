import type { AxiosRequestConfig } from "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    skipAuthRedirect?: boolean;
  }
}

export type AppAxiosRequestConfig = AxiosRequestConfig;
