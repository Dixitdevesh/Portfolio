import React, { useRef, useEffect, useState, useCallback } from 'react';
import { SCULPTURE_NODES } from '../../config/profile';
import type { SculptureNode, Discipline, SculpturePalette } from '../../types';

interface DigitalSculpture2DProps {
  onNodeSelect: (node: SculptureNode) => void;
  activeDiscipline: Discipline | 'all';
  palette: SculpturePalette;
  wireframe: boolean;
  hoveredNodeId: string | null;
  setHoveredNodeId: (id: string | null) => void;
}

const PALETTE_COLORS: Record<SculpturePalette, {
  core: string;
  orbits: string[];
  nodeHighlight: string;
}> = {
  'obsidian-gold': {
    core: '#d4af37',
    orbits: ['rgba(212, 175, 55, 0.35)', 'rgba(184, 144, 71, 0.25)', 'rgba(239, 68, 68, 0.2)'],
    nodeHighlight: '#f3e5ab',
  },
  'spectral-alabaster': {
    core: '#f8fafc',
    orbits: ['rgba(248, 250, 252, 0.35)', 'rgba(56, 189, 248, 0.25)', 'rgba(99, 102, 241, 0.2)'],
    nodeHighlight: '#ffffff',
  },
  'deep-bronze': {
    core: '#b89047',
    orbits: ['rgba(184, 144, 71, 0.35)', 'rgba(217, 119, 6, 0.25)', 'rgba(146, 64, 14, 0.2)'],
    nodeHighlight: '#fbbf24',
  },
  'cosmic-carbon': {
    core: '#10b981',
    orbits: ['rgba(16, 185, 129, 0.35)', 'rgba(6, 182, 212, 0.25)', 'rgba(99, 102, 241, 0.2)'],
    nodeHighlight: '#34d399',
  },
};

export const DigitalSculpture2D: React.FC<DigitalSculpture2DProps> = ({
  onNodeSelect,
  activeDiscipline,
  palette,
  wireframe,
  hoveredNodeId,
  setHoveredNodeId,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [internalHoveredNode, setInternalHoveredNode] = useState<SculptureNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const effectiveHoveredNode =
    internalHoveredNode ||
    (hoveredNodeId ? SCULPTURE_NODES.find((n) => n.id === hoveredNodeId) || null : null);

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
      if (effectiveHoveredNode) {
        e.stopPropagation();
        onNodeSelect(effectiveHoveredNode);
      }
    },
    [effectiveHoveredNode, onNodeSelect]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const theme = PALETTE_COLORS[palette] || PALETTE_COLORS['obsidian-gold'];

    // Node projected positions calculated on each frame
    let projectedNodes: { node: SculptureNode; x: number; y: number; radius: number }[] = [];

    let angleOffset = 0;
    let mousePos = { x: -1000, y: -1000 };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setTooltipPos({ x: e.clientX, y: e.clientY });
    };

    canvas.addEventListener('mousemove', onMouseMove);

    const render = () => {
      animationId = requestAnimationFrame(render);
      angleOffset += 0.008;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // 1. Draw concentric elliptical orbits
      const orbits = [
        { rx: Math.min(width, height) * 0.38, ry: Math.min(width, height) * 0.18, rot: 0.35, color: theme.orbits[0] },
        { rx: Math.min(width, height) * 0.42, ry: Math.min(width, height) * 0.22, rot: -0.45, color: theme.orbits[1] },
        { rx: Math.min(width, height) * 0.34, ry: Math.min(width, height) * 0.28, rot: 1.1, color: theme.orbits[2] },
      ];

      orbits.forEach((orb) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(orb.rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, orb.rx, orb.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = orb.color;
        ctx.lineWidth = wireframe ? 1.5 : 1;
        ctx.setLineDash(wireframe ? [4, 4] : []);
        ctx.stroke();
        ctx.restore();
      });

      // 2. Draw central core glyph
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-angleOffset * 0.5);

      const coreRadius = Math.min(width, height) * 0.09;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const rad = (Math.PI / 3) * i;
        const px = Math.cos(rad) * coreRadius;
        const py = Math.sin(rad) * coreRadius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(15, 17, 23, 0.8)';
      ctx.fill();
      ctx.strokeStyle = theme.core;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner polygon star
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const rad = (Math.PI / 3) * i + Math.PI / 6;
        const px = Math.cos(rad) * (coreRadius * 0.55);
        const py = Math.sin(rad) * (coreRadius * 0.55);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.stroke();
      ctx.restore();

      // 3. Project and draw the 12 data nodes
      projectedNodes = [];
      let foundHover: SculptureNode | null = null;

      for (let idx = 0; idx < SCULPTURE_NODES.length; idx++) {
        const node = SCULPTURE_NODES[idx];
        const isMatch = activeDiscipline === 'all' || node.discipline === activeDiscipline;
        const orbitIndex = idx % orbits.length;
        const orb = orbits[orbitIndex];
        const phase = (idx * (Math.PI * 2 / SCULPTURE_NODES.length)) + angleOffset * (orbitIndex % 2 === 0 ? 1 : -1);

        // Project ellipse coordinates
        const localX = Math.cos(phase) * orb.rx;
        const localY = Math.sin(phase) * orb.ry;

        const rotatedX = localX * Math.cos(orb.rot) - localY * Math.sin(orb.rot);
        const rotatedY = localX * Math.sin(orb.rot) + localY * Math.cos(orb.rot);

        const screenX = cx + rotatedX;
        const screenY = cy + rotatedY;

        const isHovered = Math.hypot(mousePos.x - screenX, mousePos.y - screenY) < 18;
        if (isHovered) {
          foundHover = node;
        }

        const baseRadius = isHovered ? 9 : isMatch ? 6 : 3.5;
        projectedNodes.push({ node, x: screenX, y: screenY, radius: baseRadius });

        // Connector line to center core when hovered or active
        if (isHovered || isMatch) {
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(screenX, screenY);
          ctx.strokeStyle = isHovered ? 'rgba(212, 175, 55, 0.5)' : 'rgba(255, 255, 255, 0.08)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(screenX, screenY, baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        if (isHovered) {
          ctx.beginPath();
          ctx.arc(screenX, screenY, baseRadius + 6, 0, Math.PI * 2);
          ctx.strokeStyle = theme.nodeHighlight;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      if (foundHover) {
        setInternalHoveredNode(foundHover);
        setHoveredNodeId(foundHover.id);
        canvas.style.cursor = 'pointer';
      } else {
        if (!hoveredNodeId) {
          setInternalHoveredNode(null);
          setHoveredNodeId(null);
          canvas.style.cursor = 'default';
        }
      }
    };

    render();

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [palette, wireframe, activeDiscipline, setHoveredNodeId, hoveredNodeId]);

  return (
    <div
      onClick={handleCanvasClick}
      className="relative w-full h-[550px] md:h-[680px] select-none touch-none overflow-hidden"
      aria-label="2D Kinetic Generative Sculpture representing Devesh Dixit's software and cybersecurity work."
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Floating Hover Tooltip */}
      {effectiveHoveredNode && (
        <div
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-full mb-3"
          style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y - 12}px` }}
        >
          <div className="sculpture-card px-4 py-2.5 rounded-lg border border-accent-gold/40 shadow-2xl backdrop-blur-xl text-left min-w-[200px] animate-fade-in">
            <div className="flex items-center justify-between gap-3 text-[10px] font-mono uppercase tracking-wider mb-1">
              <span className="text-accent-gold font-bold">{effectiveHoveredNode.categoryLabel}</span>
              <span className="text-text-muted">Click to read</span>
            </div>
            <div className="text-sm font-bold text-white tracking-tight font-sans">
              {effectiveHoveredNode.label}
            </div>
            <div className="text-xs text-text-secondary mt-0.5">
              {effectiveHoveredNode.subtitle}
            </div>
          </div>
        </div>
      )}

      {/* 2D Mode Indicator */}
      <div className="absolute bottom-6 left-6 pointer-events-none z-20 flex items-center gap-2.5 text-xs text-text-secondary bg-canvas-card/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-canvas-border shadow-md">
        <span className="w-2 h-2 rounded-full bg-accent-gold harmonic-pulse"></span>
        <span className="font-sans">2D Canvas View • Click any node to open project</span>
      </div>
    </div>
  );
};
