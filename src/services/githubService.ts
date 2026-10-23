import type { GithubRepo, GithubProfile } from '../types';

const GITHUB_USERNAME = 'Dixitdevesh';
const API_BASE_URL = 'https://api.github.com';

export async function fetchGithubProfile(): Promise<GithubProfile> {
  const response = await fetch(`${API_BASE_URL}/users/${GITHUB_USERNAME}`);
  if (!response.ok) {
    throw new Error(`GitHub API HTTP ${response.status}: Rate limit or profile offline`);
  }
  const data = await response.json();
  return {
    login: data.login,
    avatar_url: data.avatar_url,
    html_url: data.html_url,
    public_repos: data.public_repos,
    followers: data.followers
  };
}

export async function fetchGithubRepos(): Promise<GithubRepo[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub repos: ${response.status}`);
    }
    const data = await response.json();
    
    // Map to our clean GithubRepo type
    const repos: GithubRepo[] = data.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      html_url: repo.html_url,
      homepage: repo.homepage,
      fork: repo.fork,
      archived: repo.archived,
      updated_at: repo.updated_at,
      topics: repo.topics || []
    }));
    
    return repos;
  } catch (error) {
    console.error('Error in fetchGithubRepos:', error);
    // Return empty list so hook knows to use mock list / show error fallback
    throw error;
  }
}
