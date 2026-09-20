"use client";

import Link from "next/link";
import { useStore } from "@/lib/cart";
import { money, productHref, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { add, changeQty, items } = useStore();
  const qty = items.find((line) => line.id === product.id)?.qty ?? 0;

  return (
    <article className="relative min-w-0 overflow-hidden rounded-[18px] border border-[#ebe5d7] bg-white">
      <Link href={productHref(product.id)} className="relative block aspect-square overflow-hidden bg-[#faf7ef]">
        <span className="absolute top-2 left-2 z-[2] rounded-full bg-green px-2 py-1 text-[10px] font-extrabold text-white sm:top-3 sm:left-3 sm:px-2.5 sm:py-[7px] sm:text-[11px]">{product.badge}</span>
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
      </Link>
      <div className="px-2.5 pt-2 pb-2.5 sm:px-3.5 sm:pt-2.5 sm:pb-3">
        <Link href={productHref(product.id)}>
          <h3 className="mb-1 line-clamp-2 text-[13px] leading-snug font-extrabold sm:mb-1.5 sm:text-[17px]">{product.name}</h3>
        </Link>
        <div className="mb-2 flex items-center justify-between gap-1 sm:mb-2.5 sm:gap-2">
          <span className="text-sm font-extrabold text-green-dark sm:text-lg">{money(product.price)}</span>
          <span className="truncate text-[10px] text-muted sm:text-[11px]">{product.unit}</span>
        </div>
        {qty > 0 ? (
          <div className="qty-stepper flex h-9 w-full items-center overflow-hidden rounded-full bg-orange text-white sm:h-10">
            <button
              type="button"
              aria-label="Decrease quantity"
              className="qty-stepper__minus grid h-full w-9 place-items-center border-r border-white/35 text-base font-extrabold transition hover:bg-black/10 sm:w-10 sm:text-lg"
              onClick={() => changeQty(product.id, -1)}
            >
              −
            </button>
            <span className="qty-stepper__count flex-1 text-center text-xs font-extrabold tabular-nums sm:text-sm">{qty}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              className="qty-stepper__plus grid h-full w-9 place-items-center border-l border-white/35 text-base font-extrabold transition hover:bg-black/10 sm:w-10 sm:text-lg"
              onClick={() => changeQty(product.id, 1)}
            >
              +
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="w-full rounded-full bg-orange px-2 py-1.5 text-[11px] font-extrabold text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(239,111,69,.25)] sm:px-3 sm:py-2 sm:text-sm"
            onClick={() => add(product.id)}
          >
            Add to Cart
          </button>
        )}
      </div>
    </article>
  );
}
