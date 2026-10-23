export interface HackathonEvent {
  id: string;
  title: string;
  date: string;
  type: 'Hackathon' | 'Quiz' | 'Assessment' | 'Other';
  year: '2026' | '2025';
  role: 'Participation' | 'Winner' | 'Runner-up';
  description?: string;
}

export const hackathonEvents: HackathonEvent[] = [
  {
    id: 'hawkins-files',
    title: 'The Hawkins Files',
    date: '18 Jul 2026',
    type: 'Other',
    year: '2026',
    role: 'Participation',
    description: 'Participated in the cybersecurity investigation challenge themed around OSINT and problem-solving.'
  },
  {
    id: 'gemini-quizoff-1',
    title: 'Google Gemini QuizOff 2026',
    date: '30 Jun 2026',
    type: 'Quiz',
    year: '2026',
    role: 'Participation',
    description: 'Engaged in a national level tech quiz testing depth on Gemini API integrations and features.'
  },
  {
    id: 'gemini-quizoff-2',
    title: 'Google Gemini QuizOff 2026',
    date: '26 Jun 2026',
    type: 'Quiz',
    year: '2026',
    role: 'Participation',
    description: 'Participated in round assessments on LLM capabilities and Google Cloud AI models.'
  },
  {
    id: 'quizoff-campuscrew',
    title: 'QuizOff 2026 by CampusCrew',
    date: '24 Jun 2026',
    type: 'Quiz',
    year: '2026',
    role: 'Participation',
    description: 'Technical event checking fundamentals of algorithms, database scaling, and web architectures.'
  },
  {
    id: 'unstop-week-of-wins',
    title: 'Unstop Week-of-Wins',
    date: '16 Jun 2026',
    type: 'Other',
    year: '2026',
    role: 'Participation',
    description: 'Series of technical skill tests covering analytical logic and software development concepts.'
  },
  {
    id: 'triq',
    title: 'TRiQ',
    date: '11 Jun 2026',
    type: 'Quiz',
    year: '2026',
    role: 'Participation',
    description: 'Participated in a dynamic algorithmic puzzle-solving and tech trivia competition.'
  },
  {
    id: 'techtrix-assessment',
    title: 'TechTrix Assessment',
    date: '07 Jun 2026',
    type: 'Assessment',
    year: '2026',
    role: 'Participation',
    description: 'General assessment on engineering concepts, programming syntax, and networking paradigms.'
  },
  {
    id: 'codorra-2026',
    title: 'Codorra 2026',
    date: '01 Jun 2026',
    type: 'Hackathon',
    year: '2026',
    role: 'Participation',
    description: 'Participated in coding sprint challenges targeting optimized data structure representations.'
  },
  {
    id: 'devcation-hack-solve',
    title: "Devcation Hack 'N' Solve",
    date: '15 Apr 2026',
    type: 'Hackathon',
    year: '2026',
    role: 'Participation',
    description: 'Full day building and debugging competition tackling specific civic issue statements.'
  },
  {
    id: 'ey-techathon-6',
    title: 'EY Techathon 6.0',
    date: '14 Apr 2026',
    type: 'Hackathon',
    year: '2026',
    role: 'Participation',
    description: 'National hackathon testing prototype development capabilities around automation.'
  },
  {
    id: 'execute-5',
    title: 'Execute 5.0',
    date: '26 Feb 2026',
    type: 'Hackathon',
    year: '2026',
    role: 'Participation',
    description: 'Rapid prototyping coding contest developing functional tools in a short time frame.'
  },
  {
    id: 'rift-26',
    title: "RIFT '26 Hackathon",
    date: '26 Feb 2026',
    type: 'Hackathon',
    year: '2026',
    role: 'Participation',
    description: 'Collaborative development hackathon exploring AI extensions and lightweight APIs.'
  },
  {
    id: 'synaptix-frontier-ai',
    title: 'Synaptix Frontier AI Hack',
    date: '29 Jan 2026',
    type: 'Hackathon',
    year: '2026',
    role: 'Participation',
    description: 'AI prototyping hackathon building interactive client tools on top of LLM platforms.'
  },
  {
    id: 'paranox-2',
    title: 'Paranox 2.0 Hackathon',
    date: '31 Oct 2025',
    type: 'Hackathon',
    year: '2025',
    role: 'Participation',
    description: 'Vibrant developer hackathon aimed at designing and coding original web projects.'
  }
];
