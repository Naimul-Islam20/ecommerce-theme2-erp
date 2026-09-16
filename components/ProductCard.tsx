"use client";

import Link from "next/link";
import { useStore } from "@/lib/cart";
import { money, productHref, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useStore();

  return (
    <article className="relative min-w-0 overflow-hidden rounded-[18px] border border-[#ebe5d7] bg-white transition hover:-translate-y-1 hover:shadow-lift">
      <Link href={productHref(product.id)} className="relative block aspect-square overflow-hidden bg-[#faf7ef]">
        <span className="absolute top-3 left-3 z-[2] rounded-full bg-green px-2.5 py-[7px] text-[11px] font-extrabold text-white">{product.badge}</span>
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-300 hover:scale-[1.035]" />
      </Link>
      <div className="p-[18px] max-sm:p-[13px]">
        <div className="mb-[7px] text-xs text-[#a86e00] max-sm:text-[10px]">
          ★★★★★ <span className="ml-[5px] text-[#8a918c]">{product.rating} ({product.reviews})</span>
        </div>
        <Link href={productHref(product.id)}>
          <h3 className="mb-1 text-[17px] leading-snug font-extrabold max-sm:text-sm">{product.name}</h3>
        </Link>
        <div className="mb-[11px] text-xs text-muted">{product.en}</div>
        <div className="mb-3.5 flex items-center justify-between gap-2">
          <span className="text-lg font-extrabold text-green-dark max-sm:text-base">{money(product.price)}</span>
          <span className="text-[11px] text-muted">{product.unit}</span>
        </div>
        <button
          className="w-full rounded-full border border-green bg-white px-3.5 py-[11px] font-extrabold text-green transition hover:bg-green hover:text-white"
          onClick={() => add(product.id)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
