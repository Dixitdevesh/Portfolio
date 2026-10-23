import React, { useState } from 'react';
import { FileDown, Menu, X, Sparkles, Layout } from 'lucide-react';
import { ChronicleOfDiscovery } from './ChronicleOfDiscovery';
import { useDiscovery } from '../context/DiscoveryContext';
import { PROFILE } from '../config/profile';

interface HeaderNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeSection,
  onNavigate,
}) => {
  const { displayMode, setDisplayMode } = useDiscovery();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'form', label: 'Overview' },
    { id: 'works', label: 'Projects' },
    { id: 'structure', label: 'Skill Map' },
    { id: 'evidence', label: 'Proof & Hackathons' },
    { id: 'human', label: 'About' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-canvas-obsidian/90 backdrop-blur-md border-b border-canvas-border select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand / Human Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleLinkClick('form')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-accent-gold harmonic-pulse shrink-0" />
            <div>
              <span className="font-sans font-bold text-sm text-white group-hover:text-accent-gold transition-colors">
                {PROFILE.name}
              </span>
              <span className="hidden sm:inline text-xs text-text-muted ml-2 font-mono">
                / CS & Security
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-xs" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'text-accent-gold bg-accent-gold/10 font-semibold'
                    : 'text-text-secondary hover:text-white hover:bg-canvas-card'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Clean Mode Switcher, Discovery Drawer, Resume */}
        <div className="flex items-center gap-2.5">
          
          {/* Mode Switcher Pill */}
          <div className="flex items-center bg-canvas-elevated p-0.5 rounded-full border border-canvas-border text-xs font-mono">
            <button
              onClick={() => setDisplayMode('artwork')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                displayMode === 'artwork'
                  ? 'bg-accent-gold text-canvas-obsidian font-bold shadow-sm'
                  : 'text-text-muted hover:text-white'
              }`}
              title="Interactive 3D experience"
            >
              <Sparkles className="w-3 h-3" />
              <span className="hidden sm:inline">Interactive</span>
            </button>
            <button
              onClick={() => setDisplayMode('dossier')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                displayMode === 'dossier'
                  ? 'bg-white text-canvas-obsidian font-bold shadow-sm'
                  : 'text-text-muted hover:text-white'
              }`}
              title="Clean portfolio view for recruiters"
            >
              <Layout className="w-3 h-3" />
              <span className="hidden sm:inline">Dossier</span>
            </button>
          </div>

          {/* Discovery Trail Pill */}
          <div className="hidden lg:block">
            <ChronicleOfDiscovery />
          </div>

          {/* Resume PDF Action */}
          <a
            href={`/${PROFILE.resumePath}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-text-primary hover:text-accent-gold bg-canvas-card hover:bg-canvas-card/80 border border-canvas-border px-3 py-1.5 rounded-lg transition-all"
            title="Download Devesh's Resume PDF"
          >
            <FileDown className="w-3.5 h-3.5 text-accent-gold" />
            <span className="hidden sm:inline">Resume</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-text-muted hover:text-white rounded-lg border border-canvas-border"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-canvas-border bg-canvas-surface/98 p-4 space-y-3 text-sm">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="w-full text-left py-2.5 px-3 rounded-lg hover:bg-canvas-card text-text-secondary hover:text-white flex items-center justify-between"
              >
                <span>{link.label}</span>
                {activeSection === link.id && <span className="text-accent-gold">●</span>}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-canvas-border flex flex-col gap-2">
            <div className="flex justify-between items-center py-1">
              <span className="text-text-muted text-xs">Model Trail:</span>
              <ChronicleOfDiscovery />
            </div>

            <a
              href={`/${PROFILE.resumePath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-canvas-card border border-canvas-border text-accent-gold font-medium text-xs"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Resume (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
