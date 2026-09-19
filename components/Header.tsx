"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/cart";
import { IconCart, IconMenu, IconSearch, IconUser } from "@/components/Icons";

const farmLinks = [
  { href: "/farming/haor", label: "Haor Farm" },
  { href: "/farming/drought", label: "Drought Farm" },
  { href: "/farming/coast", label: "Coast Farm" },
  { href: "/farming/hill", label: "Hill Farm" },
  { href: "/farming/flood", label: "Flood Farm" },
];

const iconBtn =
  "relative grid h-10 w-10 place-items-center rounded-full border border-[#ddd6c6] bg-white text-green-dark hover:border-orange/50 hover:bg-cream hover:text-orange max-sm:h-9 max-sm:w-9";

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
      <div className="bg-green-dark px-4 py-2 text-center text-[12px] text-white/95 sm:text-[13px]">
        ঢাকা ও নির্বাচিত এলাকায় হোম ডেলিভারি
        <span className="mx-1.5 text-white/35">•</span>
        অর্ডার সহায়তা:{" "}
        <a href="tel:09678148148" className="font-semibold text-[#f5d59c] hover:text-white">
          09678148148
        </a>
      </div>

      <header className="sticky top-0 z-50 border-b border-[#e6e0d2] bg-[#fffdf8]/95 backdrop-blur-md">
        <div className="page-wrap flex h-[76px] items-center justify-between gap-4 max-sm:h-[66px]">
          <button
            type="button"
            className={`${iconBtn} shrink-0 lg:hidden`}
            aria-label="Menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <IconMenu />
          </button>

          <Link href="/" className="shrink-0 max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2">
            <img src="/img/logo.png" alt="Deshojo Bazar" className="h-[52px] w-auto object-contain max-sm:h-[44px]" />
          </Link>

          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-1 text-[13px] font-semibold text-green-dark xl:gap-2 xl:text-[14px] lg:flex"
            aria-label="Primary navigation"
          >
            <NavLink href="/shop">Shop</NavLink>
            <NavLink href="/#concerns">Concerns</NavLink>
            <NavLink href="/#videos">Videos</NavLink>
            <div className="relative flex items-stretch" onMouseLeave={() => setFarmOpen(false)}>
              <button
                type="button"
                className="flex items-center gap-[7px] rounded-full px-3 py-2 hover:bg-[#eef2e6] hover:text-orange"
                aria-expanded={farmOpen}
                onClick={() => setFarmOpen((open) => !open)}
                onMouseEnter={() => setFarmOpen(true)}
              >
                Farming Life
                <span className={`text-xs transition ${farmOpen ? "rotate-180" : ""}`}>⌄</span>
              </button>
              <div
                className={`absolute top-full left-1/2 z-50 w-[210px] -translate-x-1/2 pt-2 transition ${
                  farmOpen ? "visible translate-y-0 opacity-100" : "invisible pointer-events-none translate-y-2 opacity-0"
                }`}
              >
                <div className="rounded-2xl border border-[#dedfce] bg-[#fffdf8] p-2 shadow-[0_18px_40px_rgba(17,48,37,.16)]">
                  {farmLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block rounded-[10px] px-3 py-[11px] text-sm whitespace-nowrap hover:bg-[#eef2e6] hover:text-green-dark"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <NavLink href="/reviva">Reviva</NavLink>
            <NavLink href="/impact">Impact</NavLink>
            <NavLink href="/#story">আমাদের গল্প</NavLink>
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button type="button" className={iconBtn} aria-label="Search" onClick={() => setSearchOpen(true)}>
              <IconSearch />
            </button>
            <button
              type="button"
              className={`${iconBtn} max-sm:hidden`}
              aria-label="Account"
              onClick={() => toast("অ্যাকাউন্ট লগইন ব্যাকএন্ড সংযোগের পর চালু হবে")}
            >
              <IconUser />
            </button>
            <button type="button" className={iconBtn} aria-label="Cart" onClick={() => setCartOpen(true)}>
              <IconCart />
              <span className="absolute -top-1 -right-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-orange px-1 text-[10px] font-bold text-white">
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
    <Link href={href} className="rounded-full px-3 py-2 hover:bg-[#eef2e6] hover:text-orange">
      {children}
    </Link>
  );
}
