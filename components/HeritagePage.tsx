import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { NoApiNote } from "@/components/NoApiNote";
import { heritageIcons } from "@/components/Icons";

export function HeritagePage({
  eyebrow,
  title,
  description,
  kicker,
  heading,
  intro,
  cta,
  cards,
  bandTitle,
  bandText,
}: {
  eyebrow: string;
  title: string;
  description: string;
  kicker: string;
  heading: string;
  intro: string;
  cta: string;
  cards: readonly string[];
  bandTitle: string;
  bandText: string;
}) {
  return (
    <>
      <div className="page-wrap pt-4">
        <NoApiNote />
      </div>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <section className="py-8 sm:py-12">
        <div className="page-wrap">
          <div className="mb-[42px] grid items-end gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-[70px]">
            <div>
              <div className="text-xs font-extrabold tracking-[2px] text-orange uppercase">{kicker}</div>
              <h2 className="mt-2 font-serif text-[clamp(34px,4vw,52px)] leading-[1.08] text-green-dark">{heading}</h2>
            </div>
            <div>
              <p className="max-w-[680px] leading-loose text-muted">{intro}</p>
              <Link href="/shop" className="mt-5 inline-flex min-h-[50px] items-center justify-center rounded-full bg-orange px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(239,111,69,.25)]">
                {cta}
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cards.map((card, index) => {
              const Icon = heritageIcons[index % heritageIcons.length];
              return (
                <article key={card} className="relative min-h-[200px] rounded-[22px] border border-[#d9dfd1] bg-[#fffdf8] p-5 sm:min-h-[230px] sm:p-[25px] lg:min-h-[270px]">
                  <span className="absolute top-[18px] right-5 text-[11px] font-black text-[#a3ada5]">0{index + 1}</span>
                  <div className="mb-8 grid h-[54px] w-[54px] place-items-center rounded-full bg-green-dark text-white sm:mb-[35px] lg:mb-[55px]">
                    <Icon className="h-[22px] w-[22px]" />
                  </div>
                  <h3 className="mb-2.5 font-serif text-[20px] text-green-dark sm:text-[22px]">{card}</h3>
                  <p className="m-0 text-sm leading-relaxed text-muted">Discover the people, practices and local knowledge behind this part of Deshojo Bazar.</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="bg-[#e9eee6] py-8 sm:py-12">
        <div className="page-wrap grid items-center gap-7 lg:grid-cols-2 lg:gap-[70px]">
          <div>
            <div className="text-xs font-extrabold tracking-[2px] text-orange uppercase">Deshojo Bazar</div>
            <h2 className="mt-2 font-serif text-[clamp(34px,4vw,50px)] leading-[1.08] text-green-dark">{bandTitle}</h2>
          </div>
          <p className="m-0 text-[17px] leading-loose text-[#526058]">{bandText}</p>
        </div>
      </section>
    </>
  );
}
