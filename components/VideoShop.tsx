"use client";

import Link from "next/link";
import { useStore } from "@/lib/cart";
import { getProduct, money, productHref } from "@/lib/products";

const clips = [
  { id: "ghee", pill: "Deshojo story", poster: "/img/ghee.webp", tag: "Traditional favourite" },
  { id: "mustard-oil", pill: "From the press", poster: "/img/mustard-oil-5l.webp", tag: "Kitchen essential" },
  { id: "honey", pill: "From nature", poster: "/img/honey.webp", tag: "Natural choice" },
  { id: "pitha", pill: "Taste of home", poster: "/img/pitha.webp", tag: "Heritage food" },
];

export function VideoShop() {
  const { add } = useStore();

  return (
    <div className="-mr-1 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:gap-[18px] md:mr-0 md:grid md:grid-cols-2 md:overflow-visible xl:grid-cols-4">
      {clips.map((clip) => {
        const product = getProduct(clip.id);
        if (!product) return null;
        return (
          <article key={clip.id} className="min-w-[78vw] snap-start overflow-hidden rounded-[22px] bg-white text-ink shadow-[0_18px_50px_rgba(0,0,0,.16)] sm:min-w-[300px] md:min-w-0">
            <div className="relative aspect-square overflow-hidden bg-[#173d32]">
              <img src={clip.poster} alt="" className="h-full w-full object-contain" />
              <span className="absolute top-3 left-3 z-[2] rounded-full bg-white/90 px-2 py-1.5 text-[10px] font-extrabold tracking-wide text-green-dark uppercase">
                {clip.pill}
              </span>
              <span className="absolute top-3 right-3 z-[2] grid h-[34px] w-[34px] place-items-center rounded-full bg-[rgba(4,40,29,.76)] pl-0.5 text-xs text-white">
                ▶
              </span>
            </div>
            <div className="grid grid-cols-[1fr_auto] items-center gap-2 p-3.5 sm:gap-3 sm:p-[15px]">
              <Link href={productHref(product.id)} className="min-w-0">
                <small className="block text-[10px] tracking-[0.7px] text-muted uppercase">{clip.tag}</small>
                <h3 className="my-[2px] line-clamp-2 text-[14px] leading-snug font-bold sm:text-[15px]">{product.name}</h3>
                <strong className="text-sm text-green-dark">{money(product.price)}</strong>
              </Link>
              <button
                className="rounded-full bg-orange px-3 py-2.5 text-xs font-extrabold whitespace-nowrap text-white hover:bg-green sm:px-[13px]"
                onClick={() => add(product.id)}
              >
                + Add
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
