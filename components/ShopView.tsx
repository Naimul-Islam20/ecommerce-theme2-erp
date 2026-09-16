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
    <section className="py-14 sm:py-[78px]">
      <div className="page-wrap grid gap-9 lg:grid-cols-[250px_1fr]">
        <aside className="rounded-[18px] border border-[#e6dfd0] bg-white p-5 lg:sticky lg:top-[118px] lg:self-start">
          <h3 className="mb-4">Categories</h3>
          <div className="flex flex-row flex-wrap gap-[5px] lg:flex-col">
            {categories.map((category) => (
              <button
                key={category}
                className={`rounded-[10px] px-2.5 py-[9px] text-left text-[#46534b] ${active === category ? "bg-[#edf3ed] font-extrabold text-green" : "hover:bg-[#edf3ed] hover:font-extrabold hover:text-green"}`}
                onClick={() => setActive(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </aside>
        <div>
          <div className="mb-5 flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
            <strong>{filtered.length}টি পণ্য</strong>
            <div className="flex flex-wrap gap-2.5">
              <input
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                placeholder="পণ্য খুঁজুন"
                className="min-w-0 rounded-xl border border-[#ded9ce] bg-white px-[13px] py-[11px] sm:min-w-[250px]"
              />
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="rounded-xl border border-[#ded9ce] bg-white px-[13px] py-[11px]"
              >
                <option value="featured">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Top rated</option>
              </select>
            </div>
          </div>
          {filtered.length === 0 ? (
            <div className="px-5 py-14 text-center text-muted">এই ফিল্টারে কোনো পণ্য পাওয়া যায়নি।</div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-[22px] lg:grid-cols-3">
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
