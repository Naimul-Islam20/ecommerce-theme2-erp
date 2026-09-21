import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetail } from "@/components/ProductDetail";
import { PageHero } from "@/components/PageHero";
import { getCatalog, getProductByIdOrSlug } from "@/lib/api/catalog";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const { products } = await getCatalog();
  return products.slice(0, 40).map((product) => ({ id: product.slug || product.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductByIdOrSlug(id);
  return { title: product?.name ?? "Product", description: product?.description };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const [product, catalog] = await Promise.all([getProductByIdOrSlug(id), getCatalog()]);
  if (!product) notFound();
  const related = catalog.products.filter((item) => item.id !== product.id).slice(0, 4);

  return (
    <>
      <PageHero crumbs="Home / Shop / Product" title="পণ্যের বিস্তারিত" compact />
      <section className="py-8 sm:py-12">
        <div className="page-wrap">
          <ProductDetail product={product} />
        </div>
      </section>
      <section className="bg-cream-2 py-8 sm:py-12">
        <div className="page-wrap">
          <div className="mb-6">
            <div className="text-xs font-extrabold tracking-[2px] text-orange uppercase">You may also like</div>
            <h2 className="mt-1.5 font-serif text-[clamp(32px,4vw,50px)] leading-[1.1] text-green-dark">আরও দেশজ পণ্য</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
