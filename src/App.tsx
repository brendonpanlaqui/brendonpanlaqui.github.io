import { useEffect, useState } from 'react';
import type { Project } from './data/portfolio';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutAndStack } from './components/AboutAndStack';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactAndFooter } from './components/ContactAndFooter';
import { ProjectModal } from './components/ProjectModal';
import { PortfolioChat } from './components/PortfolioChat';

export default function App() {
  const [dark, setDark] = useState<boolean>(() => {
    if ('theme' in localStorage) return localStorage.theme === 'dark';
    return true;
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  const handleToggleTheme = () => {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    setDark((prev) => !prev);
    window.setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 360);
  };

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

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setChatOpen(false);
      }
      if (e.altKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setChatOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-dot-grid min-h-screen bg-[#FAF9F6] text-neutral-900 transition-colors duration-200 dark:bg-[#0B0C0E] dark:text-neutral-100">
      <Navbar dark={dark} onToggleTheme={handleToggleTheme} />
      <Hero />

      <main className="mx-auto max-w-4xl px-6">
        <AboutAndStack />
        <ProjectsSection onSelectProject={setSelectedProject} />
        <ExperienceSection />
        <ContactAndFooter />
      </main>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <PortfolioChat open={chatOpen} setOpen={setChatOpen} />
    </div>
  );
}