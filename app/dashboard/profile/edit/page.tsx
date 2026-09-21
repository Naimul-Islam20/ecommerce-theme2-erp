"use client";

import { FormEvent, useState } from "react";
import instance from "@/lib/api/axios";
import { ApiLink } from "@/lib/api/apiLink";
import { useCustomerAuth } from "@/lib/api/auth";
import { mapApiErrors } from "@/lib/dashboard";

export default function DashboardProfileEditPage() {
  const { customer, refreshCustomer, setCustomerFromPayload } = useCustomerAuth();
  const [fullName, setFullName] = useState(customer?.full_name || "");
  const [email, setEmail] = useState(customer?.email || "");
  const [phone, setPhone] = useState(customer?.phone || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    setErrors({});
    setLoading(true);
    try {
      const body = {
        full_name: fullName.trim(),
        email: email.trim() || null,
        phone: phone.trim() || null,
      };
      const { data } = await instance.patch(ApiLink.ecommerceCustomerProfile, body);
      if (data.success && data.data?.customer) {
        setCustomerFromPayload(data.data.customer);
        await refreshCustomer();
        setMessage("Profile saved.");
      } else {
        setMessage(data.message || "Could not save.");
      }
    } catch (err: unknown) {
      const res = (err as { response?: { data?: { message?: string; errors?: unknown } } })?.response?.data;
      if (res?.errors) setErrors(mapApiErrors(res.errors));
      setMessage(res?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-green-dark sm:text-2xl">Update profile</h1>
        <p className="mt-1 text-sm text-muted">Change your name, email, or phone for this store.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-line bg-white p-4 sm:p-6">
        {message ? (
          <p
            className={`rounded-lg px-3 py-2 text-sm ${
              message.includes("saved") ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
            }`}
          >
            {message}
          </p>
        ) : null}

        <Field label="Full name" error={errors.full_name}>
          <input
            id="full_name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-green"
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-green"
          />
        </Field>
        <Field label="Phone" error={errors.phone}>
          <input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-green"
          />
        </Field>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-green-dark px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50 sm:w-auto"
        >
          {loading ? "Saving…" : "Save changes"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-green-dark">{label}</label>
      {children}
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
