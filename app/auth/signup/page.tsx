"use client";

import Link from "next/link";
import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import instance from "@/lib/api/axios";
import { ApiLink } from "@/lib/api/apiLink";
import { useCustomerAuth } from "@/lib/api/auth";
import { mapApiValidationErrors, normalizeLoginPhone } from "@/lib/api/helpers";
import { setToken } from "@/lib/api/token";

const FIELD_MAP: Record<string, string> = {
  full_name: "name",
  password_confirmation: "confirmPassword",
};

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const { refreshCustomer } = useCustomerAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiMessage, setApiMessage] = useState("");

  function update(key: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setApiMessage("");
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setApiMessage("");
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2) nextErrors.name = "নাম দিন";
    if (!form.email.trim() && !form.phone.trim()) nextErrors.contact = "ইমেইল অথবা মোবাইল দিন";
    if (form.email.trim() && !/\S+@\S+\.\S+/.test(form.email.trim())) nextErrors.email = "সঠিক ইমেইল দিন";
    if (!form.password) nextErrors.password = "পাসওয়ার্ড দিন";
    else if (form.password.length < 8) nextErrors.password = "কমপক্ষে ৮ অক্ষর";
    if (form.password !== form.confirmPassword) nextErrors.confirmPassword = "পাসওয়ার্ড মিলছে না";
    if (!form.terms) nextErrors.terms = "শর্তাবলী মেনে নিন";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    const payload: Record<string, string> = {
      full_name: form.name.trim(),
      password: form.password,
      password_confirmation: form.confirmPassword,
    };
    if (form.email.trim()) payload.email = form.email.trim();
    if (form.phone.trim()) payload.phone = normalizeLoginPhone(form.phone);

    try {
      const { data } = await instance.post(ApiLink.ecommerceCustomerRegister, payload);
      if (data.success && data.data?.access_token) {
        setToken(data.data.access_token);
        await refreshCustomer();
        router.push(redirect.startsWith("/") ? redirect : "/");
        return;
      }
      setApiMessage(data.message || "রেজিস্ট্রেশন হয়নি।");
    } catch (err: unknown) {
      const res = (err as { response?: { data?: { message?: string; errors?: unknown } } })?.response?.data;
      if (res?.errors) {
        const mapped = mapApiValidationErrors(res.errors);
        const remapped: Record<string, string> = {};
        for (const [key, value] of Object.entries(mapped)) {
          remapped[FIELD_MAP[key] || key] = value;
        }
        setErrors(remapped);
      } else setApiMessage(res?.message || "কিছু ভুল হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[22px] border border-[#e6dfd2] bg-white p-5 sm:p-8">
      {apiMessage ? <div className="mb-4 rounded-xl bg-[#fdecea] px-3 py-2.5 text-sm text-[#a33]">{apiMessage}</div> : null}
      {errors.contact ? <div className="mb-4 rounded-xl bg-[#fdecea] px-3 py-2.5 text-sm text-[#a33]">{errors.contact}</div> : null}

      <Field label="নাম" error={errors.name}>
        <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="আপনার নাম" className={inputClass} />
      </Field>
      <Field label="ইমেইল" error={errors.email}>
        <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" className={inputClass} />
      </Field>
      <Field label="মোবাইল" error={errors.phone}>
        <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="01XXXXXXXXX" className={inputClass} />
      </Field>
      <Field label="পাসওয়ার্ড" error={errors.password}>
        <div className="relative">
          <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="••••••••" className={`${inputClass} pr-12`} />
          <button type="button" className="absolute top-1/2 right-3 -translate-y-1/2 text-xs font-bold text-muted" onClick={() => setShowPassword((v) => !v)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </Field>
      <Field label="পাসওয়ার্ড নিশ্চিত করুন" error={errors.confirmPassword}>
        <input type="password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} placeholder="••••••••" className={inputClass} />
      </Field>

      <label className="mb-5 flex items-start gap-2 text-sm">
        <input type="checkbox" checked={form.terms} onChange={(e) => update("terms", e.target.checked)} className="mt-1" />
        <span>
          আমি শর্তাবলী মেনে নিচ্ছি।
          {errors.terms ? <span className="mt-1 block text-xs font-medium text-[#a33]">{errors.terms}</span> : null}
        </span>
      </label>

      <button type="submit" disabled={loading} className="inline-flex min-h-[50px] w-full items-center justify-center rounded-full bg-orange px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 disabled:opacity-60">
        {loading ? "তৈরি হচ্ছে..." : "Create account"}
      </button>

      <p className="mt-5 text-center text-sm text-muted">
        আগে থেকে অ্যাকাউন্ট আছে?{" "}
        <Link href={`/auth/login?redirect=${encodeURIComponent(redirect)}`} className="font-bold text-green hover:text-orange">
          Login
        </Link>
      </p>
    </form>
  );
}

const inputClass = "mt-1.5 w-full rounded-[12px] border border-[#dcd6ca] px-3.5 py-3 font-normal outline-none focus:border-green";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="mb-4 block text-[13px] font-bold">
      {label}
      {children}
      {error ? <span className="mt-1 block text-xs font-medium text-[#a33]">{error}</span> : null}
    </label>
  );
}

export default function SignupPage() {
  return (
    <>
      <section className="border-b border-line bg-cream py-8 sm:py-10">
        <div className="page-wrap">
          <div className="mb-2 text-[13px] text-muted">Home / Sign up</div>
          <h1 className="font-serif text-[clamp(28px,5vw,42px)] text-green-dark">অ্যাকাউন্ট তৈরি করুন</h1>
          <p className="mt-2 text-sm text-muted sm:text-base">নতুন গ্রাহক হিসেবে সাইন আপ করুন।</p>
        </div>
      </section>
      <section className="py-8 sm:py-12">
        <div className="page-wrap max-w-[520px]">
          <Suspense fallback={<div className="text-muted">লোড হচ্ছে...</div>}>
            <SignupForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
