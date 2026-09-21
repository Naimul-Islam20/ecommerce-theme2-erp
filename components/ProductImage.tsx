"use client";

import { useState } from "react";
import { isMissingProductImageSrc } from "@/lib/api/product-image";
import { useSite } from "@/lib/site";

export function ProductStoreNamePlaceholder({
  className = "",
  size = "card",
  alt,
}: {
  className?: string;
  size?: "thumb" | "card" | "detail";
  alt?: string;
}) {
  const { storeName } = useSite();
  const name = storeName || "Store";
  const initial = (name.charAt(0) || "S").toUpperCase();
  const isDetail = size === "detail";
  const isCard = size === "card" || isDetail;

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#e8efe5_0%,#f7f3e8_50%,#e4ecdf_100%)] ${className}`}
      aria-label={alt || name}
    >
      <span
        className={`pointer-events-none absolute inset-0 flex items-center justify-center font-black leading-none tracking-tighter text-green-dark/10 select-none ${
          isDetail ? "text-6xl sm:text-7xl md:text-8xl" : isCard ? "text-5xl sm:text-6xl" : "text-[2.25rem]"
        }`}
        aria-hidden
      >
        {initial}
      </span>
      <span
        className={`relative z-[1] line-clamp-4 px-3 text-center font-semibold tracking-wide text-green-dark uppercase ${
          isDetail ? "text-sm sm:text-base md:text-lg" : isCard ? "text-xs sm:text-sm" : "text-[8px] sm:text-[9px]"
        }`}
      >
        {name}
      </span>
    </div>
  );
}

export function ProductImage({
  src,
  alt,
  className = "h-full w-full object-cover",
  wrapClassName = "relative h-full w-full",
  size = "card",
}: {
  src?: string | null;
  alt: string;
  className?: string;
  wrapClassName?: string;
  size?: "thumb" | "card" | "detail";
}) {
  const [failed, setFailed] = useState(false);
  const missing = isMissingProductImageSrc(src) || failed;

  if (missing) {
    return <ProductStoreNamePlaceholder size={size} alt={alt} className={wrapClassName} />;
  }

  return (
    <div className={wrapClassName}>
      <img src={src || ""} alt={alt} className={className} onError={() => setFailed(true)} />
    </div>
  );
}
