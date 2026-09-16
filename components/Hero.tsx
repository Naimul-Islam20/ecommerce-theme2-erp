"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const slides = ["/img/hero-farm.webp", "/img/hero-rice.webp", "/img/hero-brown-rice.webp"];

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % slides.length), 5200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[550px] overflow-hidden bg-cream sm:min-h-[620px]">
      {slides.map((src, slideIndex) => (
        <div
          key={src}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${slideIndex === index ? "opacity-100" : "opacity-0"}`}
          style={{ backgroundImage: `url('${src}')` }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,40,30,.78)_0%,rgba(7,40,30,.45)_42%,rgba(7,40,30,.04)_72%)]" />
        </div>
      ))}
      <div className="page-wrap relative z-[2] py-24 text-white sm:py-[90px] sm:pt-[120px]">
        <div className="max-w-[610px]">
          <div className="mb-3.5 text-[13px] font-extrabold tracking-[2.2px] text-gold uppercase">From village to your table</div>
          <h1 className="mb-[18px] font-serif text-[44px] leading-[1.03] font-bold sm:text-[clamp(42px,6vw,78px)]">
            দেশজ খাবার,
            <br />
            শেকড়ের স্বাদ
          </h1>
          <p className="mb-[30px] max-w-[540px] text-base text-[#f3f4ef] sm:text-lg">
            বাংলার মাঠ, কৃষক ও ঐতিহ্যের নির্বাচিত খাবার—বিশ্বস্ত উৎস থেকে আপনার ঘরে।
          </p>
          <Link href="/shop" className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-orange px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(239,111,69,.25)]">
            Shop Now →
          </Link>
          <Link href="/#story" className="ml-2 inline-flex min-h-[50px] items-center justify-center rounded-full border border-white px-6 py-3.5 font-bold text-white transition hover:bg-white hover:text-green-dark max-sm:mt-2.5 max-sm:ml-0">
            আমাদের গল্প
          </Link>
        </div>
      </div>
      <div className="absolute bottom-7 left-1/2 z-[3] flex -translate-x-1/2 gap-2">
        {slides.map((src, slideIndex) => (
          <button
            key={src}
            aria-label={`Slide ${slideIndex + 1}`}
            className={`h-2.5 w-2.5 rounded-full border border-white p-0 ${slideIndex === index ? "bg-white" : "bg-transparent"}`}
            onClick={() => setIndex(slideIndex)}
          />
        ))}
      </div>
    </section>
  );
}
