"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import instance from "@/lib/api/axios";
import { ApiLink } from "@/lib/api/apiLink";
import { getToken, removeToken } from "@/lib/api/token";

export type CustomerAddress = {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
};

export type Customer = {
  full_name?: string;
  email?: string;
  phone?: string;
  default_address?: CustomerAddress;
};

type AuthValue = {
  customer: Customer | null;
  authResolved: boolean;
  isLoggedIn: boolean;
  refreshCustomer: () => Promise<Customer | null>;
  logout: () => Promise<void>;
  setCustomerFromPayload: (next: Customer | null) => void;
};

const CustomerAuthContext = createContext<AuthValue | null>(null);

export function CustomerAuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [authResolved, setAuthResolved] = useState(false);

  const refreshCustomer = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setCustomer(null);
      return null;
    }
    try {
      const { data } = await instance.get(ApiLink.ecommerceCustomerMe, {
        skipAuthRedirect: true,
      });
      if (data.success && data.data?.customer) {
        setCustomer(data.data.customer);
        return data.data.customer as Customer;
      }
      removeToken();
      setCustomer(null);
      return null;
    } catch {
      removeToken();
      setCustomer(null);
      return null;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await refreshCustomer();
      if (!cancelled) setAuthResolved(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [refreshCustomer]);

  const logout = useCallback(async () => {
    try {
      await instance.post(ApiLink.ecommerceCustomerLogout, {}, { skipAuthRedirect: true });
    } catch {
      /* clear locally anyway */
    }
    removeToken();
    setCustomer(null);
    router.push("/");
    router.refresh();
  }, [router]);

  const value = useMemo<AuthValue>(
    () => ({
      customer,
      authResolved,
      isLoggedIn: Boolean(customer),
      refreshCustomer,
      logout,
      setCustomerFromPayload: setCustomer,
    }),
    [customer, authResolved, refreshCustomer, logout],
  );

  return <CustomerAuthContext.Provider value={value}>{children}</CustomerAuthContext.Provider>;
}

export function useCustomerAuth() {
  const ctx = useContext(CustomerAuthContext);
  if (!ctx) throw new Error("useCustomerAuth must be used within CustomerAuthProvider");
  return ctx;
}
