import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { SectionLink } from "@/components/PageHero";
import { VideoShop } from "@/components/VideoShop";
import { IconLeaf, IconPhone, IconShield, IconTruck } from "@/components/Icons";
import { products, shopCategories, shopHref } from "@/lib/products";

const concerns = [
  { cat: "চাল", image: "/img/hero-rice.webp", alt: "Daily staples", title: "দৈনন্দিন স্ট্যাপলস", text: "চাল ও ঘরের নিয়মিত প্রয়োজনীয় খাবার" },
  { cat: "তেল", image: "/img/mustard-oil-5l.webp", alt: "Cooking oils", title: "বিশুদ্ধ রান্নার তেল", text: "ঘানি ভাঙ্গা ও দেশীয় রান্নার তেল" },
  { cat: "মধু", image: "/img/honey.webp", alt: "Natural sweetness", title: "প্রাকৃতিক মিষ্টতা", text: "মধু ও ঐতিহ্যবাহী মিষ্টি উপকরণ" },
  { cat: "মাংস", image: "/img/chicken.webp", alt: "Family protein", title: "পরিবারের প্রোটিন", text: "দেশী মুরগি, ডিম ও নির্বাচিত প্রোটিন" },
  { cat: "পিঠা", image: "/img/pitha.webp", alt: "Traditional foods", title: "ঐতিহ্যের স্বাদ", text: "পিঠা ও হারিয়ে যাওয়া আঞ্চলিক খাবার" },
  { cat: "ঘি", image: "/img/ghee.webp", alt: "Special cooking", title: "বিশেষ দিনের রান্না", text: "ঘি, সুগন্ধি চাল ও উৎসবের টেবিল" },
];

const beyond = [
  { n: "01", icon: "◌", title: "উৎসের গল্প", text: "পণ্যের অঞ্চল, প্রস্তুতি ও স্থানীয় প্রেক্ষাপটকে সামনে আনা।", href: "/#farm-life", label: "Farm life →" },
  { n: "02", icon: "✦", title: "খাদ্যঐতিহ্য", text: "হারিয়ে যেতে থাকা আঞ্চলিক স্বাদ ও পুরোনো খাবারের স্মৃতি ধরে রাখা।", href: shopHref("পিঠা"), label: "Explore heritage →" },
  { n: "03", icon: "⌂", title: "ঘরের রান্না", text: "দেশজ উপকরণকে আধুনিক পরিবারের রান্নায় সহজভাবে ফিরিয়ে আনা।", href: "/shop", label: "Shop pantry →" },
  { n: "04", icon: "↝", title: "মানুষের সংযোগ", text: "উৎপাদক থেকে ক্রেতা—খাবারের পুরো যাত্রায় আস্থা ও সম্পর্ক গড়া।", href: "/#story", label: "Our story →" },
];

const reviews = [
  { text: "প্যাকেজিং পরিষ্কার ছিল, পণ্যও ভালো অবস্থায় পেয়েছি। দেশি খাবারের জন্য সুন্দর একটা উদ্যোগ।", name: "রাফি", place: "ঢাকা" },
  { text: "ঘি আর সরিষার তেলের স্বাদ বেশ ভালো। ওয়েবসাইটে অর্ডার করা সহজ হলে নিয়মিত কেনা আরও সুবিধা হবে।", name: "নুসরাত", place: "ঢাকা" },
  { text: "পিঠা ও দইয়ের মতো আঞ্চলিক পণ্য এক জায়গায় পাওয়া—এটাই সবচেয়ে ভালো লেগেছে।", name: "সাদমান", place: "নারায়ণগঞ্জ" },
];

const trustItems = [
  { icon: IconLeaf, title: "বিশ্বস্ত উৎস", text: "নির্বাচিত দেশজ পণ্য" },
  { icon: IconTruck, title: "হোম ডেলিভারি", text: "নির্বাচিত এলাকায়" },
  { icon: IconShield, title: "মান যাচাই", text: "অর্ডারের আগে বাছাই" },
  { icon: IconPhone, title: "কাস্টমার সাপোর্ট", text: "09678148148" },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="border-b border-line bg-cream">
        <div className="page-wrap grid grid-cols-2 lg:grid-cols-4">
          {trustItems.map(({ icon: Icon, title, text }, index) => (
            <div
              key={title}
              className={`flex items-center justify-center gap-3 border-line px-[18px] py-[22px] max-lg:border-r max-lg:odd:border-r-0 max-lg:even:border-r lg:border-r ${index < 2 ? "max-lg:border-b" : ""} last:border-r-0`}
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#e8efe5] text-green-dark">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <strong className="block text-sm">{title}</strong>
                <span className="text-xs text-muted">{text}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 sm:py-[78px]">
        <div className="page-wrap">
          <div className="mb-[34px] flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="text-xs font-extrabold tracking-[2px] text-orange uppercase">Shop by category</div>
              <h2 className="mt-1.5 font-serif text-[clamp(32px,4vw,50px)] leading-[1.1] text-green-dark">আপনার ঘরের প্রয়োজন</h2>
              <p className="mt-3 max-w-[560px] text-muted">দৈনন্দিন চাল-ডাল থেকে ঘি, মধু, তেল, পিঠা ও দেশি খাবার—এক জায়গায়।</p>
            </div>
            <SectionLink href="/shop">সব ক্যাটাগরি →</SectionLink>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-[18px] lg:grid-cols-7">
            {shopCategories.map((category) => (
              <Link key={category.label} href={shopHref(category.label)} className="group text-center">
                <div className="grid aspect-square place-items-center overflow-hidden rounded-full border border-[#e7dcc0] bg-[#f3ead0] text-[30px] transition group-hover:-translate-y-1 group-hover:shadow-lift sm:text-[42px]">
                  {category.emoji}
                </div>
                <span className="mt-2.5 block text-sm font-bold">{category.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="concerns" className="bg-[#f1ead7] py-14 sm:py-[78px]">
        <div className="page-wrap">
          <div className="mb-[34px] flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="text-xs font-extrabold tracking-[2px] text-orange uppercase">Shop by concerns</div>
              <h2 className="mt-1.5 font-serif text-[clamp(32px,4vw,50px)] leading-[1.1] text-green-dark">প্রয়োজন অনুযায়ী বেছে নিন</h2>
              <p className="mt-3 max-w-[560px] text-muted">আপনার রান্না, পরিবার ও খাবারের অভ্যাস অনুযায়ী দ্রুত সঠিক সংগ্রহে পৌঁছে যান।</p>
            </div>
            <SectionLink href="/shop">Explore all →</SectionLink>
          </div>
          <div className="-mr-3 flex snap-x gap-[18px] overflow-x-auto pb-2 sm:mr-0 sm:grid sm:grid-cols-2 sm:overflow-visible xl:grid-cols-3">
            {concerns.map((item, index) => (
              <Link key={item.title} href={shopHref(item.cat)} className="grid min-h-[150px] min-w-[82vw] snap-start grid-cols-[120px_1fr] overflow-hidden rounded-[22px] border border-[#dfd5ba] bg-[#fffdf7] transition hover:-translate-y-1 hover:shadow-lift sm:min-w-0 sm:grid-cols-[132px_1fr]">
                <div className="overflow-hidden">
                  <img src={item.image} alt={item.alt} className="h-full w-full object-cover transition duration-300 hover:scale-[1.04]" />
                </div>
                <div className="flex flex-col items-start justify-center px-5 py-3.5">
                  <span className="text-[11px] font-black tracking-[1px] text-orange">0{index + 1}</span>
                  <h3 className="my-1 font-serif text-[21px] leading-tight text-green-dark">{item.title}</h3>
                  <p className="mb-3 text-[13px] leading-snug text-muted">{item.text}</p>
                  <b className="text-xs font-bold text-green">Shop now →</b>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-2 py-14 sm:py-[78px]">
        <div className="page-wrap">
          <div className="mb-[34px] flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="text-xs font-extrabold tracking-[2px] text-orange uppercase">Most loved</div>
              <h2 className="mt-1.5 font-serif text-[clamp(32px,4vw,50px)] leading-[1.1] text-green-dark">জনপ্রিয় দেশজ পণ্য</h2>
            </div>
            <SectionLink href="/shop">View all →</SectionLink>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-6 xl:grid-cols-4">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section id="videos" className="overflow-hidden bg-[#0a3e31] py-14 text-white sm:py-[78px]">
        <div className="page-wrap">
          <div className="mb-[34px] flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="text-xs font-extrabold tracking-[2px] text-[#efb85a] uppercase">Watch & shop</div>
              <h2 className="mt-1.5 font-serif text-[clamp(32px,4vw,50px)] leading-[1.1] text-white">দেখুন, জানুন, কার্টে নিন</h2>
              <p className="mt-3 max-w-[560px] text-[#c7d8d1]">পণ্যের গল্পকে ছোট ভিডিওতে দেখুন এবং ভিডিও থেকেই সরাসরি কার্টে যোগ করুন।</p>
            </div>
            <Link href="/shop" className="font-bold whitespace-nowrap text-[#f5d59c] hover:text-white">
              Shop all products →
            </Link>
          </div>
          <VideoShop />
        </div>
      </section>

      <section id="story" className="py-14 sm:py-[78px]">
        <div className="page-wrap">
          <div className="grid overflow-hidden rounded-[28px] bg-green-dark text-white shadow-lift lg:grid-cols-[1.06fr_0.94fr]">
            <div className="min-h-[430px] bg-cover bg-center sm:min-h-[530px]" style={{ backgroundImage: "url('/img/hero-farm.webp')" }} />
            <div className="flex flex-col justify-center px-6 py-[34px] sm:p-[62px]">
              <div className="text-xs font-extrabold tracking-[2px] text-orange uppercase">Why Deshojo</div>
              <h2 className="mt-2 font-serif text-[clamp(32px,4vw,50px)] leading-[1.1] text-white">মাটি থেকে আপনার টেবিলে</h2>
              <p className="text-base text-[#dde9e3]">
                আমাদের লক্ষ্য শুধু পণ্য বিক্রি নয়—বাংলার স্থানীয় উৎপাদক, আঞ্চলিক খাবার ও হারিয়ে যেতে থাকা স্বাদকে আধুনিক ই-কমার্সের মাধ্যমে মানুষের কাছে পৌঁছে দেওয়া।
              </p>
              <div className="my-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {[
                  ["Source-first", "পণ্যের উৎসকে গুরুত্ব"],
                  ["Fresh selection", "স্টকভিত্তিক বাছাই"],
                  ["Local heritage", "দেশীয় স্বাদ ও ঐতিহ্য"],
                  ["Customer care", "অর্ডার সহায়তা সহজ"],
                ].map(([title, text]) => (
                  <div key={title} className="border-t border-white/20 pt-3">
                    <strong className="text-[17px]">{title}</strong>
                    <small className="mt-1 block text-[#c9d9d2]">{text}</small>
                  </div>
                ))}
              </div>
              <Link href="/shop" className="inline-flex min-h-[50px] w-fit items-center justify-center rounded-full bg-orange px-6 py-3.5 font-bold text-white">
                দেশজ বাজার ঘুরে দেখুন
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="farm-life" className="bg-paper py-14 sm:py-[78px]">
        <div className="page-wrap">
          <div className="mb-[34px] grid items-end gap-4 lg:grid-cols-[1fr_0.9fr] lg:gap-[60px]">
            <div>
              <div className="text-xs font-extrabold tracking-[2px] text-orange uppercase">Farm life</div>
              <h2 className="mt-1.5 font-serif text-[clamp(32px,4vw,50px)] leading-[1.1] text-green-dark">মাঠের জীবন থেকে খাবারের গল্প</h2>
            </div>
            <p className="text-muted">পণ্য কোথা থেকে আসে, কীভাবে তৈরি হয় এবং কোন মানুষগুলোর শ্রমে আমাদের ঘরের স্বাদ তৈরি হয়—সেই গল্পগুলোকে সামনে আনা Deshojo-র অংশ।</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
            <article className="grid overflow-hidden rounded-[26px] border border-[#e4ddcf] bg-white lg:grid-cols-[1.08fr_0.92fr]">
              <div className="relative min-h-[320px] bg-cover bg-center sm:min-h-[470px]" style={{ backgroundImage: "url('/img/hero-farm.webp')" }}>
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,37,27,.55),transparent_55%)]" />
                <span className="absolute bottom-[18px] left-5 z-[2] text-[11px] font-extrabold tracking-[1.2px] text-white uppercase">Field Journal 01</span>
              </div>
              <div className="flex flex-col justify-center px-6 py-[30px] sm:px-[34px] sm:py-[42px]">
                <div className="text-xs font-extrabold tracking-[2px] text-orange uppercase">Village stories</div>
                <h3 className="mt-[7px] mb-3.5 font-serif text-[27px] leading-tight text-green-dark sm:text-[31px]">মাটি, মৌসুম আর মানুষের হাতে শুরু</h3>
                <p className="mb-[22px] text-muted">ফসলের মৌসুম, স্থানীয় উৎপাদক ও আঞ্চলিক খাদ্যসংস্কৃতিকে আমরা পণ্যের পেছনের আসল গল্প হিসেবে দেখি।</p>
                <SectionLink href="/#beyond">Discover our approach →</SectionLink>
              </div>
            </article>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <article className="grid min-h-[190px] grid-cols-[42%_1fr] overflow-hidden rounded-[22px] bg-[#eef2e6] sm:min-h-[225px]">
                <img src="/img/hero-rice.webp" alt="Rice field and grains" className="h-full w-full object-cover" />
                <div className="flex flex-col justify-center px-5 py-6">
                  <small className="font-extrabold text-orange">ধান থেকে চাল</small>
                  <h3 className="my-1 font-serif text-[21px] leading-tight text-green-dark">শস্যের পরিচিত ঘ্রাণ</h3>
                  <p className="m-0 text-[13px] text-muted">স্থানীয় ধানের বৈচিত্র্যকে শহরের টেবিলে ফিরিয়ে আনা।</p>
                </div>
              </article>
              <article className="grid min-h-[190px] grid-cols-[42%_1fr] overflow-hidden rounded-[22px] bg-[#eef2e6] sm:min-h-[225px]">
                <img src="/img/mustard-oil-5l.webp" alt="Mustard oil" className="h-full w-full object-cover" />
                <div className="flex flex-col justify-center px-5 py-6">
                  <small className="font-extrabold text-orange">কারিগরি প্রস্তুতি</small>
                  <h3 className="my-1 font-serif text-[21px] leading-tight text-green-dark">ঘানি ভাঙ্গা তেলের স্বাদ</h3>
                  <p className="m-0 text-[13px] text-muted">বাংলার রান্নার পরিচিত সুবাসকে সহজে পৌঁছে দেওয়া।</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream-2 py-14 sm:py-[78px]">
        <div className="page-wrap grid gap-[22px] lg:grid-cols-[1.35fr_0.65fr]">
          <Link href={shopHref("চাল")} className="relative min-h-[330px] overflow-hidden rounded-3xl text-white sm:min-h-[400px]" style={{ backgroundImage: "url('/img/hero-rice.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,34,25,.74),rgba(5,34,25,.05)_65%)]" />
            <div className="absolute right-7 bottom-7 left-7 z-[2]">
              <div className="text-xs font-extrabold tracking-[2px] text-gold uppercase">Heritage grains</div>
              <h3 className="my-1 font-serif text-[30px]">বিশুদ্ধ চাল, পরিচিত ঘ্রাণ</h3>
              <p className="m-0 text-[#eef5f1]">প্রতিদিনের ভাত থেকে উৎসবের পোলাও—পছন্দ করুন আপনার চাল।</p>
            </div>
          </Link>
          <Link href={shopHref("পিঠা")} className="relative min-h-[330px] overflow-hidden rounded-3xl text-white sm:min-h-[400px]" style={{ backgroundImage: "url('/img/pitha.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,34,25,.74),rgba(5,34,25,.05)_65%)]" />
            <div className="absolute right-7 bottom-7 left-7 z-[2]">
              <div className="text-xs font-extrabold tracking-[2px] text-gold uppercase">Taste of childhood</div>
              <h3 className="my-1 font-serif text-[30px]">পিঠায় ফিরে আসুক শৈশব</h3>
              <p className="m-0 text-[#eef5f1]">দেশজ স্বাদের ঐতিহ্যবাহী সংগ্রহ।</p>
            </div>
          </Link>
        </div>
      </section>

      <section id="beyond" className="bg-[#e4ecdf] py-14 sm:py-[78px]">
        <div className="page-wrap">
          <div className="mb-[38px] grid items-end gap-4 lg:grid-cols-2 lg:gap-[70px]">
            <div>
              <div className="text-xs font-extrabold tracking-[2px] text-orange uppercase">Beyond our products</div>
              <h2 className="mt-1.5 font-serif text-[clamp(32px,4vw,50px)] leading-[1.1] text-green-dark">পণ্যের বাইরেও Deshojo</h2>
            </div>
            <p className="mb-1.5 max-w-[570px] text-[#536159]">
              একটি অর্ডারের মূল্য শুধু প্যাকেটের ভেতরের খাবারে নয়। স্থানীয় খাদ্যঐতিহ্যকে দৃশ্যমান করা, উৎপাদকদের গল্প বলা এবং মানুষকে উৎস সম্পর্কে জানানোও আমাদের ব্র্যান্ড অভিজ্ঞতার অংশ।
            </p>
          </div>
          <div className="-mr-3 flex snap-x gap-4 overflow-x-auto pb-2 sm:mr-0 sm:grid sm:grid-cols-2 sm:overflow-visible xl:grid-cols-4">
            {beyond.map((card) => (
              <article key={card.n} className="relative flex min-h-[310px] min-w-[78vw] snap-start flex-col rounded-[22px] border border-[#d2dccb] bg-[#fffdf8] p-6 transition hover:-translate-y-1 hover:shadow-lift sm:min-w-0">
                <span className="absolute top-5 right-5 text-[11px] font-extrabold text-[#9da99f]">{card.n}</span>
                <div className="mb-10 grid h-[54px] w-[54px] place-items-center rounded-full bg-green-dark text-[22px] text-white">{card.icon}</div>
                <h3 className="mb-2 font-serif text-2xl text-green-dark">{card.title}</h3>
                <p className="mb-[18px] text-sm text-muted">{card.text}</p>
                <Link href={card.href} className="mt-auto text-[13px] font-extrabold text-green">{card.label}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a3e31] py-14 text-white sm:py-[78px]">
        <div className="page-wrap grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="text-xs font-extrabold tracking-[2px] text-orange uppercase">Climate & community impact</div>
            <h2 className="mt-1.5 max-w-[820px] font-serif text-[clamp(32px,4vw,50px)] leading-[1.1] text-white">
              In Tahirpur Haor, we are connecting Murta cultivation, Shital Pati craftsmanship and climate-resilient livelihoods.
            </h2>
            <p className="mt-3 max-w-[760px] text-[#c8d9d2]">
              Our community programme supports local skills and enterprise while exploring the role of Murta in erosion resilience, wetland health and biodiversity. The initiative has received support from the Adaptation Research Alliance (ARA).
            </p>
            <Link href="/impact" className="mt-6 inline-flex min-h-[50px] items-center justify-center rounded-full bg-orange px-6 py-3.5 font-bold text-white">
              Explore the Tahirpur initiative →
            </Link>
          </div>
          <div className="hidden aspect-square w-[180px] flex-col items-center justify-center rounded-full border border-white/25 shadow-[inset_0_0_0_18px_rgba(255,255,255,.04)] lg:flex">
            <span className="text-[10px] tracking-[1.5px] text-[#f1d58f] uppercase">Field programme</span>
            <b className="font-serif text-[34px]">HAOR</b>
            <span className="text-[10px] tracking-[1.5px] text-[#f1d58f] uppercase">Tahirpur • Sunamganj</span>
          </div>
        </div>
      </section>

      <section className="bg-[#e7efe8] py-14 text-center sm:py-[78px]">
        <div className="page-wrap">
          <p className="mx-auto max-w-[900px] font-serif text-[clamp(28px,4vw,47px)] leading-snug text-green-dark">
            “শুধু পণ্য নয়—বাংলার মাটি, মানুষের শ্রম আর ঘরের পরিচিত স্বাদকে আমরা পৌঁছে দিতে চাই প্রতিটি অর্ডারে।”
          </p>
          <div className="mt-[18px] font-extrabold text-green">— Deshojo Bazar</div>
        </div>
      </section>

      <section id="reviews" className="py-14 sm:py-[78px]">
        <div className="page-wrap">
          <div className="mb-[34px]">
            <div className="text-xs font-extrabold tracking-[2px] text-orange uppercase">Customer love</div>
            <h2 className="mt-1.5 font-serif text-[clamp(32px,4vw,50px)] leading-[1.1] text-green-dark">মানুষ কী বলছেন</h2>
          </div>
          <div className="grid gap-[22px] sm:grid-cols-3">
            {reviews.map((review) => (
              <article key={review.name} className="rounded-[18px] border border-[#e4ddcf] bg-white p-7">
                <div className="tracking-wide text-[#b47b05]">★★★★★</div>
                <p className="text-[#45544a]">{review.text}</p>
                <strong className="mt-4 block">{review.name}</strong>
                <small className="text-muted">{review.place}</small>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
