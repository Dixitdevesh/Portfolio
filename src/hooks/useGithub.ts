import { useState, useEffect } from 'react';
import type { GithubRepo, GithubProfile } from '../types';
import { fetchGithubProfile, fetchGithubRepos } from '../services/githubService';

const PROFILE_CACHE_KEY = 'devesh_portfolio_github_profile';
const REPOS_CACHE_KEY = 'devesh_portfolio_github_repos';
const CACHE_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes cache

export function useGithub() {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        // Check cache first
        const cachedProfile = localStorage.getItem(PROFILE_CACHE_KEY);
        const cachedRepos = localStorage.getItem(REPOS_CACHE_KEY);
        const cachedTime = localStorage.getItem('devesh_portfolio_github_cache_time');

        const now = Date.now();
        const isCacheValid = cachedTime && (now - parseInt(cachedTime, 10) < CACHE_EXPIRY_MS);

        if (isCacheValid && cachedProfile && cachedRepos) {
          setProfile(JSON.parse(cachedProfile));
          setRepos(JSON.parse(cachedRepos));
          setLoading(false);
          return;
        }

        // Fetch fresh data
        const freshProfile = await fetchGithubProfile();
        setProfile(freshProfile);

        try {
          const freshRepos = await fetchGithubRepos();
          setRepos(freshRepos);

          // Update cache
          localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(freshProfile));
          localStorage.setItem(REPOS_CACHE_KEY, JSON.stringify(freshRepos));
          localStorage.setItem('devesh_portfolio_github_cache_time', now.toString());
        } catch (repoErr) {
          console.warn('Could not fetch fresh repos, using stale cache if available', repoErr);
          // If we had stale cache, use it instead of failing completely
          if (cachedRepos) {
            setRepos(JSON.parse(cachedRepos));
          } else {
            throw repoErr; // rethrow if we have no cached data at all
          }
        }
      } catch (err: any) {
        setError(err.message || 'Failed to sync with GitHub command center.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { profile, repos, loading, error };
}
