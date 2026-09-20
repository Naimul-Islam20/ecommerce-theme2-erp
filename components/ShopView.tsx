"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/lib/products";

export function ShopView() {
  const params = useSearchParams();
  const [active, setActive] = useState(params.get("cat") || "সব পণ্য");
  const [term, setTerm] = useState("");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    setActive(params.get("cat") || "সব পণ্য");
  }, [params]);

  const filtered = useMemo(() => {
    const next = products.filter((product) => {
      const matchesCategory = active === "সব পণ্য" || product.category === active;
      const haystack = `${product.name}${product.en}${product.category}`.toLowerCase();
      return matchesCategory && (!term || haystack.includes(term.toLowerCase()));
    });
    if (sort === "low") next.sort((a, b) => a.price - b.price);
    if (sort === "high") next.sort((a, b) => b.price - a.price);
    if (sort === "rating") next.sort((a, b) => b.rating - a.rating);
    return next;
  }, [active, term, sort]);

  return (
    <section className="py-8 sm:py-12">
      <div className="page-wrap grid gap-8 lg:grid-cols-[200px_1fr]">
        <aside className="border border-line bg-white p-3 sm:p-4 lg:sticky lg:top-[90px] lg:self-start">
          <h3 className="mb-3 text-[12px] font-semibold tracking-[0.12em] text-muted uppercase">Categories</h3>
          <div className="flex flex-wrap gap-1.5 lg:flex-col lg:gap-1">
            {categories.map((category) => (
              <button
                key={category}
                className={`min-h-10 rounded-md px-3 py-2 text-left text-[13px] transition lg:min-h-0 lg:rounded-none ${
                  active === category ? "bg-green-dark font-semibold text-white" : "text-ink hover:bg-cream-2"
                }`}
                onClick={() => setActive(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </aside>
        <div>
          <div className="mb-5 flex flex-col gap-3 border border-line bg-white p-3 sm:flex-row sm:items-center sm:justify-between md:p-4">
            <p className="text-[13px] font-medium text-muted">{filtered.length} products</p>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search"
                className="min-w-0 flex-1 border border-line px-3 py-2.5 text-[13px] outline-none focus:border-green sm:min-w-[180px] md:min-w-[220px]"
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="min-w-[140px] border border-line px-3 py-2.5 text-[13px] outline-none"
              >
                <option value="featured">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Top rated</option>
              </select>
            </div>
          </div>
          {filtered.length === 0 ? (
            <div className="border border-dashed border-line py-16 text-center text-[14px] text-muted">No products found.</div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
