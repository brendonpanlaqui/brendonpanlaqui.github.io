import { ArrowUpRight, ShieldCheck, Trophy } from 'lucide-react';
import { CERTIFICATIONS, COMPETITIONS, EXPERIENCE } from '../data/portfolio';

export function ExperienceSection() {
  return (
    <>
      {/* 2-Column Minimalist Timeline */}
      <section
        id="experience"
        className="reveal border-b border-neutral-200/80 py-14 dark:border-neutral-800/80"
      >
        <h2 className="mb-8 text-2xl font-normal tracking-tight text-neutral-950 dark:text-white">
          Experience & Education
        </h2>

        <div className="space-y-7">
          {EXPERIENCE.map((item) => (
            <div
              key={item.organization}
              className="grid gap-1.5 sm:grid-cols-[175px_1fr] sm:gap-6"
            >
              <div className="font-mono-tech pt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                {item.period}
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-950 dark:text-white">
                  {item.organization}{' '}
                  <span className="font-normal text-neutral-500 dark:text-neutral-400">
                    | {item.role}
                  </span>
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {item.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Streamlined Competitions & Certifications */}
      <section id="certifications" className="reveal py-14">
        <h2 className="mb-6 text-2xl font-normal tracking-tight text-neutral-950 dark:text-white">
          Competitions & Certifications
        </h2>

        <div className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white/80 dark:border-neutral-800/90 dark:bg-[#111216]/90">
          {/* Top Band: Single-Line Competition Rows */}
          <div className="p-6">
            <h3 className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              <Trophy className="h-4 w-4" />
              Hackathons & CTF Competitions
            </h3>

            <div className="divide-y divide-neutral-200/80 border-t border-neutral-200/80 dark:divide-neutral-800/80 dark:border-neutral-800/80">
              {COMPETITIONS.map((comp) => (
                <div
                  key={comp.event}
                  className="flex flex-col justify-between gap-1.5 py-3 sm:flex-row sm:items-center sm:gap-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    {comp.certificateUrl ? (
                      <a
                        href={comp.certificateUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-1 text-xs font-semibold text-neutral-950 hover:underline dark:text-white"
                      >
                        <span>{comp.event}</span>
                        <ArrowUpRight className="h-3 w-3 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-900 dark:group-hover:text-white" />
                      </a>
                    ) : (
                      <span className="text-xs font-semibold text-neutral-950 dark:text-white">
                        {comp.event}
                      </span>
                    )}

                    <span className="font-mono-tech rounded-full border border-neutral-300 bg-neutral-50 px-2 py-0.5 text-[10px] font-medium text-neutral-600 dark:border-neutral-700 dark:bg-[#181920] dark:text-neutral-300">
                      {comp.placement}
                    </span>
                  </div>

                  <span className="font-mono-tech shrink-0 text-[11px] text-neutral-400">
                    {comp.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Band: Clickable Certification Pills */}
          <div className="border-t border-neutral-200/90 bg-neutral-50/50 p-6 dark:border-neutral-800/90 dark:bg-[#0E0F13]/60">
            <h3 className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              <ShieldCheck className="h-4 w-4" />
              Networking & Security Credentials
            </h3>

            <div className="flex flex-wrap gap-2">
              {CERTIFICATIONS.map((cert) =>
                cert.url ? (
                  <a
                    key={cert.title}
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-800 transition hover:border-neutral-500 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#181920] dark:text-neutral-200 dark:hover:border-neutral-600 dark:hover:bg-[#1E2028]"
                  >
                    <span>{cert.title}</span>
                    <ArrowUpRight className="h-3 w-3 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-900 dark:group-hover:text-white" />
                  </a>
                ) : (
                  <span
                    key={cert.title}
                    className="rounded-xl border border-neutral-200 bg-white/60 px-3 py-1.5 text-xs text-neutral-600 dark:border-neutral-800/80 dark:bg-[#14151B] dark:text-neutral-400"
                  >
                    {cert.title}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}