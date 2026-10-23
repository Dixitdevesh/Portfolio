export interface Certificate {
  id: string;
  title: string;
  event: string;
  date: string;
  type: 'Participation' | 'Achievement' | 'Course';
  image?: string; // Path inside /public/certificates/ or external URL
  pdf?: string;   // Path inside /public/certificates/ or external URL
  verificationUrl?: string; // Real verification URL if available
}

export const certificatesData: Certificate[] = [
  {
    id: 'dragon-con-detective-cert',
    title: 'Orkla: Dragon Con Detective Certificate',
    event: 'Orkla: Dragon Con Detective',
    date: '07 Aug 2026',
    type: 'Participation',
    pdf: 'certificates/dragon-con-detective.pdf'
  },
  {
    id: 'ey-techathon-cert',
    title: 'EY Techathon 6.0 Certificate',
    event: 'EY Techathon 6.0',
    date: '14 Apr 2026',
    type: 'Participation',
    image: 'certificates/ey-techathon.jpg',
    verificationUrl: 'https://unstop.com/certificate-preview/49701362-9765-431f-a001-b191ef0f8e21'
  },
  {
    id: 'gemini-quizoff-cert',
    title: 'Google Gemini QuizOff 2026 Participation',
    event: 'Google Gemini QuizOff',
    date: '30 Jun 2026',
    type: 'Participation',
    verificationUrl: 'https://unstop.com/certificate-preview/8d629bbd-d323-4333-960a-6e0bcd94ec00'
  },
  {
    id: 'devcation-cert',
    title: "Devcation Hack 'N' Solve Certificate",
    event: "Devcation Hack 'N' Solve",
    date: '15 Apr 2026',
    type: 'Participation',
    image: 'certificates/devcation.jpg',
    verificationUrl: 'https://unstop.com/certificate-preview/3460132a-47e1-42f8-b37c-d3cc59e2143e'
  },
  {
    id: 'rift-cert',
    title: "RIFT '26 Hackathon Certificate",
    event: "RIFT '26 Hackathon",
    date: '26 Feb 2026',
    type: 'Participation',
    image: 'certificates/rift.jpg'
  },
  {
    id: 'iit-delhi-cert',
    title: 'IIT Delhi Technical Event Certificate',
    event: 'IIT Delhi Technical Conclave',
    date: '2025/2026',
    type: 'Participation',
    image: 'certificates/iit-delhi.jpg'
  },
  {
    id: 'iit-madras-cert',
    title: 'IIT Madras Event Certificate',
    event: 'IIT Madras Tech Fest',
    date: '2025/2026',
    type: 'Participation',
    image: 'certificates/iit-madras.jpg'
  },
  {
    id: 'dtu-cert',
    title: 'DTU Hackathon Certificate',
    event: 'DTU Technical Challenge',
    date: '2025/2026',
    type: 'Participation',
    image: 'certificates/dtu.jpg'
  },
  {
    id: 'ctf-cert',
    title: 'Capture The Flag (CTF) Challenge Certificate',
    event: 'Cybersecurity CTF Competition',
    date: '2025/2026',
    type: 'Participation',
    image: 'certificates/ctf.jpg'
  },
  {
    id: 'paranox-cert',
    title: 'Paranox 2.0 Participation Certificate',
    event: 'Paranox 2.O Hackathon',
    date: '31 Oct 2025',
    type: 'Participation',
    verificationUrl: 'https://unstop.com/certificate-preview/d8e7eaea-c53c-4590-bd7b-a9b8f9746ac7'
  }
];
