export interface Project {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  period: string;
  role: string;
  summary: string;
  highlights: string[];
  stack: string[];
  featured?: boolean;
  repoUrl?: string;
  liveUrl?: string;
}

export const PROFILE = {
  name: 'Brendon L. Panlaqui',
  headline: 'Full-Stack Developer & Network Security Specialist',
  location: 'Angeles City, Pampanga, Philippines',
  email: 'brendonpanlaqui15@gmail.com',
  phone: '09946308962',
  github: 'https://github.com/brendonpanlaqui',
  linkedin: 'https://linkedin.com/in/bpanlaqui',
  resumeFile: '/Panlaqui_Brendon_Resume.pdf',
  bio: 'Computer Science senior at City College of Angeles (Consistent Dean’s Lister) engineering ordinance-compliant mobility platforms, full-stack web ecosystems, and AI-automated workflows. Cisco CCNA certified with a competitive cybersecurity background.',
};

export const PROJECTS: Project[] = [
  {
    id: 'fair',
    category: 'Capstone Thesis • Mobility & GovTech',
    title: 'Fair',
    subtitle: 'Ordinance-Compliant Tricycle Fare App & LGU/PTRO Web Admin Portal',
    period: 'Jan 2026 – Dec 2026',
    role: 'Team Lead & Full-Stack Developer',
    featured: true,
    summary:
      'A municipal transit compliance ecosystem built for Angeles City commuters, drivers, and the Public Transportation Regulatory Office (PTRO), enforcing official fare matrices with 98%+ distance accuracy.',
    highlights: [
      'Directed a 5-member engineering team to ship dual-role Commuter and Driver mobile interfaces in React Native and TypeScript.',
      'Implemented upfront route locking via Google Maps Directions API, real-time QR/FCM ride handshakes, and Haversine 50m proximity and city-boundary geofencing.',
      'Architected a Django REST Framework and PostgreSQL backend powering an LGU/PTRO web dashboard with JWT authentication, dynamic fare matrix configuration, GPS polyline dispute auditing, and automated database backup/restore workflows.',
    ],
    stack: ['React Native', 'Expo', 'TypeScript', 'Django REST', 'PostgreSQL', 'Google Maps API', 'Firebase'],
  },
  {
    id: 'galong-galinda',
    category: 'Client Commission • Web Platform',
    title: 'Galóng Galínda',
    subtitle: 'Sports & Physical Education Event Web Platform',
    period: '2026',
    role: 'Freelance Frontend Developer',
    summary:
      'Custom responsive web platform built for a Physical Education organization at City College of Angeles with zero ongoing server hosting overhead.',
    highlights: [
      'Architected a zero-cost headless CMS backed by Google Sheets so non-technical organizers can update event schedules, directories, and galleries in real time.',
      'Integrated Formspree for automated participant registration and lead capture alongside custom Tailwind CSS motion transitions.',
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Google Sheets API', 'Formspree'],
  },
  {
    id: 'kpmpngn',
    category: 'Client Commission • Mobile Travel Companion',
    title: 'KPMPNGN',
    subtitle: 'Angeles City Cultural & Tourism Mobile Guide',
    period: '2025 – 2026',
    role: 'Freelance Mobile Developer',
    summary:
      'Cross-platform mobile travel companion tailored exclusively to Angeles City tourism destinations, culinary heritage, and local navigation.',
    highlights: [
      'Translated Tourism degree program requirements into an intuitive mobile interface built with React Native and Expo.',
      'Designed structured destination guides, curated local directories, and responsive mobile navigation flows.',
    ],
    stack: ['React', 'React Native', 'Expo', 'JavaScript (ES6+)'],
  },
  {
    id: 'woomera',
    category: 'Hackathon Build • 48-Hour Sprint',
    title: 'Woomera',
    subtitle: 'AI-Powered Flood & Weather Risk Monitoring System',
    period: 'Nov 2025',
    role: 'Frontend Developer • Cloudstaff AI Hackathon (AI IGNITE)',
    summary:
      'Rapidly prototyped disaster intelligence dashboard providing localized flood risk alerts, map routing, and weather telemetry under a strict 48-hour deadline.',
    highlights: [
      'Spearheaded initial frontend architecture and UI/UX layout in React while integrating third-party meteorological APIs for the Flask AI modeling pipeline.',
    ],
    stack: ['React', 'Flask', 'Python', 'Weather APIs'],
  },
];

export const EXPERIENCE = [
  {
    organization: 'Knack RCM',
    role: 'Process Associate',
    period: 'Jul 2026 – Dec 2026',
    location: 'Angeles City, Pampanga',
    bullets: [
      'Managed end-to-end healthcare revenue cycle management (RCM) workflows, processing high-volume records under strict HIPAA compliance, data integrity, and turnaround SLA requirements.',
      'Collaborated across operational teams to resolve account discrepancies, standardize documentation procedures, and maintain quality assurance standards.',
    ],
  },
  {
    organization: 'Freelance Software Development',
    role: 'Full-Stack & Frontend Developer',
    period: '2025 – 2026',
    location: 'Angeles City, Pampanga',
    bullets: [
      'Operated an independent development practice delivering custom web and mobile applications for Tourism and Physical Education programs at City College of Angeles, translating non-technical requirements into production software.',
    ],
  },
];

export const COMPETITIONS = [
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
    event: 'City College of Angeles Capture the Flag (CTF)',
    placement: 'Two-Time Champion',
    date: 'Sep 2023 & Oct 2025',
    detail: 'Secured consecutive first-place finishes in university cybersecurity competitions across web, network, and forensics tracks.',
  },
];

export const SKILLS = {
  'Languages': ['Python', 'TypeScript', 'JavaScript (ES6+)', 'PHP', 'Java', 'C/C++'],
  'Frontend & Mobile': ['React', 'React Native', 'Expo', 'Tailwind CSS', 'Bootstrap', 'HTML5 / CSS3'],
  'Backend & Databases': ['Django REST', 'Laravel', 'FastAPI', 'Flask', 'PostgreSQL', 'MySQL', 'MariaDB', 'Firebase', 'REST APIs'],
  'AI Automation & Tools': ['n8n', 'Dify', 'Git & GitHub', 'Android Studio', 'Postman', 'Figma', 'Cisco Packet Tracer'],
};

export const CERTIFICATIONS = [
  'Cyber Threat Monitoring Level 1 (In Progress)',
  'CCNAv7: Enterprise Networking, Security, and Automation',
  'CCNAv7: Switching, Routing, and Wireless Essentials',
  'CCNAv7: Introduction to Networks',
  'Cybersecurity Essentials: LFC108',
  'IT Essentials',
];