import { useState, useEffect, useCallback } from 'react';
import { DiscoveryProvider, useDiscovery } from './context/DiscoveryContext';
import { HeaderNav } from './components/HeaderNav';
import { ModeForm } from './sections/ModeForm';
import { ModeStructure } from './sections/ModeStructure';
import { ModeWorks } from './sections/ModeWorks';
import { ModeEvidence } from './sections/ModeEvidence';
import { ModeHuman } from './sections/ModeHuman';
import { ProfessionalDossier } from './sections/ProfessionalDossier';
import { RevealModal } from './components/RevealModal';
import { SCULPTURE_NODES } from './config/profile';
import type { SculptureNode, DigitalProject } from './types';
import './App.css';

const SECTIONS = ['form', 'structure', 'works', 'evidence', 'human'];

function DigitalDoubleShell() {
  const { displayMode, markNodeDiscovered, markProjectInspected } = useDiscovery();
  const [activeSection, setActiveSection] = useState('form');
  const [selectedNode, setSelectedNode] = useState<SculptureNode | null>(null);

  // Scroll spy to update active navigation item
  useEffect(() => {
    if (displayMode === 'dossier') return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      for (const sectionId of SECTIONS) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayMode]);

  // Smooth scroll handler
  const handleNavigateSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  }, []);

  // When a node is selected -> The Signature Interaction: REVEAL
  const handleNodeSelect = useCallback(
    (node: SculptureNode) => {
      setSelectedNode(node);
      markNodeDiscovered(node.id);
      if (node.projectId) {
        markProjectInspected(node.projectId);
      }
    },
    [markNodeDiscovered, markProjectInspected]
  );

  // Cycle through nodes while inside reveal modal
  const handleNavigateNode = useCallback(
    (direction: 'prev' | 'next') => {
      if (!selectedNode) return;
      const currentIndex = SCULPTURE_NODES.findIndex((n) => n.id === selectedNode.id);
      if (currentIndex === -1) return;

      const nextIndex =
        direction === 'next'
          ? (currentIndex + 1) % SCULPTURE_NODES.length
          : (currentIndex - 1 + SCULPTURE_NODES.length) % SCULPTURE_NODES.length;

      const nextNode = SCULPTURE_NODES[nextIndex];
      setSelectedNode(nextNode);
      markNodeDiscovered(nextNode.id);
      if (nextNode.projectId) {
        markProjectInspected(nextNode.projectId);
      }
    },
    [selectedNode, markNodeDiscovered, markProjectInspected]
  );

  // When a project deep dive is clicked from ModeWorks
  const handleProjectSelect = useCallback(
    (project: DigitalProject) => {
      // Find matching node if exists, or create contextual node
      const matchingNode = SCULPTURE_NODES.find((n) => n.projectId === project.id);
      if (matchingNode) {
        handleNodeSelect(matchingNode);
      } else {
        const syntheticNode: SculptureNode = {
          id: `project-${project.id}`,
          label: project.name,
          subtitle: project.shortDesc,
          discipline: project.discipline,
          categoryLabel: `${project.discipline.toUpperCase()} // PROJECT`,
          position: [0, 0, 0],
          color: project.accentColor,
          summary: project.overview,
          provenance: project.provenance,
          projectId: project.id,
          skillsDemonstrated: project.techStack,
          githubUrl: project.githubUrl,
          externalUrl: project.demoUrl,
        };
        handleNodeSelect(syntheticNode);
      }
    },
    [handleNodeSelect]
  );

  return (
    <div className="relative min-h-screen bg-canvas-obsidian text-text-primary selection:bg-accent-gold/25 selection:text-white transition-colors duration-500">
      {/* Navigation Header */}
      <HeaderNav activeSection={activeSection} onNavigate={handleNavigateSection} />

      {/* Main Content: Either 3D Interactive Artwork or Professional Recruiter Dossier */}
      {displayMode === 'artwork' ? (
        <main className="relative z-10">
          <ModeForm
            onNodeSelect={handleNodeSelect}
            onNavigateSection={handleNavigateSection}
          />
          <ModeStructure onNodeSelect={handleNodeSelect} />
          <ModeWorks onSelectProject={handleProjectSelect} />
          <ModeEvidence />
          <ModeHuman />
        </main>
      ) : (
        <main className="relative z-10">
          <ProfessionalDossier />
        </main>
      )}

      {/* THE SIGNATURE INTERACTION: REVEAL MODAL */}
      <RevealModal
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
        onNavigateNode={handleNavigateNode}
      />
    </div>
  );
}

function App() {
  return (
    <DiscoveryProvider>
      <DigitalDoubleShell />
    </DiscoveryProvider>
  );
}

export default App;
