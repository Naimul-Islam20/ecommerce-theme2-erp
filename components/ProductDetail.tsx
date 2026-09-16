"use client";

import { useState } from "react";
import { useStore } from "@/lib/cart";
import { money, type Product } from "@/lib/products";

export function ProductDetail({ product }: { product: Product }) {
  const { add } = useStore();
  const [qty, setQty] = useState(1);

  return (
    <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-[54px]">
      <div className="overflow-hidden rounded-3xl border border-[#e7e0d4] bg-[#faf7ef]">
        <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
      </div>
      <div>
        <span className="inline-block rounded-full bg-[#eaf2eb] px-2.5 py-1.5 text-xs font-extrabold text-green">{product.badge}</span>
        <h1 className="mt-2 mb-3 font-serif text-4xl leading-[1.12] text-green-dark sm:text-[44px]">{product.name}</h1>
        <div className="text-xs text-[#a86e00]">
          ★★★★★ <span className="ml-[5px] text-[#8a918c]">{product.rating} • {product.reviews} reviews</span>
        </div>
        <div className="my-3 text-[28px] font-black text-green">
          {money(product.price)} <small className="text-[13px] font-medium text-[#6e7b73]">/ {product.unit}</small>
        </div>
        <p className="text-muted">{product.description}</p>
        <div className="my-6 flex gap-3">
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(event) => setQty(Math.max(1, Number(event.target.value) || 1))}
            className="w-20 rounded-xl border border-[#ddd] px-3 py-3 text-center"
          />
          <button
            className="inline-flex min-h-[50px] flex-1 items-center justify-center rounded-full bg-orange px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(239,111,69,.25)]"
            onClick={() => add(product.id, qty)}
          >
            Add to Cart
          </button>
        </div>
        <div className="mt-[22px] border-t border-[#e9e2d5]">
          <Row label="Category" value={product.category} />
          <Row label="Availability" value={product.stock ? "In stock" : "Out of stock"} />
          <Row label="Delivery" value="Area-based delivery" />
          <Row label="Support" value="09678148148" />
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-5 border-b border-[#e9e2d5] py-[13px] text-sm">
      <span className="text-muted">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
