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
import { TypingTestModal } from './components/TypingTestModal';
import { SessionInspector } from './components/SessionInspector';

export default function App() {
  const [dark, setDark] = useState<boolean>(() => {
    if ('theme' in localStorage) return localStorage.theme === 'dark';
    return true;
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [isTypingOpen, setIsTypingOpen] = useState(false);

  const handleToggleTheme = () => {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    setDark((prev) => !prev);
    window.setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 360);
  };

  const [inspectorOpen, setInspectorOpen] = useState(false);

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
        setIsTypingOpen(false);
        setInspectorOpen(false);
      }
      if (e.altKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsTypingOpen(false);
        setInspectorOpen(false);
        setChatOpen((prev) => !prev);
      }
      if (e.altKey && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        setChatOpen(false);
        setInspectorOpen(false);
        setIsTypingOpen((prev) => !prev);
      }
      if (e.altKey && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        setChatOpen(false);
        setIsTypingOpen(false);
        setInspectorOpen((prev) => !prev);
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
        <ContactAndFooter
          onOpenTypingTest={() => setIsTypingOpen(true)}
          onOpenInspector={() => setInspectorOpen(true)}
        />
      </main>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <SessionInspector open={inspectorOpen} onClose={() => setInspectorOpen(false)} />
      <TypingTestModal
        isOpen={isTypingOpen}
        onClose={() => setIsTypingOpen(false)}
      />
      <PortfolioChat open={chatOpen} setOpen={setChatOpen} />
    </div>
  );
}