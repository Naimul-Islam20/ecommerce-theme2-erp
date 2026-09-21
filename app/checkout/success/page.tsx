import Link from "next/link";

type Props = { searchParams: Promise<{ checkout_id?: string; ref?: string }> };

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  return (
    <section className="py-14 sm:py-20">
      <div className="page-wrap max-w-[560px] text-center">
        <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-[#e8efe5] text-2xl text-green">✓</div>
        <h1 className="font-serif text-[clamp(28px,5vw,42px)] text-green-dark">অর্ডার সফল</h1>
        <p className="mt-3 text-muted">আপনার অর্ডার গ্রহণ করা হয়েছে। শীঘ্রই যোগাযোগ করা হবে।</p>
        {params.ref ? <p className="mt-2 text-sm font-bold text-green-dark">Reference: {params.ref}</p> : null}
        {params.checkout_id ? <p className="mt-1 text-xs text-muted">Checkout ID: {params.checkout_id}</p> : null}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/shop" className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-orange px-6 py-3 font-bold text-white">
            Continue shopping
          </Link>
          <Link href="/" className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-green px-6 py-3 font-bold text-green">
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
