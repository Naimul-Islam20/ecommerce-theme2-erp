import { resolveMediaUrl } from "@/lib/api/media";
import { resolveRealProductImage } from "@/lib/api/product-image";
import type { Product } from "@/lib/products";

function firstImage(item: Record<string, unknown>) {
  const images = item.images;
  if (Array.isArray(images) && images.length > 0) {
    const real = resolveRealProductImage(images[0]);
    if (real) return real;
  }
  const primary = item.primary_or_first_image;
  if (primary && typeof primary === "object") {
    const record = primary as Record<string, unknown>;
    const fromPrimary =
      resolveRealProductImage(record.full_image_url) ||
      resolveRealProductImage(record.thumbnail_url) ||
      resolveRealProductImage(record.image_url) ||
      resolveRealProductImage(record.image_path);
    if (fromPrimary) return fromPrimary;
  }
  return (
    resolveRealProductImage(item.image_url) ||
    resolveRealProductImage(item.image) ||
    ""
  );
}

function stockAvailable(item: Record<string, unknown>) {
  const stock = item.stock ?? item.product_stock;
  if (typeof stock === "boolean") return stock;
  if (typeof stock === "number") return stock > 0;
  if (stock && typeof stock === "object") {
    const record = stock as Record<string, unknown>;
    const qty = Number(record.quantity_in_stock ?? record.available_qty ?? record.qty ?? record.quantity ?? 0);
    return Number.isFinite(qty) ? qty > 0 : true;
  }
  return true;
}

function categoryName(item: Record<string, unknown>) {
  const info = item.category_info;
  if (info && typeof info === "object") {
    const record = info as Record<string, unknown>;
    const name = String(record.name || "").trim();
    if (name) return name;
  }
  const category = item.category;
  if (category && typeof category === "object") {
    const record = category as Record<string, unknown>;
    return String(record.name || record.slug || "");
  }
  if (typeof category === "string" && category.trim()) return category.trim();
  return "";
}

export function normalizeApiProduct(item: unknown): Product | null {
  if (!item || typeof item !== "object") return null;
  const record = item as Record<string, unknown>;
  const id = String(record.id || record.slug || "");
  const name = String(record.product_name || record.title || record.name || "");
  if (!id || !name) return null;

  const price = Number(record.price ?? record.display_price ?? (record.pricing as { unit_price?: number } | undefined)?.unit_price ?? 0);
  const image = firstImage(record);
  const slug = String(record.slug || id);
  const category = categoryName(record) || "সব পণ্য";
  const description = String(record.description || record.short_description || record.en || "");

  return {
    id,
    slug,
    name,
    en: String(record.en || record.product_name_en || name),
    price: Number.isFinite(price) ? price : 0,
    category,
    image,
    badge: String(record.badge || record.tag_label || (stockAvailable(record) ? "In stock" : "Out of stock")),
    rating: Number(record.rating || record.average_rating || 4.8) || 4.8,
    reviews: Number(record.reviews || record.reviews_count || 0) || 0,
    unit: String(record.unit || record.unit_label || "প্রতি ইউনিট"),
    stock: stockAvailable(record),
    description: description || name,
  };
}

export type ApiCategory = {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
};

export function normalizeApiCategory(item: unknown): ApiCategory | null {
  if (!item || typeof item !== "object") return null;
  const record = item as Record<string, unknown>;
  const name = String(record.name || "");
  const slug =
    String(record.slug || "") ||
    (name ? name.toLowerCase().trim().replace(/\s+/g, "-") : "");
  if (!name && !slug) return null;
  return {
    id: String(record.id || slug),
    name: name || slug,
    slug,
    image: resolveMediaUrl(record.cat_image || record.image) || null,
  };
}

export function unwrapList(body: unknown): unknown[] {
  if (!body) return [];
  if (Array.isArray(body)) return body;
  if (typeof body !== "object") return [];
  const record = body as Record<string, unknown>;
  const data = record.data ?? record.output ?? record;
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") {
    const nested = data as Record<string, unknown>;
    if (Array.isArray(nested.products)) return nested.products;
    if (Array.isArray(nested.categories)) return nested.categories;
    if (Array.isArray(nested.data)) return nested.data;
  }
  return [];
}
