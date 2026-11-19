import { Mail, Send } from 'lucide-react';
import { PROFILE } from '../data/portfolio';

export function ContactAndFooter() {
  return (
    <>
      <section id="contact" className="reveal pt-2 pb-16">
        <div className="grid gap-6 rounded-2xl border border-neutral-200/90 bg-white/80 p-6 sm:p-8 md:grid-cols-2 dark:border-neutral-800/90 dark:bg-[#111216]/90">
          <div>
            <h2 className="text-2xl font-bold text-neutral-950 dark:text-white">
              Let’s work together.
            </h2>
            <p className="mt-2.5 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
              Available for software engineering internships, entry-level full-stack or SOC/network security roles, and freelance web or mobile development projects.
            </p>
            <div className="mt-5 space-y-1.5 font-mono-tech text-xs text-neutral-600 dark:text-neutral-300">
              <div>{PROFILE.email}</div>
              <div>{PROFILE.phone}</div>
            </div>
          </div>

          <form action={PROFILE.formspreeEndpoint} method="POST" className="space-y-3">
            <input
              type="text"
              name="name"
              required
              placeholder="Your name"
              className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-800 dark:bg-[#181920] dark:text-neutral-100 dark:focus:border-neutral-400"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="you@company.com"
              className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-800 dark:bg-[#181920] dark:text-neutral-100 dark:focus:border-neutral-400"
            />
            <textarea
              name="message"
              rows={3}
              required
              placeholder="Tell me about the role or project..."
              className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-800 dark:bg-[#181920] dark:text-neutral-100 dark:focus:border-neutral-400"
            />
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-950 px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-neutral-950"
            >
              <Send className="h-3.5 w-3.5" />
              Send Message
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-neutral-200/80 py-8 dark:border-neutral-800/80">
        <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-4 px-6 text-xs text-neutral-500 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Brendon Panlaqui</div>
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-1.5 font-mono-tech text-neutral-700 hover:underline dark:text-neutral-300"
          >
            <Mail className="h-3.5 w-3.5" />
            {PROFILE.email}
          </a>
        </div>
      </footer>
    </>
  );
}