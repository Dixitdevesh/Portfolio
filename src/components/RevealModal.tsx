import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ExternalLink, Github, Shield, Cpu, Code2, 
  CheckCircle2, ArrowLeft, ArrowRight, BookOpen, FileText 
} from 'lucide-react';
import { DIGITAL_PROJECTS, VERIFIED_ACHIEVEMENTS } from '../config/profile';
import type { SculptureNode } from '../types';

interface RevealModalProps {
  node: SculptureNode | null;
  onClose: () => void;
  onNavigateNode?: (direction: 'prev' | 'next') => void;
}

export const RevealModal: React.FC<RevealModalProps> = ({
  node,
  onClose,
  onNavigateNode,
}) => {
  // ESC to close and Arrow keys to navigate between nodes
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onNavigateNode) {
        onNavigateNode('prev');
      } else if (e.key === 'ArrowRight' && onNavigateNode) {
        onNavigateNode('next');
      }
    },
    [onClose, onNavigateNode]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!node) return null;

  const linkedProject = node.projectId
    ? DIGITAL_PROJECTS.find((p) => p.id === node.projectId)
    : null;

  const linkedAchievement = node.evidenceId
    ? VERIFIED_ACHIEVEMENTS.find((a) => a.id === node.evidenceId)
    : null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl max-h-[88vh] flex flex-col sculpture-card rounded-2xl border border-canvas-border overflow-hidden shadow-2xl bg-canvas-surface/98"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-canvas-border px-6 py-4 bg-canvas-elevated/70 select-none">
            <div className="flex items-center gap-2.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: node.color }}
              />
              <span className="font-mono text-xs text-accent-gold font-semibold uppercase tracking-wider">
                {node.categoryLabel}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {onNavigateNode && (
                <div className="hidden sm:flex items-center gap-1 border-r border-canvas-border pr-2 mr-1">
                  <button
                    onClick={() => onNavigateNode('prev')}
                    className="p-1.5 text-text-muted hover:text-white rounded hover:bg-canvas-card transition-colors cursor-pointer"
                    title="Previous Item (Left Arrow)"
                    aria-label="Previous item"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onNavigateNode('next')}
                    className="p-1.5 text-text-muted hover:text-white rounded hover:bg-canvas-card transition-colors cursor-pointer"
                    title="Next Item (Right Arrow)"
                    aria-label="Next item"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 text-xs text-text-muted hover:text-white px-2.5 py-1 rounded-lg bg-canvas-card border border-canvas-border hover:border-canvas-border-hover transition-all cursor-pointer font-sans"
                aria-label="Close modal"
              >
                <span>Close [Esc]</span>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Body / Case Study Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 text-left">
            {/* Title & Subtitle */}
            <div className="space-y-1.5">
              <h2
                id="case-study-title"
                className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-sans"
              >
                {node.label}
              </h2>
              <p className="text-sm text-text-muted font-sans">
                {node.subtitle}
              </p>
            </div>

            {/* Narrative / Context */}
            <div className="sculpture-card p-4 sm:p-5 rounded-xl border border-canvas-border bg-canvas-card/60 space-y-1.5">
              <div className="text-[11px] font-mono font-bold text-accent-gold uppercase tracking-wider">
                Overview
              </div>
              <p className="text-xs sm:text-sm text-text-secondary font-sans leading-relaxed">
                {node.summary}
              </p>
            </div>

            {/* If Linked to a Project */}
            {linkedProject && (
              <div className="space-y-6 border-t border-canvas-border pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-white font-bold font-sans">
                    {linkedProject.discipline === 'intelligence' ? (
                      <Cpu className="w-4 h-4 text-accent-gold" />
                    ) : linkedProject.discipline === 'security' ? (
                      <Shield className="w-4 h-4 text-accent-crimson" />
                    ) : (
                      <Code2 className="w-4 h-4 text-accent-indigo" />
                    )}
                    <span>Technical Architecture: {linkedProject.name}</span>
                  </div>
                  <span className="text-[11px] font-mono text-accent-emerald bg-accent-emerald/10 border border-accent-emerald/20 px-2 py-0.5 rounded">
                    Status: {linkedProject.status}
                  </span>
                </div>

                {/* Problem vs Pipeline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="sculpture-card p-4 rounded-xl space-y-1.5 border border-canvas-border">
                    <span className="text-[11px] font-mono text-text-muted uppercase font-bold">
                      The Problem & Motivation
                    </span>
                    <p className="text-xs text-text-secondary leading-relaxed font-sans">
                      {linkedProject.whyBuilt}
                    </p>
                  </div>
                  <div className="sculpture-card p-4 rounded-xl space-y-1.5 border border-canvas-border">
                    <span className="text-[11px] font-mono text-text-muted uppercase font-bold">
                      Implementation Pipeline
                    </span>
                    <p className="text-xs text-text-secondary leading-relaxed font-sans">
                      {linkedProject.architectureDetails}
                    </p>
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-text-muted uppercase font-bold">
                    Key Features & Technical Decisions
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {linkedProject.keyFeatures.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-text-secondary font-sans bg-canvas-card p-2.5 rounded-lg border border-canvas-border"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-gold shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What I Learned */}
                <div className="sculpture-card p-4 rounded-xl space-y-1.5 border border-canvas-border bg-canvas-card">
                  <span className="text-[11px] font-mono text-accent-gold uppercase font-bold flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>What I Learned Building This</span>
                  </span>
                  <p className="text-xs text-text-secondary leading-relaxed font-sans">
                    {linkedProject.whatLearned}
                  </p>
                </div>
              </div>
            )}

            {/* If Linked to a Certificate / Hackathon */}
            {linkedAchievement && (
              <div className="space-y-4 border-t border-canvas-border pt-6">
                <div className="flex items-center gap-2 text-xs text-accent-gold font-bold font-sans">
                  <FileText className="w-4 h-4" />
                  <span>Verified Hackathon Milestone: {linkedAchievement.event}</span>
                </div>
                <div className="sculpture-card p-5 rounded-xl border border-canvas-border space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white font-sans text-sm">
                      {linkedAchievement.title}
                    </span>
                    <span className="text-text-muted font-mono">
                      {linkedAchievement.date}
                    </span>
                  </div>
                  {linkedAchievement.description && (
                    <p className="text-xs text-text-secondary font-sans leading-relaxed">
                      {linkedAchievement.description}
                    </p>
                  )}
                  {linkedAchievement.image && (
                    <div className="rounded-xl overflow-hidden border border-canvas-border mt-3">
                      <img
                        src={`/${linkedAchievement.image}`}
                        alt={linkedAchievement.title}
                        className="w-full max-h-64 object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Skills & Technologies */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-mono text-text-muted uppercase font-bold">
                Technologies Used
              </span>
              <div className="flex flex-wrap gap-1.5">
                {node.skillsDemonstrated.map((skill, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs text-text-primary px-3 py-1 rounded-full bg-canvas-card border border-canvas-border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-canvas-border px-6 py-4 bg-canvas-elevated/70 flex flex-wrap items-center justify-between gap-3 select-none">
            <div className="flex items-center gap-2">
              {node.githubUrl && (
                <a
                  href={node.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-white bg-canvas-card hover:bg-canvas-card/80 border border-canvas-border px-3.5 py-2 rounded-lg transition-all font-medium font-sans"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View GitHub Repository</span>
                </a>
              )}
              {node.externalUrl && (
                <a
                  href={node.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-accent-gold bg-accent-gold/10 hover:bg-accent-gold/20 border border-accent-gold/30 px-3.5 py-2 rounded-lg transition-all font-bold font-sans"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Live Project</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="text-xs text-text-muted hover:text-white px-3 py-2 cursor-pointer transition-colors font-sans"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
