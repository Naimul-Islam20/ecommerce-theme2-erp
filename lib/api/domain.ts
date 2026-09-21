export function normalizeEcommerceDomainName(raw: unknown) {
  let value = String(raw ?? "").trim();
  if (!value) return "";
  try {
    if (/^https?:\/\//i.test(value)) {
      value = new URL(value).hostname;
    } else if (value.includes("/")) {
      value = value.split("/").filter(Boolean)[0] || value;
    }
  } catch {
    value = value.replace(/^https?:\/\//i, "").split("/")[0] || value;
  }
  return value.split(":")[0].replace(/^www\./i, "");
}
