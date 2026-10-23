/**
 * DIGITAL DOUBLE — Data Model & Type Definitions
 * 
 * Defines the computational sculpture geometry, project architecture,
 * provenance metadata, and discovery state.
 */

export type Discipline = 'intelligence' | 'security' | 'systems' | 'evidence';

export type Provenance = 
  | 'verified-source' 
  | 'official-certificate' 
  | 'public-profile' 
  | 'manually-added';

export interface SculptureNode {
  id: string;
  label: string;
  subtitle: string;
  discipline: Discipline;
  categoryLabel: string;
  position: [number, number, number]; // 3D coordinates [x, y, z]
  color: string;
  summary: string;
  provenance: Provenance;
  projectId?: string;
  evidenceId?: string;
  skillsDemonstrated: string[];
  externalUrl?: string;
  githubUrl?: string;
}

export interface DigitalProject {
  id: string;
  name: string;
  repoName: string;
  discipline: Discipline;
  shortDesc: string;
  overview: string;
  whyBuilt: string;
  architectureDetails: string;
  techStack: string[];
  keyFeatures: string[];
  whatLearned: string;
  githubUrl: string;
  demoUrl?: string;
  status: 'Completed' | 'Beta' | 'Prototype';
  isFeatured: boolean;
  provenance: Provenance;
  accentColor: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  event: string;
  date: string;
  type: 'Hackathon' | 'Competition' | 'Course' | 'Quiz' | 'Assessment';
  role: 'Winner' | 'Runner-up' | 'Participation';
  description?: string;
  image?: string;
  pdf?: string;
  verificationUrl?: string;
  provenance: Provenance;
}

export type SculpturePalette = 
  | 'obsidian-gold' 
  | 'spectral-alabaster' 
  | 'deep-bronze' 
  | 'cosmic-carbon';

export interface DiscoveryState {
  discoveredNodeIds: string[];
  inspectedProjectIds: string[];
  evidenceViewedIds: string[];
  currentPalette: SculpturePalette;
  unlockedPalettes: SculpturePalette[];
  wireframeActive: boolean;
  renderMode2D: boolean;
  notesCount: number;
}

export type SiteDisplayMode = 'artwork' | 'dossier';

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  homepage: string | null;
  fork: boolean;
  archived: boolean;
  updated_at: string;
  topics?: string[];
}

export interface GithubProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
}
