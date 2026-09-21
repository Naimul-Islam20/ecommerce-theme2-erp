import axios from "axios";
import { normalizeEcommerceDomainName } from "@/lib/api/domain";
import { getToken, removeToken } from "@/lib/api/token";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: { Accept: "application/json" },
  withCredentials: true,
});

function isCustomerAuthPublicRequest(url?: string) {
  const path = String(url || "").replace(/^\//, "");
  return path.includes("ecommerce/customer/login") || path.includes("ecommerce/customer/register");
}

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token && !isCustomerAuthPublicRequest(config.url)) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  let domain = "";
  if (typeof window !== "undefined") {
    try {
      const { hostname } = window.location;
      domain =
        hostname === "localhost" || hostname === "127.0.0.1"
          ? normalizeEcommerceDomainName(process.env.NEXT_PUBLIC_DOMAIN)
          : normalizeEcommerceDomainName(hostname);
    } catch {
      domain = "";
    }
  }

  const method = (config.method || "get").toLowerCase();
  if (["post", "put", "patch"].includes(method)) {
    if (config.data instanceof FormData) {
      config.data.append("domain_name", domain);
    } else {
      const base = config.data && typeof config.data === "object" ? config.data : {};
      config.data = { ...base, domain_name: domain };
    }
  }

  if (method === "get" || method === "delete") {
    config.params = { ...config.params, domain_name: domain };
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config?.skipAuthRedirect) {
      removeToken();
      if (typeof window !== "undefined") {
        const path = window.location.pathname + (window.location.search || "");
        const redirectParam = path && path !== "/auth/login" ? `?redirect=${encodeURIComponent(path)}` : "";
        window.location.href = `/auth/login${redirectParam}`;
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
