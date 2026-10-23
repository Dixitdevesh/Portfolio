/**
 * NEXUS // OPERATOR — Unstop Provider
 *
 * Unstop does not expose a public data API. This provider surfaces manually
 * configured competition/hackathon entries with explicit 'manually-added'
 * provenance so nothing is ever fabricated.
 */

import { BaseProvider, type ProviderHealth } from './base';

export interface UnstopEntry {
  id: string;
  title: string;
  event: string;
  date: string;
  type: 'Hackathon' | 'Quiz' | 'Assessment' | 'Other';
  role: 'Participation' | 'Winner' | 'Runner-up';
  description?: string;
  verificationUrl?: string;
  provenance: 'manually-added' | 'verification-unavailable';
}

export interface UnstopStats {
  entries: UnstopEntry[];
  provenance: 'manually-added' | 'verification-unavailable';
  sourceUrl: string;
}

export class UnstopProvider extends BaseProvider<UnstopStats> {
  private readonly entries: UnstopEntry[];

  constructor(entries: UnstopEntry[], options?: { ttlMs?: number }) {
    super('unstop', { ttlMs: options?.ttlMs ?? 24 * 60 * 60 * 1000, failSilently: true });
    this.entries = entries;
  }

  configure() {}

  async fetch(): Promise<UnstopStats> {
    return {
      entries: this.entries,
      provenance: 'manually-added',
      sourceUrl: 'https://unstop.com/',
    };
  }

  normalize(raw: unknown): UnstopStats {
    return raw as UnstopStats;
  }

  async healthCheck(): Promise<ProviderHealth> {
    return { name: this.name, online: true, lastChecked: Date.now() };
  }
}