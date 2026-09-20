"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { useStore } from "@/lib/cart";
import { getProduct, money } from "@/lib/products";

export function CheckoutView() {
  const { items, clear, toast } = useStore();
  const lines = items
    .map((line) => {
      const product = getProduct(line.id);
      return product ? { product, qty: line.qty } : null;
    })
    .filter((line): line is { product: NonNullable<ReturnType<typeof getProduct>>; qty: number } => Boolean(line));
  const total = lines.reduce((sum, line) => sum + line.product.price * line.qty, 0);

  function placeOrder(event: FormEvent) {
    event.preventDefault();
    toast("ডেমো অর্ডার গ্রহণ করা হয়েছে। লাইভ ব্যাকএন্ড যুক্ত হলে এটি বাস্তব অর্ডার তৈরি করবে।");
    window.setTimeout(clear, 900);
  }

  return (
    <section className="py-8 sm:py-12">
      <div className="page-wrap grid gap-5 sm:gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <form className="rounded-[20px] border border-[#e6dfd2] bg-white p-4 sm:p-[26px]" onSubmit={placeOrder}>
          <h2 className="mt-0 text-2xl sm:text-[28px]">Delivery information</h2>
          <div className="grid gap-3.5 sm:grid-cols-2">
            <Field label="নাম">
              <input required placeholder="আপনার নাম" />
            </Field>
            <Field label="মোবাইল">
              <input required placeholder="01XXXXXXXXX" />
            </Field>
            <Field label="ঠিকানা" full>
              <textarea required rows={3} placeholder="বাড়ি, রাস্তা, এলাকা" />
            </Field>
            <Field label="শহর">
              <input required defaultValue="Dhaka" />
            </Field>
            <Field label="Payment">
              <select>
                <option>Cash on Delivery</option>
                <option disabled>bKash — integration required</option>
                <option disabled>Card — gateway integration required</option>
              </select>
            </Field>
          </div>
          <div className="mt-4 rounded-lg border-l-4 border-green bg-[#f1f6ef] p-[13px] text-[13px] text-[#526057]">
            এটি একটি কার্যকর front-end checkout prototype। লাইভ অর্ডার, bKash/Nagad/card payment, stock deduction ও admin order management চালু করতে Deshojo Bazar-এর বর্তমান backend/API-এর সাথে সংযোগ করতে হবে।
          </div>
          <button className="mt-[18px] inline-flex min-h-[50px] w-full items-center justify-center rounded-full bg-orange px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(239,111,69,.25)]">
            Place Demo Order
          </button>
        </form>
        <aside className="rounded-[20px] border border-[#e6dfd2] bg-white p-4 sm:p-[26px] lg:sticky lg:top-[90px] lg:self-start">
          <h2 className="mt-0 text-2xl sm:text-[28px]">Your order</h2>
          {lines.length === 0 ? (
            <div className="px-5 py-14 text-center text-muted">
              কার্ট খালি।{" "}
              <Link href="/shop" className="font-bold text-green">
                Shop করুন
              </Link>
            </div>
          ) : (
            <>
              {lines.map(({ product, qty }) => (
                <div key={product.id} className="flex justify-between gap-2.5 border-b border-[#eee] py-[9px]">
                  <span className="min-w-0 flex-1 break-words">
                    {product.name} × {qty}
                  </span>
                  <strong className="shrink-0">{money(product.price * qty)}</strong>
                </div>
              ))}
              <div className="flex justify-between pt-[15px] text-lg font-black sm:text-xl">
                <span>Total</span>
                <span>{money(total)}</span>
              </div>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}

function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return (
    <label className={`flex flex-col gap-1.5 text-[13px] font-bold ${full ? "sm:col-span-2" : ""}`}>
      {label}
      <div className="font-normal [&_input]:w-full [&_input]:rounded-[11px] [&_input]:border [&_input]:border-[#dcd6ca] [&_input]:px-[13px] [&_input]:py-3 [&_input]:outline-none [&_input]:focus:border-green [&_select]:w-full [&_select]:rounded-[11px] [&_select]:border [&_select]:border-[#dcd6ca] [&_select]:px-[13px] [&_select]:py-3 [&_textarea]:w-full [&_textarea]:rounded-[11px] [&_textarea]:border [&_textarea]:border-[#dcd6ca] [&_textarea]:px-[13px] [&_textarea]:py-3 [&_textarea]:outline-none [&_textarea]:focus:border-green">
        {children}
      </div>
    </label>
  );
}
