import { useState, type FormEvent } from 'react';
import { Check, Keyboard, Send } from 'lucide-react';
import { PROFILE } from '../data/portfolio';

interface ContactAndFooterProps {
  onOpenTypingTest: () => void;
  onOpenInspector: () => void;
}

const INPUT_CLASS =
  'w-full rounded-xl border border-neutral-200/90 bg-neutral-50/70 px-3.5 py-2.5 text-xs text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 dark:border-neutral-800 dark:bg-[#181920] dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-400';

export function ContactAndFooter({ onOpenTypingTest, onOpenInspector }: ContactAndFooterProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(PROFILE.formspreeEndpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <section id="contact" className="reveal pt-0 pb-16">
        <div className="grid gap-8 rounded-2xl border border-neutral-200/90 bg-white/80 p-6 sm:p-8 md:grid-cols-2 dark:border-neutral-800/90 dark:bg-[#111216]/90">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                Let’s work together.
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                Available for full-stack engineering, AI automation, cybersecurity, and freelance development projects.
              </p>
            </div>

            <div className="mt-6 flex flex-col items-start gap-1.5 font-mono-tech text-xs text-neutral-600 dark:text-neutral-300">
              <a
                href={`mailto:${PROFILE.email}`}
                className="transition hover:text-neutral-950 hover:underline dark:hover:text-white"
              >
                {PROFILE.email}
              </a>
              <a
                href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
                className="transition hover:text-neutral-950 hover:underline dark:hover:text-white"
              >
                {PROFILE.phone}
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

            <input
              type="text"
              name="name"
              required
              placeholder="Your name"
              className={INPUT_CLASS}
            />
            <input
              type="email"
              name="email"
              required
              placeholder="you@company.com"
              className={INPUT_CLASS}
            />
            <textarea
              name="message"
              rows={3}
              required
              placeholder="Tell me about the role or project..."
              className={`${INPUT_CLASS} resize-none`}
            />

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-950 px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90 disabled:opacity-60 dark:bg-white dark:text-neutral-950"
            >
              {status === 'success' ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Message Sent
                </>
              ) : status === 'submitting' ? (
                'Sending...'
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  Send Message
                </>
              )}
            </button>

            {status === 'error' && (
              <p className="text-center text-[11px] text-red-500">
                Something went wrong. Please email me directly instead.
              </p>
            )}
          </form>
        </div>
      </section>

      <footer className="border-t border-neutral-200/80 py-8 dark:border-neutral-800/80">
        <div className="flex flex-col items-start justify-between gap-4 text-xs text-neutral-500 sm:flex-row sm:items-center dark:text-neutral-400">
          <div>© {new Date().getFullYear()} Brendon Panlaqui</div>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-neutral-950 dark:hover:text-white"
            >
              GitHub
            </a>

            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-neutral-950 dark:hover:text-white"
            >
              LinkedIn
            </a>
            <button
              onClick={onOpenInspector}
              className="font-mono-tech text-[11px] text-neutral-400 transition hover:text-neutral-950 dark:hover:text-white"
            >
              [inspect session · Alt+I]
            </button>
            <button
              onClick={onOpenTypingTest}
              className="inline-flex items-center gap-1.5 transition hover:text-neutral-950 dark:hover:text-white"
            >
              <Keyboard className="h-3.5 w-3.5" />
              <span>Typing test</span>
              <kbd className="hidden rounded border border-neutral-300 px-1.5 py-0.5 font-mono-tech text-[10px] sm:inline-block dark:border-neutral-700">
                Alt J
              </kbd>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}