"use client";

import Link from "next/link";
import { useStore } from "@/lib/cart";
import { getProduct, money, productHref } from "@/lib/products";

const clips = [
  { id: "ghee", pill: "Deshojo story", poster: "/img/ghee.webp", src: "/video/ghee-story.mp4", tag: "Traditional favourite" },
  { id: "mustard-oil", pill: "From the press", poster: "/img/mustard-oil-5l.webp", src: "/video/oil-story.mp4", tag: "Kitchen essential" },
  { id: "honey", pill: "From nature", poster: "/img/honey.webp", src: "/video/honey-story.mp4", tag: "Natural choice" },
  { id: "pitha", pill: "Taste of home", poster: "/img/pitha.webp", src: "/video/pitha-story.mp4", tag: "Heritage food" },
];

export function VideoShop() {
  const { add } = useStore();

  return (
    <div className="-mr-3 flex snap-x snap-mandatory gap-[18px] overflow-x-auto pb-2 md:mr-0 md:grid md:grid-cols-2 md:overflow-visible xl:grid-cols-4">
      {clips.map((clip) => {
        const product = getProduct(clip.id);
        if (!product) return null;
        return (
          <article key={clip.id} className="min-w-[78vw] snap-start overflow-hidden rounded-[22px] bg-white text-ink shadow-[0_18px_50px_rgba(0,0,0,.16)] md:min-w-0">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#173d32]">
              <video autoPlay muted loop playsInline poster={clip.poster} className="h-full w-full object-cover">
                <source src={clip.src} type="video/mp4" />
              </video>
              <span className="absolute top-3 left-3 z-[2] rounded-full bg-white/90 px-2 py-1.5 text-[10px] font-extrabold tracking-wide text-green-dark uppercase">{clip.pill}</span>
              <span className="absolute top-3 right-3 z-[2] grid h-[34px] w-[34px] place-items-center rounded-full bg-[rgba(4,40,29,.76)] pl-0.5 text-xs text-white">▶</span>
            </div>
            <div className="grid grid-cols-[1fr_auto] items-center gap-3 p-[15px]">
              <Link href={productHref(product.id)}>
                <small className="block text-[10px] tracking-[0.7px] text-muted uppercase">{clip.tag}</small>
                <h3 className="my-[2px] text-[15px] leading-snug font-bold">{product.name}</h3>
                <strong className="text-sm text-green-dark">{money(product.price)}</strong>
              </Link>
              <button className="rounded-full bg-orange px-[13px] py-2.5 text-xs font-extrabold whitespace-nowrap text-white hover:bg-green" onClick={() => add(product.id)}>
                + Add
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
