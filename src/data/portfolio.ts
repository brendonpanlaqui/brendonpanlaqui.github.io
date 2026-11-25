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
  educationBadge: "BS Computer Science, City College of Angeles",
  bio: 'Building full-stack web and mobile apps, admin dashboards, and automated workflows backed by CCNA networking fundamentals.',
  about:
    'Full-stack developer building end-to-end web, mobile, and automated systems—from backend architecture to UI—with security and reliability built in.',
  email: 'brendonpanlaqui15@gmail.com',
  phone: '+639946308962',
  github: 'https://github.com/brendonpanlaqui',
  linkedin: 'https://linkedin.com/in/bpanlaqui',
  resumeFile: '/Brendon_Panlaqui_Resume.pdf',
  formspreeEndpoint: 'https://formspree.io/f/xzdplqlo',
  aiChatWebhookUrl: 'https://portfolio-chat.arbetpanlaqui874.workers.dev/',
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
    period: 'Dec 2026',
    role: 'Team Lead & Full-Stack Developer',
    featured: true,
    summary:
      'Commuter and driver mobile app paired with an LGU web dashboard that calculates ordinance-compliant tricycle fares via GPS.',
    motivation:
      'A tricycle fare transparency and regulatory platform for Angeles City under Ordinance No. 723, S-2024, Philippines. It shows commuters the official fares upfront before riding and gives transport regulators verifiable GPS logs to resolve overcharging disputes.',
    highlights: [
      'Led a 5-member capstone team across architecture, mobile and backend development, and testing, building the dual-role React Native (TypeScript) app.',
      'Implemented upfront route calculation and locking via Google Maps APIs, paired with live trip tracking and proximity checks.',
      'Built the Django REST + PostgreSQL backend and LGU/PTRO admin portal for fare matrix management, discount/dispute reviews, and trip auditing.',
    ],
    architectureNotes: [
      'Records trip routes and computed fare tiers so transport regulators can audit complaints objectively.',
      'Enforces Angeles City boundary geofencing for cross-border trips and detects pickup/drop-off arrival using Haversine distance checks.',
    ],
    stack: ['React Native', 'Expo', 'TypeScript', 'Django REST', 'PostgreSQL', 'Google Maps API'],
    repoUrl: 'https://github.com/brendonpanlaqui',
  },
  {
    id: 'woomera',
    filter: 'AI & Hackathons',
    category: 'Hackathon • 48-Hour Sprint',
    title: 'Woomera',
    subtitle: 'Real-Time Flood & Weather Risk Dashboard',
    period: 'Nov 2025',
    role: 'Frontend Developer • Cloudstaff AI Hackathon',
    summary:
      'Real-time flood monitoring and safe-route recommendation dashboard.',
    motivation:
      'Real-time flood and weather risk dashboard to help city leaders and residents anticipate risks, coordinate emergency response, and plan recovery.',
    highlights: [
      'Completed the initial React frontend setup and interactive hazard map foundation',
      'Identified and sourced the external weather API used to supply live meteorological and rainfall data for risk assessment.',
    ],
    architectureNotes: [
      'Feeds live weather API telemetry into a Python/Flask risk backend and React map dashboard supporting pre-disaster warnings, live incident monitoring, and post-disaster recovery insights.',
    ],
    stack: ['React', 'Flask', 'Python', 'Dify', 'Weather APIs'],
    repoUrl: 'https://github.com/brendonpanlaqui',
  },
  {
    id: 'galong-galinda',
    filter: 'Web & Full-Stack',
    category: 'Client Project • Web Platform',
    title: 'Galóng Galínda',
    subtitle: 'Sports & PE Event Platform',
    period: 'Oct 2026',
    role: 'Freelance Frontend Developer',
    summary:
      'Event management platform powered by a Google Sheets CMS.',
    motivation:
      'Web platform for a sports and physical education (BPEd) organization, built so organizers can publish event schedules, directories, and updates directly from Google Sheets with zero database hosting costs.',
    highlights: [
      'Built a responsive web application featuring dark mode, smooth navigation, and event, directory, and certificate galleries.',
      'Connected Google Sheets as a lightweight CMS for live schedule and content updates without requiring code changes from the client.',
      'Integrated Formspree workflows to handle participant inquiries and event registrations cleanly.',
    ],
    architectureNotes: [
      'Static React frontend fetches live spreadsheet data directly, avoiding paid backend/database infrastructure while keeping content edits instant for non-technical staff.',
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Google Sheets API'],
    repoUrl: 'https://github.com/brendonpanlaqui',
  },
  {
    id: 'kpmpngn',
    filter: 'Mobile',
    category: 'Client Project • Mobile App',
    title: 'KPMPNGN',
    subtitle: 'Angeles City Travel Buddy App',
    period: 'May 2025',
    role: 'Freelance Mobile Developer',
    summary:
      'Mobile travel guide for heritage, dining, and local discovery.',
    motivation:
      'Mobile tourism companion app commissioned for a Tourism (BSTM) client project, turning local destination research into a browsable mobile guide.',
    highlights: [
      'Built responsive mobile screens with a custom dark-mode interface based on client preferences.',
      'Organized destination directories, heritage spot cards, and simple navigation flows.',
    ],
    architectureNotes: [
      'Focused exclusively on Angeles City landmarks, food spots, lodging, cultural destinations, and local facts, with a modular layout ready to expand across other Pampanga municipalities.',
    ],
    stack: ['React Native', 'Expo', 'JavaScript'],
    repoUrl: 'https://github.com/brendonpanlaqui',
  },
  {
    id: 'horasko',
    filter: 'Web & Full-Stack',
    category: 'Full-Stack Web • Productivity',
    title: 'HorasKo',
    subtitle: 'Personal Work Hours Tracker',
    period: 'Sep 2025',
    role: 'Full-Stack Developer',
    summary:
      'Shift logger and automated semi-monthly payroll cut-off automation system',
    motivation:
      'A web app that replaces messy manual time logs by letting users record daily work hours, search past entries, and view automatic summaries across semi-monthly (15th and end-of-month) pay cut-offs.',
    highlights: [
      'Built for shift logging, overtime hour calculations, and automatic pay-period grouping.',
      'Developed a dashboard with real-time KPI cards and quick daily shift entry.',
    ],
    architectureNotes: [
      'Server-side date and cut-off boundary logic automatically partitions shift entries into semi-monthly pay periods and computes regular versus overtime totals.',
    ],
    stack: ['React', 'Laravel', 'PHP', 'MySQL'],
    repoUrl: 'https://github.com/brendonpanlaqui',
  },
  {
    id: 'quest-hunt',
    filter: 'Web & Full-Stack',
    category: 'Web Platform • Job Board',
    title: 'Quest Hunt',
    subtitle: 'Local Employment Platform',
    period: 'May 2025',
    role: 'Full-Stack Developer',
    summary:
      'Local job platform connecting skilled workers and employers.',
    motivation:
      'A local job board connecting Angeles City employers with skilled online and on-site workers, built from scratch in PHP and MySQL.',
    highlights: [
      'Built separate login-protected dashboards for employers, workers, and admins without using a framework.',
      'Added job search, application tracking, user profiles, and admin reporting tools.',
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
    subtitle: 'Library Information & Record System',
    period: '2025',
    role: 'Backend & Database Developer',
    summary:
      'QR-powered library management and borrowing system.',
    motivation:
      'A library app that replaces paper logbooks with live cloud-synced student and book records.',
    highlights: [
      'Connected the app to Firebase so student records update immediately across devices.',
      'Built the features to add, search, edit, and delete student and library entries.',
      'Set up Gradle so the team could build and run the project cleanly without setup issues.',
    ],
    architectureNotes: [
      'Enforces strict book state transitions (Available → Reserved → Borrowed → Returned) on every scan.',
    ],
    stack: ['Java','Firebase Auth', 'Cloud Firestore', 'QR Integration'],
    repoUrl: 'https://github.com/brendonpanlaqui',
  },
];

export const EXPERIENCE = [
  {
    organization: 'Freelance Development',
    role: 'Web & Mobile Developer',
    period: 'May 2025 – Present',
    summary:
      'Developed custom web and mobile applications for academic organizations, handling requirements, design, development, and deployment.',
  },
  {
    organization: 'Knack RCM',
    role: 'Process Associate',
    period: 'Jul 2026 – Nov 2026',
    summary:
      'Worked with high-volume healthcare operations, maintaining HIPAA compliance, data quality, process accuracy, and SLA performance.',
  },
  {
    organization: 'City College of Angeles',
    role: 'BS Computer Science • Dean’s Lister',
    period: '2023 – 2027',
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
    event: 'Cloudstaff AI Hackathon 2025 (AI IGNITE)',
    placement: 'Participant',
    date: 'Nov 2025',
    detail: 'Built the React frontend and integrated live weather APIs for Woomera, an AI-powered flood risk monitoring dashboard.',
    // certificateUrl: '/certificates/cloudstaff-ai-hackathon-2025.pdf',
  },
  {
    event: 'CCA: Software Freedom Day (CTF)',
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


export const SEMICONDUCTOR_CERTIFICATIONS = [
  {
    title: 'Introduction to Semiconductor Manufacturing',
    url: '/certificates/upou-semiconductor-manufacturing.pdf',
  },
  {
    title: 'Semiconductor Materials Physics (Foundation)',
    url: '/certificates/upou-semiconductor-materials-physics.pdf',
  },
  {
    title: 'Industrial Electronics for Semiconductor Manufacturing (Foundation)',
    url: '/certificates/upou-industrial-electronics.pdf',
  },
];