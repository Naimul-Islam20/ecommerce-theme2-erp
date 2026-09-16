import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { ShopView } from "@/components/ShopView";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <>
      <PageHero crumbs="Home / Shop" title="সব দেশজ পণ্য" />
      <Suspense fallback={<div className="page-wrap py-20 text-muted">পণ্য লোড হচ্ছে...</div>}>
        <ShopView />
      </Suspense>
    </>
  );
}
