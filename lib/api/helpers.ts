export function mapApiValidationErrors(raw: unknown) {
  const out: Record<string, string> = {};
  if (!raw || typeof raw !== "object") return out;
  for (const [key, msgs] of Object.entries(raw as Record<string, unknown>)) {
    out[key] = Array.isArray(msgs) ? String(msgs[0]) : String(msgs);
  }
  return out;
}

export function normalizeLoginPhone(raw: string) {
  let value = String(raw).trim().replace(/[\s-]/g, "");
  if (value.startsWith("+880")) value = `0${value.slice(4)}`;
  else if (value.startsWith("880") && value.length >= 12) value = `0${value.slice(3)}`;
  return value;
}

export function roundMoney(value: number) {
  return Math.round((Number(value) || 0) * 100) / 100;
}

export function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
