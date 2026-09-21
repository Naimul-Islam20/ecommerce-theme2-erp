"use client";

import { createContext, useContext, useMemo } from "react";
import type { FooterMenuColumn, HeroSlide, SiteSettings } from "@/lib/api/site";

type SiteValue = {
  settings: SiteSettings;
  heroSlides: HeroSlide[];
  footerColumns: FooterMenuColumn[];
  fromApi: boolean;
  storeName: string;
};

const defaults: SiteValue = {
  settings: {
    storeName: "Deshojo Bazar",
    logo: "/img/logo.png",
    phone: "09678148148",
    email: "info@deshojobazar.com",
    address: "",
    metaTitle: "Deshojo Bazar",
    metaDescription: "Deshojo Bazar premium e-commerce storefront",
  },
  heroSlides: [],
  footerColumns: [],
  fromApi: false,
  storeName: "Deshojo Bazar",
};

const SiteContext = createContext<SiteValue>(defaults);

export function SiteProvider({
  children,
  settings = defaults.settings,
  heroSlides = [],
  footerColumns = [],
  fromApi = false,
}: {
  children: React.ReactNode;
  settings?: SiteSettings;
  heroSlides?: HeroSlide[];
  footerColumns?: FooterMenuColumn[];
  fromApi?: boolean;
}) {
  const value = useMemo<SiteValue>(
    () => ({
      settings,
      heroSlides,
      footerColumns,
      fromApi,
      storeName: settings.storeName || "Deshojo Bazar",
    }),
    [settings, heroSlides, footerColumns, fromApi],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  return useContext(SiteContext);
}
