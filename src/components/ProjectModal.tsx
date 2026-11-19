import { ExternalLink, Layers, X } from 'lucide-react';
import type { Project } from '../data/portfolio';
import { GitHubIcon } from './Icons';
import { useEffect, useState } from 'react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [project?.id]);

  if (!project) return null;

  const screenshotUrl = `/screenshots/${project.id}.png`;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/50 p-4 dark:bg-black/75"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 dark:border-neutral-800 dark:bg-[#0B0C0E]"
      >
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-6 pb-5">
          <div className="min-w-0 flex-1">
            <div className="font-mono-tech flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-neutral-400 dark:text-neutral-500">
              <span>{project.category}</span>
              <span>·</span>
              <span>{project.period}</span>
            </div>
            <h3 className="mt-1.5 text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl dark:text-white">
              {project.title}
            </h3>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              {project.subtitle} ({project.role})
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-950 dark:hover:bg-neutral-900 dark:hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="relative mb-6 aspect-video overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-[#131418]">
          {!imageError ? (
            <img
              src={screenshotUrl}
              alt={`${project.title} showcase`}
              onError={() => setImageError(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
              <span className="font-mono-tech text-[11px] font-medium tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
                PROJECT SHOWCASE PLACEHOLDER
              </span>
              <span className="mt-1 text-[10px] text-neutral-400/80 dark:text-neutral-500/80">
                1920 × 1080 · Light/Dark mockups (Drop in `public/screenshots/{project.id}.png`)
              </span>
            </div>
          )}
        </div>

        {/* Case Study Grid & Content */}
        <div className="space-y-6 text-sm text-neutral-600 dark:text-neutral-400">
          <div>
            <h4 className="font-mono-tech text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Context & Motivation
            </h4>
            <p className="mt-2.5 leading-relaxed">{project.motivation}</p>
          </div>

          <div>
            <h4 className="font-mono-tech text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Key Contributions
            </h4>
            <div className="mt-2.5 space-y-3 leading-relaxed">
              {project.highlights.map((item, idx) => (
                <div key={idx} className="flex gap-2.5">
                  <span className="font-mono-tech text-[11px] text-neutral-400">0{idx + 1}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Inline Architecture note to avoid dark box */}
          <div className="border-t border-neutral-200/60 pt-5 dark:border-neutral-800/60">
            <h4 className="inline-flex items-center gap-1.5 font-mono-tech text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              <Layers className="h-3 w-3" />
              Architecture Notes
            </h4>
            <div className="mt-2 space-y-2 leading-relaxed text-xs">
              {project.architectureNotes.map((note, idx) => (
                <p key={idx}>• {note}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="mt-8 flex flex-col gap-4 border-t border-neutral-200/80 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-neutral-800/80">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono-tech rounded-md border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] text-neutral-500 dark:border-neutral-800 dark:bg-[#131418]"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-2 shrink-0">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-neutral-950 px-4 py-1.5 text-xs font-semibold text-white transition hover:opacity-95 dark:bg-white dark:text-neutral-950"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-4 py-1.5 text-xs font-medium text-neutral-800 transition hover:border-neutral-500 dark:border-neutral-800 dark:text-neutral-200 dark:hover:border-neutral-600"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}