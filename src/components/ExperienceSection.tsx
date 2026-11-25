import { ArrowUpRight } from 'lucide-react';
import {
  CERTIFICATIONS,
  COMPETITIONS,
  EXPERIENCE,
  SEMICONDUCTOR_CERTIFICATIONS,
} from '../data/portfolio';

interface CertItem {
  title: string;
  url?: string;
}

function CertPills({ items }: { items: CertItem[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((cert) =>
        cert.url ? (
          <a
            key={cert.title}
            href={cert.url}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50/70 px-3 py-1 text-xs text-neutral-800 transition hover:border-neutral-400 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#181920] dark:text-neutral-200 dark:hover:border-neutral-600 dark:hover:bg-[#1E2028]"
          >
            <span>{cert.title}</span>
            <ArrowUpRight className="h-3 w-3 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-900 dark:group-hover:text-white" />
          </a>
        ) : (
          <span
            key={cert.title}
            className="rounded-full border border-neutral-200/80 bg-transparent px-3 py-1 text-xs text-neutral-500 dark:border-neutral-800/80 dark:text-neutral-400"
          >
            {cert.title}
          </span>
        )
      )}
    </div>
  );
}

export function ExperienceSection() {
  return (
    <>
      {/* Bento Timeline: Experience */}
      <section id="experience" className="reveal pt-12 pb-3">
        <div className="rounded-2xl border border-neutral-200/90 bg-white/80 p-6 sm:p-8 dark:border-neutral-800/90 dark:bg-[#111216]/90">
          <h2 className="mb-6 text-lg font-bold tracking-tight text-neutral-950 dark:text-white">
            Experience
          </h2>

          <div className="relative ml-1.5 space-y-7 border-l border-neutral-200 pl-6 dark:border-neutral-800">
            {EXPERIENCE.map((item) => (
              <div key={`${item.organization}-${item.role}`} className="relative">
                {/* Timeline dot: emerald if active, muted if completed */}
                <span
                  className={`absolute -left-7.25 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-[#111216] ${
                    item.period.includes('Present')
                      ? 'bg-emerald-500'
                      : 'bg-neutral-300 dark:bg-neutral-700'
                  }`}
                />

                <div className="flex flex-col justify-between gap-0.5 sm:flex-row sm:items-baseline sm:gap-4">
                  <h3 className="text-sm font-semibold text-neutral-950 dark:text-white">
                    {item.role}
                  </h3>
                  <span className="font-mono-tech shrink-0 text-[11px] text-neutral-400">
                    {item.period}
                  </span>
                </div>

                <p className="mt-0.5 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  {item.organization}
                </p>

                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Competitions */}
      <section id="certifications" className="reveal pt-3 pb-6">
        <div className="rounded-2xl border border-neutral-200/90 bg-white/80 p-6 sm:p-8 dark:border-neutral-800/90 dark:bg-[#111216]/90">
          <h2 className="mb-6 text-lg font-bold tracking-tight text-neutral-950 dark:text-white">
            Certifications
          </h2>

          {/* Top Group: Competitions */}
          <div>
            <h3 className="mb-3.5 text-xs font-medium text-neutral-500 dark:text-neutral-400">
              Hackathons & Capture the Flag
            </h3>

            <div className="space-y-3">
              {COMPETITIONS.map((comp) => (
                <div
                  key={comp.event}
                  className="flex flex-col justify-between gap-0.5 sm:flex-row sm:items-baseline sm:gap-4"
                >
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    {comp.certificateUrl ? (
                      <a
                        href={comp.certificateUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-1 text-sm font-medium text-neutral-950 hover:underline dark:text-white"
                      >
                        <span>{comp.event}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-900 dark:group-hover:text-white" />
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-neutral-950 dark:text-white">
                        {comp.event}
                      </span>
                    )}

                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      · {comp.placement}
                    </span>
                  </div>

                  <span className="font-mono-tech shrink-0 text-[11px] text-neutral-400">
                    {comp.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <hr className="my-7 border-neutral-200/80 dark:border-neutral-800/80" />

          {/* Bottom Groups: Certifications */}
          <div>
            <h3 className="mb-3.5 text-xs font-medium text-neutral-500 dark:text-neutral-400">
              Networking & Security
            </h3>
            <CertPills items={CERTIFICATIONS} />
          </div>

          <div className="mt-6">
            <h3 className="mb-3.5 text-xs font-medium text-neutral-500 dark:text-neutral-400">
              Semiconductor Microcredentials · UP Open University
            </h3>
            <CertPills items={SEMICONDUCTOR_CERTIFICATIONS} />
          </div>
        </div>
      </section>
    </>
  );
}