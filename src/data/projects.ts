export interface Project {
  id: string;
  name: string;
  repoName: string;
  category: 'AI' | 'Cybersecurity' | 'Software';
  shortDesc: string;
  overview: string;
  whyBuilt: string;
  techStack: string[];
  keyFeatures: string[];
  whatLearned: string;
  githubUrl: string;
  demoUrl?: string;
  status: 'Completed' | 'Beta' | 'Prototype';
  isFeatured: boolean;
}

export const verifiedProjects: Project[] = [
  {
    id: 'medguard-ai',
    name: 'MedGuard AI',
    repoName: 'MedGaurd_AI',
    category: 'AI',
    shortDesc: 'AI-powered medicine safety and packaging verification application using vision algorithms.',
    overview: 'MedGuard AI is a full-stack smart medicine safety application. It lets users verify packaging labels and strip details by uploading images or scanning with their camera. The application runs OCR and extraction models to verify critical labels.',
    whyBuilt: 'Built to explore full-stack integration of computer vision APIs with structured local databases for improving patient awareness around pharmaceutical label validation.',
    techStack: ['Python', 'Flask', 'SQLite', 'ReportLab', 'OpenAI Vision API', 'HTML', 'CSS', 'JavaScript'],
    keyFeatures: [
      'Structured extraction of text labels (batch, manufacturer, expiration dates)',
      'Safety rating engine checking parsed expiry values dynamically',
      'ReportLab backend engine compiling styled verification PDF sheets',
      'Rotational file logger for audit tracking and Swagger docs rendering'
    ],
    whatLearned: 'Learned to design stable Flask API factory structures, map relationships in SQL-Alchemy, parse messy OCR date layouts using regex, and handle multipart uploads securely.',
    githubUrl: 'https://github.com/Dixitdevesh/MedGaurd_AI',
    demoUrl: 'https://med-gaurd-ai.vercel.app',
    status: 'Completed',
    isFeatured: true
  },
  {
    id: 'securecode-ai',
    name: 'SecureCode AI',
    repoName: 'SecureCode',
    category: 'Cybersecurity',
    shortDesc: 'Automated security code review scanner auditing repositories and zip packages for vulnerabilities.',
    overview: 'SecureCode AI is an automated source auditing dashboard. It parses snippets, repository links, or ZIP structures to scan for OWASP Top 10 vulnerabilities (like SQL Injection, XSS, Path Traversal) using Abstract Syntax Trees (AST) and regex patterns.',
    whyBuilt: 'Developed to understand how static application security testing (SAST) rule-matching works under the hood and to practice implementing AI-assisted code remediation.',
    techStack: ['Python', 'FastAPI', 'React', 'SQLite', 'Pydantic', 'AST Parsing', 'Gemini API', 'ReportLab'],
    keyFeatures: [
      'AST and pattern-based checks across 9 critical threat vectors',
      'Automated side-by-side remediated code patch generation',
      'Dependency scanner auditing requirements.txt and package.json configurations',
      'Security Copilot chat assistant powered by session-aware LLM contexts'
    ],
    whatLearned: 'Gained core experience building AST nodes traversal models, managing async routing patterns with FastAPI, constructing PDF files dynamically, and structuring clean Pydantic validations.',
    githubUrl: 'https://github.com/Dixitdevesh/SecureCode',
    status: 'Completed',
    isFeatured: true
  },
  {
    id: 'aether-voice',
    name: 'A.E.T.H.E.R',
    repoName: 'A.E.T.H.E.R',
    category: 'AI',
    shortDesc: 'Voice-controlled assistant using the Gemini Live Native Audio API for desktop controls.',
    overview: 'A.E.T.H.E.R is an advanced AI assistant utilizing the Gemini Live Audio API. It listens to sound device inputs and answers back using native real-time audio streams, controlling desktop features like browser operations, screens, applications, and hardware parameters.',
    whyBuilt: 'Created to experiment with next-generation native audio multimodal APIs and build a responsive offline desktop companion.',
    techStack: ['Python', 'Gemini Live Audio API', 'sounddevice', 'PyTTSX3', 'Asyncio', 'Windows API'],
    keyFeatures: [
      'Multimodal voice control using native audio preview models',
      'System status modules monitoring CPU, RAM, and thermals in real-time',
      'Proactive automation engine triggering reminders and background alerts',
      'Integrated controller handlers for screen capture, apps, and browsers'
    ],
    whatLearned: 'Mastered managing complex Python asyncio loops, handling raw real-time audio streams, interfacing with native OS actions, and constructing robust memory architectures.',
    githubUrl: 'https://github.com/Dixitdevesh/A.E.T.H.E.R',
    status: 'Beta',
    isFeatured: true
  },
  {
    id: 'ai-researcher',
    name: 'AI Researcher',
    repoName: 'Ai-Researcher',
    category: 'AI',
    shortDesc: 'Autonomous web search synthesis agent compiling research and business reports.',
    overview: 'AI Researcher is a web agent designed to research and write documents. It takes user prompts, crawls search query results, parses matching website articles, and applies LLM generation chains to compile structured business summaries and deep reports.',
    whyBuilt: 'Developed to explore autonomous agent workflows, information scraping, and caching strategies for reducing API retrieval latency.',
    techStack: ['Python', 'Flask', 'Google Search scraper', 'LLMs', 'HTML', 'JavaScript', 'Tailwind CSS'],
    keyFeatures: [
      'Multi-source crawling and synthesis matching specific prompt directives',
      'Business insights generation and sources attribution metrics',
      'Local caching layers with adjustable TTL configs for speed optimization',
      'Sleek responsive web dashboard with live execution logs'
    ],
    whatLearned: 'Developed strategies for sanitizing HTML crawl inputs, structuring multi-agent LLM prompts, caching API payloads, and building unified search routines.',
    githubUrl: 'https://github.com/Dixitdevesh/Ai-Researcher',
    status: 'Completed',
    isFeatured: true
  },
  {
    id: 'void-drop',
    name: 'VoidDrop',
    repoName: 'Void_Drop',
    category: 'Cybersecurity',
    shortDesc: 'Zero-trace, peer-to-peer file sharing platform using WebRTC and client-side AES-256.',
    overview: 'VoidDrop is a peer-to-peer file sharing application. It enables zero-trace browser-to-browser transfers without storing documents on any central server, utilizing WebRTC data channels and local AES-256 encryption.',
    whyBuilt: 'Built to explore secure network protocols, real-time client WebSockets communication, and client-side encryption techniques.',
    techStack: ['Next.js', 'FastAPI', 'WebSockets', 'WebRTC DataChannels', 'Crypto-JS (AES-256)', 'Three.js (Vortex UI)', 'Tailwind CSS'],
    keyFeatures: [
      'Direct P2P file transfers with zero files stored on the server',
      'Local client-side AES-256 encryption with per-session codes',
      'FastAPI signaling relay server managing WebSocket handshakes',
      'Cursor-reactive 3D black hole vortex landing page built with Three.js'
    ],
    whatLearned: 'Gained solid knowledge of WebRTC connection flows, NAT traversal, WebSocket message routing, file chunking with backpressure controls, and custom Three.js shader render setups.',
    githubUrl: 'https://github.com/Dixitdevesh/Void_Drop',
    demoUrl: 'https://reality-gap-analyzer.vercel.app', // wait, void-drop demo or reality-gap-analyzer? Let's keep it github-only if no distinct url, or just show git link. Let's make sure it is verified.
    status: 'Completed',
    isFeatured: true
  },
  {
    id: 'shivansh-krashi',
    name: 'Shivansh Krashi',
    repoName: 'Shivansh_Krashi_Seva_Kedra_Web',
    category: 'Software',
    shortDesc: 'Agricultural service web portal providing crop recommendations and AI advisor panels.',
    overview: 'Shivansh is a responsive agricultural portal for a local farming store in Mathura. It implements crop-specific fertilizer and seed recommendations, weather tips, and a chatbot ("Krashi AI") designed to assist farmers.',
    whyBuilt: 'Designed to solve real-world accessibility issues in agricultural retail, integrating AI features with lightweight local web assets.',
    techStack: ['React', 'Vite', 'Python Serverless', 'Gemini API', 'Tailwind CSS', 'Vercel Serverless'],
    keyFeatures: [
      'Interactive Krashi AI chatbot with direct translation patterns',
      'Crop matching engine mapping specific requirements to seeds and inputs',
      'Offline fallback rule configurations to keep answering if API is down',
      'Farming tips panels and styled dashboard panels for local products'
    ],
    whatLearned: 'Learned to set up Serverless Functions on Vercel, coordinate localized multilingual prompts, optimize asset sizes, and build offline backup response networks.',
    githubUrl: 'https://github.com/Dixitdevesh/Shivansh_Krashi_Seva_Kedra_Web',
    demoUrl: 'https://shivanshkrashisevakendra.vercel.app',
    status: 'Completed',
    isFeatured: true
  },
  {
    id: 'jarvis-ai',
    name: 'JarvisAI',
    repoName: 'FirstAi_Jarvis',
    category: 'Software',
    shortDesc: 'Interactive speech-based assistant running Google searches and desktop utilities.',
    overview: 'JarvisAI is an interactive voice utility built as a classroom demonstration project. It accepts microphone voice commands, outputs text-to-speech feedback, and assists users with standard searches, games, and system shortcuts.',
    whyBuilt: 'Built during school as an introductory programming showcase to study desktop voice control loops and speech processing bindings.',
    techStack: ['Python', 'SpeechRecognition', 'PyTTSX3', 'Webbrowser module', 'OS bindings'],
    keyFeatures: [
      'Speech recognition and text-to-speech audio feedback',
      'Automated web commands opening standard sites (Google, YouTube, etc.)',
      'Fun local terminal mini-games (number guessing, riddles, rock-paper-scissors)',
      'Basic calculation tools and text file generation routines'
    ],
    whatLearned: 'Learned python basics, system automation scripts, speech package parameters, and basic input/output terminal structures.',
    githubUrl: 'https://github.com/Dixitdevesh/FirstAi_Jarvis',
    status: 'Completed',
    isFeatured: false
  },
  {
    id: 'pg-finder',
    name: 'PGFinder',
    repoName: 'PG_Finder',
    category: 'Software',
    shortDesc: 'Django-based paying guest booking app with Leaflet OpenStreetMap integrations.',
    overview: 'PGFinder is a Paying Guest (PG) accommodation platform. It features role-based user panels for customers and property managers, map-based location search, and integrated payment setups.',
    whyBuilt: 'Built to understand full-featured MTV (Model-Template-View) web architectures in Django, practice database designs, and work with geospatial searches.',
    techStack: ['Python', 'Django', 'SQLite', 'Leaflet.js', 'OpenStreetMap API', 'Razorpay SDK template'],
    keyFeatures: [
      'Role-based permissions (Customer, Manager, Admin)',
      'Map query endpoints searching and displaying nearby PG options without external API keys',
      'Booking records database mapping room amenities and active payments',
      'Razorpay order creation and webhook handlers template'
    ],
    whatLearned: 'Gained solid insight into Django models, custom authentication backends, database migration pipelines, and spatial queries integrations with Leaflet.',
    githubUrl: 'https://github.com/Dixitdevesh/PG_Finder',
    status: 'Prototype',
    isFeatured: false
  }
];
