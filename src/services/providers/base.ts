/**
 * NEXUS // OPERATOR — Provider Base Class
 *
 * Every external data provider extends this base. Providers are fully
 * independent: a failure in one provider never breaks another or the UI.
 */

export interface ProviderHealth {
  name: string;
  online: boolean;
  lastChecked: number;
  error?: string;
}

export interface ProviderOptions {
  /** Time-to-live for cached data in milliseconds (default 15 minutes) */
  ttlMs?: number;
  /** Whether to throw on network failure or degrade gracefully */
  failSilently?: boolean;
}

import { cacheGet, cacheSet } from '../cache';

export abstract class BaseProvider<TData, TConfig = unknown> {
  protected readonly name: string;
  protected readonly options: Required<ProviderOptions>;
  protected config: TConfig | null = null;

  constructor(name: string, options: ProviderOptions = {}) {
    this.name = name;
    this.options = {
      ttlMs: options.ttlMs ?? 15 * 60 * 1000,
      failSilently: options.failSilently ?? true,
    };
  }

  /** Configure the provider (e.g. set usernames, API keys). */
  configure(config: TConfig): void {
    this.config = config;
  }

  /** Fetch fresh data from the provider's public endpoint. */
  abstract fetch(): Promise<TData>;

  /** Normalize raw provider data into a common shape. */
  abstract normalize(raw: unknown): TData;

  /** Check whether the provider is configured and reachable. */
  abstract healthCheck(): Promise<ProviderHealth>;

  /** Get cached data if valid, otherwise fetch fresh and cache it. */
  async getCached(cacheKey: string): Promise<TData | null> {
    const cached = cacheGet<TData>(cacheKey);
    if (cached) return cached;

    try {
      const raw = await this.fetch();
      const data = this.normalize(raw);
      cacheSet(cacheKey, data, this.options.ttlMs);
      return data;
    } catch (error) {
      if (!this.options.failSilently) throw error;
      console.warn(`[${this.name}] Provider fetch failed, degrading gracefully:`, error);
      return null;
    }
  }
}