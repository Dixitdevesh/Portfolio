import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { SculpturePalette, SiteDisplayMode } from '../types';

interface DiscoveryContextValue {
  displayMode: SiteDisplayMode;
  setDisplayMode: (mode: SiteDisplayMode) => void;
  discoveredNodeIds: string[];
  markNodeDiscovered: (id: string) => void;
  inspectedProjectIds: string[];
  markProjectInspected: (id: string) => void;
  evidenceViewedIds: string[];
  markEvidenceViewed: (id: string) => void;
  currentPalette: SculpturePalette;
  setPalette: (palette: SculpturePalette) => void;
  unlockedPalettes: SculpturePalette[];
  wireframeActive: boolean;
  setWireframeActive: React.Dispatch<React.SetStateAction<boolean>>;
  renderMode2D: boolean;
  setRenderMode2D: React.Dispatch<React.SetStateAction<boolean>>;
  resetDiscoveryTrail: () => void;
  totalNodesCount: number;
}

const DiscoveryContext = createContext<DiscoveryContextValue | undefined>(undefined);

const STORAGE_KEY = 'digital_double_discovery_trail_v2';

function getStoredState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // fallback
  }
  return null;
}

export const DiscoveryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [displayMode, setDisplayMode] = useState<SiteDisplayMode>('artwork');
  const [discoveredNodeIds, setDiscoveredNodeIds] = useState<string[]>(() => {
    const s = getStoredState();
    return Array.isArray(s?.discoveredNodeIds) ? s.discoveredNodeIds : [];
  });
  const [inspectedProjectIds, setInspectedProjectIds] = useState<string[]>(() => {
    const s = getStoredState();
    return Array.isArray(s?.inspectedProjectIds) ? s.inspectedProjectIds : [];
  });
  const [evidenceViewedIds, setEvidenceViewedIds] = useState<string[]>(() => {
    const s = getStoredState();
    return Array.isArray(s?.evidenceViewedIds) ? s.evidenceViewedIds : [];
  });
  const [currentPalette, setCurrentPalette] = useState<SculpturePalette>(() => {
    const s = getStoredState();
    return s?.currentPalette || 'obsidian-gold';
  });
  const [wireframeActive, setWireframeActive] = useState<boolean>(false);
  const [renderMode2D, setRenderMode2D] = useState<boolean>(() => {
    const s = getStoredState();
    return typeof s?.renderMode2D === 'boolean' ? s.renderMode2D : false;
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          discoveredNodeIds,
          inspectedProjectIds,
          evidenceViewedIds,
          currentPalette,
          renderMode2D,
        })
      );
    } catch (e) {
      console.warn('Discovery trail storage save error:', e);
    }
  }, [discoveredNodeIds, inspectedProjectIds, evidenceViewedIds, currentPalette, renderMode2D]);

  // Unlocked palettes based on discovery milestones
  const unlockedPalettes: SculpturePalette[] = ['obsidian-gold'];
  if (discoveredNodeIds.length >= 2) unlockedPalettes.push('deep-bronze');
  if (discoveredNodeIds.length >= 4) unlockedPalettes.push('spectral-alabaster');
  if (discoveredNodeIds.length >= 6) unlockedPalettes.push('cosmic-carbon');

  const markNodeDiscovered = useCallback((id: string) => {
    setDiscoveredNodeIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const markProjectInspected = useCallback((id: string) => {
    setInspectedProjectIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const markEvidenceViewed = useCallback((id: string) => {
    setEvidenceViewedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const setPalette = useCallback((palette: SculpturePalette) => {
    setCurrentPalette(palette);
  }, []);

  const resetDiscoveryTrail = useCallback(() => {
    setDiscoveredNodeIds([]);
    setInspectedProjectIds([]);
    setEvidenceViewedIds([]);
    setCurrentPalette('obsidian-gold');
    setWireframeActive(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Discovery trail removal error:', e);
    }
  }, []);

  return (
    <DiscoveryContext.Provider
      value={{
        displayMode,
        setDisplayMode,
        discoveredNodeIds,
        markNodeDiscovered,
        inspectedProjectIds,
        markProjectInspected,
        evidenceViewedIds,
        markEvidenceViewed,
        currentPalette,
        setPalette,
        unlockedPalettes,
        wireframeActive,
        setWireframeActive,
        renderMode2D,
        setRenderMode2D,
        resetDiscoveryTrail,
        totalNodesCount: 12,
      }}
    >
      {children}
    </DiscoveryContext.Provider>
  );
};

export function useDiscovery(): DiscoveryContextValue {
  const context = useContext(DiscoveryContext);
  if (!context) {
    throw new Error('useDiscovery must be used within a DiscoveryProvider');
  }
  return context;
}
