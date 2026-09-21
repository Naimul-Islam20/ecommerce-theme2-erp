"use client";

import Link from "next/link";
import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import instance from "@/lib/api/axios";
import { ApiLink } from "@/lib/api/apiLink";
import { useCustomerAuth } from "@/lib/api/auth";
import { mapApiValidationErrors, normalizeLoginPhone } from "@/lib/api/helpers";
import { setToken } from "@/lib/api/token";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const { refreshCustomer } = useCustomerAuth();

  const [tab, setTab] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiMessage, setApiMessage] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setApiMessage("");
    const nextErrors: Record<string, string> = {};
    if (tab === "email") {
      if (!email.trim()) nextErrors.email = "ইমেইল দিন";
      else if (!/\S+@\S+\.\S+/.test(email.trim())) nextErrors.email = "সঠিক ইমেইল দিন";
    } else if (!phone.trim()) nextErrors.phone = "মোবাইল নম্বর দিন";
    if (!password) nextErrors.password = "পাসওয়ার্ড দিন";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    const payload: Record<string, string> = { password };
    if (tab === "email") payload.email = email.trim();
    else payload.phone = normalizeLoginPhone(phone);

    try {
      const { data } = await instance.post(ApiLink.ecommerceCustomerLogin, payload);
      if (data.success && data.data?.access_token) {
        setToken(data.data.access_token);
        await refreshCustomer();
        router.push(redirect.startsWith("/") ? redirect : "/");
        return;
      }
      setApiMessage(data.message || "লগইন করা যায়নি।");
    } catch (err: unknown) {
      const res = (err as { response?: { data?: { message?: string; errors?: unknown } } })?.response?.data;
      if (res?.errors) setErrors(mapApiValidationErrors(res.errors));
      else setApiMessage(res?.message || "কিছু ভুল হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[22px] border border-[#e6dfd2] bg-white p-5 sm:p-8">
      <div className="mb-6 flex rounded-full bg-[#f3ead0] p-1">
        {(["email", "phone"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setTab(item);
              setApiMessage("");
              setErrors({});
            }}
            className={`flex-1 rounded-full py-2.5 text-sm font-bold transition ${tab === item ? "bg-green-dark text-white" : "text-green-dark"}`}
          >
            {item === "email" ? "ইমেইল" : "মোবাইল"}
          </button>
        ))}
      </div>

      {apiMessage ? <div className="mb-4 rounded-xl bg-[#fdecea] px-3 py-2.5 text-sm text-[#a33]">{apiMessage}</div> : null}

      {tab === "email" ? (
        <label className="mb-4 block text-[13px] font-bold">
          ইমেইল
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-[12px] border border-[#dcd6ca] px-3.5 py-3 font-normal outline-none focus:border-green"
            placeholder="you@email.com"
          />
          {errors.email ? <span className="mt-1 block text-xs font-medium text-[#a33]">{errors.email}</span> : null}
        </label>
      ) : (
        <label className="mb-4 block text-[13px] font-bold">
          মোবাইল
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1.5 w-full rounded-[12px] border border-[#dcd6ca] px-3.5 py-3 font-normal outline-none focus:border-green"
            placeholder="01XXXXXXXXX"
          />
          {errors.phone ? <span className="mt-1 block text-xs font-medium text-[#a33]">{errors.phone}</span> : null}
        </label>
      )}

      <label className="mb-5 block text-[13px] font-bold">
        পাসওয়ার্ড
        <div className="relative mt-1.5">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-[12px] border border-[#dcd6ca] px-3.5 py-3 pr-12 font-normal outline-none focus:border-green"
            placeholder="••••••••"
          />
          <button type="button" className="absolute top-1/2 right-3 -translate-y-1/2 text-xs font-bold text-muted" onClick={() => setShowPassword((v) => !v)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password ? <span className="mt-1 block text-xs font-medium text-[#a33]">{errors.password}</span> : null}
      </label>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex min-h-[50px] w-full items-center justify-center rounded-full bg-orange px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 disabled:opacity-60"
      >
        {loading ? "লগইন হচ্ছে..." : "Login"}
      </button>

      <p className="mt-5 text-center text-sm text-muted">
        অ্যাকাউন্ট নেই?{" "}
        <Link href={`/auth/signup?redirect=${encodeURIComponent(redirect)}`} className="font-bold text-green hover:text-orange">
          Sign up
        </Link>
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <>
      <section className="border-b border-line bg-cream py-8 sm:py-10">
        <div className="page-wrap">
          <div className="mb-2 text-[13px] text-muted">Home / Login</div>
          <h1 className="font-serif text-[clamp(28px,5vw,42px)] text-green-dark">লগইন করুন</h1>
          <p className="mt-2 text-sm text-muted sm:text-base">অর্ডার ট্র্যাকিং ও দ্রুত চেকআউটের জন্য সাইন ইন করুন।</p>
        </div>
      </section>
      <section className="py-8 sm:py-12">
        <div className="page-wrap max-w-[480px]">
          <Suspense fallback={<div className="text-muted">লোড হচ্ছে...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
