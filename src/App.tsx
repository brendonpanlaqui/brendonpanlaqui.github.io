import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Mail,
  MapPin,
  Moon,
  ShieldCheck,
  Sun,
  Trophy,
} from 'lucide-react';
import {
  CERTIFICATIONS,
  COMPETITIONS,
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  SKILLS,
} from './data/portfolio';

function GitHubIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedInIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export default function App() {
  const [dark, setDark] = useState<boolean>(() =>
    document.documentElement.classList.contains('dark')
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      root.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [dark]);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const featuredProject = PROJECTS.find((p) => p.featured);
  const otherProjects = PROJECTS.filter((p) => !p.featured);

  return (
    <div className="min-h-screen transition-colors duration-200">
      {/* Top Editorial Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-neutral-200/90 bg-[#FAF9F6]/90 backdrop-blur-md dark:border-neutral-800 dark:bg-[#0D0E11]/90">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a
            href="#"
            className="font-mono-tech text-xs font-medium tracking-widest uppercase text-neutral-900 dark:text-neutral-100"
          >
            B. PANLAQUI // 2026
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-neutral-600 md:flex dark:text-neutral-400">
            <a href="#work" className="hover:text-neutral-950 dark:hover:text-white">
              Selected Work
            </a>
            <a href="#experience" className="hover:text-neutral-950 dark:hover:text-white">
              Experience
            </a>
            <a href="#credentials" className="hover:text-neutral-950 dark:hover:text-white">
              Credentials
            </a>
            <a href="#stack" className="hover:text-neutral-950 dark:hover:text-white">
              Stack
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={PROFILE.resumeFile}
              download
              className="inline-flex items-center gap-1.5 border border-neutral-900 bg-neutral-900 px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-neutral-700 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-neutral-300"
            >
              <Download className="h-3.5 w-3.5" />
              Resume PDF
            </a>

            <button
              onClick={() => setDark((prev) => !prev)}
              aria-label="Toggle color theme"
              className="inline-flex h-8 w-8 items-center justify-center border border-neutral-300 text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-950 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-300 dark:hover:text-white"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6">
        {/* Hero Masthead */}
        <section className="border-b border-neutral-300 py-16 md:py-24 dark:border-neutral-800">
          <div className="mb-5 flex flex-wrap items-center gap-3 font-mono-tech text-xs tracking-wider uppercase text-neutral-600 dark:text-neutral-400">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {PROFILE.location}
            </span>
            <span>•</span>
            <span>BS Computer Science (Dean’s Lister)</span>
          </div>

          <h1 className="font-editorial max-w-4xl text-4xl leading-[1.12] font-medium tracking-tight text-neutral-950 sm:text-6xl dark:text-white">
            {PROFILE.name}
          </h1>

          <p className="mt-4 text-lg font-medium text-neutral-800 sm:text-xl dark:text-neutral-200">
            {PROFILE.headline}
          </p>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            {PROFILE.bio}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition hover:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:border-neutral-400"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  Copied {PROFILE.email}
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  {PROFILE.email}
                </>
              )}
            </button>

            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 transition hover:border-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-400"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 transition hover:border-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-400"
            >
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>

        {/* Selected Work & Flagship Case Study */}
        <section id="work" className="border-b border-neutral-300 py-16 dark:border-neutral-800">
          <div className="mb-10 flex items-baseline justify-between">
            <h2 className="font-editorial text-3xl font-medium text-neutral-950 dark:text-white">
              Selected Engineering Work
            </h2>
            <span className="font-mono-tech text-xs uppercase tracking-wider text-neutral-500">
              01 / Case Studies
            </span>
          </div>

          {/* Flagship Featured Card: Fair */}
          {featuredProject && (
            <article className="mb-10 border border-neutral-900 bg-white p-7 sm:p-9 dark:border-neutral-700 dark:bg-neutral-900/60">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-4 dark:border-neutral-800">
                <span className="font-mono-tech text-xs font-medium uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  {featuredProject.category}
                </span>
                <span className="font-mono-tech text-xs text-neutral-500">
                  {featuredProject.period}
                </span>
              </div>

              <div className="mt-5">
                <h3 className="font-editorial text-2xl font-semibold text-neutral-950 sm:text-3xl dark:text-white">
                  {featuredProject.title} — {featuredProject.subtitle}
                </h3>
                <p className="mt-1 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  {featuredProject.role}
                </p>
              </div>

              <p className="mt-4 text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
                {featuredProject.summary}
              </p>

              <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                {featuredProject.highlights.map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="font-mono-tech text-xs text-neutral-400">0{idx + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2 pt-2">
                {featuredProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono-tech border border-neutral-300 bg-[#FAF9F6] px-2.5 py-1 text-xs text-neutral-800 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          )}

          {/* Secondary Projects Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {otherProjects.map((project) => (
              <article
                key={project.id}
                className="flex flex-col justify-between border border-neutral-300 bg-white p-6 transition hover:border-neutral-900 dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:border-neutral-500"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 font-mono-tech text-[11px] uppercase tracking-wider text-neutral-500">
                    <span>{project.period}</span>
                  </div>
                  <h3 className="font-editorial mt-3 text-xl font-semibold text-neutral-950 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium text-neutral-600 dark:text-neutral-400">
                    {project.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {project.summary}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {project.highlights.map((h, i) => (
                      <li key={i}>• {h}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-neutral-200 pt-4 dark:border-neutral-800">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono-tech bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Professional Experience & Education */}
        <section id="experience" className="border-b border-neutral-300 py-16 dark:border-neutral-800">
          <div className="mb-10 flex items-baseline justify-between">
            <h2 className="font-editorial text-3xl font-medium text-neutral-950 dark:text-white">
              Experience & Education
            </h2>
            <span className="font-mono-tech text-xs uppercase tracking-wider text-neutral-500">
              02 / Background
            </span>
          </div>

          <div className="space-y-8">
            {EXPERIENCE.map((exp) => (
              <div
                key={exp.organization}
                className="grid gap-2 border-l-2 border-neutral-900 pl-5 md:grid-cols-[220px_1fr] dark:border-neutral-200"
              >
                <div className="font-mono-tech text-xs text-neutral-500">
                  <div>{exp.period}</div>
                  <div className="mt-1">{exp.location}</div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-950 dark:text-white">
                    {exp.organization}{' '}
                    <span className="font-normal text-neutral-600 dark:text-neutral-400">
                      | {exp.role}
                    </span>
                  </h3>
                  <ul className="mt-2.5 space-y-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>• {b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* Education Row */}
            <div className="grid gap-2 border-l-2 border-neutral-300 pl-5 md:grid-cols-[220px_1fr] dark:border-neutral-700">
              <div className="font-mono-tech text-xs text-neutral-500">
                <div>Expected Jun 2027</div>
                <div className="mt-1">Angeles City, Pampanga</div>
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-950 dark:text-white">
                  City College of Angeles{' '}
                  <span className="font-normal text-neutral-600 dark:text-neutral-400">
                    | Bachelor of Science in Computer Science
                  </span>
                </h3>
                <p className="mt-1 text-sm font-medium text-neutral-800 dark:text-neutral-200">
                  Consistent Dean’s Lister (2023 – 2027)
                </p>
                <p className="mt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                  Relevant Coursework: Application Development, Data Structures & Algorithms, Software Engineering, Web Programming, Database Management, Routing & Switching Essentials.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Competitions & Certifications */}
        <section id="credentials" className="border-b border-neutral-300 py-16 dark:border-neutral-800">
          <div className="mb-10 flex items-baseline justify-between">
            <h2 className="font-editorial text-3xl font-medium text-neutral-950 dark:text-white">
              Competitions & Certifications
            </h2>
            <span className="font-mono-tech text-xs uppercase tracking-wider text-neutral-500">
              03 / Recognition
            </span>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="mb-4 inline-flex items-center gap-2 font-mono-tech text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                <Trophy className="h-4 w-4" />
                Hackathons & CTF Competitions
              </h3>
              <div className="space-y-4">
                {COMPETITIONS.map((comp) => (
                  <div
                    key={comp.event}
                    className="border border-neutral-300 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900/40"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-bold text-neutral-950 dark:text-white">
                        {comp.event}
                      </span>
                      <span className="font-mono-tech text-xs text-neutral-500">{comp.date}</span>
                    </div>
                    <div className="mt-0.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                      {comp.placement}
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {comp.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 inline-flex items-center gap-2 font-mono-tech text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                <ShieldCheck className="h-4 w-4" />
                Networking & Security Credentials
              </h3>
              <ul className="divide-y divide-neutral-200 border border-neutral-300 bg-white dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900/40">
                {CERTIFICATIONS.map((cert) => (
                  <li
                    key={cert}
                    className="px-4 py-3 text-sm text-neutral-800 dark:text-neutral-200"
                  >
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Stack Matrix */}
        <section id="stack" className="py-16">
          <div className="mb-10 flex items-baseline justify-between">
            <h2 className="font-editorial text-3xl font-medium text-neutral-950 dark:text-white">
              Technical Stack
            </h2>
            <span className="font-mono-tech text-xs uppercase tracking-wider text-neutral-500">
              04 / Tooling
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(SKILLS).map(([group, items]) => (
              <div
                key={group}
                className="border border-neutral-300 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900/40"
              >
                <h3 className="font-mono-tech text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  {group}
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {items.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-300 py-10 dark:border-neutral-800">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-6 sm:flex-row sm:items-center">
          <div className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Brendon L. Panlaqui. Built with React, TypeScript & Tailwind CSS.
          </div>
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-1.5 font-mono-tech text-xs font-medium text-neutral-800 hover:underline dark:text-neutral-200"
          >
            <Mail className="h-3.5 w-3.5" />
            {PROFILE.email}
          </a>
        </div>
      </footer>
    </div>
  );
}