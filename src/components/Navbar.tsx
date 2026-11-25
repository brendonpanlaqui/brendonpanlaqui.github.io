import { useEffect, useState } from 'react';
import { ArrowUpRight, Moon, Sun } from 'lucide-react';
import { PROFILE } from '../data/portfolio';

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Credentials' },
];

interface NavbarProps {
  dark: boolean;
  onToggleTheme: () => void;
}

export function Navbar({ dark, onToggleTheme }: NavbarProps) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < 120) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );

    const handleScroll = () => {
      if (window.scrollY < 120) {
        setActiveSection('');
      }
    };

    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200/80 bg-[#FAFAFA]/85 backdrop-blur-md dark:border-neutral-800/80 dark:bg-[#0B0C0E]/85">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="text-base font-bold tracking-tight text-neutral-950 transition hover:opacity-80 dark:text-white"
        >
          brendon.
        </a>

        <div className="flex items-center gap-6 text-xs font-medium text-neutral-600 dark:text-neutral-400">
          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setActiveSection(id)}
              className={`transition ${
                activeSection === id
                  ? 'font-semibold text-neutral-950 dark:text-white'
                  : 'text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              {label}
            </a>
          ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={PROFILE.resumeFile}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1 rounded-full border border-neutral-300 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-neutral-700 transition hover:border-neutral-500 hover:text-neutral-950 dark:border-neutral-800 dark:bg-[#131418] dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-white"
            >
              <span>Resume</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-950 dark:group-hover:text-white" />
            </a>

            <button
              onClick={onToggleTheme}
              aria-label="Toggle color theme"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white/80 text-neutral-700 transition hover:border-neutral-500 hover:text-neutral-950 dark:border-neutral-800 dark:bg-[#131418] dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-white"
            >
              {dark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}