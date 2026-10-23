/**
 * NEXUS // OPERATOR — Root-Me Provider
 *
 * Fetches public profile and challenge statistics from Root-Me.
 * Root-Me exposes an autoprofil endpoint that returns public user data.
 * Degrades gracefully when unreachable.
 */

import { BaseProvider, type ProviderHealth } from './base';

export interface RootMeStats {
  username: string;
  score: number | null;
  rank: number | null;
  badges: number | null;
  challengesSolved: number | null;
  challengesByCategory: Array<{ category: string; solved: number }>;
  lastRefreshed: number | null;
  provenance: 'verified-source' | 'verification-unavailable';
  sourceUrl: string;
}

export class RootMeProvider extends BaseProvider<RootMeStats> {
  private readonly username: string;

  constructor(username: string, options?: { ttlMs?: number }) {
    super('rootme', {
      ttlMs: options?.ttlMs ?? 60 * 60 * 1000,
      failSilently: true,
    });
    this.username = username;
  }

  configure() {}

  async fetch(): Promise<RootMeStats> {
    // Root-Me autoprofil public endpoint
    const response = await fetch(
      `https://api.root-me.org/autoprofil/${encodeURIComponent(this.username)}`,
      { cache: 'no-store' },
    );

    if (!response.ok) {
      if (response.status === 404) throw new Error('Root-Me user not found');
      throw new Error(`Root-Me API: ${response.status}`);
    }

    const json: any = await response.json();

    return {
      username: this.username,
      score: json.score ?? null,
      rank: json.rank ?? null,
      badges: json.badges ?? null,
      challengesSolved: json.nb_challenges_solved ?? null,
      challengesByCategory: (json.challenges_by_category || []).map((c: any) => ({
        category: c.category || c.name || 'Unknown',
        solved: c.nb_solved ?? c.solved ?? 0,
      })),
      lastRefreshed: Date.now(),
      provenance: 'verified-source',
      sourceUrl: `https://www.root-me.org/${this.username}`,
    };
  }

  normalize(raw: unknown): RootMeStats {
    return raw as RootMeStats;
  }

  async healthCheck(): Promise<ProviderHealth> {
    const start = Date.now();
    try {
      await this.fetch();
      return { name: this.name, online: true, lastChecked: start };
    } catch (e: any) {
      return { name: this.name, online: false, lastChecked: start, error: e.message };
    }
  }
}

export function fallbackRootMeStats(username: string): RootMeStats {
  return {
    username,
    score: null,
    rank: null,
    badges: null,
    challengesSolved: null,
    challengesByCategory: [],
    lastRefreshed: null,
    provenance: 'verification-unavailable',
    sourceUrl: `https://www.root-me.org/${username}`,
  };
}