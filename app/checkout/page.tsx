import type { Metadata } from "next";
import { CheckoutView } from "@/components/CheckoutView";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <>
      <PageHero crumbs="Home / Checkout" title="Checkout" compact />
      <CheckoutView />
    </>
  );
}
