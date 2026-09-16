"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { useStore } from "@/lib/cart";
import { shopHref } from "@/lib/products";

export function Footer() {
  const { toast } = useStore();

  function subscribe(event: FormEvent) {
    event.preventDefault();
    toast("ধন্যবাদ! সাবস্ক্রিপশন অনুরোধ গ্রহণ করা হয়েছে।");
    (event.target as HTMLFormElement).reset();
  }

  return (
    <>
      <section className="bg-orange py-12 text-white">
        <div className="page-wrap grid items-center gap-10 md:grid-cols-2">
          <div>
            <h3 className="mb-2 font-serif text-[34px]">দেশজ স্বাদের খবর আগে জানুন</h3>
            <p className="text-[#fff1e9]">নতুন পণ্য, মৌসুমি সংগ্রহ ও বিশেষ অফারের আপডেট পান।</p>
          </div>
          <form className="flex rounded-full bg-white p-[5px] max-sm:flex-col max-sm:bg-transparent" onSubmit={subscribe}>
            <input required type="email" placeholder="আপনার ইমেইল" className="min-w-0 flex-1 rounded-full px-[18px] py-3 text-ink outline-none max-sm:mb-2 max-sm:w-full max-sm:border max-sm:border-white/40 max-sm:bg-white" />
            <button className="rounded-full bg-green-dark px-[22px] py-3 font-extrabold text-white max-sm:w-full">Subscribe</button>
          </form>
        </div>
      </section>
      <footer className="bg-[#0b3026] px-0 pt-[54px] pb-5 text-[#ddebe4]">
        <div className="page-wrap">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <img src="/img/logo.png" alt="Deshojo Bazar" className="mb-3.5 w-[100px] rounded-2xl bg-white p-2" />
              <p className="max-w-[350px] text-[#aec1b7]">
                বাংলার গ্রাম, কৃষক, ঐতিহ্য ও ঘরের স্বাদকে শহরের মানুষের কাছে সহজে পৌঁছে দেওয়ার একটি দেশজ বাজার।
              </p>
            </div>
            <FooterCol title="Shop">
              <Link href="/shop">সব পণ্য</Link>
              <Link href={shopHref("চাল")}>চাল</Link>
              <Link href={shopHref("তেল")}>তেল</Link>
              <Link href={shopHref("মধু")}>মধু</Link>
            </FooterCol>
            <FooterCol title="Impact">
              <Link href="/impact">Tahirpur Haor Initiative</Link>
              <Link href="/impact#model">Our Adaptation Model</Link>
              <Link href="/impact#partnership">Partnership Opportunities</Link>
              <Link href="/#beyond">Beyond Our Products</Link>
            </FooterCol>
            <FooterCol title="Contact">
              <a href="tel:09678148148">09678148148</a>
              <a href="mailto:info@deshojobazar.com">info@deshojobazar.com</a>
              <a href="https://deshojobazar.com/">deshojobazar.com</a>
            </FooterCol>
          </div>
          <div className="mt-[34px] flex justify-between gap-5 border-t border-white/10 pt-[18px] text-xs text-[#96aaa0] max-sm:flex-col">
            <span>© 2026 Deshojo Bazar. All rights reserved.</span>
            <span>Premium storefront prototype for Deshojo Bazar.</span>
          </div>
        </div>
      </footer>
    </>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="[&_a]:my-[9px] [&_a]:block [&_a]:text-sm [&_a]:text-[#bacbc2] [&_a]:hover:text-white">
      <h4 className="mb-4 text-white">{title}</h4>
      {children}
    </div>
  );
}
