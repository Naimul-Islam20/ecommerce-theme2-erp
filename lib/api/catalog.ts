import { cache } from "react";
import { ApiLink } from "@/lib/api/apiLink";
import { normalizeApiCategory, normalizeApiProduct, unwrapList, type ApiCategory } from "@/lib/api/normalize";
import { ecommerceGet } from "@/lib/api/server";
import { products as fallbackProducts, type Product } from "@/lib/products";

async function fetchCatalogUncached() {
  const [productsBody, categoriesBody] = await Promise.all([
    ecommerceGet(ApiLink.ecommerceProducts, {}, 60),
    ecommerceGet(ApiLink.ecommerceProductCategories, {}, 120),
  ]);

  const apiProducts = unwrapList(productsBody)
    .map(normalizeApiProduct)
    .filter((item): item is Product => Boolean(item));

  const apiCategories = unwrapList(categoriesBody)
    .map(normalizeApiCategory)
    .filter((item): item is ApiCategory => Boolean(item));

  return {
    products: apiProducts.length ? apiProducts : fallbackProducts,
    categories: apiCategories,
    fromApi: apiProducts.length > 0,
  };
}

export const getCatalog = cache(fetchCatalogUncached);

export async function getProductByIdOrSlug(idOrSlug: string) {
  const catalog = await getCatalog();
  const local = catalog.products.find((product) => product.id === idOrSlug || product.slug === idOrSlug);
  if (local) return local;

  const body = await ecommerceGet(ApiLink.ecommerceProductBySlug, { slug: idOrSlug }, 45);
  const payload = body?.data ?? body?.output ?? body;
  const raw = (payload as { product?: unknown } | null)?.product ?? payload;
  return normalizeApiProduct(raw);
}

export async function getLandingPayload() {
  const body = await ecommerceGet(ApiLink.ecommerceLanding, {}, 120);
  return body?.data ?? body?.output ?? null;
}

export async function getFeaturedProducts(limit = 8) {
  const catalog = await getCatalog();
  const tagged = await ecommerceGet(ApiLink.ecommerceProductsByTags("Featured"), {}, 60);
  const featured = unwrapList(tagged)
    .map(normalizeApiProduct)
    .filter((item): item is Product => Boolean(item));
  if (featured.length) return featured.slice(0, limit);
  return catalog.products.slice(0, limit);
}
