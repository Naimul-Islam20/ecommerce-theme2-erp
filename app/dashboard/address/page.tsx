"use client";

import { FormEvent, useState } from "react";
import instance from "@/lib/api/axios";
import { ApiLink } from "@/lib/api/apiLink";
import { useCustomerAuth } from "@/lib/api/auth";
import { mapApiErrors } from "@/lib/dashboard";

function addrFromCustomer(customer: ReturnType<typeof useCustomerAuth>["customer"]) {
  const a = customer?.default_address;
  return {
    line1: a?.line1 || "",
    line2: a?.line2 || "",
    city: a?.city || "",
    state: a?.state || "",
    postal_code: a?.postal_code || "",
    country: a?.country || "",
  };
}

export default function DashboardAddressPage() {
  const { customer, refreshCustomer, setCustomerFromPayload } = useCustomerAuth();
  const [form, setForm] = useState(() => addrFromCustomer(customer));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function setField(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    setErrors({});
    setLoading(true);
    try {
      const default_address = {
        line1: form.line1.trim() || null,
        line2: form.line2.trim() || null,
        city: form.city.trim() || null,
        state: form.state.trim() || null,
        postal_code: form.postal_code.trim() || null,
        country: form.country.trim() || null,
      };
      const { data } = await instance.patch(ApiLink.ecommerceCustomerProfile, { default_address });
      if (data.success && data.data?.customer) {
        setCustomerFromPayload(data.data.customer);
        await refreshCustomer();
        setMessage("Address saved.");
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

  const fields: [keyof typeof form, string][] = [
    ["line1", "Address line 1"],
    ["line2", "Address line 2"],
    ["city", "City"],
    ["state", "State / region"],
    ["postal_code", "Postal code"],
    ["country", "Country"],
  ];

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-green-dark sm:text-2xl">Default address</h1>
        <p className="mt-1 text-sm text-muted">
          Used as a reference for checkout. You can still enter a different address when ordering.
        </p>
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

        {fields.map(([key, label]) => (
          <div key={key}>
            <label className="mb-1 block text-sm font-medium text-green-dark">{label}</label>
            <input
              id={key}
              value={form[key]}
              onChange={(e) => setField(key, e.target.value)}
              className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-green"
            />
            {errors[key] ? <p className="mt-1 text-xs text-red-600">{errors[key]}</p> : null}
          </div>
        ))}

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-green-dark px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "Saving…" : "Save address"}
          </button>
        </div>
      </form>
    </div>
  );
}
