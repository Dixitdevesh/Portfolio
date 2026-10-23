import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, RotateCcw, X, Check, Box, Eye, Sparkles } from 'lucide-react';
import { useDiscovery } from '../context/DiscoveryContext';
import { SCULPTURE_NODES } from '../config/profile';
import type { SculpturePalette } from '../types';

export const ChronicleOfDiscovery: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    discoveredNodeIds,
    currentPalette,
    setPalette,
    unlockedPalettes,
    wireframeActive,
    setWireframeActive,
    renderMode2D,
    setRenderMode2D,
    resetDiscoveryTrail,
    totalNodesCount,
  } = useDiscovery();

  const palettesInfo: Array<{
    id: SculpturePalette;
    name: string;
    description: string;
    accent: string;
    required: number;
  }> = [
    {
      id: 'obsidian-gold',
      name: 'Gallery Gold',
      description: 'Default warm champagne gold and charcoal finish.',
      accent: '#e5b869',
      required: 0,
    },
    {
      id: 'deep-bronze',
      name: 'Warm Bronze',
      description: 'Burnished amber and copper tones.',
      accent: '#c59b58',
      required: 2,
    },
    {
      id: 'spectral-alabaster',
      name: 'Frosted Quartz',
      description: 'Clean silver-white and slate tones.',
      accent: '#f9fafb',
      required: 4,
    },
    {
      id: 'cosmic-carbon',
      name: 'Deep Emerald',
      description: 'Subtle emerald accents inspired by terminal security tools.',
      accent: '#34d399',
      required: 6,
    },
  ];

  return (
    <>
      {/* Trigger pill */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-xs text-text-secondary hover:text-white px-3 py-1.5 rounded-full bg-canvas-card border border-canvas-border hover:border-canvas-border-hover transition-all cursor-pointer backdrop-blur-md"
        title="Customize 3D model finishes and view progress"
        aria-label="Interactive 3D model settings"
      >
        <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
        <span className="font-sans">Model Settings</span>
        <span className="text-accent-gold font-mono text-[11px] font-semibold">
          {discoveredNodeIds.length}/{totalNodesCount}
        </span>
      </button>

      {/* Slide-over Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-screen max-w-md bg-canvas-surface border-l border-canvas-border shadow-2xl p-6 md:p-8 flex flex-col justify-between overflow-y-auto"
              >
                {/* Header */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-canvas-border pb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-accent-gold" />
                      <h3 className="text-sm font-bold text-white font-sans">
                        Interactive Model Settings
                      </h3>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-1 text-text-muted hover:text-white rounded transition-colors"
                      aria-label="Close settings"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-xs text-text-secondary font-sans leading-relaxed">
                    As you click and explore projects in the 3D model, you can unlock different visual themes, switch between 3D WebGL and 2D Canvas, or toggle wireframe lines.
                  </p>

                  {/* Progress Meter */}
                  <div className="sculpture-card p-4 rounded-xl border border-canvas-border space-y-2.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-text-muted">Projects & Milestones Explored</span>
                      <span className="text-accent-gold font-mono font-bold">
                        {discoveredNodeIds.length} of {totalNodesCount}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-canvas-card rounded-full overflow-hidden border border-canvas-border">
                      <div
                        className="h-full bg-accent-gold transition-all duration-500 rounded-full"
                        style={{ width: `${(discoveredNodeIds.length / totalNodesCount) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Discovered Items List */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-text-muted uppercase font-bold">
                      Explored Items
                    </span>
                    <div className="grid grid-cols-1 gap-1.5 max-h-36 overflow-y-auto pr-1">
                      {SCULPTURE_NODES.map((node) => {
                        const isDiscovered = discoveredNodeIds.includes(node.id);
                        return (
                          <div
                            key={node.id}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg border text-xs transition-colors ${
                              isDiscovered
                                ? 'bg-canvas-card border-canvas-border text-white'
                                : 'bg-transparent border-canvas-border/40 text-text-muted opacity-50'
                            }`}
                          >
                            <span className="truncate">{node.label}</span>
                            {isDiscovered ? (
                              <Check className="w-3.5 h-3.5 text-accent-gold shrink-0" />
                            ) : (
                              <span className="text-[10px] text-text-muted font-mono">Unvisited</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Visual Palettes */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-1.5">
                      <Palette className="w-4 h-4 text-accent-gold" />
                      <span className="text-[11px] font-mono text-text-muted uppercase font-bold">
                        Visual Finishes
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {palettesInfo.map((p) => {
                        const isUnlocked = unlockedPalettes.includes(p.id);
                        const isCurrent = currentPalette === p.id;

                        return (
                          <button
                            key={p.id}
                            disabled={!isUnlocked}
                            onClick={() => setPalette(p.id)}
                            className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              isCurrent
                                ? 'border-accent-gold bg-accent-gold/10 text-white'
                                : isUnlocked
                                ? 'border-canvas-border bg-canvas-card text-text-secondary hover:text-white hover:border-canvas-border-hover'
                                : 'border-canvas-border/30 bg-canvas-card/20 text-text-muted cursor-not-allowed opacity-50'
                            }`}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full shrink-0 mt-0.5"
                              style={{ backgroundColor: p.accent }}
                            />
                            <div className="flex-1 space-y-0.5">
                              <div className="flex items-center justify-between text-xs font-bold font-sans">
                                <span>{p.name}</span>
                                {isUnlocked ? (
                                  isCurrent && <span className="text-[10px] text-accent-gold font-mono">ACTIVE</span>
                                ) : (
                                  <span className="text-[10px] text-text-muted font-mono">
                                    Explore {p.required} nodes to unlock
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-text-muted font-sans leading-relaxed">
                                {p.description}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Display Controls */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[11px] font-mono text-text-muted uppercase font-bold">
                      Rendering Options
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setWireframeActive((prev) => !prev)}
                        className={`flex-1 flex items-center justify-center gap-2 text-xs py-2 px-3 rounded-lg border transition-colors cursor-pointer font-sans ${
                          wireframeActive
                            ? 'border-accent-gold text-accent-gold bg-accent-gold/10 font-bold'
                            : 'border-canvas-border text-text-secondary bg-canvas-card hover:text-white'
                        }`}
                      >
                        <Box className="w-3.5 h-3.5" />
                        <span>Wireframe</span>
                      </button>

                      <button
                        onClick={() => setRenderMode2D((prev) => !prev)}
                        className={`flex-1 flex items-center justify-center gap-2 text-xs py-2 px-3 rounded-lg border transition-colors cursor-pointer font-sans ${
                          renderMode2D
                            ? 'border-accent-gold text-accent-gold bg-accent-gold/10 font-bold'
                            : 'border-canvas-border text-text-secondary bg-canvas-card hover:text-white'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{renderMode2D ? '2D Canvas' : '3D WebGL'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer Reset */}
                <div className="border-t border-canvas-border pt-4 mt-6">
                  <button
                    onClick={resetDiscoveryTrail}
                    className="w-full flex items-center justify-center gap-2 text-xs text-text-muted hover:text-red-400 py-2 border border-canvas-border hover:border-red-400/30 rounded-lg transition-colors cursor-pointer font-sans"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Explored Progress</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
