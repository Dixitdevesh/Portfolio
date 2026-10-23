import React, { useState } from 'react';
import { PROFILE, DIGITAL_PROJECTS, VERIFIED_ACHIEVEMENTS, SKILLS_MATRIX } from '../config/profile';
import { 
  FileDown, Mail, Linkedin, Github, ExternalLink, MapPin, 
  GraduationCap, CheckCircle2, Sparkles 
} from 'lucide-react';
import { useDiscovery } from '../context/DiscoveryContext';

export const ProfessionalDossier: React.FC = () => {
  const { setDisplayMode } = useDiscovery();
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');

  const featuredProjects = DIGITAL_PROJECTS.filter((p) => {
    if (selectedDiscipline === 'all') return true;
    return p.discipline === selectedDiscipline;
  });

  return (
    <div className="min-h-screen bg-[#0b0c0f] text-[#f3f4f6] font-sans antialiased selection:bg-accent-gold/20 selection:text-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16 text-left">
        
        {/* Switcher notice banner */}
        <div className="p-3.5 rounded-xl bg-canvas-card border border-canvas-border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-2 text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-accent-gold" />
            <span>Reading View: Fast, distraction-free recruiter dossier</span>
          </div>
          <button
            onClick={() => setDisplayMode('artwork')}
            className="text-accent-gold hover:underline flex items-center gap-1 font-medium cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Switch to Interactive 3D Model</span>
          </button>
        </div>

        {/* Hero Identity Block */}
        <header className="space-y-6 border-b border-canvas-border pb-10">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
              {PROFILE.name}
            </h1>
            <p className="text-base sm:text-lg text-accent-gold font-medium">
              {PROFILE.role}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-accent-gold" /> {PROFILE.location}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-accent-gold" /> {PROFILE.education.institution} ({PROFILE.education.degree})
            </span>
            <span>•</span>
            <span className="text-accent-emerald font-medium">Class of {PROFILE.education.expectedGraduation}</span>
          </div>

          <p className="text-sm text-text-secondary leading-relaxed max-w-3xl">
            {PROFILE.headline} {PROFILE.shortBio}
          </p>

          {/* Core Action Pill Group */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
            <a
              href={`/${PROFILE.resumePath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-gold text-canvas-obsidian font-bold hover:bg-accent-gold-light transition-all shadow-md"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Resume (PDF)</span>
            </a>

            <a
              href={`mailto:${PROFILE.email}`}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-canvas-card border border-canvas-border hover:border-canvas-border-hover text-white transition-all"
            >
              <Mail className="w-4 h-4 text-accent-gold" />
              <span>{PROFILE.email}</span>
            </a>

            <a
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-canvas-card border border-canvas-border hover:border-canvas-border-hover text-white transition-all"
            >
              <Linkedin className="w-4 h-4 text-accent-gold" />
              <span>LinkedIn</span>
            </a>

            <a
              href={`https://github.com/${PROFILE.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-canvas-card border border-canvas-border hover:border-canvas-border-hover text-white transition-all"
            >
              <Github className="w-4 h-4 text-accent-gold" />
              <span>GitHub</span>
            </a>
          </div>
        </header>

        {/* Featured Projects */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-canvas-border pb-3">
            <div>
              <h2 className="text-xl font-bold text-white font-sans">
                Featured Engineering Projects
              </h2>
              <p className="text-xs text-text-muted mt-0.5">
                Working implementations with verified source code repositories
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              {[
                { id: 'all', label: 'All' },
                { id: 'intelligence', label: 'AI & Vision' },
                { id: 'security', label: 'Cybersecurity' },
                { id: 'systems', label: 'Systems & Web' },
              ].map((disc) => (
                <button
                  key={disc.id}
                  onClick={() => setSelectedDiscipline(disc.id)}
                  className={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                    selectedDiscipline === disc.id
                      ? 'bg-accent-gold text-canvas-obsidian font-bold border-accent-gold'
                      : 'bg-canvas-card text-text-muted border-canvas-border hover:text-white'
                  }`}
                >
                  {disc.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="sculpture-card rounded-2xl p-6 border border-canvas-border flex flex-col justify-between space-y-4 hover:border-canvas-border-hover transition-colors"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-accent-gold font-medium font-mono text-[11px] uppercase">
                      {project.discipline}
                    </span>
                    <span className="text-text-muted text-[11px] font-mono">
                      Status: {project.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-sans">
                    {project.name}
                  </h3>

                  <p className="text-xs text-text-secondary leading-relaxed font-sans">
                    {project.shortDesc}
                  </p>

                  <div className="space-y-1 pt-1.5">
                    <span className="text-[10px] font-mono text-text-muted uppercase font-bold">
                      Key Highlights:
                    </span>
                    <ul className="space-y-1 text-xs text-text-secondary font-sans">
                      {project.keyFeatures.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent-gold shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="font-mono text-[10px] text-text-muted bg-canvas-card px-2 py-0.5 rounded border border-canvas-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-canvas-border flex items-center justify-between text-xs">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-white hover:text-accent-gold transition-colors font-medium"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                  </a>

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-accent-gold hover:underline font-bold"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills Matrix */}
        <section className="space-y-6">
          <div className="border-b border-canvas-border pb-3">
            <h2 className="text-xl font-bold text-white font-sans">
              Technical Skills & Evidence
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              Mapped directly to working projects and codebases
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SKILLS_MATRIX.map((group, idx) => (
              <div
                key={idx}
                className="sculpture-card rounded-2xl p-5 border border-canvas-border space-y-3"
              >
                <h3 className="text-sm font-bold text-accent-gold border-b border-canvas-border pb-2 font-sans">
                  {group.category}
                </h3>

                <div className="space-y-2 text-xs">
                  {group.items.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-start justify-between gap-3 p-2.5 rounded-lg bg-canvas-card border border-canvas-border/70"
                    >
                      <div>
                        <div className="font-medium text-white">
                          {skill.name} <span className="text-[11px] text-text-muted font-normal">({skill.level})</span>
                        </div>
                        <div className="text-[11px] text-text-secondary mt-0.5 font-sans">
                          {skill.evidenceDescription}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hackathons & Certifications */}
        <section className="space-y-6">
          <div className="border-b border-canvas-border pb-3">
            <h2 className="text-xl font-bold text-white font-sans">
              Hackathons & Verified Recognition
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              National competitions and technical challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {VERIFIED_ACHIEVEMENTS.map((item) => (
              <div
                key={item.id}
                className="sculpture-card p-4 rounded-xl border border-canvas-border flex flex-col justify-between space-y-2.5 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-accent-gold font-mono">
                    <span>{item.type}</span>
                    <span className="text-text-muted">{item.date}</span>
                  </div>
                  <h4 className="font-bold text-white font-sans text-sm">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-text-secondary line-clamp-2">
                    {item.description || item.event}
                  </p>
                </div>

                <div className="pt-2 border-t border-canvas-border text-[11px]">
                  {item.verificationUrl ? (
                    <a
                      href={item.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-gold hover:underline flex items-center gap-1 font-medium"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Verify on Unstop</span>
                    </a>
                  ) : item.pdf ? (
                    <a
                      href={`/${item.pdf}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-white flex items-center gap-1"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      <span>View PDF</span>
                    </a>
                  ) : (
                    <span className="text-text-muted">Recorded Milestone</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="sculpture-card rounded-2xl p-6 border border-canvas-border space-y-4 bg-canvas-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-canvas-border pb-4">
            <div>
              <h3 className="text-lg font-bold text-white font-sans">Ready to connect?</h3>
              <p className="text-xs text-text-secondary">
                Seeking internship and software engineering opportunities.
              </p>
            </div>

            <a
              href={`mailto:${PROFILE.email}`}
              className="px-5 py-2 rounded-lg bg-accent-gold text-canvas-obsidian font-bold text-xs hover:bg-accent-gold-light transition-all text-center"
            >
              Send Direct Email
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-text-muted font-sans">
            <div>{PROFILE.name} • GLA University Computer Science</div>
            <div className="flex items-center gap-4">
              <a href={PROFILE.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                LinkedIn
              </a>
              <a href={`https://github.com/${PROFILE.githubUsername}`} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                GitHub
              </a>
              <a href={`https://leetcode.com/${PROFILE.leetcodeUsername}/`} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                LeetCode
              </a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};
