"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  IconClipboard,
  IconHeart,
  IconHome,
  IconLogout,
  IconMapPin,
  IconPencil,
  IconUser,
} from "@/components/Icons";
import { useCustomerAuth } from "@/lib/api/auth";
import { getToken } from "@/lib/api/token";

const nav = [
  { href: "/dashboard", label: "Overview", icon: IconHome },
  { href: "/dashboard/orders", label: "Orders", icon: IconClipboard },
  { href: "/dashboard/wishlist", label: "Wishlist", icon: IconHeart },
  { href: "/dashboard/profile", label: "Profile", icon: IconUser },
  { href: "/dashboard/profile/edit", label: "Update profile", icon: IconPencil },
  { href: "/dashboard/address", label: "Address", icon: IconMapPin },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { customer, authResolved, logout } = useCustomerAuth();

  useEffect(() => {
    if (!authResolved) return;
    if (!getToken() || !customer) {
      router.replace(`/auth/login?redirect=${encodeURIComponent(pathname || "/dashboard")}`);
    }
  }, [authResolved, customer, pathname, router]);

  if (!authResolved) {
    return (
      <div className="page-wrap flex min-h-[50vh] flex-col items-center justify-center py-16">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-green border-t-transparent" />
        <p className="mt-4 text-sm text-muted">Loading your account…</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="page-wrap flex min-h-[40vh] flex-col items-center justify-center py-16">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-green border-t-transparent" />
        <p className="mt-4 text-sm text-muted">Redirecting to sign in…</p>
      </div>
    );
  }

  return (
    <div className="page-wrap py-6 pb-24 sm:py-8 lg:py-10 lg:pb-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
        <aside className="shrink-0 space-y-4 lg:w-56">
          <div className="hidden rounded-xl border border-line bg-white p-4 lg:block">
            <p className="text-xs tracking-wide text-muted uppercase">Signed in as</p>
            <p className="mt-1 truncate font-semibold text-green-dark">{customer.full_name || "Customer"}</p>
            {customer.email ? <p className="mt-0.5 truncate text-sm text-muted">{customer.email}</p> : null}
          </div>

          <nav className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
            {nav.map(({ href, label, icon: Icon }) => {
              const active =
                href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium whitespace-nowrap transition lg:shrink ${
                    active ? "bg-green-dark text-white" : "bg-cream-2 text-green-dark hover:bg-[#e8efe5]"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0 opacity-90" />
                  {label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => logout()}
              className="flex shrink-0 items-center gap-2 rounded-lg bg-[#fdecea] px-3 py-2.5 text-sm font-medium whitespace-nowrap text-[#b42318] transition hover:bg-[#f8d7d3] lg:shrink"
            >
              <IconLogout className="h-5 w-5 shrink-0" />
              Log out
            </button>
          </nav>
        </aside>

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
