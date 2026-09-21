"use client";

import Link from "next/link";
import {
  IconClipboard,
  IconHeart,
  IconMapPin,
  IconPencil,
  IconUser,
} from "@/components/Icons";
import { useCustomerAuth } from "@/lib/api/auth";

const cards = [
  {
    href: "/dashboard/orders",
    title: "Orders",
    desc: "Track purchases and order status",
    icon: IconClipboard,
  },
  {
    href: "/dashboard/wishlist",
    title: "Wishlist",
    desc: "Items you have saved",
    icon: IconHeart,
  },
  {
    href: "/dashboard/profile",
    title: "Profile",
    desc: "View your account details",
    icon: IconUser,
  },
  {
    href: "/dashboard/profile/edit",
    title: "Update profile",
    desc: "Change name, email, or phone",
    icon: IconPencil,
  },
  {
    href: "/dashboard/address",
    title: "Address",
    desc: "Default shipping address",
    icon: IconMapPin,
  },
];

export default function DashboardHomePage() {
  const { customer } = useCustomerAuth();
  const firstName = customer?.full_name?.trim().split(/\s+/)[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-green-dark sm:text-3xl">
          Hello{firstName ? `, ${firstName}` : ""}
        </h1>
        <p className="mt-1 text-sm text-muted sm:text-base">
          Manage your orders, wishlist, and account settings from here.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map(({ href, title, desc, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-xl border border-line bg-white p-5 shadow-sm transition-all hover:border-green hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <span className="rounded-lg bg-cream-2 p-3 text-green transition-colors group-hover:bg-green-dark group-hover:text-white">
                <Icon className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <h2 className="font-semibold text-green-dark">{title}</h2>
                <p className="mt-1 text-sm text-muted">{desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
