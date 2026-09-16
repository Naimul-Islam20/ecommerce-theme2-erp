import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-[#0a3e31] py-24 text-center text-white">
      <div className="page-wrap">
        <h1 className="font-serif text-5xl">পেজটি পাওয়া যায়নি</h1>
        <p className="mt-4 text-[#dce9e3]">এই লিংকটি আর কাজ করছে না। দোকানে ফিরে যান।</p>
        <Link href="/" className="mt-8 inline-flex min-h-[50px] items-center justify-center rounded-full bg-orange px-6 py-3.5 font-bold">
          Home →
        </Link>
      </div>
    </section>
  );
}
