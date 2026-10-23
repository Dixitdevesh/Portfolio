import React, { useState, useMemo } from 'react';
import { SCULPTURE_NODES, DIGITAL_PROJECTS } from '../config/profile';
import type { SculptureNode, Discipline } from '../types';
import { Search, List, Grid, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface ModeStructureProps {
  onNodeSelect: (node: SculptureNode) => void;
}

export const ModeStructure: React.FC<ModeStructureProps> = ({ onNodeSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | 'all'>('all');
  const [viewMode, setViewMode] = useState<'constellation' | 'list'>('constellation');

  const filteredNodes = useMemo(() => {
    return SCULPTURE_NODES.filter((node) => {
      const matchesSearch =
        node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.skillsDemonstrated.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesDiscipline =
        selectedDiscipline === 'all' || node.discipline === selectedDiscipline;

      return matchesSearch && matchesDiscipline;
    });
  }, [searchTerm, selectedDiscipline]);

  return (
    <section id="structure" className="py-24 border-t border-canvas-border relative bg-canvas-deep/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-left space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-canvas-border pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-accent-gold uppercase tracking-wider font-semibold">
              <span>Knowledge Map</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              Interactive Skill & Project Map
            </h2>
            <p className="text-sm text-text-secondary font-sans max-w-2xl leading-relaxed">
              Explore how my technical interests connect to concrete software projects. Every node here is linked to actual source code, challenge write-ups, or verified competition records.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 self-start md:self-auto text-xs font-mono">
            <span className="text-text-muted">Layout:</span>
            <div className="flex bg-canvas-card p-0.5 rounded-lg border border-canvas-border">
              <button
                onClick={() => setViewMode('constellation')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all cursor-pointer ${
                  viewMode === 'constellation'
                    ? 'bg-accent-gold text-canvas-obsidian font-bold'
                    : 'text-text-muted hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Cards</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-accent-gold text-canvas-obsidian font-bold'
                    : 'text-text-muted hover:text-white'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Table</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between text-xs">
          {/* Search Box */}
          <div className="relative w-full md:max-w-md flex items-center bg-canvas-card border border-canvas-border rounded-xl px-3.5 py-2.5 text-text-muted focus-within:border-accent-gold transition-colors">
            <Search className="w-4 h-4 text-text-muted mr-2.5 shrink-0" />
            <input
              type="text"
              placeholder="Search by technology (e.g. Python, WebRTC, AST, Django)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none font-sans text-xs w-full text-white placeholder-text-muted/60"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'intelligence', label: 'AI & Vision' },
              { id: 'security', label: 'Cybersecurity' },
              { id: 'systems', label: 'Systems & Web' },
              { id: 'evidence', label: 'Milestones' },
            ].map((disc) => (
              <button
                key={disc.id}
                onClick={() => setSelectedDiscipline(disc.id as any)}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  selectedDiscipline === disc.id
                    ? 'bg-accent-gold text-canvas-obsidian font-bold border-accent-gold'
                    : 'bg-canvas-card text-text-muted border-canvas-border hover:border-canvas-border-hover hover:text-white'
                }`}
              >
                {disc.label}
              </button>
            ))}
          </div>
        </div>

        {/* CARDS VIEW */}
        {viewMode === 'constellation' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNodes.map((node) => {
              const project = node.projectId
                ? DIGITAL_PROJECTS.find((p) => p.id === node.projectId)
                : null;

              return (
                <div
                  key={node.id}
                  onClick={() => onNodeSelect(node)}
                  className="sculpture-card rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:translate-y-[-2px] transition-transform cursor-pointer group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span
                        className="px-2.5 py-0.5 rounded-full font-medium font-mono text-[10px]"
                        style={{
                          backgroundColor: `${node.color}15`,
                          color: node.color,
                          border: `1px solid ${node.color}40`,
                        }}
                      >
                        {node.categoryLabel}
                      </span>
                      <span className="text-text-muted text-[11px] font-mono">
                        {node.provenance === 'official-certificate' ? 'Verified Certificate' : 'Source Repo'}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-accent-gold transition-colors font-sans flex items-center justify-between">
                        <span>{node.label}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent-gold" />
                      </h3>
                      <p className="text-xs text-text-muted mt-0.5 font-sans">
                        {node.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-text-secondary leading-relaxed font-sans line-clamp-3">
                      {node.summary}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-canvas-border">
                    <div className="flex flex-wrap gap-1.5">
                      {node.skillsDemonstrated.map((skill, idx) => (
                        <span
                          key={idx}
                          className="font-mono text-[10px] text-text-secondary bg-canvas-card border border-canvas-border px-2 py-0.5 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="pt-1 flex items-center justify-between text-xs">
                      <span className="text-accent-gold font-medium group-hover:underline flex items-center gap-1">
                        Read Case Study &rarr;
                      </span>
                      {project?.demoUrl && (
                        <span className="text-[11px] text-accent-emerald flex items-center gap-1 font-mono">
                          <CheckCircle2 className="w-3 h-3" /> Live Demo
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ACCESSIBLE TABLE VIEW */
          <div className="overflow-x-auto rounded-xl border border-canvas-border bg-canvas-card">
            <table className="w-full text-left text-xs border-collapse font-sans" aria-label="Structured Portfolio Nodes List">
              <thead>
                <tr className="border-b border-canvas-border bg-canvas-elevated/70 text-text-muted text-[11px] uppercase tracking-wider font-mono">
                  <th className="py-3 px-4 font-bold">Project / Skill</th>
                  <th className="py-3 px-4 font-bold">Discipline</th>
                  <th className="py-3 px-4 font-bold">Key Technologies</th>
                  <th className="py-3 px-4 font-bold">Evidence Type</th>
                  <th className="py-3 px-4 font-bold text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-canvas-border text-text-secondary">
                {filteredNodes.map((node) => (
                  <tr
                    key={node.id}
                    className="hover:bg-canvas-elevated/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-medium text-white">
                      <div>{node.label}</div>
                      <div className="text-[11px] text-text-muted font-normal">
                        {node.subtitle}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className="px-2 py-0.5 rounded text-[11px] font-mono"
                        style={{ color: node.color }}
                      >
                        {node.discipline}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {node.skillsDemonstrated.map((s, i) => (
                          <span
                            key={i}
                            className="bg-canvas-surface border border-canvas-border px-1.5 py-0.5 rounded text-[10px]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[11px] text-text-muted font-mono">
                      {node.provenance === 'official-certificate' ? 'Verified Certificate' : 'Source Repo'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onNodeSelect(node)}
                        className="px-3 py-1 rounded bg-accent-gold/10 hover:bg-accent-gold/20 text-accent-gold font-medium text-xs transition-colors cursor-pointer"
                      >
                        Explore
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredNodes.length === 0 && (
          <div className="py-16 text-center border border-dashed border-canvas-border rounded-2xl text-sm text-text-muted space-y-2">
            <div>No matching projects or skills found for "{searchTerm}".</div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDiscipline('all');
              }}
              className="text-accent-gold hover:underline text-xs"
            >
              Clear Search
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
