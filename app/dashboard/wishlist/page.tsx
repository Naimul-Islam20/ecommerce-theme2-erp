"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import instance from "@/lib/api/axios";
import { ApiLink } from "@/lib/api/apiLink";
import { getOrCreateGuestToken } from "@/lib/api/guestToken";
import { normalizeApiProduct } from "@/lib/api/normalize";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/products";

export default function DashboardWishlistPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const guestToken = getOrCreateGuestToken();
      const { data } = await instance.get(ApiLink.ecommerceWishlist, {
        params: { guest_token: guestToken },
        skipAuthRedirect: true,
      });
      const rows = Array.isArray(data?.data?.products) ? data.data.products : [];
      const next = rows.map(normalizeApiProduct).filter((item: Product | null): item is Product => Boolean(item));
      setProducts(next);
    } catch {
      setError("Could not load wishlist.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-green-dark sm:text-2xl">Wishlist</h1>
        <p className="mt-1 text-sm text-muted">Items you have saved for later.</p>
      </div>

      {loading ? (
        <div className="rounded-xl border border-line bg-white p-10 text-center text-muted">Loading wishlist…</div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</div>
      ) : products.length === 0 ? (
        <div className="rounded-xl border border-line bg-white p-10 text-center text-muted">
          Your wishlist is empty.
          <div className="mt-4">
            <Link
              href="/shop"
              className="inline-flex rounded-lg bg-green-dark px-4 py-2 text-sm font-medium text-white"
            >
              Go Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
