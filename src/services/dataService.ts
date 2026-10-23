/**
 * NEXUS // OPERATOR — Unified Data Service
 *
 * Composes all independent providers into a single hook. Provider failures are
 * isolated so one unreachable API never breaks the whole site.
 */

import { useState, useEffect, useCallback } from 'react';
import { registry, initProviders } from './providers/registry';
import {
  GithubProvider,
  fallbackGithubProfile,
  fallbackGithubRepos,
} from './providers/github';
import { LeetCodeProvider, fallbackLeetCodeStats } from './providers/leetcode';
import { RootMeProvider, fallbackRootMeStats } from './providers/rootme';
import { UnstopProvider } from './providers/unstop';
import type { GithubRepo, GithubProfile } from '../types';
import type { LeetCodeStats } from './providers/leetcode';
import type { RootMeStats } from './providers/rootme';
import type { UnstopStats } from './providers/unstop';

export interface NexusData {
  github: { profile: GithubProfile | null; repos: GithubRepo[]; loading: boolean; error: string | null };
  leetcode: { stats: LeetCodeStats | null; loading: boolean; error: string | null };
  rootme: { stats: RootMeStats | null; loading: boolean; error: string | null };
  unstop: { stats: UnstopStats | null; loading: boolean; error: string | null };
  providerHealth: Array<{ name: string; online: boolean; error?: string }>;
  refetch: () => Promise<void>;
}

export function useNexusData({
  githubUsername,
  leetcodeUsername,
  rootmeUsername,
  unstopEntries,
}: {
  githubUsername: string;
  leetcodeUsername: string;
  rootmeUsername?: string;
  unstopEntries: Array<{
    id: string;
    title: string;
    event: string;
    date: string;
    type: 'Hackathon' | 'Quiz' | 'Assessment' | 'Other';
    role: 'Participation' | 'Winner' | 'Runner-up';
    description?: string;
    verificationUrl?: string;
  }>;
}): NexusData {
  const [data, setData] = useState<NexusData>({
    github: { profile: null, repos: [], loading: true, error: null },
    leetcode: { stats: null, loading: true, error: null },
    rootme: { stats: null, loading: true, error: null },
    unstop: { stats: null, loading: true, error: null },
    providerHealth: [],
    refetch: async () => {},
  });

  const refetch = useCallback(async () => {
    // (Re)initialize providers with current config
    initProviders({
      githubUsername,
      leetcodeUsername,
      rootmeUsername,
      unstopEntries: unstopEntries as any,
    });

    const results: Partial<NexusData> = {};

    // GitHub — isolated
    try {
      const gh = registry.get<GithubProvider>('github');
      if (gh) {
        const cached = await gh.getCached('github:data');
        if (cached) {
          results.github = {
            profile: cached.profile,
            repos: cached.repos,
            loading: false,
            error: null,
          };
        } else {
          results.github = {
            profile: fallbackGithubProfile(githubUsername),
            repos: fallbackGithubRepos(),
            loading: false,
            error: 'GitHub data unavailable',
          };
        }
      }
    } catch (e: any) {
      results.github = {
        profile: fallbackGithubProfile(githubUsername),
        repos: fallbackGithubRepos(),
        loading: false,
        error: e.message,
      };
    }

    // LeetCode — isolated
    try {
      const lc = registry.get<LeetCodeProvider>('leetcode');
      if (lc) {
        const cached = await lc.getCached('leetcode:data');
        if (cached) {
          results.leetcode = { stats: cached, loading: false, error: null };
        } else {
          results.leetcode = { stats: fallbackLeetCodeStats(leetcodeUsername), loading: false, error: 'LeetCode data unavailable' };
        }
      }
    } catch (e: any) {
      results.leetcode = { stats: fallbackLeetCodeStats(leetcodeUsername), loading: false, error: e.message };
    }

    // Root-Me — isolated (optional)
    if (rootmeUsername) {
      try {
        const rm = registry.get<RootMeProvider>('rootme');
        if (rm) {
          const cached = await rm.getCached('rootme:data');
          if (cached) {
            results.rootme = { stats: cached, loading: false, error: null };
          } else {
            results.rootme = { stats: fallbackRootMeStats(rootmeUsername), loading: false, error: 'Root-Me data unavailable' };
          }
        }
      } catch (e: any) {
        results.rootme = { stats: fallbackRootMeStats(rootmeUsername), loading: false, error: e.message };
      }
    }

    // Unstop — manual entries, always available
    try {
      const us = registry.get<UnstopProvider>('unstop');
      if (us) {
        const stats = await us.getCached('unstop:data');
        results.unstop = { stats, loading: false, error: null };
      }
    } catch (e: any) {
      results.unstop = {
        stats: { entries: [], provenance: 'manually-added', sourceUrl: 'https://unstop.com/' },
        loading: false,
        error: e.message,
      };
    }

    // Refresh health
    await registry.refreshHealth();

    setData((prev) => ({
      ...prev,
      ...results,
      providerHealth: registry.getAllHealth(),
      refetch,
    }));
  }, [githubUsername, leetcodeUsername, rootmeUsername, unstopEntries]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return data;
}

export type { GithubProfile, GithubRepo, LeetCodeStats, RootMeStats, UnstopStats };