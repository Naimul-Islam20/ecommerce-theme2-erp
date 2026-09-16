"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/cart";

const farmLinks = [
  { href: "/farming/haor", label: "Haor Farm" },
  { href: "/farming/drought", label: "Drought Farm" },
  { href: "/farming/coast", label: "Coast Farm" },
  { href: "/farming/hill", label: "Hill Farm" },
  { href: "/farming/flood", label: "Flood Farm" },
];

const iconBtn =
  "relative grid h-[42px] w-[42px] place-items-center rounded-full border border-[#d7ddda] bg-white text-lg text-green-dark max-sm:h-[38px] max-sm:w-[38px]";

export function Header() {
  const pathname = usePathname();
  const { count, setCartOpen, setSearchOpen, mobileOpen, setMobileOpen, toast } = useStore();
  const [farmOpen, setFarmOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    setFarmOpen(false);
  }, [pathname, setMobileOpen]);

  return (
    <>
      <div className="bg-green-dark px-4 py-2 text-center text-sm tracking-[0.1px] text-white max-sm:text-[11px]">
        দেশজ খাবার, বিশ্বস্ত উৎস — নির্বাচিত পণ্য এখন অনলাইনে অর্ডার করুন
      </div>
      <div className="border-b border-[#d6dfd1] bg-[#e8efe5] px-4 py-[7px] text-center text-[13px] text-green-dark max-sm:text-[11px]">
        ঢাকা ও নির্বাচিত এলাকায় হোম ডেলিভারি • অর্ডার সহায়তা: 09678148148
      </div>
      <header className="sticky top-0 z-50 border-b border-green/10 bg-paper/95 backdrop-blur-md">
        <div className="page-wrap grid h-[84px] grid-cols-[auto_1fr_auto] items-center gap-7 max-sm:h-[70px] max-sm:gap-2.5">
          <button className={`${iconBtn} hidden max-lg:grid`} aria-label="Menu" onClick={() => setMobileOpen(!mobileOpen)}>
            ☰
          </button>
          <Link href="/" className="flex min-w-[170px] items-center gap-2.5 max-lg:min-w-0 max-lg:justify-self-center">
            <img src="/img/logo.png" alt="Deshojo Bazar" className="h-[62px] w-[88px] object-contain max-sm:h-[50px] max-sm:w-[70px]" />
          </Link>
          <nav className="hidden items-stretch justify-center gap-[26px] text-[15px] font-semibold lg:flex" aria-label="Primary navigation">
            <NavLink href="/shop">Shop</NavLink>
            <NavLink href="/#concerns">Concerns</NavLink>
            <NavLink href="/#videos">Videos</NavLink>
            <div className="relative flex items-stretch" onMouseLeave={() => setFarmOpen(false)}>
              <button
                className="flex items-center gap-[7px] py-[30px]"
                aria-expanded={farmOpen}
                onClick={() => setFarmOpen((open) => !open)}
                onMouseEnter={() => setFarmOpen(true)}
              >
                Farming Life
                <span className={`text-xs transition ${farmOpen ? "rotate-180" : ""}`}>⌄</span>
              </button>
              <div
                className={`absolute top-[76px] left-1/2 w-[210px] -translate-x-1/2 rounded-2xl border border-[#dedfce] bg-[#fffdf8] p-2 shadow-[0_18px_40px_rgba(17,48,37,.16)] transition ${farmOpen ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"}`}
              >
                {farmLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="block rounded-[10px] px-3 py-[11px] text-sm whitespace-nowrap hover:bg-[#eef2e6] hover:text-green-dark">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <NavLink href="/reviva">Reviva</NavLink>
            <NavLink href="/impact">Impact</NavLink>
            <NavLink href="/#story">আমাদের গল্প</NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <button className={iconBtn} aria-label="Search" onClick={() => setSearchOpen(true)}>
              ⌕
            </button>
            <button
              className={`${iconBtn} max-sm:hidden`}
              aria-label="Account"
              onClick={() => toast("অ্যাকাউন্ট লগইন ব্যাকএন্ড সংযোগের পর চালু হবে")}
            >
              ♙
            </button>
            <button className={iconBtn} aria-label="Cart" onClick={() => setCartOpen(true)}>
              🛒
              <span className="absolute -top-1 -right-1 grid h-[19px] w-[19px] place-items-center rounded-full bg-orange text-[11px] font-bold text-white">
                {count}
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative py-[30px] after:absolute after:right-0 after:bottom-[22px] after:left-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-orange after:transition-transform hover:after:scale-x-100"
    >
      {children}
    </Link>
  );
}
