/**
 * DIGITAL DOUBLE — Profile Configuration
 *
 * Authentic information, projects, educational background,
 * and case studies for Devesh Dixit.
 */

import type { SculptureNode, DigitalProject, AchievementItem } from '../types';

export interface ProfileConfig {
  name: string;
  role: string;
  headline: string;
  shortBio: string;
  location: string;
  email: string;
  githubUsername: string;
  leetcodeUsername: string;
  rootmeUsername?: string;
  unstopUsername?: string;
  linkedinUrl: string;
  resumePath: string;
  education: {
    institution: string;
    degree: string;
    location: string;
    status: string;
    expectedGraduation: string;
    coursework: string[];
  };
  aboutStory: {
    greeting: string;
    paragraphs: string[];
  };
  currentCuriosities: string[];
  philosophy: string;
}

export const PROFILE: ProfileConfig = {
  name: 'Devesh Dixit',
  role: 'Computer Science Student & Security Builder',
  headline: 'Building reliable software, exploring cybersecurity from first principles, and experimenting with intelligent systems.',
  shortBio: "I'm a 2nd-year CS student at GLA University. I like taking things apart to understand how they work—whether that's writing an AST visitor to catch security bugs, building zero-server P2P encrypted file sharing, or streaming native audio with AI companions.",
  location: 'Mathura, Uttar Pradesh, India',
  email: 'dixitdevesh098@gmail.com',
  githubUsername: 'Dixitdevesh',
  leetcodeUsername: 'darkfire1',
  linkedinUrl: 'https://www.linkedin.com/in/devesh-dixit--',
  resumePath: 'CV_1500250083.pdf',
  education: {
    institution: 'GLA University',
    degree: 'B.Tech in Computer Science & Engineering',
    location: 'Mathura, India',
    status: '2nd Year Undergraduate',
    expectedGraduation: '2029',
    coursework: [
      'Data Structures & Algorithms',
      'Operating Systems & Linux Architecture',
      'Computer Networks & Protocols',
      'Database Management Systems',
      'Object-Oriented Programming (Java & C++)',
      'Web Application Architecture'
    ],
  },
  aboutStory: {
    greeting: "Hey there! I'm Devesh.",
    paragraphs: [
      "I fell in love with computer science because of a simple realization: computers aren't magic, they're systems built by humans with rules that can be understood, audited, and improved. I wanted to understand what happens beneath the frameworks we use every day.",
      "Right now, my days are divided between my classes at GLA University and my side projects. When I write code, I tend to obsess over security and edge cases. I'd rather spend an extra weekend understanding how an Abstract Syntax Tree detects SQL injection vulnerabilities or how WebRTC handles ICE candidate trickle than just import a black-box library.",
      "When I'm not writing code or debugging, you'll usually find me solving algorithmic puzzles on LeetCode, participating in university hackathons, experimenting with Linux environments, or reading up on the latest security advisories."
    ]
  },
  currentCuriosities: [
    'Static Application Security Testing (SAST) rule engines & AST parsing',
    'Low-latency streaming audio with Gemini Live Native Audio API',
    'WebRTC NAT traversal, SCTP data channels & client-side encryption',
    'Computer vision for pharmaceutical packaging validation'
  ],
  philosophy: 'Code should be transparent, verifiable, and built to solve real problems for real people.',
};

/**
 * 3D NODES MAPPED TO PROJECTS & MILESTONES
 */
export const SCULPTURE_NODES: SculptureNode[] = [
  {
    id: 'medguard-node',
    label: 'MedGuard AI',
    subtitle: 'Medicine Safety & OCR',
    discipline: 'intelligence',
    categoryLabel: 'Computer Vision',
    position: [2.1, 0.7, 1.2],
    color: '#d4af37',
    summary: 'A web app that helps people verify medicine packaging by extracting batch numbers, expiry dates, and manufacturer records using computer vision.',
    provenance: 'verified-source',
    projectId: 'medguard-ai',
    skillsDemonstrated: ['Python', 'Flask', 'Vision AI', 'SQLite', 'ReportLab'],
    githubUrl: 'https://github.com/Dixitdevesh/MedGaurd_AI',
    externalUrl: 'https://med-gaurd-ai.vercel.app',
  },
  {
    id: 'securecode-node',
    label: 'SecureCode AI',
    subtitle: 'Code Security Scanner',
    discipline: 'security',
    categoryLabel: 'Cybersecurity & SAST',
    position: [-2.1, 1.1, 0.8],
    color: '#ef4444',
    summary: 'A static code analyzer I built from scratch to parse Python and JavaScript into Abstract Syntax Trees and detect OWASP Top 10 vulnerabilities.',
    provenance: 'verified-source',
    projectId: 'securecode-ai',
    skillsDemonstrated: ['Python', 'FastAPI', 'AST Traversal', 'OWASP Top 10', 'Gemini API'],
    githubUrl: 'https://github.com/Dixitdevesh/SecureCode',
  },
  {
    id: 'aether-node',
    label: 'A.E.T.H.E.R',
    subtitle: 'Real-Time Voice Companion',
    discipline: 'intelligence',
    categoryLabel: 'Voice AI & Systems',
    position: [1.5, -1.3, 1.7],
    color: '#6366f1',
    summary: 'A native desktop voice companion using Gemini Live Native Audio to stream bidirectional audio with sub-second latency and control local desktop tools.',
    provenance: 'verified-source',
    projectId: 'aether-voice',
    skillsDemonstrated: ['Python', 'Gemini Live API', 'Asyncio', 'sounddevice', 'OS Telemetry'],
    githubUrl: 'https://github.com/Dixitdevesh/A.E.T.H.E.R',
  },
  {
    id: 'voiddrop-node',
    label: 'VoidDrop',
    subtitle: 'Zero-Trace P2P Encrypted Transfer',
    discipline: 'security',
    categoryLabel: 'Cryptography & WebRTC',
    position: [-1.9, -0.8, -1.3],
    color: '#10b981',
    summary: 'A browser-to-browser encrypted file sharing platform. Files are sliced and encrypted client-side with AES-256 and sent directly via WebRTC—never stored on a server.',
    provenance: 'verified-source',
    projectId: 'void-drop',
    skillsDemonstrated: ['Next.js', 'FastAPI', 'WebRTC DataChannels', 'WebSockets', 'AES-256'],
    githubUrl: 'https://github.com/Dixitdevesh/Void_Drop',
  },
  {
    id: 'shivansh-node',
    label: 'Shivansh Krashi',
    subtitle: 'Agricultural Advisory Portal',
    discipline: 'systems',
    categoryLabel: 'Full-Stack Web',
    position: [0.3, 2.2, -1.1],
    color: '#b89047',
    summary: 'Built for a local agricultural store in Mathura. Provides crop recommendations, seasonal fertilizer tips, and a multilingual chatbot for local farmers.',
    provenance: 'verified-source',
    projectId: 'shivansh-krashi',
    skillsDemonstrated: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel Serverless', 'Gemini API'],
    githubUrl: 'https://github.com/Dixitdevesh/Shivansh_Krashi_Seva_Kedra_Web',
    externalUrl: 'https://shivanshkrashisevakendra.vercel.app',
  },
  {
    id: 'ai-researcher-node',
    label: 'AI Researcher',
    subtitle: 'Autonomous Web Research Agent',
    discipline: 'intelligence',
    categoryLabel: 'Agentic Workflows',
    position: [1.9, -1.4, -0.9],
    color: '#8b5cf6',
    summary: 'An autonomous research assistant that queries multiple web sources, scrapes article bodies, and synthesizes referenced research summaries with citations.',
    provenance: 'verified-source',
    projectId: 'ai-researcher',
    skillsDemonstrated: ['Python', 'Flask', 'Web Scraping', 'Prompt Engineering', 'Caching'],
    githubUrl: 'https://github.com/Dixitdevesh/Ai-Researcher',
  },
  {
    id: 'pgfinder-node',
    label: 'PGFinder',
    subtitle: 'Geospatial Accommodation App',
    discipline: 'systems',
    categoryLabel: 'Backend & Geo Spatial',
    position: [-0.9, -2.0, 1.2],
    color: '#38bdf8',
    summary: 'A student PG accommodation portal built with Django MTV and Leaflet.js, allowing geospatial radius searches for rooms without paid mapping APIs.',
    provenance: 'verified-source',
    projectId: 'pg-finder',
    skillsDemonstrated: ['Python', 'Django', 'SQLite', 'Leaflet.js', 'OpenStreetMap'],
    githubUrl: 'https://github.com/Dixitdevesh/PG_Finder',
  },
  {
    id: 'ey-techathon-node',
    label: 'EY Techathon 6.0',
    subtitle: 'National Hackathon Project',
    discipline: 'evidence',
    categoryLabel: 'Verified Competition',
    position: [1.2, 1.8, 1.6],
    color: '#f59e0b',
    summary: 'Competed nationally in EY Techathon 6.0, designing rapid software prototypes and enterprise automation workflows.',
    provenance: 'official-certificate',
    evidenceId: 'ey-techathon-cert',
    skillsDemonstrated: ['Rapid Prototyping', 'Automation', 'Team Collaboration'],
    externalUrl: 'https://unstop.com/certificate-preview/49701362-9765-431f-a001-b191ef0f8e21',
  },
  {
    id: 'devcation-node',
    label: "Devcation Hack 'N' Solve",
    subtitle: 'Civic Tech & Debugging Sprint',
    discipline: 'evidence',
    categoryLabel: 'Verified Hackathon',
    position: [-1.5, 1.7, -1.5],
    color: '#f59e0b',
    summary: 'Full-day sprint developing civic software solutions and debugging complex algorithmic challenges under strict time limits.',
    provenance: 'official-certificate',
    evidenceId: 'devcation-cert',
    skillsDemonstrated: ['Civic Tech', 'Algorithmic Debugging', 'Full-Stack Execution'],
    externalUrl: 'https://unstop.com/certificate-preview/3460132a-47e1-42f8-b37c-d3cc59e2143e',
  },
  {
    id: 'leetcode-node',
    label: 'LeetCode (darkfire1)',
    subtitle: 'Algorithmic Problem Solving',
    discipline: 'evidence',
    categoryLabel: 'Competitive Algorithms',
    position: [0.1, -2.3, -1.4],
    color: '#eab308',
    summary: 'Consistently practicing data structures, graph traversals, and dynamic programming to hone problem-solving intuition.',
    provenance: 'public-profile',
    skillsDemonstrated: ['Data Structures', 'Algorithmic Optimization', 'Complexity Analysis'],
    externalUrl: 'https://leetcode.com/darkfire1/',
  },
  {
    id: 'rootme-node',
    label: 'Root-Me Security Labs',
    subtitle: 'Hands-on Security Training',
    discipline: 'security',
    categoryLabel: 'Security Research',
    position: [-1.7, -1.1, 1.4],
    color: '#ec4899',
    summary: 'Practicing web security, cryptographic ciphers, and Linux permissions on authorized challenge platforms.',
    provenance: 'public-profile',
    skillsDemonstrated: ['Web Security', 'Network Protocols', 'Cryptography', 'Linux Forensics'],
    externalUrl: 'https://www.root-me.org/',
  },
  {
    id: 'linux-posix-node',
    label: 'Linux Architecture & POSIX',
    subtitle: 'Operating Systems Knowledge',
    discipline: 'systems',
    categoryLabel: 'Systems Knowledge',
    position: [0.1, 2.3, 1.0],
    color: '#14b8a6',
    summary: 'Studying Unix process management, memory paging, file system inode structures, and shell scripting automation.',
    provenance: 'verified-source',
    skillsDemonstrated: ['Bash', 'Process Lifecycle', 'User/Group Permissions', 'File Descriptors'],
  }
];

/**
 * DETAILED DIGITAL PROJECTS (Human Engineering Stories)
 */
export const DIGITAL_PROJECTS: DigitalProject[] = [
  {
    id: 'medguard-ai',
    name: 'MedGuard AI',
    repoName: 'MedGaurd_AI',
    discipline: 'intelligence',
    shortDesc: 'AI-assisted medicine validation system parsing package typography and verification metadata.',
    overview: 'I built MedGuard AI to solve a genuine issue in pharmaceutical accessibility: counterfeit drugs and hard-to-read expiration dates. By uploading a packaging photo, the application uses vision models and regex normalization to extract batch numbers, manufacturer details, and calculate expiry safety against server time.',
    whyBuilt: 'During a family discussion about expired medicines lying around the cabinet, I noticed how hard it is to decipher small, messy printed expiration stamps. I wanted to see if I could combine multimodal vision models with reliable relational validation rules to build a practical tool anyone could use.',
    architectureDetails: 'Engineered with Flask and SQLite. When an image is uploaded, it is pre-processed and sent to the vision API with strict JSON schema instructions. The parsed expiry date is evaluated against the server clock, and ReportLab compiles a clean, tamper-evident verification PDF dossier for the patient.',
    techStack: ['Python', 'Flask', 'SQLAlchemy', 'OpenAI Vision API', 'ReportLab', 'HTML5', 'Tailwind CSS'],
    keyFeatures: [
      'Packaging OCR extraction capturing batch code, manufacturer, and dates',
      'Safety classification engine comparing parsed expiry against real-time clock',
      'Clean PDF verification report generated server-side with ReportLab',
      'Audit logging and Swagger API documentation for integration testing'
    ],
    whatLearned: 'Learned how to enforce reliable structured outputs from vision models, sanitize edge-case date formats with regex, and safely handle multipart file uploads in Flask.',
    githubUrl: 'https://github.com/Dixitdevesh/MedGaurd_AI',
    demoUrl: 'https://med-gaurd-ai.vercel.app',
    status: 'Completed',
    isFeatured: true,
    provenance: 'verified-source',
    accentColor: '#d4af37',
  },
  {
    id: 'securecode-ai',
    name: 'SecureCode AI',
    repoName: 'SecureCode',
    discipline: 'security',
    shortDesc: 'Static Application Security Testing (SAST) auditor analyzing source code for OWASP Top 10 flaws.',
    overview: 'SecureCode AI is an automated source code security auditor. Instead of treating code analysis like a black box, it parses raw code into Abstract Syntax Trees (AST) and regex patterns to discover vulnerabilities like SQL injection, cross-site scripting (XSS), and hardcoded secrets.',
    whyBuilt: 'I wanted to understand how commercial SAST scanners actually operate under the hood. Writing my own AST visitor node traversal helped me understand exactly why certain coding patterns are dangerous and how to automatically generate safe remediation diffs.',
    architectureDetails: 'Built using FastAPI with asynchronous file processing. A custom AST visitor walks through syntax nodes looking for dangerous sinks (e.g. raw cursor.execute or eval). Discovered vulnerable snippets are passed to an AI remediation pipeline that suggests context-aware diff patches.',
    techStack: ['Python', 'FastAPI', 'AST Parsing', 'Gemini API', 'React', 'Tailwind CSS', 'Pydantic'],
    keyFeatures: [
      'AST visitor traversal analyzing 9 critical OWASP vulnerability patterns',
      'Automated side-by-side patch generation with rationale explanations',
      'Dependency scanner checking package.json and requirements.txt for outdated packages',
      'Interactive Security Copilot session allowing contextual follow-up questions'
    ],
    whatLearned: 'Gained hands-on experience navigating AST node hierarchies, managing async queues in FastAPI, and tuning rule sensitivity to minimize false positives.',
    githubUrl: 'https://github.com/Dixitdevesh/SecureCode',
    status: 'Completed',
    isFeatured: true,
    provenance: 'verified-source',
    accentColor: '#ef4444',
  },
  {
    id: 'aether-voice',
    name: 'A.E.T.H.E.R',
    repoName: 'A.E.T.H.E.R',
    discipline: 'intelligence',
    shortDesc: 'Low-latency desktop voice companion powered by Gemini Live Native Audio API.',
    overview: 'A.E.T.H.E.R is a native desktop voice companion that explores Google\'s Gemini Live Native Audio API. Instead of traditional voice assistant pipelines (Speech-to-Text -> LLM -> Text-to-Speech), it streams raw audio bidirectional for sub-second natural conversation.',
    whyBuilt: 'I was frustrated by the sluggish 3-5 second delays in conventional voice assistants. When Google released the Gemini Live Audio API, I immediately jumped in to build a real-time conversational companion that could also check CPU temps, launch apps, and automate desktop tasks.',
    architectureDetails: 'Written in asynchronous Python. It captures microphone PCM audio buffers via sounddevice, transmits binary chunks over WebSockets to Gemini Live, and concurrently streams received PCM audio packets straight to speakers while listening for user voice interruptions.',
    techStack: ['Python', 'Gemini Live Native Audio API', 'sounddevice', 'Asyncio', 'Windows API', 'PyTTSX3'],
    keyFeatures: [
      'Native bidirectional streaming audio achieving conversational interruptibility',
      'Desktop telemetry monitoring CPU usage, active memory, and thermals in real time',
      'Command router capable of launching local executables, browser tabs, and search',
      'Async background event monitor for pro-active alerts and reminders'
    ],
    whatLearned: 'Mastered managing low-level audio buffers in Python, handling WebSocket backpressure in asyncio, and interfacing with Windows system APIs.',
    githubUrl: 'https://github.com/Dixitdevesh/A.E.T.H.E.R',
    status: 'Beta',
    isFeatured: true,
    provenance: 'verified-source',
    accentColor: '#6366f1',
  },
  {
    id: 'void-drop',
    name: 'VoidDrop',
    repoName: 'Void_Drop',
    discipline: 'security',
    shortDesc: 'Zero-trace, peer-to-peer file transfer engine with client-side AES-256 and WebRTC.',
    overview: 'VoidDrop lets two browsers exchange confidential files directly without storing a single byte on intermediate cloud servers. It negotiates WebRTC DataChannels through an ephemeral signaling relay, encrypting file chunks in the browser with AES-256.',
    whyBuilt: 'When sharing sensitive project documents or credentials, relying on third-party cloud drives always leaves a paper trail. I built VoidDrop to prove that end-to-end encrypted, zero-trace transfers can be done cleanly right in the browser.',
    architectureDetails: 'Next.js frontend with an interactive Three.js visual. Signaling is handled by a lightweight FastAPI WebSocket relay for SDP offer/answer exchange. Once the WebRTC peer connection is established, the file is sliced into binary chunks, encrypted client-side using CryptoJS AES-256, and sent directly over the DataChannel.',
    techStack: ['Next.js', 'FastAPI', 'WebSockets', 'WebRTC DataChannels', 'Crypto-JS (AES-256)', 'Three.js', 'Tailwind CSS'],
    keyFeatures: [
      'Pure browser-to-browser P2P transmission with zero server-side file persistence',
      'Client-side AES-256 chunk encryption with ephemeral session keys',
      'Stream chunking with backpressure buffer monitoring to prevent browser memory crashes',
      'Interactive reactive 3D landing visual rendered in Three.js'
    ],
    whatLearned: 'Deepened my understanding of WebRTC connection negotiation, STUN/TURN fundamentals, ICE candidates, and handling large binary ArrayBuffers safely in JavaScript.',
    githubUrl: 'https://github.com/Dixitdevesh/Void_Drop',
    status: 'Completed',
    isFeatured: true,
    provenance: 'verified-source',
    accentColor: '#10b981',
  },
  {
    id: 'shivansh-krashi',
    name: 'Shivansh Krashi',
    repoName: 'Shivansh_Krashi_Seva_Kedra_Web',
    discipline: 'systems',
    shortDesc: 'Full-stack agricultural retail platform with localized crop recommendation engine.',
    overview: 'A digital portal engineered for a real agricultural retail store in Mathura, India. It provides localized crop advice, seasonal fertilizer calculators, and an interactive bilingual agricultural chatbot ("Krashi AI") designed to assist rural farmers.',
    whyBuilt: 'I wanted to build something that solves a real challenge right in my hometown. Local farmers often need quick guidance on fertilizer ratios and crop cycles. I built this portal to give the store a digital presence with offline-resilient advice.',
    architectureDetails: 'Crafted with React, TypeScript, and Tailwind CSS, backed by Vercel Serverless Functions. Implements an offline-first caching layer that serves standard crop tips when the user is disconnected from the network.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel Serverless', 'Gemini API', 'Vite'],
    keyFeatures: [
      'Interactive multilingual Krashi AI advisory bot with translated terminology',
      'Soil and crop matching matrix for seasonal seeds, pesticides, and nutrients',
      'Offline fallback rule configurations to keep providing recommendations offline',
      'Fast responsive product catalog optimized for low-bandwidth mobile devices'
    ],
    whatLearned: 'Learned the importance of inclusive UX for non-technical users, serverless deployment architectures, and defensive error-handling for flaky network connections.',
    githubUrl: 'https://github.com/Dixitdevesh/Shivansh_Krashi_Seva_Kedra_Web',
    demoUrl: 'https://shivanshkrashisevakendra.vercel.app',
    status: 'Completed',
    isFeatured: true,
    provenance: 'verified-source',
    accentColor: '#b89047',
  },
  {
    id: 'ai-researcher',
    name: 'AI Researcher',
    repoName: 'Ai-Researcher',
    discipline: 'intelligence',
    shortDesc: 'Autonomous web search synthesis agent compiling cited research reports.',
    overview: 'An autonomous web research engine that takes complex inquiries, decomposes them into targeted search queries, crawls matching webpage sources, extracts relevant passages, and synthesizes referenced analytical reports.',
    whyBuilt: 'I wanted to understand autonomous agent loops before high-level frameworks like LangChain became everywhere. Writing the scraping, chunking, and prompt synthesis myself taught me how agent pipelines actually handle context limitations.',
    architectureDetails: 'Python Flask microservice communicating with Google search scraper routines. Extracted HTML is stripped of scripts, sanitized, and batched into token-budgeted prompt windows for synthesis.',
    techStack: ['Python', 'Flask', 'Web Scraping', 'Prompt Engineering', 'Tailwind CSS', 'HTML5'],
    keyFeatures: [
      'Multi-source crawling and synthesis matching specific user inquiry directives',
      'Source attribution with embedded reference links throughout generated reports',
      'In-memory TTL cache preventing duplicate scraping calls and API overages',
      'Live execution log terminal showing real-time agent crawl decisions'
    ],
    whatLearned: 'Gained solid intuition for web scraping hygiene, token optimization, and handling malformed external web markup gracefully.',
    githubUrl: 'https://github.com/Dixitdevesh/Ai-Researcher',
    status: 'Completed',
    isFeatured: true,
    provenance: 'verified-source',
    accentColor: '#8b5cf6',
  },
  {
    id: 'pg-finder',
    name: 'PGFinder',
    repoName: 'PG_Finder',
    discipline: 'systems',
    shortDesc: 'Django-based geospatial paying guest booking and management engine.',
    overview: 'A Paying Guest accommodation platform engineered with Django MTV architecture. Enables room listings, tenant inquiries, role-based administration, and OpenStreetMap geospatial radius searches.',
    whyBuilt: 'During my first year, finding good student housing near campus was surprisingly tedious. I built PGFinder to practice Django, custom authentication models, and map queries using OpenStreetMap without paid API keys.',
    architectureDetails: 'Django backend with SQLite/PostgreSQL relational schema. Leaflet.js renders client-side maps querying spatial distance coordinates calculated via Python math utilities.',
    techStack: ['Python', 'Django', 'SQLite', 'Leaflet.js', 'OpenStreetMap API', 'HTML5/CSS3'],
    keyFeatures: [
      'Role-based permissions dividing Customer, PG Manager, and Administrator panels',
      'Geospatial radius search displaying nearby accommodations on interactive Leaflet maps',
      'Booking lifecycle database tracking active deposits and tenant verification states',
      'Secure session management and CSRF-protected form pipelines'
    ],
    whatLearned: 'Deepened mastery of Django ORM, custom authentication decorators, relational database indexing, and coordinate projection formulas.',
    githubUrl: 'https://github.com/Dixitdevesh/PG_Finder',
    status: 'Prototype',
    isFeatured: false,
    provenance: 'verified-source',
    accentColor: '#38bdf8',
  },
  {
    id: 'jarvis-ai',
    name: 'JarvisAI',
    repoName: 'FirstAi_Jarvis',
    discipline: 'systems',
    shortDesc: 'My first Python project: voice command utility and system automation script.',
    overview: 'An introductory Python automation and voice interaction program I built during my early programming journey. Demonstrates speech recognition, text-to-speech audio feedback, and local OS automation.',
    whyBuilt: 'This was the project that ignited my excitement for programming. Watching Python recognize my voice and launch applications showed me what software can do.',
    architectureDetails: 'Lightweight procedural Python architecture tying SpeechRecognition and pyttsx3 to OS process routines.',
    techStack: ['Python', 'SpeechRecognition', 'PyTTSX3', 'Webbrowser module', 'OS subsystem'],
    keyFeatures: [
      'Microphone voice command recognition and audio synthesis loop',
      'Local system utilities (launching applications, web lookups, time queries)',
      'Terminal logic mini-games and automated text logging'
    ],
    whatLearned: 'Served as the foundational project that sparked my curiosity for system automation and speech interfaces.',
    githubUrl: 'https://github.com/Dixitdevesh/FirstAi_Jarvis',
    status: 'Completed',
    isFeatured: false,
    provenance: 'verified-source',
    accentColor: '#94a3b8',
  }
];

/**
 * VERIFIED ACHIEVEMENTS & CERTIFICATES (Honest Evidence)
 */
export const VERIFIED_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ey-techathon-cert',
    title: 'EY Techathon 6.0 Certificate',
    event: 'EY Techathon 6.0',
    date: '14 Apr 2026',
    type: 'Hackathon',
    role: 'Participation',
    description: 'National hackathon testing rapid prototype development capabilities and enterprise automation frameworks.',
    image: 'certificates/ey-techathon.jpg',
    verificationUrl: 'https://unstop.com/certificate-preview/49701362-9765-431f-a001-b191ef0f8e21',
    provenance: 'official-certificate',
  },
  {
    id: 'devcation-cert',
    title: "Devcation Hack 'N' Solve Certificate",
    event: "Devcation Hack 'N' Solve",
    date: '15 Apr 2026',
    type: 'Hackathon',
    role: 'Participation',
    description: 'Full-day sprint developing civic software solutions and debugging complex algorithmic challenges.',
    image: 'certificates/devcation.jpg',
    verificationUrl: 'https://unstop.com/certificate-preview/3460132a-47e1-42f8-b37c-d3cc59e2143e',
    provenance: 'official-certificate',
  },
  {
    id: 'gemini-quizoff-cert',
    title: 'Google Gemini QuizOff 2026',
    event: 'Google Gemini QuizOff',
    date: '30 Jun 2026',
    type: 'Quiz',
    role: 'Participation',
    description: 'National level technical assessment testing understanding of Gemini API models and LLM application architectures.',
    verificationUrl: 'https://unstop.com/certificate-preview/8d629bbd-d323-4333-960a-6e0bcd94ec00',
    provenance: 'official-certificate',
  },
  {
    id: 'dragon-con-detective-cert',
    title: 'Orkla: Dragon Con Detective',
    event: 'Orkla Dragon Con Detective Investigation',
    date: '07 Aug 2026',
    type: 'Competition',
    role: 'Participation',
    description: 'Cybersecurity investigation challenge centered around problem-solving, clue correlation, and OSINT analysis.',
    pdf: 'certificates/dragon-con-detective.pdf',
    provenance: 'official-certificate',
  },
  {
    id: 'paranox-cert',
    title: 'Paranox 2.0 Hackathon',
    event: 'Paranox 2.0 Hackathon',
    date: '31 Oct 2025',
    type: 'Hackathon',
    role: 'Participation',
    description: 'Software development hackathon designing and engineering original web systems under strict deadlines.',
    verificationUrl: 'https://unstop.com/certificate-preview/d8e7eaea-c53c-4590-bd7b-a9b8f9746ac7',
    provenance: 'official-certificate',
  },
  {
    id: 'rift-cert',
    title: "RIFT '26 Hackathon",
    event: "RIFT '26 Hackathon",
    date: '26 Feb 2026',
    type: 'Hackathon',
    role: 'Participation',
    description: 'Collaborative development hackathon exploring AI extensions and lightweight API integrations.',
    image: 'certificates/rift.jpg',
    provenance: 'manually-added',
  },
  {
    id: 'ctf-cert',
    title: 'Capture The Flag (CTF) Challenge Certificate',
    event: 'Cybersecurity CTF Competition',
    date: '2025/2026',
    type: 'Competition',
    role: 'Participation',
    description: 'Cybersecurity competition testing web exploit analysis, network forensics, and cryptography decoding.',
    image: 'certificates/ctf.jpg',
    provenance: 'manually-added',
  },
  {
    id: 'iit-delhi-cert',
    title: 'IIT Delhi Technical Event Certificate',
    event: 'IIT Delhi Technical Conclave',
    date: '2025/2026',
    type: 'Competition',
    role: 'Participation',
    description: 'Participation in engineering symposium workshops and technical competitions at IIT Delhi.',
    image: 'certificates/iit-delhi.jpg',
    provenance: 'manually-added',
  },
  {
    id: 'iit-madras-cert',
    title: 'IIT Madras Tech Fest Certificate',
    event: 'IIT Madras Technical Festival',
    date: '2025/2026',
    type: 'Competition',
    role: 'Participation',
    description: 'Participation in national technical showcases and computing challenges at IIT Madras.',
    image: 'certificates/iit-madras.jpg',
    provenance: 'manually-added',
  },
  {
    id: 'dtu-cert',
    title: 'DTU Technical Challenge Certificate',
    event: 'DTU Technical Challenge',
    date: '2025/2026',
    type: 'Competition',
    role: 'Participation',
    description: 'Engineering coding sprint and technical challenge participation at Delhi Technological University.',
    image: 'certificates/dtu.jpg',
    provenance: 'manually-added',
  }
];

/**
 * TECHNICAL SKILLS WITH EVIDENCE MAPPINGS
 */
export interface SkillCategory {
  category: string;
  items: Array<{
    name: string;
    level: string;
    evidenceProject?: string;
    evidenceDescription: string;
  }>;
}

export const SKILLS_MATRIX: SkillCategory[] = [
  {
    category: 'Languages & Core Systems',
    items: [
      { name: 'Python', level: 'Proficient', evidenceProject: 'medguard-ai', evidenceDescription: 'Used in 6 projects: Flask, FastAPI, AST parsing, Asyncio' },
      { name: 'TypeScript / JavaScript', level: 'Proficient', evidenceProject: 'void-drop', evidenceDescription: 'React 19, Next.js, WebSockets, Three.js shaders' },
      { name: 'C / C++', level: 'Academic Core', evidenceDescription: 'GLA University data structures, memory layout, pointer arithmetic' },
      { name: 'SQL', level: 'Practical', evidenceProject: 'medguard-ai', evidenceDescription: 'SQLite schema design, SQLAlchemy ORM, relational queries' },
      { name: 'Bash / Shell', level: 'Practical', evidenceProject: 'aether-voice', evidenceDescription: 'Linux command line utilities, process scripting' }
    ]
  },
  {
    category: 'Security & Cryptography',
    items: [
      { name: 'Static Code Analysis (SAST)', level: 'Applied', evidenceProject: 'securecode-ai', evidenceDescription: 'AST traversal identifying OWASP Top 10 vulnerabilities' },
      { name: 'OWASP Top 10 Auditing', level: 'Applied', evidenceProject: 'securecode-ai', evidenceDescription: 'SQLi, XSS, CSRF, Path Traversal detection patterns' },
      { name: 'Client-Side Cryptography', level: 'Applied', evidenceProject: 'void-drop', evidenceDescription: 'AES-256 chunk encryption in WebRTC transfers' },
      { name: 'Network Packet Analysis', level: 'Foundational', evidenceDescription: 'Wireshark, TCP/IP handshake, DNS routing, subnetting' },
      { name: 'OSINT & Footprinting', level: 'Foundational', evidenceProject: 'dragon-con-detective-cert', evidenceDescription: 'Domain footprinting, Google Dork queries, metadata' }
    ]
  },
  {
    category: 'AI & Multimodal Systems',
    items: [
      { name: 'Gemini Live Native Audio', level: 'Applied', evidenceProject: 'aether-voice', evidenceDescription: 'Bidirectional streaming audio with sub-second latency' },
      { name: 'Computer Vision & OCR', level: 'Applied', evidenceProject: 'medguard-ai', evidenceDescription: 'Structured packaging data extraction with OpenAI Vision' },
      { name: 'Agentic Search & Synthesis', level: 'Applied', evidenceProject: 'ai-researcher', evidenceDescription: 'Autonomous web scraping and prompt chaining' },
      { name: 'Prompt Engineering', level: 'Proficient', evidenceProject: 'shivansh-krashi', evidenceDescription: 'Schema validation, context injection, error buffers' }
    ]
  },
  {
    category: 'Web Architecture & Protocols',
    items: [
      { name: 'WebRTC & WebSockets', level: 'Applied', evidenceProject: 'void-drop', evidenceDescription: 'P2P DataChannels, signaling relays, NAT traversal' },
      { name: 'FastAPI / Async Python', level: 'Proficient', evidenceProject: 'securecode-ai', evidenceDescription: 'High-performance async routing, Pydantic schemas' },
      { name: 'Flask / Django MTV', level: 'Proficient', evidenceProject: 'pg-finder', evidenceDescription: 'Relational schemas, custom authentication, Leaflet' },
      { name: 'React 19 & Tailwind CSS', level: 'Proficient', evidenceDescription: 'Component architecture, Framer Motion, responsive design' },
      { name: 'Three.js / WebGL', level: 'Applied', evidenceProject: 'void-drop', evidenceDescription: 'Interactive 3D particle systems and kinetic sculptures' }
    ]
  }
];
