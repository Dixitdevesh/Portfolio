/**
 * NEXUS // OPERATOR — LeetCode Provider
 *
 * LeetCode does not publish an official public API. This provider attempts to
 * query the unofficial public GraphQL endpoint (https://leetcode.com/graphql).
 * Because that endpoint often blocks cross-origin browser requests, the provider
 * degrades gracefully to manually configured data with explicit provenance labels.
 * No stats are ever fabricated.
 */

import { BaseProvider, type ProviderHealth } from './base';

export interface LeetCodeStats {
  username: string;
  totalSolved: number | null;
  easySolved: number | null;
  mediumSolved: number | null;
  hardSolved: number | null;
  ranking: number | null;
  rating: number | null;
  contributionPoints: number | null;
  accepts: number | null;
  submissions: number | null;
  lastRefreshed: number | null;
  provenance: 'verified-source' | 'manually-added' | 'verification-unavailable';
  sourceUrl: string;
}

interface RawUserProfile {
  allQuestionsCount?: { count: number; difficulty: string }[];
  matchedUser?: {
    submitStatsGlobal?: { acSubmissionNum?: { count: number; difficulty: string }[] };
    profile?: { ranking: number; reputation: number; stars: number };
    userContestRanking?: { rating: number; globalRanking: number; totalParticipants: number };
  };
}

interface RawGraphQLResponse {
  data?: RawUserProfile;
  errors?: Array<{ message: string }>;
}

export class LeetCodeProvider extends BaseProvider<LeetCodeStats> {
  private readonly username: string;

  constructor(username: string, options?: { ttlMs?: number }) {
    super('leetcode', {
      ttlMs: options?.ttlMs ?? 60 * 60 * 1000,
      failSilently: true,
    });
    this.username = username;
  }

  configure() {}

  async fetch(): Promise<LeetCodeStats> {
    const query = `
      query userProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
            reputation
          }
          userContestRanking {
            rating
            globalRanking
          }
        }
        allQuestionsCount {
          difficulty
          count
        }
      }
    `;

    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://leetcode.com/',
        Origin: 'https://leetcode.com',
      },
      body: JSON.stringify({ query, variables: { username: this.username } }),
      cache: 'no-store',
    });

    if (!response.ok) throw new Error(`LeetCode API: ${response.status}`);

    const json: RawGraphQLResponse = await response.json();
    if (json.errors?.length) throw new Error(json.errors[0].message);
    if (!json.data?.matchedUser) throw new Error('LeetCode user not found');

    const user = json.data.matchedUser;
    const acStats = user.submitStatsGlobal?.acSubmissionNum || [];
    const byDifficulty: Record<string, number> = {};
    acStats.forEach((s: any) => {
      byDifficulty[s.difficulty.toLowerCase()] = s.count;
    });

    const allCounts = json.data.allQuestionsCount || [];
    const totalByDiff: Record<string, number> = {};
    allCounts.forEach((c: any) => {
      totalByDiff[c.difficulty.toLowerCase()] = c.count;
    });

    return {
      username: this.username,
      totalSolved: byDifficulty.all ?? null,
      easySolved: byDifficulty.easy ?? null,
      mediumSolved: byDifficulty.medium ?? null,
      hardSolved: byDifficulty.hard ?? null,
      ranking: user.profile?.ranking ?? null,
      rating: user.userContestRanking?.rating ?? null,
      contributionPoints: user.profile?.reputation ?? null,
      accepts: null,
      submissions: null,
      lastRefreshed: Date.now(),
      provenance: 'verified-source',
      sourceUrl: `https://leetcode.com/${this.username}/`,
    };
  }

  normalize(raw: unknown): LeetCodeStats {
    return raw as LeetCodeStats;
  }

  async healthCheck(): Promise<ProviderHealth> {
    const start = Date.now();
    try {
      await this.fetch();
      return { name: this.name, online: true, lastChecked: start };
    } catch (e: any) {
      return {
        name: this.name,
        online: false,
        lastChecked: start,
        error: e.message,
      };
    }
  }
}

/** Graceful fallback when LeetCode API is unreachable (CORS or rate limit). */
export function fallbackLeetCodeStats(username: string): LeetCodeStats {
  return {
    username,
    totalSolved: null,
    easySolved: null,
    mediumSolved: null,
    hardSolved: null,
    ranking: null,
    rating: null,
    contributionPoints: null,
    accepts: null,
    submissions: null,
    lastRefreshed: null,
    provenance: 'verification-unavailable',
    sourceUrl: `https://leetcode.com/${username}/`,
  };
}