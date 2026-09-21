import Link from "next/link";

export default function CheckoutFailedPage() {
  return (
    <section className="py-14 sm:py-20">
      <div className="page-wrap max-w-[560px] text-center">
        <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-[#fdecea] text-2xl text-[#a33]">!</div>
        <h1 className="font-serif text-[clamp(28px,5vw,42px)] text-green-dark">পেমেন্ট ব্যর্থ</h1>
        <p className="mt-3 text-muted">পেমেন্ট সম্পন্ন হয়নি। আবার চেষ্টা করুন অথবা অন্য পদ্ধতি বেছে নিন।</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/checkout" className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-orange px-6 py-3 font-bold text-white">
            Back to checkout
          </Link>
          <Link href="/shop" className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-green px-6 py-3 font-bold text-green">
            Shop
          </Link>
        </div>
      </div>
    </section>
  );
}
