import React, { useState } from 'react';
import { useGithub } from '../hooks/useGithub';
import { VERIFIED_ACHIEVEMENTS, PROFILE } from '../config/profile';
import type { AchievementItem } from '../types';
import { 
  Github, ExternalLink, RefreshCw, AlertTriangle, 
  Award, Eye, X, Code2, Shield, FileText, CheckCircle2 
} from 'lucide-react';

export const ModeEvidence: React.FC = () => {
  const { profile, repos, loading, error } = useGithub();
  const [selectedCertificate, setSelectedCertificate] = useState<AchievementItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Hackathon' | 'Competition' | 'Quiz'>('all');

  const filteredAchievements = VERIFIED_ACHIEVEMENTS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.type === selectedCategory;
  });

  return (
    <section id="evidence" className="py-24 border-t border-canvas-border relative bg-canvas-deep/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-left space-y-16">
        
        {/* Section Heading */}
        <div className="space-y-3 border-b border-canvas-border pb-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-accent-gold uppercase tracking-wider font-semibold">
            <span>Proof of Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            Coding Activity & Verified Credentials
          </h2>
          <p className="text-sm text-text-secondary font-sans max-w-2xl leading-relaxed">
            I believe in building openly and backing up skills with evidence. Below are live public repository stats, my LeetCode record, and verified certificates from national student hackathons.
          </p>
        </div>

        {/* 1. GITHUB ACTIVITY */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white font-sans flex items-center gap-2">
                <Github className="w-5 h-5 text-accent-gold" />
                <span>GitHub Repositories</span>
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                Real-time data synced directly with github.com/{PROFILE.githubUsername}
              </p>
            </div>
            <a
              href={`https://github.com/${PROFILE.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-accent-gold hover:underline flex items-center gap-1 font-medium"
            >
              <span>View Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {error ? (
            <div className="sculpture-card p-6 rounded-xl border border-canvas-border text-center space-y-3">
              <AlertTriangle className="w-5 h-5 text-accent-gold mx-auto" />
              <div className="text-xs text-white font-medium">Public API Rate Limit Reached</div>
              <p className="text-xs text-text-muted max-w-md mx-auto">
                GitHub limits unauthenticated API requests to 60/hr. You can still view all repositories and commit history directly on my GitHub profile.
              </p>
              <a
                href={`https://github.com/${PROFILE.githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-canvas-card border border-canvas-border text-xs text-accent-gold hover:border-accent-gold transition-colors"
              >
                <span>Open GitHub Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ) : loading ? (
            <div className="py-10 text-center text-xs text-accent-gold flex items-center justify-center gap-2 font-mono">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Fetching latest repository data from GitHub...</span>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Metrics strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="sculpture-card p-4 rounded-xl border border-canvas-border text-center">
                  <div className="text-text-muted text-[11px]">Public Repositories</div>
                  <div className="text-2xl font-bold text-white mt-1">
                    {profile?.public_repos || repos.length}
                  </div>
                </div>
                <div className="sculpture-card p-4 rounded-xl border border-canvas-border text-center">
                  <div className="text-text-muted text-[11px]">Stars Received</div>
                  <div className="text-2xl font-bold text-accent-gold mt-1">
                    {repos.reduce((acc, r) => acc + r.stargazers_count, 0)}
                  </div>
                </div>
                <div className="sculpture-card p-4 rounded-xl border border-canvas-border text-center">
                  <div className="text-text-muted text-[11px]">Forks</div>
                  <div className="text-2xl font-bold text-white mt-1">
                    {repos.reduce((acc, r) => acc + r.forks_count, 0)}
                  </div>
                </div>
                <div className="sculpture-card p-4 rounded-xl border border-canvas-border text-center">
                  <div className="text-text-muted text-[11px]">Top Languages</div>
                  <div className="text-xs font-bold text-accent-emerald truncate mt-2 font-mono">
                    Python • JS • C • TS
                  </div>
                </div>
              </div>

              {/* Repos Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {repos.slice(0, 4).map((repo) => (
                  <div
                    key={repo.id}
                    className="sculpture-card p-5 rounded-xl border border-canvas-border flex flex-col justify-between space-y-3 hover:border-canvas-border-hover transition-colors"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white font-mono truncate">{repo.name}</span>
                        {repo.fork && (
                          <span className="text-[10px] text-text-muted bg-canvas-card px-2 py-0.5 rounded border border-canvas-border font-mono">
                            Fork
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed font-sans line-clamp-2">
                        {repo.description || 'Open source software repository.'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-canvas-border text-xs text-text-muted font-mono">
                      <span>{repo.language || 'Code'}</span>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-gold hover:underline flex items-center gap-1 font-sans"
                      >
                        <span>View Repository</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 2. LEETCODE & SECURITY TRAINING */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-canvas-border">
          {/* LeetCode Profile */}
          <div className="sculpture-card p-6 md:p-8 rounded-2xl border border-canvas-border space-y-4">
            <div className="flex items-center justify-between text-xs border-b border-canvas-border pb-3">
              <div className="flex items-center gap-2 text-yellow-400 font-bold">
                <Code2 className="w-4 h-4" />
                <span>LeetCode Problem Solving</span>
              </div>
              <span className="text-text-muted font-mono">@{PROFILE.leetcodeUsername}</span>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed font-sans">
              I consistently practice coding challenges to sharpen my mental models around dynamic programming, graph traversal algorithms, and optimal data structure representations.
            </p>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-canvas-card p-3 rounded-xl border border-canvas-border">
                <div className="text-[10px] text-accent-emerald font-bold font-mono">EASY</div>
                <div className="text-sm font-bold text-white mt-1">Practiced</div>
              </div>
              <div className="bg-canvas-card p-3 rounded-xl border border-canvas-border">
                <div className="text-[10px] text-yellow-400 font-bold font-mono">MEDIUM</div>
                <div className="text-sm font-bold text-white mt-1">Practiced</div>
              </div>
              <div className="bg-canvas-card p-3 rounded-xl border border-canvas-border">
                <div className="text-[10px] text-red-400 font-bold font-mono">HARD</div>
                <div className="text-sm font-bold text-white mt-1">Solving</div>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="text-text-muted text-[11px]">Honest, active practice</span>
              <a
                href={`https://leetcode.com/${PROFILE.leetcodeUsername}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-gold hover:underline flex items-center gap-1 font-medium"
              >
                <span>View LeetCode Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Root-Me & Security Labs */}
          <div className="sculpture-card p-6 md:p-8 rounded-2xl border border-canvas-border space-y-4">
            <div className="flex items-center justify-between text-xs border-b border-canvas-border pb-3">
              <div className="flex items-center gap-2 text-accent-crimson font-bold">
                <Shield className="w-4 h-4" />
                <span>Cybersecurity Labs & Training</span>
              </div>
              <span className="text-text-muted font-mono">Root-Me & CTFs</span>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed font-sans">
              Hands-on lab investigations across web security vulnerabilities, cryptographic ciphers, and Linux system forensics. All exercises performed strictly in authorized educational environments.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-canvas-card border border-canvas-border">
                <span className="text-text-secondary">OWASP Web Security Testing</span>
                <span className="text-accent-emerald text-[11px] font-mono">Active Inquiries</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-canvas-card border border-canvas-border">
                <span className="text-text-secondary">Linux Privilege Escalation Labs</span>
                <span className="text-accent-emerald text-[11px] font-mono">Active Inquiries</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="text-text-muted text-[11px]">Authorized training only</span>
              <a
                href="https://www.root-me.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-gold hover:underline flex items-center gap-1 font-medium"
              >
                <span>Root-Me Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* 3. VERIFIED HACKATHONS & CERTIFICATES */}
        <div className="space-y-6 pt-6 border-t border-canvas-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white font-sans flex items-center gap-2">
                <Award className="w-5 h-5 text-accent-gold" />
                <span>Hackathons & Verified Certificates</span>
              </h3>
              <p className="text-xs text-text-muted">
                Each certificate can be previewed or verified through official Unstop credential links.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              {[
                { id: 'all', label: 'All' },
                { id: 'Hackathon', label: 'Hackathons' },
                { id: 'Competition', label: 'Competitions' },
                { id: 'Quiz', label: 'Quizzes' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-accent-gold text-canvas-obsidian font-bold border-accent-gold'
                      : 'bg-canvas-card text-text-muted border-canvas-border hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((item) => (
              <div
                key={item.id}
                className="sculpture-card rounded-2xl p-6 border border-canvas-border flex flex-col justify-between space-y-4 hover:border-canvas-border-hover transition-colors"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-accent-gold font-medium font-mono text-[11px]">{item.type}</span>
                    <span className="text-text-muted font-mono text-[11px]">{item.date}</span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white font-sans">{item.title}</h4>
                    <p className="text-xs text-text-muted mt-0.5">{item.event}</p>
                  </div>

                  {item.description && (
                    <p className="text-xs text-text-secondary leading-relaxed font-sans line-clamp-3">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-canvas-border flex items-center justify-between text-xs">
                  <span className="text-[11px] text-text-muted font-mono">
                    {item.provenance === 'official-certificate' ? (
                      <span className="text-accent-gold flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3 h-3" /> Unstop Verified
                      </span>
                    ) : (
                      'Recorded'
                    )}
                  </span>

                  <div className="flex items-center gap-2">
                    {(item.image || item.pdf) && (
                      <button
                        onClick={() => setSelectedCertificate(item)}
                        className="flex items-center gap-1 text-white hover:text-accent-gold transition-colors cursor-pointer text-xs font-medium"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>
                    )}
                    {item.verificationUrl && (
                      <a
                        href={item.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-gold hover:underline flex items-center gap-1 font-medium text-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Verify</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Certificate Preview Modal */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="sculpture-card rounded-2xl border border-canvas-border bg-canvas-surface w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-canvas-border flex items-center justify-between text-xs bg-canvas-elevated">
              <span className="font-bold text-white truncate font-sans">
                {selectedCertificate.title}
              </span>
              <button
                onClick={() => setSelectedCertificate(null)}
                className="p-1 text-text-muted hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 text-center">
              {selectedCertificate.image && (
                <img
                  src={`/${selectedCertificate.image}`}
                  alt={selectedCertificate.title}
                  className="w-full rounded-xl border border-canvas-border shadow-md"
                />
              )}
              {selectedCertificate.pdf && (
                <div className="p-10 sculpture-card rounded-xl border border-canvas-border text-center space-y-3">
                  <FileText className="w-10 h-10 text-accent-gold mx-auto" />
                  <div className="text-sm font-bold text-white">
                    Certificate Document Available (PDF)
                  </div>
                  <a
                    href={`/${selectedCertificate.pdf}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-gold text-canvas-obsidian font-bold text-xs"
                  >
                    <span>Open PDF Document</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-canvas-border flex justify-between items-center text-xs bg-canvas-elevated">
              <span className="text-text-muted">{selectedCertificate.event}</span>
              {selectedCertificate.verificationUrl && (
                <a
                  href={selectedCertificate.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-gold hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Verify on Unstop</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
