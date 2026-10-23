import React, { useState } from 'react';
import { PROFILE, SKILLS_MATRIX } from '../config/profile';
import { 
  FileDown, Mail, Linkedin, Github, MapPin, 
  GraduationCap, Send, Sparkles, BookOpen 
} from 'lucide-react';

export const ModeHuman: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [messageName, setMessageName] = useState('');
  const [messageText, setMessageText] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Message from ${messageName || 'Colleague'}`);
    const body = encodeURIComponent(messageText);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="human" className="py-24 border-t border-canvas-border relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-left space-y-16">
        
        {/* Section Heading */}
        <div className="space-y-3 border-b border-canvas-border pb-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-accent-gold uppercase tracking-wider font-semibold">
            <span>The Developer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            About Me & Contact
          </h2>
          <p className="text-sm text-text-secondary font-sans max-w-2xl leading-relaxed">
            A personal account of my background, academic studies in Computer Science at GLA University, and technical philosophy.
          </p>
        </div>

        {/* Story & Education Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Personal Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-sm sm:text-base text-text-secondary font-sans leading-relaxed">
              <h3 className="text-xl font-bold text-white font-sans">
                {PROFILE.aboutStory.greeting}
              </h3>
              {PROFILE.aboutStory.paragraphs.map((para, idx) => (
                <p key={idx} className="leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Current Curiosities */}
            <div className="sculpture-card p-6 rounded-2xl border border-canvas-border space-y-3 bg-canvas-card/60">
              <div className="flex items-center gap-2 text-xs text-accent-gold font-bold uppercase tracking-wider font-mono">
                <BookOpen className="w-4 h-4" />
                <span>What I'm currently exploring</span>
              </div>
              <ul className="space-y-2 text-xs text-text-secondary font-sans">
                {PROFILE.currentCuriosities.map((inq, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-accent-gold font-mono">&rarr;</span>
                    <span>{inq}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Education Profile */}
            <div className="sculpture-card p-6 rounded-2xl border border-canvas-border space-y-3">
              <div className="flex items-center gap-2 text-xs text-white font-bold uppercase tracking-wider font-mono">
                <GraduationCap className="w-4 h-4 text-accent-gold" />
                <span>Education</span>
              </div>
              <div className="space-y-1">
                <div className="text-base font-bold text-white font-sans">
                  {PROFILE.education.degree}
                </div>
                <div className="text-sm text-accent-gold font-sans font-medium">
                  {PROFILE.education.institution}
                </div>
                <div className="text-xs text-text-muted font-sans flex items-center gap-3 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {PROFILE.education.location}
                  </span>
                  <span>•</span>
                  <span>Class of {PROFILE.education.expectedGraduation}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-canvas-border">
                <div className="text-[11px] font-mono text-text-muted uppercase mb-2">
                  Key Coursework
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {PROFILE.education.coursework.map((course, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono text-text-secondary bg-canvas-elevated px-2.5 py-1 rounded border border-canvas-border"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Card & Message Form */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="sculpture-card p-6 rounded-2xl border border-canvas-border space-y-5">
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-white font-sans">
                  Let's get in touch
                </h3>
                <p className="text-xs text-text-muted">
                  Open for software engineering internships, security research, and collaborations.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 text-xs">
                {/* Download Resume Button */}
                <a
                  href={`/${PROFILE.resumePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-accent-gold text-canvas-obsidian font-bold shadow-md hover:bg-accent-gold-light transition-all"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Full Resume (PDF)</span>
                </a>

                {/* Copy Email Button */}
                <button
                  onClick={handleCopyEmail}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-canvas-card border border-canvas-border hover:border-canvas-border-hover text-white transition-all cursor-pointer font-sans"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-accent-gold" />
                    <span className="truncate">{PROFILE.email}</span>
                  </span>
                  <span className="text-[11px] text-accent-gold font-mono font-medium shrink-0">
                    {copiedEmail ? 'Copied!' : 'Copy'}
                  </span>
                </button>

                {/* Social Links */}
                <div className="grid grid-cols-2 gap-2 font-sans">
                  <a
                    href={PROFILE.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-canvas-card border border-canvas-border hover:border-canvas-border-hover text-text-secondary hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-accent-gold" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={`https://github.com/${PROFILE.githubUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-canvas-card border border-canvas-border hover:border-canvas-border-hover text-text-secondary hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4 text-accent-gold" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Message Form */}
            <form
              onSubmit={handleSendMessage}
              className="sculpture-card p-6 rounded-2xl border border-canvas-border space-y-4 text-xs font-sans"
            >
              <div className="flex items-center gap-2 font-bold text-white">
                <Send className="w-4 h-4 text-accent-gold" />
                <span>Send a quick message</span>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-text-muted">Your Name or Organization</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex (Engineering Manager)"
                  value={messageName}
                  onChange={(e) => setMessageName(e.target.value)}
                  className="w-full bg-canvas-card border border-canvas-border rounded-lg p-2.5 text-white placeholder-text-muted/60 focus:border-accent-gold outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-text-muted">Message</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Let's build something together or discuss an opportunity..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full bg-canvas-card border border-canvas-border rounded-lg p-2.5 text-white placeholder-text-muted/60 focus:border-accent-gold outline-none resize-none font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-canvas-elevated hover:bg-canvas-card border border-canvas-border hover:border-accent-gold text-white font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Send via Email</span>
                <Send className="w-3.5 h-3.5 text-accent-gold" />
              </button>
            </form>

          </div>
        </div>

        {/* VERIFIED SKILLS MATRIX */}
        <div className="space-y-6 pt-8 border-t border-canvas-border">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-accent-gold uppercase font-mono">
              <Sparkles className="w-4 h-4" />
              <span>Skills & Technologies</span>
            </div>
            <p className="text-xs text-text-secondary font-sans max-w-2xl">
              Technologies I regularly use and the projects where I put them into practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILLS_MATRIX.map((cat, idx) => (
              <div
                key={idx}
                className="sculpture-card p-6 rounded-2xl border border-canvas-border space-y-4 text-left"
              >
                <h4 className="text-sm font-bold text-white font-sans border-b border-canvas-border pb-3">
                  {cat.category}
                </h4>

                <div className="space-y-2.5 text-xs font-sans">
                  {cat.items.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-xl bg-canvas-card border border-canvas-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5"
                    >
                      <div>
                        <div className="font-medium text-white flex items-center gap-2">
                          <span>{skill.name}</span>
                          <span className="text-[11px] text-accent-gold font-normal">
                            ({skill.level})
                          </span>
                        </div>
                        <div className="text-[11px] text-text-secondary mt-0.5">
                          {skill.evidenceDescription}
                        </div>
                      </div>

                      {skill.evidenceProject && (
                        <span className="text-[10px] text-accent-emerald bg-accent-emerald/10 border border-accent-emerald/20 px-2 py-0.5 rounded self-start sm:self-auto shrink-0 font-mono">
                          Project Proven
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-10 border-t border-canvas-border text-center space-y-2 text-xs text-text-muted">
          <div className="font-medium text-text-secondary">
            {PROFILE.name} • GLA University Computer Science & Engineering
          </div>
          <div>
            Built with React 19, TypeScript, Three.js, and Tailwind CSS.
          </div>
        </div>

      </div>
    </section>
  );
};
