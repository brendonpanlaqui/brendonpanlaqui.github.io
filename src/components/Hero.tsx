import { useEffect, useState } from 'react';
import { ArrowDownRight, Check, Copy, MapPin } from 'lucide-react';
import { PROFILE } from '../data/portfolio';
import { GitHubIcon, LinkedInIcon } from './Icons';

export function Hero() {
  const [copied, setCopied] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullRole = PROFILE.typewriterRoles[roleIndex];
    const typingSpeed = isDeleting ? 30 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting && displayedRole.length < currentFullRole.length) {
        setDisplayedRole(currentFullRole.slice(0, displayedRole.length + 1));
      } else if (!isDeleting && displayedRole.length === currentFullRole.length) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && displayedRole.length > 0) {
        setDisplayedRole(currentFullRole.slice(0, displayedRole.length - 1));
      } else if (isDeleting && displayedRole.length === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % PROFILE.typewriterRoles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex]);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden border-b border-neutral-200/80 bg-[#FAFAFA] dark:border-neutral-800/80 dark:bg-[#0B0C0E]">
      <div className="reveal relative mx-auto max-w-4xl px-6 py-14 sm:py-20">
        <div className="flex flex-col-reverse items-start justify-between gap-8 sm:flex-row sm:items-center">
          {/* Left Column: Badge, Typography, Minimalist Bio, Clean Actions */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 font-mono-tech text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white/80 px-2.5 py-0.5 text-neutral-700 dark:border-neutral-800 dark:bg-[#131418] dark:text-neutral-300">
                <MapPin className="h-3 w-3 text-emerald-500" />
                {PROFILE.location}
              </span>
              <span>·</span>
              <span>{PROFILE.educationBadge}</span>
            </div>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-neutral-950 sm:text-5xl dark:text-white">
              {PROFILE.name}
            </h1>

            <div className="mt-1.5 flex h-7 items-center text-base font-medium text-neutral-600 sm:text-lg dark:text-neutral-300">
              <span>{displayedRole}</span>
              <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-neutral-900 dark:bg-white" />
            </div>

            <p className="mt-3.5 max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {PROFILE.bio}
            </p>

            {/* Action Bar */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 rounded-full bg-neutral-950 px-4 py-1.5 text-xs font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-neutral-950"
              >
                <span>Explore Work</span>
                <ArrowDownRight className="h-3.5 w-3.5" />
              </a>

              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-neutral-700 transition hover:border-neutral-500 hover:text-neutral-950 dark:border-neutral-800 dark:bg-[#121317] dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-white"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                GitHub
              </a>

              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-neutral-700 transition hover:border-neutral-500 hover:text-neutral-950 dark:border-neutral-800 dark:bg-[#121317] dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-white"
              >
                <LinkedInIcon className="h-3.5 w-3.5" />
                LinkedIn
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white/80 px-3.5 py-1.5 font-mono-tech text-xs text-neutral-700 transition hover:border-neutral-500 hover:text-neutral-950 dark:border-neutral-800 dark:bg-[#121317] dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-white"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    {PROFILE.email}
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-neutral-200/90 bg-neutral-200 sm:h-36 sm:w-36 dark:border-neutral-800 dark:bg-[#15161B]">
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