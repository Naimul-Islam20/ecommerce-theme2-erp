"use client";

import { createContext, useContext, useMemo } from "react";
import type { ApiCategory } from "@/lib/api/normalize";
import { products as fallbackProducts, type Product } from "@/lib/products";

type CatalogValue = {
  products: Product[];
  categories: ApiCategory[];
  fromApi: boolean;
  getProduct: (idOrSlug: string) => Product | undefined;
};

const CatalogContext = createContext<CatalogValue | null>(null);

export function CatalogProvider({
  children,
  products = fallbackProducts,
  categories = [],
  fromApi = false,
}: {
  children: React.ReactNode;
  products?: Product[];
  categories?: ApiCategory[];
  fromApi?: boolean;
}) {
  const value = useMemo<CatalogValue>(
    () => ({
      products,
      categories,
      fromApi,
      getProduct(idOrSlug) {
        return products.find((product) => product.id === idOrSlug || product.slug === idOrSlug);
      },
    }),
    [products, categories, fromApi],
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) {
    return {
      products: fallbackProducts,
      categories: [] as ApiCategory[],
      fromApi: false,
      getProduct(idOrSlug: string) {
        return fallbackProducts.find((product) => product.id === idOrSlug || product.slug === idOrSlug);
      },
    } satisfies CatalogValue;
  }
  return ctx;
}
