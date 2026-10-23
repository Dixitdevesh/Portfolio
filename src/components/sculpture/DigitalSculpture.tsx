import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { SCULPTURE_NODES } from '../../config/profile';
import type { SculptureNode, Discipline, SculpturePalette } from '../../types';

interface DigitalSculptureProps {
  onNodeSelect: (node: SculptureNode) => void;
  activeDiscipline: Discipline | 'all';
  palette: SculpturePalette;
  wireframe: boolean;
  hoveredNodeId: string | null;
  setHoveredNodeId: (id: string | null) => void;
}

const PALETTE_COLORS: Record<SculpturePalette, {
  core: number;
  coreWire: number;
  rings: [number, number, number];
  particles: number;
  background: string;
}> = {
  'obsidian-gold': {
    core: 0xd4af37,
    coreWire: 0xf3e5ab,
    rings: [0xd4af37, 0xb89047, 0xef4444],
    particles: 0xe5c07b,
    background: '#08090c',
  },
  'spectral-alabaster': {
    core: 0xf8fafc,
    coreWire: 0x94a3b8,
    rings: [0xe2e8f0, 0x38bdf8, 0x6366f1],
    particles: 0xf1f5f9,
    background: '#0a0d14',
  },
  'deep-bronze': {
    core: 0xb89047,
    coreWire: 0xf59e0b,
    rings: [0xb89047, 0xd97706, 0x92400e],
    particles: 0xfbbf24,
    background: '#0c0a08',
  },
  'cosmic-carbon': {
    core: 0x10b981,
    coreWire: 0x34d399,
    rings: [0x10b981, 0x06b6d4, 0x6366f1],
    particles: 0xa7f3d0,
    background: '#070b0a',
  },
};

export const DigitalSculpture: React.FC<DigitalSculptureProps> = ({
  onNodeSelect,
  activeDiscipline,
  palette,
  wireframe,
  hoveredNodeId,
  setHoveredNodeId,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [internalHoveredNode, setInternalHoveredNode] = useState<SculptureNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const effectiveHoveredNode =
    internalHoveredNode ||
    (hoveredNodeId ? SCULPTURE_NODES.find((n) => n.id === hoveredNodeId) || null : null);

  const hoveredRef = useRef<string | null>(null);

  useEffect(() => {
    hoveredRef.current = effectiveHoveredNode?.id || null;
  }, [effectiveHoveredNode]);

  const handleContainerClick = useCallback(
    (e: React.MouseEvent) => {
      if (effectiveHoveredNode) {
        e.stopPropagation();
        onNodeSelect(effectiveHoveredNode);
      }
    },
    [effectiveHoveredNode, onNodeSelect]
  );

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff6e5, 2.0);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x6366f1, 1.5, 12);
    fillLight.position.set(-5, -4, 4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xd4af37, 2.0, 10);
    rimLight.position.set(0, 5, -4);
    scene.add(rimLight);

    // ROOT SCULPTURE GROUP
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // 1. THE DOUBLE NUCLEUS (Crystalline Double Polyhedron)
    const currentTheme = PALETTE_COLORS[palette] || PALETTE_COLORS['obsidian-gold'];

    const coreGeo = new THREE.IcosahedronGeometry(1.1, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: currentTheme.core,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: wireframe,
      transparent: true,
      opacity: wireframe ? 0.9 : 0.45,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sculptureGroup.add(coreMesh);

    // Inner glowing nucleus
    const innerGeo = new THREE.OctahedronGeometry(0.55, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: currentTheme.coreWire,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    sculptureGroup.add(innerMesh);

    // 2. KINETIC ORBITAL STRATA (Concentric Ring Filaments)
    const ringGroup = new THREE.Group();
    sculptureGroup.add(ringGroup);

    const rings: THREE.Mesh[] = [];
    const ringRadii = [2.2, 2.7, 3.1];
    const ringAngles = [
      new THREE.Euler(0.6, 0.2, 0.4),
      new THREE.Euler(-0.7, 0.4, -0.3),
      new THREE.Euler(0.2, 0.8, -0.6),
    ];

    ringRadii.forEach((radius, i) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.012, 16, 120);
      const ringMat = new THREE.MeshBasicMaterial({
        color: currentTheme.rings[i % currentTheme.rings.length],
        transparent: true,
        opacity: 0.35,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.copy(ringAngles[i]);
      ringGroup.add(ring);
      rings.push(ring);
    });

    // 3. DATA NODES (Interactive 3D Anchors)
    const nodeMeshes: { mesh: THREE.Mesh; halo: THREE.Mesh; data: SculptureNode }[] = [];
    const nodeGroup = new THREE.Group();
    sculptureGroup.add(nodeGroup);

    SCULPTURE_NODES.forEach((node) => {
      const nodeSubGroup = new THREE.Group();
      nodeSubGroup.position.set(...node.position);

      // Node crystal
      const crystalGeo = new THREE.OctahedronGeometry(0.12, 0);
      const crystalMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(node.color),
        emissive: new THREE.Color(node.color),
        emissiveIntensity: 0.6,
        metalness: 0.6,
        roughness: 0.2,
      });
      const crystal = new THREE.Mesh(crystalGeo, crystalMat);
      crystal.userData = { nodeId: node.id };
      nodeSubGroup.add(crystal);

      // Subtle halo around node
      const haloGeo = new THREE.RingGeometry(0.16, 0.19, 24);
      const haloMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(node.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      nodeSubGroup.add(halo);

      nodeGroup.add(nodeSubGroup);
      nodeMeshes.push({ mesh: crystal, halo, data: node });
    });

    // 4. PARTICLES CLUSTER
    const particleCount = 240;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.8 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = radius * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: currentTheme.particles,
      size: 0.025,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    sculptureGroup.add(particles);

    // INTERACTION STATE (DRAG, ROTATION, RAYCASTING)
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let targetRotation = { x: 0.2, y: -0.4 };
    let currentRotation = { x: 0.2, y: -0.4 };
    let mouseNorm = new THREE.Vector2(-1000, -1000);
    const raycaster = new THREE.Raycaster();

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseNorm.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNorm.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      setTooltipPos({ x: e.clientX, y: e.clientY });

      if (isDragging) {
        const deltaX = e.clientX - prevMousePos.x;
        const deltaY = e.clientY - prevMousePos.y;
        targetRotation.y += deltaX * 0.007;
        targetRotation.x += deltaY * 0.007;
        prevMousePos = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch support for mobile / tablet
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevMousePos.x;
        const deltaY = e.touches[0].clientY - prevMousePos.y;
        targetRotation.y += deltaX * 0.007;
        targetRotation.x += deltaY * 0.007;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Damped smooth rotation
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.08;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.08;

      // Natural idle harmonic drift
      sculptureGroup.rotation.y = currentRotation.y + Math.sin(elapsedTime * 0.3) * 0.05;
      sculptureGroup.rotation.x = currentRotation.x + Math.cos(elapsedTime * 0.25) * 0.04;

      // Core harmonic pulse
      const pulseScale = 1.0 + Math.sin(elapsedTime * 1.5) * 0.04;
      coreMesh.scale.set(pulseScale, pulseScale, pulseScale);
      coreMesh.rotation.y = elapsedTime * 0.15;
      coreMesh.rotation.z = elapsedTime * 0.08;

      innerMesh.rotation.y = -elapsedTime * 0.25;
      innerMesh.rotation.x = elapsedTime * 0.15;

      // Rotate orbital rings
      rings.forEach((ring, idx) => {
        const speed = (idx + 1) * 0.08 * (idx % 2 === 0 ? 1 : -1);
        ring.rotation.z += speed * 0.02;
      });

      // Gently rotate particle field
      particles.rotation.y = elapsedTime * 0.02;

      // Update and orient halo rings towards camera
      nodeMeshes.forEach(({ halo }) => {
        halo.quaternion.copy(camera.quaternion);
      });

      // Raycast interactive nodes
      raycaster.setFromCamera(mouseNorm, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes.map((n) => n.mesh));

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const hitId = hitMesh.userData.nodeId;
        const found = nodeMeshes.find((n) => n.data.id === hitId);

        if (found) {
          setInternalHoveredNode(found.data);
          setHoveredNodeId(found.data.id);
          document.body.style.cursor = 'pointer';
        }
      } else {
        if (!hoveredNodeId) {
          setInternalHoveredNode(null);
          setHoveredNodeId(null);
          document.body.style.cursor = 'default';
        }
      }

      // Filter highlights by discipline
      nodeMeshes.forEach(({ mesh, halo, data }) => {
        const isMatch = activeDiscipline === 'all' || data.discipline === activeDiscipline;
        const isHovered = hoveredRef.current === data.id;

        const targetScale = isHovered ? 1.6 : isMatch ? 1.0 : 0.4;
        mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);

        const haloTarget = isHovered ? 2.0 : isMatch ? 1.0 : 0.2;
        halo.scale.lerp(new THREE.Vector3(haloTarget, haloTarget, haloTarget), 0.15);
      });

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      document.body.style.cursor = 'default';

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [palette, wireframe, activeDiscipline, setHoveredNodeId, hoveredNodeId]);

  return (
    <div
      ref={mountRef}
      onClick={handleContainerClick}
      className="relative w-full h-[550px] md:h-[680px] select-none touch-none overflow-hidden"
      aria-label="Interactive 3D living computational sculpture representing Devesh Dixit's software, cybersecurity, and intelligent systems work."
    >
      {/* Floating Interactive Hover Tooltip */}
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

      {/* Visual Instruction Badge */}
      <div className="absolute bottom-6 left-6 pointer-events-none z-20 flex items-center gap-2.5 text-xs text-text-secondary bg-canvas-card/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-canvas-border shadow-md">
        <span className="w-2 h-2 rounded-full bg-accent-gold harmonic-pulse"></span>
        <span className="font-sans">Drag to rotate • Click any node to open project</span>
      </div>
    </div>
  );
};
