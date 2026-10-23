import React, { useState } from 'react';
import { DigitalSculpture } from '../components/sculpture/DigitalSculpture';
import { DigitalSculpture2D } from '../components/sculpture/DigitalSculpture2D';
import { useDiscovery } from '../context/DiscoveryContext';
import { PROFILE } from '../config/profile';
import type { SculptureNode, Discipline } from '../types';
import { ArrowDown, Layers, Shield, Cpu, Code2, Award, FileDown, ArrowRight } from 'lucide-react';

interface ModeFormProps {
  onNodeSelect: (node: SculptureNode) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const ModeForm: React.FC<ModeFormProps> = ({
  onNodeSelect,
  onNavigateSection,
}) => {
  const { currentPalette, wireframeActive, renderMode2D } = useDiscovery();
  const [activeDiscipline, setActiveDiscipline] = useState<Discipline | 'all'>('all');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const disciplineFilters: Array<{
    id: Discipline | 'all';
    label: string;
    icon: React.ReactNode;
  }> = [
    { id: 'all', label: 'All Projects', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'intelligence', label: 'AI & Vision', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'security', label: 'Cybersecurity', icon: <Shield className="w-3.5 h-3.5" /> },
    { id: 'systems', label: 'Software Systems', icon: <Code2 className="w-3.5 h-3.5" /> },
    { id: 'evidence', label: 'Competitions', icon: <Award className="w-3.5 h-3.5" /> },
  ];

  return (
    <section id="form" className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden">
      {/* Top Editorial Identity Block */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full text-left space-y-6 z-10">
        
        {/* Warm Personal Badge */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-canvas-card border border-canvas-border text-xs text-text-secondary">
          <span className="w-2 h-2 rounded-full bg-accent-gold harmonic-pulse"></span>
          <span>Computer Science Undergraduate • GLA University</span>
          <span className="text-canvas-border">•</span>
          <span className="text-accent-gold font-mono text-[11px]">Mathura, India</span>
        </div>

        {/* Editorial Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-sans">
            Hi, I'm <span className="text-accent-gold font-serif italic font-normal">{PROFILE.name}</span>.
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary font-sans max-w-2xl leading-relaxed">
            I build practical software, investigate cybersecurity from first principles, and experiment with intelligent systems.
          </p>
          <p className="text-sm text-text-muted font-sans max-w-xl leading-relaxed">
            Below is an interactive visual model mapping my real codebases, security tools, and hackathon milestones. Drag to rotate and click any node to read the case study—or scroll down to browse everything normally.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => onNavigateSection('works')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-gold text-canvas-obsidian font-bold text-xs hover:bg-accent-gold-light transition-all shadow-md cursor-pointer"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <a
            href={`/${PROFILE.resumePath}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-canvas-card border border-canvas-border hover:border-canvas-border-hover text-white text-xs transition-all"
          >
            <FileDown className="w-3.5 h-3.5 text-accent-gold" />
            <span>Download Resume</span>
          </a>
          <button
            onClick={() => onNavigateSection('human')}
            className="px-4 py-2.5 text-xs text-text-muted hover:text-white transition-colors cursor-pointer"
          >
            About Me &rarr;
          </button>
        </div>

      </div>

      {/* The Interactive Visual Centerpiece */}
      <div className="relative w-full my-4 flex-1 flex flex-col items-center justify-center">
        {renderMode2D ? (
          <DigitalSculpture2D
            onNodeSelect={onNodeSelect}
            activeDiscipline={activeDiscipline}
            palette={currentPalette}
            wireframe={wireframeActive}
            hoveredNodeId={hoveredNodeId}
            setHoveredNodeId={setHoveredNodeId}
          />
        ) : (
          <DigitalSculpture
            onNodeSelect={onNodeSelect}
            activeDiscipline={activeDiscipline}
            palette={currentPalette}
            wireframe={wireframeActive}
            hoveredNodeId={hoveredNodeId}
            setHoveredNodeId={setHoveredNodeId}
          />
        )}

        {/* Strata Filtering Strip Over Sculpture */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 flex flex-wrap justify-center gap-1.5 p-1 rounded-full bg-canvas-card/90 backdrop-blur-md border border-canvas-border max-w-[95%] shadow-lg">
          {disciplineFilters.map((filter) => {
            const isActive = activeDiscipline === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveDiscipline(filter.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-accent-gold text-canvas-obsidian font-bold shadow-sm'
                    : 'text-text-muted hover:text-white hover:bg-canvas-card'
                }`}
              >
                <span>{filter.icon}</span>
                <span>{filter.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subtle Scroll Hint */}
      <div className="pt-4 flex justify-center text-xs text-text-muted">
        <button
          onClick={() => onNavigateSection('works')}
          className="flex items-center gap-1.5 hover:text-accent-gold transition-colors cursor-pointer"
        >
          <span>Scroll down to explore project case studies</span>
          <ArrowDown className="w-3.5 h-3.5 text-accent-gold animate-bounce" />
        </button>
      </div>
    </section>
  );
};
