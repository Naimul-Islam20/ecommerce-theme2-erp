import Link from "next/link";

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  compact,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: string;
  compact?: boolean;
}) {
  return (
    <section className={`bg-[#0a3e31] text-white ${compact ? "py-7 sm:py-9" : "py-10 sm:py-14"}`}>
      <div className="page-wrap">
        {crumbs ? <div className="mb-2 text-[12px] text-white/70 sm:text-[13px]">{crumbs}</div> : null}
        {eyebrow ? (
          <div className="text-[11px] font-extrabold tracking-[1.6px] text-[#f1d58f] uppercase sm:text-[13px] sm:tracking-[2.2px]">
            {eyebrow}
          </div>
        ) : null}
        <h1
          className={`mt-2.5 font-serif leading-[1.08] ${
            compact
              ? "mb-0 text-[clamp(22px,5.5vw,28px)] sm:text-[clamp(30px,3.5vw,40px)]"
              : "mb-3 text-[clamp(28px,7vw,42px)] sm:mb-[18px] sm:text-[clamp(40px,5.5vw,64px)] lg:text-[clamp(46px,6vw,74px)]"
          }`}
        >
          {title}
        </h1>
        {description ? (
          <p className="m-0 max-w-[760px] text-[15px] leading-relaxed text-[#dce9e3] sm:text-lg">{description}</p>
        ) : null}
      </div>
    </section>
  );
}

export function SectionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-bold whitespace-nowrap text-green hover:text-orange">
      {children}
    </Link>
  );
}
