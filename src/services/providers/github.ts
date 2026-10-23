/**
 * NEXUS // OPERATOR — GitHub Provider
 *
 * Fetches public profile and repository data from the GitHub REST API.
 * Unauthenticated requests are rate-limited to 60/hour per IP and support CORS.
 * Forks are identified accurately so they are never misattributed as original work.
 */

import type { GithubRepo, GithubProfile } from '../../types';
import { BaseProvider, type ProviderHealth } from './base';

const API_BASE = 'https://api.github.com';

interface RawRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  homepage: string | null;
  fork: boolean;
  archived: boolean;
  updated_at: string;
  topics: string[];
  owner: { login: string };
}

interface RawProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
}

export class GithubProvider extends BaseProvider<{
  profile: GithubProfile;
  repos: GithubRepo[];
}> {
  private readonly username: string;

  constructor(username: string, options?: { ttlMs?: number }) {
    super('github', { ttlMs: options?.ttlMs ?? 15 * 60 * 1000, failSilently: true });
    this.username = username;
  }

  configure() {
    // GitHub provider needs no secret config beyond the username set at construct time
  }

  async fetch(): Promise<{ profile: GithubProfile; repos: GithubRepo[] }> {
    const [profileRes, reposRes] = await Promise.all([
      fetch(`${API_BASE}/users/${this.username}`, { cache: 'no-store' }),
      fetch(`${API_BASE}/users/${this.username}/repos?per_page=100&sort=updated`, { cache: 'no-store' }),
    ]);

    if (!profileRes.ok) throw new Error(`GitHub profile: ${profileRes.status}`);
    if (!reposRes.ok) throw new Error(`GitHub repos: ${reposRes.status}`);

    const profile: RawProfile = await profileRes.json();
    const repos: RawRepo[] = await reposRes.json();

    return {
      profile: {
        login: profile.login,
        avatar_url: profile.avatar_url,
        html_url: profile.html_url,
        public_repos: profile.public_repos,
        followers: profile.followers,
      },
      repos: repos.map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        language: r.language,
        stargazers_count: r.stargazers_count,
        forks_count: r.forks_count,
        html_url: r.html_url,
        homepage: r.homepage,
        fork: r.fork,
        archived: r.archived,
        updated_at: r.updated_at,
        topics: r.topics || [],
      })),
    };
  }

  normalize(raw: unknown): { profile: GithubProfile; repos: GithubRepo[] } {
    return raw as { profile: GithubProfile; repos: GithubRepo[] };
  }

  async healthCheck(): Promise<ProviderHealth> {
    const start = Date.now();
    try {
      await fetch(`${API_BASE}/users/${this.username}`, { cache: 'no-store' });
      return {
        name: this.name,
        online: true,
        lastChecked: start,
      };
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

/** Offline fallback profile so the UI never shows a blank state. */
export function fallbackGithubProfile(username: string): GithubProfile {
  return {
    login: username,
    avatar_url: `https://avatars.githubusercontent.com/u/179244748?v=4`,
    html_url: `https://github.com/${username}`,
    public_repos: 0,
    followers: 0,
  };
}

/** Offline fallback repo list. */
export function fallbackGithubRepos(): GithubRepo[] {
  return [];
}