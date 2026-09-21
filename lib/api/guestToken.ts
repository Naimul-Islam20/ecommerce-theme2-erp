export const GUEST_TOKEN_KEY = "ecommerce_guest_token";

export function getOrCreateGuestToken() {
  if (typeof window === "undefined") return "";
  let token = localStorage.getItem(GUEST_TOKEN_KEY);
  if (!token) {
    token =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `guest-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(GUEST_TOKEN_KEY, token);
  }
  return token;
}
