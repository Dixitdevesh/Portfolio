/**
 * NEXUS // OPERATOR — Provider Registry
 *
 * Singleton that holds all external-data providers. Each provider is
 * independent; one failing provider never breaks another.
 */

import { BaseProvider } from './base';
import { GithubProvider } from './github';
import { LeetCodeProvider } from './leetcode';
import { RootMeProvider } from './rootme';
import { UnstopProvider, type UnstopEntry } from './unstop';
import type { ProviderHealth } from './base';

export class ProviderRegistry {
  private providers: Map<string, BaseProvider<any>> = new Map();
  private health: Map<string, ProviderHealth> = new Map();

  register(name: string, provider: BaseProvider<any>): void {
    this.providers.set(name, provider);
  }

  get<T extends BaseProvider<any>>(name: string): T | undefined {
    return this.providers.get(name) as T;
  }

  has(name: string): boolean {
    return this.providers.has(name);
  }

  getHealth(name: string): ProviderHealth | undefined {
    return this.health.get(name);
  }

  getAllHealth(): ProviderHealth[] {
    return Array.from(this.health.values());
  }

  /** Run health checks on all providers. Results never throw. */
  async refreshHealth(): Promise<void> {
    const checks: Promise<void>[] = [];
    for (const [name, provider] of this.providers) {
      checks.push(
        provider.healthCheck().then((h) => {
          this.health.set(name, h);
        }),
      );
    }
    await Promise.all(checks);
  }
}

export const registry = new ProviderRegistry();

/** Configure and register the default provider set. */
export function initProviders({
  githubUsername,
  leetcodeUsername,
  rootmeUsername,
  unstopEntries,
}: {
  githubUsername: string;
  leetcodeUsername: string;
  rootmeUsername?: string;
  unstopEntries: UnstopEntry[];
}): void {
  registry.register('github', new GithubProvider(githubUsername));
  registry.register('leetcode', new LeetCodeProvider(leetcodeUsername));
  if (rootmeUsername) {
    registry.register('rootme', new RootMeProvider(rootmeUsername));
  }
  registry.register('unstop', new UnstopProvider(unstopEntries));
}