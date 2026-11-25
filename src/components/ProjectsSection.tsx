import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS, type Project, type ProjectFilter } from '../data/portfolio';

const FILTERS: ProjectFilter[] = ['All', 'Web & Full-Stack', 'Mobile', 'AI & Hackathons'];

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('All');

  const visibleProjects = PROJECTS.filter(
    (p) => activeFilter === 'All' || p.filter === activeFilter
  );

  const getProjectYear = (period: string) => {
    const matches = period.match(/\d{4}/g);
    return matches ? matches[matches.length - 1] : period;
  };

  return (
    <section id="projects" className="reveal border-t border-neutral-200/80 py-14 dark:border-neutral-800/80">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
          Projects
        </h2>

        <div className="flex flex-wrap items-center gap-1.5">
          {FILTERS.map((filter) => {
            const active = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`font-mono-tech rounded-full px-3 py-1 text-[11px] transition ${
                  active
                    ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950'
                    : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-800/60 dark:hover:text-white'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      <div className="divide-y divide-neutral-200/80 border-t border-b border-neutral-200/80 dark:divide-neutral-800/80 dark:border-neutral-800/80">
        {visibleProjects.map((project) => (
          <article
            key={project.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelectProject(project)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectProject(project);
              }
            }}
            className="group cursor-pointer rounded-xl py-5 transition-colors hover:bg-neutral-200/30 sm:-mx-3 sm:px-3 dark:hover:bg-neutral-900/40"
          >
            <div className="flex items-baseline justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-bold text-neutral-950 group-hover:underline dark:text-white">
                  {project.title}
                </h3>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  — {project.subtitle}
                </span>
                {project.featured && (
                  <span className="font-mono-tech rounded-full border border-neutral-200/90 bg-neutral-100/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-neutral-700 dark:border-neutral-700 dark:bg-[#181920] dark:text-neutral-300">
                    Thesis
                  </span>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-1 font-mono-tech text-xs text-neutral-400 transition-colors group-hover:text-neutral-950 dark:group-hover:text-white">
                <span>{getProjectYear(project.period)}</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {project.summary}
            </p>

            <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono-tech text-[11px] text-neutral-500 dark:text-neutral-500">
              {project.stack.map((tech, index) => (
                <span key={tech} className="inline-flex items-center gap-2">
                  {tech}
                  {index < project.stack.length - 1 && (
                    <span className="text-neutral-300 dark:text-neutral-700">·</span>
                  )}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}