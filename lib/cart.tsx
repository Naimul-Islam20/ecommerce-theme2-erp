"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, products } from "@/lib/products";

export type CartLine = { id: string; qty: number };

type Store = {
  items: CartLine[];
  count: number;
  subtotal: number;
  add: (id: string, qty?: number) => void;
  changeQty: (id: string, delta: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  closeDrawers: () => void;
  toast: (message: string) => void;
  toastMessage: string | null;
};

const StoreContext = createContext<Store | null>(null);
const STORAGE_KEY = "deshojo_cart";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 2200);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const value = useMemo<Store>(() => {
    const count = items.reduce((sum, line) => sum + line.qty, 0);
    const subtotal = items.reduce((sum, line) => {
      const product = getProduct(line.id);
      return sum + (product ? product.price * line.qty : 0);
    }, 0);

    return {
      items,
      count,
      subtotal,
      add(id, qty = 1) {
        if (!products.some((product) => product.id === id)) return;
        setItems((current) => {
          const existing = current.find((line) => line.id === id);
          if (existing) {
            return current.map((line) => (line.id === id ? { ...line, qty: line.qty + Number(qty) } : line));
          }
          return [...current, { id, qty: Number(qty) }];
        });
        setToastMessage("কার্টে যোগ হয়েছে");
      },
      changeQty(id, delta) {
        setItems((current) =>
          current
            .map((line) => (line.id === id ? { ...line, qty: line.qty + delta } : line))
            .filter((line) => line.qty > 0),
        );
      },
      remove(id) {
        setItems((current) => current.filter((line) => line.id !== id));
      },
      clear() {
        setItems([]);
      },
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
      mobileOpen,
      setMobileOpen,
      closeDrawers() {
        setCartOpen(false);
        setMobileOpen(false);
      },
      toast: setToastMessage,
      toastMessage,
    };
  }, [items, cartOpen, searchOpen, mobileOpen, toastMessage]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useStore must be used within StoreProvider");
  return store;
}
