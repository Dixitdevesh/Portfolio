/**
 * NEXUS // OPERATOR — Client-side Cache Layer
 *
 * Provides time-bounded localStorage caching for external provider data so the
 * portfolio remains resilient when APIs are rate-limited or unreachable.
 * All data is stored locally only; nothing is transmitted to third-party
 * servers beyond the direct public API calls each provider makes.
 */

const CACHE_PREFIX = 'nexus_portal_';

interface CacheEntry<T> {
  value: T;
  expiry: number;
}

export function cacheGet<T>(key: string): T | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!raw) return null;
    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() > entry.expiry) {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`);
      return null;
    }
    return entry.value;
  } catch {
    return null;
  }
}

export function cacheSet<T>(key: string, value: T, ttlMs: number): void {
  if (typeof localStorage === 'undefined') return;
  try {
    const entry: CacheEntry<T> = { value, expiry: Date.now() + ttlMs };
    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(entry));
  } catch {
    // Quota exceeded or private mode — silently skip caching
  }
}

export function cacheClear(key?: string): void {
  if (typeof localStorage === 'undefined') return;
  if (key) {
    localStorage.removeItem(`${CACHE_PREFIX}${key}`);
    return;
  }
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(CACHE_PREFIX)) keys.push(k);
  }
  keys.forEach((k) => localStorage.removeItem(k));
}