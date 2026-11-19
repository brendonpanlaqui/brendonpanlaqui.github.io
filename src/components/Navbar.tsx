import { Download, Moon, Sun } from 'lucide-react';
import { PROFILE } from '../data/portfolio';

interface NavbarProps {
  dark: boolean;
  onToggleTheme: () => void;
}

export function Navbar({ dark, onToggleTheme }: NavbarProps) {
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
            <a href="#about" className="transition hover:text-neutral-950 dark:hover:text-white">
              About
            </a>
            <a href="#projects" className="transition hover:text-neutral-950 dark:hover:text-white">
              Projects
            </a>
            <a href="#experience" className="transition hover:text-neutral-950 dark:hover:text-white">
              Experience
            </a>
            <a href="#certifications" className="transition hover:text-neutral-950 dark:hover:text-white">
              Credentials
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={PROFILE.resumeFile}
              download
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white/80 px-3 py-1.5 text-xs font-medium text-neutral-700 transition hover:border-neutral-500 hover:text-neutral-950 dark:border-neutral-800 dark:bg-[#131418] dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-white"
            >
              <Download className="h-3.5 w-3.5" />
              Resume
            </a>

            <button
              onClick={onToggleTheme}
              aria-label="Toggle color theme"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-300 bg-white/80 text-neutral-700 transition hover:border-neutral-500 hover:text-neutral-950 dark:border-neutral-800 dark:bg-[#131418] dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-white"
            >
              {dark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}