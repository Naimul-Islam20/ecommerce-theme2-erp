const TOKEN_KEYS = ["token", "access_token"] as const;

export function getToken() {
  if (typeof window === "undefined") return null;
  for (const key of TOKEN_KEYS) {
    const value = window.localStorage.getItem(key);
    if (value) return value;
  }
  return null;
}

export function removeToken() {
  if (typeof window === "undefined") return;
  for (const key of TOKEN_KEYS) {
    window.localStorage.removeItem(key);
  }
}

export function setToken(token: string, key: (typeof TOKEN_KEYS)[number] = "token") {
  if (typeof window === "undefined" || token == null) return;
  window.localStorage.setItem(key, token);
}
