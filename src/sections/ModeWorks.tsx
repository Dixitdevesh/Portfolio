import React, { useState } from 'react';
import { DIGITAL_PROJECTS } from '../config/profile';
import type { DigitalProject } from '../types';
import { 
  Github, ExternalLink, Shield, 
  Activity, Lock, Eye 
} from 'lucide-react';

interface ModeWorksProps {
  onSelectProject: (project: DigitalProject) => void;
}

export const ModeWorks: React.FC<ModeWorksProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'intelligence' | 'security' | 'systems'>('all');

  const filteredProjects = DIGITAL_PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.discipline === activeFilter;
  });

  return (
    <section id="works" className="py-24 border-t border-canvas-border relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-left space-y-16">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-canvas-border pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-accent-gold uppercase tracking-wider font-semibold">
              <span>Selected Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              Featured Projects & Case Studies
            </h2>
            <p className="text-sm text-text-secondary font-sans max-w-2xl leading-relaxed">
              Every project here was built to solve a concrete problem or explore a technical challenge from the ground up—from static vulnerability analysis to peer-to-peer cryptography.
            </p>
          </div>

          {/* Discipline Filter Tabs */}
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'intelligence', label: 'AI & Vision' },
              { id: 'security', label: 'Cybersecurity' },
              { id: 'systems', label: 'Systems & Web' },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as any)}
                className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  activeFilter === filter.id
                    ? 'bg-accent-gold text-canvas-obsidian font-bold border-accent-gold'
                    : 'bg-canvas-card text-text-muted border-canvas-border hover:border-canvas-border-hover hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* 1. MedGuard AI */}
        {filteredProjects.some((p) => p.id === 'medguard-ai') && (
          <div className="sculpture-card rounded-2xl p-6 md:p-8 border border-canvas-border shadow-xl space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left: Project Details */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] font-mono text-accent-gold bg-accent-gold/10 border border-accent-gold/30 px-2.5 py-0.5 rounded-full font-semibold">
                    Computer Vision & Healthcare
                  </span>
                  <span className="text-[11px] font-mono text-accent-emerald bg-accent-emerald/10 border border-accent-emerald/20 px-2.5 py-0.5 rounded-full">
                    Completed & Deployed
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
                    MedGuard AI
                  </h3>
                  <p className="text-sm text-text-muted mt-1">
                    Extracting packaging details and verifying expiration dates using computer vision.
                  </p>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed font-sans">
                  Small, blurry expiration dates on medicine packaging cause expired drugs to go unnoticed. MedGuard AI lets patients upload a photo or scan with their camera. The app parses batch codes and manufacturer details, checks the date against server time, and compiles a clear verification report.
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Python', 'Flask', 'OpenAI Vision API', 'SQLite', 'ReportLab', 'Tailwind CSS'].map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs text-text-primary px-2.5 py-1 rounded bg-canvas-card border border-canvas-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <a
                    href="https://github.com/Dixitdevesh/MedGaurd_AI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-white bg-canvas-elevated hover:bg-canvas-card border border-canvas-border px-3.5 py-2 rounded-lg transition-all font-medium"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View GitHub Repo</span>
                  </a>
                  <a
                    href="https://med-gaurd-ai.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-accent-gold bg-accent-gold/10 hover:bg-accent-gold/20 border border-accent-gold/30 px-3.5 py-2 rounded-lg transition-all font-bold"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Live Demo</span>
                  </a>
                  <button
                    onClick={() => {
                      const p = DIGITAL_PROJECTS.find((x) => x.id === 'medguard-ai');
                      if (p) onSelectProject(p);
                    }}
                    className="text-xs text-text-muted hover:text-white transition-colors cursor-pointer"
                  >
                    Case Study Deep Dive &rarr;
                  </button>
                </div>
              </div>

              {/* Right: Architecture Steps */}
              <div className="lg:col-span-5 bg-canvas-obsidian/70 p-5 rounded-xl border border-canvas-border space-y-3 font-sans text-xs">
                <div className="flex items-center justify-between text-text-muted border-b border-canvas-border pb-2.5 font-mono text-[11px]">
                  <span className="flex items-center gap-1 text-accent-gold font-bold">
                    <Eye className="w-3.5 h-3.5" />
                    <span>How it works</span>
                  </span>
                  <span>Pipeline Overview</span>
                </div>

                <div className="space-y-2.5 text-text-secondary">
                  <div className="p-2.5 rounded-lg bg-canvas-card border border-canvas-border flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-accent-gold/20 text-accent-gold font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <div>
                      <strong className="text-white block font-medium">Image Capture</strong>
                      User uploads packaging photo; sanitized and sent to backend API.
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-canvas-card border border-canvas-border flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-accent-gold/20 text-accent-gold font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <div>
                      <strong className="text-white block font-medium">Vision Extraction</strong>
                      Vision model extracts batch, manufacturer, and date with strict JSON schema.
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-canvas-card border border-canvas-border flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-accent-gold/20 text-accent-gold font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <div>
                      <strong className="text-white block font-medium">Safety Verification</strong>
                      Date evaluated against clock; ReportLab generates downloadable PDF report.
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. SecureCode AI */}
        {filteredProjects.some((p) => p.id === 'securecode-ai') && (
          <div className="sculpture-card rounded-2xl p-6 md:p-8 border border-canvas-border shadow-xl space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left: Project Details */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] font-mono text-accent-crimson bg-accent-crimson/10 border border-accent-crimson/30 px-2.5 py-0.5 rounded-full font-semibold">
                    Defensive Security & SAST
                  </span>
                  <span className="text-[11px] font-mono text-accent-emerald bg-accent-emerald/10 border border-accent-emerald/20 px-2.5 py-0.5 rounded-full">
                    Completed Tool
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
                    SecureCode AI
                  </h3>
                  <p className="text-sm text-text-muted mt-1">
                    Static application security testing scanner with automated patch generation.
                  </p>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed font-sans">
                  I wanted to understand how static code analyzers detect vulnerabilities under the hood. SecureCode AI parses source files into Abstract Syntax Trees (AST) to flag dangerous patterns (SQL injection, XSS, insecure deserialization) and generates side-by-side remediation patches.
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Python', 'FastAPI', 'AST Parsing', 'Gemini API', 'React', 'Tailwind CSS', 'Pydantic'].map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs text-text-primary px-2.5 py-1 rounded bg-canvas-card border border-canvas-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <a
                    href="https://github.com/Dixitdevesh/SecureCode"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-white bg-canvas-elevated hover:bg-canvas-card border border-canvas-border px-3.5 py-2 rounded-lg transition-all font-medium"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View GitHub Repo</span>
                  </a>
                  <button
                    onClick={() => {
                      const p = DIGITAL_PROJECTS.find((x) => x.id === 'securecode-ai');
                      if (p) onSelectProject(p);
                    }}
                    className="text-xs text-accent-gold hover:underline cursor-pointer"
                  >
                    View AST Detection Rules &rarr;
                  </button>
                </div>
              </div>

              {/* Right: Code Vulnerability Snippet */}
              <div className="lg:col-span-5 bg-canvas-obsidian/85 p-5 rounded-xl border border-canvas-border space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-text-muted border-b border-canvas-border pb-2.5 text-[11px]">
                  <span className="flex items-center gap-1 text-accent-crimson font-bold">
                    <Shield className="w-3.5 h-3.5" />
                    <span>AST Pattern Matching</span>
                  </span>
                  <span>OWASP Top 10</span>
                </div>

                <div className="bg-[#0b0c10] p-3 rounded-lg border border-red-500/20 text-[11px] space-y-2 overflow-x-auto">
                  <div className="text-text-muted">// Vulnerable Sinks (SQL Injection):</div>
                  <div className="text-red-400">
                    cursor.execute(f"SELECT * FROM users WHERE user='&#123;input&#125;'")
                  </div>
                  <div className="text-text-muted pt-1">// Safe Remediated Patch:</div>
                  <div className="text-accent-emerald">
                    cursor.execute("SELECT * FROM users WHERE user=%s", (input,))
                  </div>
                </div>

                <p className="text-[11px] text-text-secondary font-sans leading-relaxed">
                  Scans Python and JavaScript files locally by visiting AST nodes, preventing external leak of source code.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* 3. VoidDrop */}
        {filteredProjects.some((p) => p.id === 'void-drop') && (
          <div className="sculpture-card rounded-2xl p-6 md:p-8 border border-canvas-border shadow-xl space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left: Project Details */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] font-mono text-accent-emerald bg-accent-emerald/10 border border-accent-emerald/30 px-2.5 py-0.5 rounded-full font-semibold">
                    P2P Cryptography & WebRTC
                  </span>
                  <span className="text-[11px] font-mono text-accent-emerald bg-accent-emerald/10 border border-accent-emerald/20 px-2.5 py-0.5 rounded-full">
                    Completed Tool
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
                    VoidDrop
                  </h3>
                  <p className="text-sm text-text-muted mt-1">
                    Zero-trace browser-to-browser file transfers with client-side AES-256.
                  </p>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed font-sans">
                  When transferring sensitive files, cloud drives leave server logs and stored data. VoidDrop pairs two browsers using a lightweight signaling server, negotiates direct WebRTC DataChannels, and streams binary chunks encrypted locally with AES-256—zero bytes stored on any server.
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Next.js', 'FastAPI', 'WebSockets', 'WebRTC DataChannels', 'Crypto-JS (AES-256)', 'Three.js'].map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs text-text-primary px-2.5 py-1 rounded bg-canvas-card border border-canvas-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <a
                    href="https://github.com/Dixitdevesh/Void_Drop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-white bg-canvas-elevated hover:bg-canvas-card border border-canvas-border px-3.5 py-2 rounded-lg transition-all font-medium"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View GitHub Repo</span>
                  </a>
                  <button
                    onClick={() => {
                      const p = DIGITAL_PROJECTS.find((x) => x.id === 'void-drop');
                      if (p) onSelectProject(p);
                    }}
                    className="text-xs text-accent-gold hover:underline cursor-pointer"
                  >
                    View Cryptographic Flow &rarr;
                  </button>
                </div>
              </div>

              {/* Right: P2P Flow Card */}
              <div className="lg:col-span-5 bg-canvas-obsidian/70 p-5 rounded-xl border border-canvas-border space-y-3 font-sans text-xs">
                <div className="flex items-center justify-between text-text-muted border-b border-canvas-border pb-2.5 font-mono text-[11px]">
                  <span className="flex items-center gap-1 text-accent-emerald font-bold">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Direct WebRTC Channel</span>
                  </span>
                  <span>AES-256</span>
                </div>

                <div className="space-y-2 text-text-secondary text-[11px]">
                  <div className="p-2.5 rounded bg-canvas-card border border-canvas-border">
                    <strong className="text-white block font-mono text-xs">1. Signaling Relay</strong>
                    Clients exchange SDP handshake via ephemeral FastAPI WebSockets.
                  </div>
                  <div className="p-2.5 rounded bg-canvas-card border border-canvas-border">
                    <strong className="text-white block font-mono text-xs">2. In-Browser Encryption</strong>
                    Files sliced into binary ArrayBuffer chunks encrypted with AES-256.
                  </div>
                  <div className="p-2.5 rounded bg-canvas-card border border-canvas-border">
                    <strong className="text-white block font-mono text-xs">3. Direct Transfer</strong>
                    Chunks stream directly over SCTP data channels with buffer monitoring.
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 4. A.E.T.H.E.R */}
        {filteredProjects.some((p) => p.id === 'aether-voice') && (
          <div className="sculpture-card rounded-2xl p-6 md:p-8 border border-canvas-border shadow-xl space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] font-mono text-accent-indigo bg-accent-indigo/10 border border-accent-indigo/30 px-2.5 py-0.5 rounded-full font-semibold">
                    Voice AI & Desktop Automation
                  </span>
                  <span className="text-[11px] font-mono text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2.5 py-0.5 rounded-full">
                    Active Beta
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
                    A.E.T.H.E.R
                  </h3>
                  <p className="text-sm text-text-muted mt-1">
                    Native desktop companion streaming bidirectional audio with Gemini Live Native Audio API.
                  </p>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed font-sans">
                  Traditional voice bots feel sluggish because they chain Speech-to-Text, text processing, and Text-to-Speech in sequence. A.E.T.H.E.R streams raw PCM audio packets directly with Google's Gemini Live API, achieving natural conversational interruptions and sub-second response times while controlling desktop utilities.
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Python', 'Gemini Live Native Audio', 'sounddevice', 'Asyncio', 'Windows API', 'PyTTSX3'].map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs text-text-primary px-2.5 py-1 rounded bg-canvas-card border border-canvas-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <a
                    href="https://github.com/Dixitdevesh/A.E.T.H.E.R"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-white bg-canvas-elevated hover:bg-canvas-card border border-canvas-border px-3.5 py-2 rounded-lg transition-all font-medium"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View GitHub Repo</span>
                  </a>
                  <button
                    onClick={() => {
                      const p = DIGITAL_PROJECTS.find((x) => x.id === 'aether-voice');
                      if (p) onSelectProject(p);
                    }}
                    className="text-xs text-accent-gold hover:underline cursor-pointer"
                  >
                    View Streaming Architecture &rarr;
                  </button>
                </div>
              </div>

              {/* Right: Audio Waveform card */}
              <div className="lg:col-span-5 bg-canvas-obsidian/70 p-5 rounded-xl border border-canvas-border space-y-3 font-sans text-xs">
                <div className="flex items-center justify-between text-text-muted border-b border-canvas-border pb-2.5 font-mono text-[11px]">
                  <span className="flex items-center gap-1 text-accent-indigo font-bold">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Streaming Audio Latency</span>
                  </span>
                  <span>~450ms</span>
                </div>

                <div className="flex items-end justify-between h-16 gap-1 px-2 bg-canvas-card rounded-lg border border-canvas-border py-2">
                  {[25, 50, 75, 45, 85, 60, 40, 70, 90, 50, 65, 80, 35, 75, 95].map((h, i) => (
                    <div
                      key={i}
                      className="w-2 bg-accent-indigo rounded-full transition-all duration-300"
                      style={{ height: `${h}%`, opacity: 0.6 + h / 250 }}
                    />
                  ))}
                </div>

                <p className="text-[11px] text-text-secondary leading-relaxed pt-1">
                  Processes streaming audio chunks asynchronously via Python sounddevice and Windows system APIs.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* Additional Real Work */}
        <div className="space-y-6 pt-4">
          <h4 className="text-lg font-bold text-white font-sans">
            Additional Practical Projects
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProjects
              .filter((p) => ['shivansh-krashi', 'ai-researcher', 'pg-finder'].includes(p.id))
              .map((project) => (
                <div
                  key={project.id}
                  className="sculpture-card p-6 rounded-2xl border border-canvas-border flex flex-col justify-between space-y-4 hover:border-canvas-border-hover transition-colors text-left"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-accent-gold font-bold uppercase">{project.discipline}</span>
                      <span className="text-text-muted uppercase">{project.status}</span>
                    </div>

                    <h5 className="text-xl font-bold text-white font-sans">{project.name}</h5>
                    <p className="text-xs text-text-secondary leading-relaxed font-sans">
                      {project.shortDesc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="font-mono text-[10px] text-text-muted bg-canvas-card px-2 py-0.5 rounded border border-canvas-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-canvas-border flex items-center justify-between font-mono text-xs">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-white flex items-center gap-1 font-sans"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-gold hover:underline flex items-center gap-1 font-sans font-medium"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live</span>
                      </a>
                    )}
                    <button
                      onClick={() => onSelectProject(project)}
                      className="text-white hover:text-accent-gold cursor-pointer font-sans"
                    >
                      Details &rarr;
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

      </div>
    </section>
  );
};
