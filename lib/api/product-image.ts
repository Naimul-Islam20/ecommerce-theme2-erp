import { resolveMediaUrl } from "@/lib/api/media";

const PLACEHOLDER_PATHS = new Set([
  "/file.svg",
  "/images/placeholder.png",
]);

export function isRealProductImageSrc(src: unknown) {
  if (src == null) return false;
  const value = String(src).trim();
  if (!value) return false;
  try {
    const path = value.startsWith("http") ? new URL(value).pathname : value.split("?")[0];
    if (PLACEHOLDER_PATHS.has(path) || PLACEHOLDER_PATHS.has(value)) return false;
    if (path.endsWith("/images/placeholder.png") || path.endsWith("/file.svg")) return false;
  } catch {
    if (PLACEHOLDER_PATHS.has(value)) return false;
  }
  return true;
}

export function isMissingProductImageSrc(src: unknown) {
  return !isRealProductImageSrc(src);
}

export function resolveRealProductImage(src: unknown) {
  const resolved = resolveMediaUrl(src);
  if (!resolved || isMissingProductImageSrc(resolved)) return "";
  return resolved;
}
