import Link from "next/link";

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: string;
}) {
  return (
    <section className="bg-[#0a3e31] py-[62px] text-white sm:py-[86px] sm:pb-[78px]">
      <div className="page-wrap">
        {crumbs ? <div className="mb-2 text-[13px] text-white/70">{crumbs}</div> : null}
        {eyebrow ? <div className="text-[13px] font-extrabold tracking-[2.2px] text-[#f1d58f] uppercase">{eyebrow}</div> : null}
        <h1 className="mt-2.5 mb-[18px] font-serif text-[42px] leading-[1.02] sm:text-[clamp(46px,6vw,74px)]">{title}</h1>
        {description ? <p className="m-0 max-w-[760px] text-base leading-relaxed text-[#dce9e3] sm:text-lg">{description}</p> : null}
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
