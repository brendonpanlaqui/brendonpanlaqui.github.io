import { PROFILE, SKILLS } from '../data/portfolio';

export function AboutAndStack() {
  return (
    <section id="about" className="reveal grid gap-5 pt-12 pb-14 md:grid-cols-[1fr_1.35fr]">
      {/* Minimalist About Card */}
      <div className="flex flex-col justify-between rounded-2xl border border-neutral-200/90 bg-white/80 p-6 sm:p-7 dark:border-neutral-800/90 dark:bg-[#111216]/90">
        <div>
          <h2 className="text-base font-bold tracking-tight text-neutral-950 dark:text-white">
            About
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {PROFILE.about}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            Currently open to full-stack, mobile, AI automation, or cybersecurity roles.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2 border-t border-neutral-200/80 pt-4 font-mono-tech text-[11px] dark:border-neutral-800/80">
          <div>
            <div className="text-neutral-400">Focus</div>
            <div className="mt-0.5 font-semibold text-neutral-900 dark:text-neutral-200">
              Full-Stack
            </div>
          </div>
          <div>
            <div className="text-neutral-400">Security</div>
            <div className="mt-0.5 font-semibold text-neutral-900 dark:text-neutral-200">
              CCNA & CTF
            </div>
          </div>
          <div>
            <div className="text-neutral-400">Status</div>
            <div className="mt-0.5 inline-flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Open
            </div>
          </div>
        </div>
      </div>

      {/* Categorized Tech Stack Pills */}
      <div className="rounded-2xl border border-neutral-200/90 bg-white/80 p-6 sm:p-7 dark:border-neutral-800/90 dark:bg-[#111216]/90">
        <h2 className="text-base font-bold tracking-tight text-neutral-950 dark:text-white">
          Tech stack
        </h2>

        <div className="mt-4 space-y-4">
          {Object.entries(SKILLS).map(([category, items]) => (
            <div key={category}>
              <div className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                {category}
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono-tech rounded-full border border-neutral-200/90 bg-neutral-50/70 px-2.5 py-0.5 text-[11px] text-neutral-800 dark:border-neutral-800 dark:bg-[#181920] dark:text-neutral-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}