import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { PROFILE } from '../data/portfolio';

export function Hero() {
  const [copied, setCopied] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullRole = PROFILE.typewriterRoles[roleIndex];
    const typingSpeed = isDeleting ? 30 : 65;

    let pauseTimer: ReturnType<typeof setTimeout>;
    const timer = setTimeout(() => {
      if (!isDeleting && displayedRole.length < currentFullRole.length) {
        setDisplayedRole(currentFullRole.slice(0, displayedRole.length + 1));
      } else if (!isDeleting && displayedRole.length === currentFullRole.length) {
        pauseTimer = setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && displayedRole.length > 0) {
        setDisplayedRole(currentFullRole.slice(0, displayedRole.length - 1));
      } else if (isDeleting && displayedRole.length === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % PROFILE.typewriterRoles.length);
      }
    }, typingSpeed);

    return () => {
      clearTimeout(timer);
      clearTimeout(pauseTimer);
    };
  }, [displayedRole, isDeleting, roleIndex]);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden border-b border-neutral-200/80 bg-[#FAFAFA] dark:border-neutral-800/80 dark:bg-[#0B0C0E]">
      <div className="reveal relative mx-auto max-w-4xl px-6 py-12 sm:py-20">
        <div className="flex flex-col-reverse items-start justify-between gap-7 sm:flex-row sm:items-center">
          {/* Left Column */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl dark:text-white">
              {PROFILE.name}
            </h1>

            <div className="mt-1.5 flex h-7 items-center text-base font-normal text-neutral-600 sm:text-lg dark:text-neutral-300">
              <span>{displayedRole}</span>
              <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-neutral-900 dark:bg-white" />
            </div>

            {/* Plain, muted location & degree line */}
            <p className="mt-2.5 text-xs leading-relaxed text-neutral-500 sm:text-sm dark:text-neutral-400">
              {PROFILE.location} · {PROFILE.educationBadge}
            </p>

            {/* Bio */}
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              {PROFILE.bio}
            </p>

            {/* Action Bar: 2 Pills + 2 Clean Links */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center rounded-full bg-neutral-950 px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-neutral-950"
              >
                Explore work
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white/70 px-4 py-2 text-xs font-medium text-neutral-700 transition hover:border-neutral-500 hover:text-neutral-950 dark:border-neutral-800 dark:bg-[#111216] dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-white"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-neutral-400" />
                    Copy email
                  </>
                )}
              </button>

              <div className="ml-1 flex items-center gap-4 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-0.5 transition hover:text-neutral-950 dark:hover:text-white"
                >
                  GitHub
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-0.5 transition hover:text-neutral-950 dark:hover:text-white"
                >
                  LinkedIn
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Avatar */}
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-neutral-200/90 bg-neutral-200 sm:h-36 sm:w-36 dark:border-neutral-800 dark:bg-[#15161B]">
            {!avatarError ? (
              <>
                <img
                  src="/avatar-light.jpg"
                  alt={PROFILE.name}
                  onError={() => setAvatarError(true)}
                  className="absolute inset-0 h-full w-full object-cover object-[50%_44%] opacity-100 transition-opacity duration-350 dark:opacity-0"
                />
                <img
                  src="/avatar-dark.jpg"
                  alt={PROFILE.name}
                  onError={() => setAvatarError(true)}
                  className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity duration-350 dark:opacity-100"
                />
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center font-mono-tech text-2xl font-bold tracking-wider text-neutral-500 dark:text-neutral-400">
                BP
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}