export function extractMediaUrlCandidate(value: unknown): string | null {
  if (value == null || value === "") return null;
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed || null;
  }
  if (typeof value === "object" && !Array.isArray(value)) {
    const record = value as Record<string, unknown>;
    for (const key of ["full_image_url", "full_url", "url", "image_url", "thumbnail_url", "image_path", "path", "file_path", "src", "logo"]) {
      const next = record[key];
      if (typeof next === "string" && next.trim()) return next.trim();
    }
  }
  return null;
}

export function resolveMediaUrl(path: unknown) {
  const trimmed = extractMediaUrlCandidate(path);
  if (!trimmed) return null;
  const base = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(/\/api\/?$/, "");
  if (/^https?:\/\//i.test(trimmed)) {
    if (base) {
      try {
        const incoming = new URL(trimmed);
        const backend = new URL(base);
        const isLocalHost = ["localhost", "127.0.0.1"].includes(incoming.hostname);
        if (isLocalHost && incoming.hostname !== backend.hostname) {
          return `${backend.origin}${incoming.pathname}${incoming.search}`;
        }
      } catch {
        return trimmed;
      }
    }
    return trimmed;
  }
  if (!base) return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  const normalized = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return `${base.replace(/\/$/, "")}${normalized}`;
}
