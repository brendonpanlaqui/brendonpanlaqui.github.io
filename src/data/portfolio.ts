export type ProjectFilter = 'All' | 'Web & Full-Stack' | 'Mobile' | 'AI & Hackathons';

export interface Project {
  id: string;
  filter: Exclude<ProjectFilter, 'All'>;
  category: string;
  title: string;
  subtitle: string;
  period: string;
  role: string;
  summary: string;
  motivation: string;
  highlights: string[];
  architectureNotes: string[];
  stack: string[];
  featured?: boolean;
  repoUrl?: string;
  liveUrl?: string;
}

export const PROFILE = {
  brand: 'BRENDON PANLAQUI',
  name: 'Brendon Panlaqui',
  typewriterRoles: [
    'Full-Stack Web & Mobile Developer.',
    'Network & Cybersecurity Specialist.',
    'AI Workflow & Automation Builder.',
  ],
  location: 'Pampanga, Philippines',
  educationBadge: "BS Computer Science (Dean's Lister)",
  bio: 'Building full-stack web and mobile apps, admin dashboards, and automated workflows backed by CCNA networking fundamentals.',
  about:
    'CS student at City College of Angeles and freelance developer. I build web and mobile applications from database schema to UI, applying security and data-integrity habits from Cisco networking, CTF competitions, and healthcare workflows at Knack RCM.',
  email: 'brendonpanlaqui15@gmail.com',
  phone: '09946308962',
  github: 'https://github.com/brendonpanlaqui',
  linkedin: 'https://linkedin.com/in/bpanlaqui',
  resumeFile: '/Panlaqui_Brendon_Resume.pdf',
  formspreeEndpoint: 'https://formspree.io/f/YOUR_FORM_ID',
  aiChatWebhookUrl: '',
};

export const SKILLS: Record<string, string[]> = {
  Frontend: ['React', 'TypeScript', 'Tailwind CSS', 'Bootstrap'],
  Backend: ['Python', 'Django REST', 'FastAPI', 'Flask', 'PHP', 'Laravel', 'PostgreSQL', 'MySQL'],
  'Mobile & Cloud': ['React Native', 'Expo', 'Firebase', 'Google Maps API'],
  'Automation & Tools': ['n8n', 'Dify', 'Git & GitHub', 'Postman', 'Figma', 'Cisco Packet Tracer'],
};

export const PROJECTS: Project[] = [
  {
    id: 'fair',
    filter: 'Web & Full-Stack',
    category: 'Capstone Thesis • Mobile & Web Admin',
    title: 'Fair',
    subtitle: 'Tricycle Fare App & LGU Admin Portal',
    period: 'Jan 2026 – Dec 2026',
    role: 'Team Lead & Full-Stack Developer',
    featured: true,
    summary:
      'Commuter and driver mobile app paired with an LGU web dashboard that calculates ordinance-compliant tricycle fares via GPS.',
    motivation:
      'Built with a 5-person team to reduce tricycle fare disputes by showing commuters the official fare upfront and giving transport regulators GPS logs to audit complaints.',
    highlights: [
      'Led a 5-member team building the dual-role React Native (TypeScript) mobile app.',
      'Implemented upfront route locking via Google Maps Directions API, QR/FCM ride pairing, and 50m Haversine proximity checks.',
      'Built the Django REST + PostgreSQL backend and PTRO admin portal for fare matrix updates, polyline dispute reviews, and backups.',
    ],
    architectureNotes: [
      'Validates Angeles City boundary limits and triggers pickup/drop-off arrival within a 50m Haversine radius.',
      'Stores trip GPS polylines alongside computed fare tiers for objective dispute auditing.',
    ],
    stack: ['React Native', 'TypeScript', 'Django REST', 'PostgreSQL', 'Google Maps API'],
    repoUrl: 'https://github.com/brendonpanlaqui',
  },
  {
    id: 'woomera',
    filter: 'AI & Hackathons',
    category: 'Hackathon • 48-Hour Sprint',
    title: 'Woomera',
    subtitle: 'AI Flood & Weather Risk Dashboard',
    period: 'Nov 2025',
    role: 'Frontend Developer • Cloudstaff AI Hackathon',
    summary:
      'Real-time flood warning and safe-route dashboard built in 48 hours using React and Flask.',
    motivation:
      'Created during the Cloudstaff AI Hackathon to help residents check localized flood hazards and safer routes during heavy rainfall.',
    highlights: [
      'Built the React frontend and hazard map interface within a 48-hour sprint.',
      'Connected live weather APIs to stream rainfall data into the Flask risk model.',
    ],
    architectureNotes: [
      'Feeds third-party meteorological data directly into the Flask backend and React hazard map.',
    ],
    stack: ['React', 'Flask', 'Python', 'Weather APIs'],
    repoUrl: 'https://github.com/brendonpanlaqui',
  },
  {
    id: 'galong-galinda',
    filter: 'Web & Full-Stack',
    category: 'Client Project • Web Platform',
    title: 'Galóng Galínda',
    subtitle: 'Sports & PE Event Platform',
    period: 'Nov 2026',
    role: 'Freelance Frontend Developer',
    summary:
      'Event website for a Physical Education organization using Google Sheets as a zero-cost headless CMS.',
    motivation:
      'The organizers needed a fast public site they could update themselves without paying for database hosting or touching code.',
    highlights: [
      'Used Google Sheets as a live CMS so officers can update schedules, directories, and galleries directly.',
      'Integrated Formspree for participant registration and built the responsive UI with Tailwind CSS.',
    ],
    architectureNotes: [
      'Static React frontend pulls live spreadsheet data with zero backend hosting overhead.',
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Google Sheets API'],
    repoUrl: 'https://github.com/brendonpanlaqui',
  },
  {
    id: 'kpmpngn',
    filter: 'Mobile',
    category: 'Client Project • Mobile App',
    title: 'KPMPNGN',
    subtitle: 'Angeles City Tourism Guide App',
    period: 'Jan 2026',
    role: 'Freelance Mobile Developer',
    summary:
      'Mobile travel guide showcasing curated heritage landmarks and dining spots across Angeles City.',
    motivation:
      'Commissioned for a Tourism program project to turn local destination research into a clean, browsable mobile companion.',
    highlights: [
      'Built responsive mobile screens in React Native and Expo based on client content.',
      'Organized destination directories, heritage spot cards, and simple navigation flows.',
    ],
    architectureNotes: [
      'Focused exclusively on Angeles City culinary and cultural destinations.',
    ],
    stack: ['React Native', 'Expo', 'JavaScript'],
    repoUrl: 'https://github.com/brendonpanlaqui',
  },
  {
    id: 'horasko',
    filter: 'Web & Full-Stack',
    category: 'Full-Stack Web • Productivity',
    title: 'HorasKo',
    subtitle: 'Work Hours & Cut-Off Tracker',
    period: 'Dec 2025 – Feb 2026',
    role: 'Full-Stack Developer',
    summary:
      'Shift logger and automated semi-monthly payroll cut-off calculator built with Laravel and React.',
    motivation:
      'Built to replace error-prone manual spreadsheets when tracking daily shifts across 15th and end-of-month pay cut-offs.',
    highlights: [
      'Built a Laravel REST API for shift logging, overtime rules, and automatic pay-period grouping.',
      'Created a React dashboard to log hours and review cut-off totals, cutting manual math errors by ~80%.',
    ],
    architectureNotes: [
      'Server-side date logic automatically splits shift logs across semi-monthly pay periods.',
    ],
    stack: ['React', 'Laravel', 'PHP', 'MySQL'],
    repoUrl: 'https://github.com/brendonpanlaqui',
  },
  {
    id: 'quest-hunt',
    filter: 'Web & Full-Stack',
    category: 'Web Platform • Job Board',
    title: 'Quest Hunt',
    subtitle: 'Local Skilled-Labor Job Board',
    period: '2025',
    role: 'Full-Stack Developer',
    summary:
      'Dual-role job board connecting local employers and skilled workers with filtered search and application tracking.',
    motivation:
      'Built to give local skilled workers a straightforward way to list their trades and apply directly to nearby employers.',
    highlights: [
      'Built separate session-protected dashboards for employers and job seekers.',
      'Added multi-filter search by trade and location alongside admin reporting tools.',
    ],
    architectureNotes: [
      'Role-based session guards separate employer job management from applicant views.',
    ],
    stack: ['PHP', 'JavaScript', 'MySQL', 'Bootstrap'],
    repoUrl: 'https://github.com/brendonpanlaqui',
  },
  {
    id: 'egnosis',
    filter: 'Mobile',
    category: 'Mobile App • EdTech',
    title: 'eGnosis',
    subtitle: 'QR Library Borrowing System',
    period: '2025',
    role: 'Backend & Database Developer',
    summary:
      'Mobile library system for reserving, borrowing, and returning books via QR scans backed by Cloud Firestore.',
    motivation:
      'Built the Firebase backend to replace manual paper logbooks so book availability updates the moment a QR code is scanned.',
    highlights: [
      'Designed the Firestore schema for book catalogs, active loans, and reservation queues.',
      'Implemented QR scan validation to prevent double-booking and keep inventory synced.',
      'Configured Firebase Auth and security rules to separate student and librarian access.',
    ],
    architectureNotes: [
      'Enforces strict book state transitions (Available → Reserved → Borrowed → Returned) on every scan.',
    ],
    stack: ['Firebase Auth', 'Cloud Firestore', 'QR Integration'],
    repoUrl: 'https://github.com/brendonpanlaqui',
  },
];

export const EXPERIENCE = [
  {
    organization: 'Knack RCM',
    role: 'Process Associate',
    period: 'Jul 2026 – Dec 2026',
    summary:
      'Processed high-volume healthcare billing workflows under strict HIPAA compliance, data integrity, and turnaround SLAs.',
  },
  {
    organization: 'Freelance Development',
    role: 'Web & Mobile Developer',
    period: '2025 – 2026',
    summary:
      'Built custom web and mobile apps (Galóng Galínda, KPMPNGN) for Tourism and Physical Education academic clients.',
  },
  {
    organization: 'City College of Angeles',
    role: 'BS Computer Science • Consistent Dean’s Lister',
    period: '2023 – Jun 2027',
    summary:
      'Coursework in Software Engineering, Data Structures & Algorithms, Web Programming, Database Management, and Networking.',
  },
];

export interface Competition {
  event: string;
  placement: string;
  date: string;
  detail: string;
  certificateUrl?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  url?: string;
}

export const COMPETITIONS: Competition[] = [
  {
    event: 'Cisco NetAcad Riders 2026 (APJC)',
    placement: 'Regional Participant',
    date: 'Apr 2026',
    detail: 'Represented the institution in the Asia-Pacific, Japan, and China Cisco Networking Academy skills competition.',
    certificateUrl: '/certificates/cisco-netacad-riders-2026.pdf',
  },
  {
    event: 'Cisco Regional Student Congress (CCNA CTF)',
    placement: '4th Place (3rd Runner-Up)',
    date: 'Jan 2026',
    detail: 'Competed against regional universities in timed routing, switching, and network troubleshooting challenges.',
  },
  {
    event: 'Hack4Gov 2025 Region 3 (CTF)',
    placement: 'Regional Competitor',
    date: 'Dec 2025',
    detail: 'Solved regional cybersecurity CTF challenges in Web Exploitation, Digital Forensics, and Steganography under time constraints.',
  },
  {
    event: 'Cloudstaff AI Hackathon 2025',
    placement: 'Participant',
    date: 'Nov 2025',
    detail: 'Built the React frontend and integrated live weather APIs for Woomera, an AI-powered flood risk monitoring dashboard.',
    // certificateUrl: '/certificates/cloudstaff-ai-hackathon-2025.pdf',
  },
  {
    event: 'CCA Capture the Flag (CTF)',
    placement: 'Two-Time Champion',
    date: 'Sep 2023 & Oct 2025',
    detail: 'Secured first place in consecutive university cybersecurity competitions, demonstrating sustained expertise in problem-solving and security.',
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Cyber Threat Monitoring Level 1',
    issuer: 'In Progress',
    date: '2026',
  },
  {
    title: 'Linux Essentials',
    issuer: 'Cisco Networking Academy',
    date: '2026',
  },
  {
    title: 'CCNAv7: Enterprise Networking, Security, and Automation',
    issuer: 'Cisco Networking Academy',
    date: 'Jun 2026',
    url: '/certificates/ccna-ensa.pdf',
  },
  {
    title: 'CCNAv7: Switching, Routing, and Wireless Essentials',
    issuer: 'Cisco Networking Academy',
    date: 'Feb 2026',
    url: '/certificates/ccna-srwe.pdf',
  },
  {
    title: 'Fundamentals of Ethical Hacking: CTF-Based Approach',
    issuer: 'LITS • Certificate of Participation',
    date: 'Feb 2026',
    url: '/certificates/ethical-hacking-ctf-2026.pdf',
  },
  {
    title: 'Cybersecurity Essentials (LFC108)',
    issuer: 'The Linux Foundation • ID: LF-34sm9pncoi',
    date: 'Oct 2025',
    url: '/certificates/cybersecurity-essentials-lfc108.pdf',
  },
  {
    title: 'CCNAv7: Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    date: '2025',
  },
  {
    title: 'IT Essentials: PC Hardware and Software',
    issuer: 'Cisco Networking Academy',
    date: 'Jan 2024',
    url: '/certificates/it-essentials.pdf',
  },
];