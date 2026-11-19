import { useEffect, useRef, useState } from 'react';
import { Bot, Send, Sparkles, X } from 'lucide-react';
import { PROFILE } from '../data/portfolio';

interface Message {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
}

interface PortfolioChatProps {
  open: boolean;
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
}

const SUGGESTED_QUESTIONS = [
  'What is your strongest tech stack?',
  'Tell me about Fair (your thesis)',
  'What cybersecurity & CCNA experience do you have?',
  'Are you available for internships or roles?',
];

function getLocalPortfolioReply(question: string): string {
  const q = question.toLowerCase();

  if (q.includes('fair') || q.includes('thesis') || q.includes('tricycle') || q.includes('geofenc')) {
    return 'Fair is my capstone thesis built for Angeles City commuters, drivers, and the PTRO. I led a 5-person team to build the Passenger & Driver apps (React Native + TypeScript) and the Django REST + PostgreSQL backend & web admin dashboard. It uses Google Maps Directions API for upfront route locking and the Haversine formula with 50m geofences for 98%+ distance accuracy.';
  }

  if (q.includes('stack') || q.includes('tech') || q.includes('language') || q.includes('framework')) {
    return 'My core stack is React, React Native (Expo), and TypeScript on the frontend, paired with Python (Django REST, FastAPI, Flask) or PHP (Laravel) and PostgreSQL, MySQL, or Firebase/Firestore on the backend. I also build AI workflows using n8n and Dify.';
  }

  if (q.includes('security') || q.includes('ccna') || q.includes('ctf') || q.includes('cyber') || q.includes('network')) {
    return 'I hold three Cisco CCNAv7 certifications (ENSA, SRWE, ITN), Cybersecurity Essentials (LFC108), and I am currently taking Cyber Threat Monitoring Level 1. I am also a 2x CCA CTF Champion, placed 4th at the Cisco Regional CCNA CTF, and competed in Hack4Gov Region 3.';
  }

  if (q.includes('experience') || q.includes('knack') || q.includes('work') || q.includes('job')) {
    return 'I worked as a Process Associate at Knack RCM (Jul–Dec 2026), handling high-volume healthcare billing workflows under strict HIPAA privacy and SLA deadlines. Alongside that, I build freelance web and mobile apps for academic clients.';
  }

  if (q.includes('egnosis') || q.includes('library') || q.includes('horasko') || q.includes('quest')) {
    return 'Besides Fair, I built the backend (Firebase Auth + Cloud Firestore + QR borrowing logic) for the eGnosis Library System, built HorasKo (React + Laravel work hours & pay cut-off tracker), and built Quest Hunt (PHP + MySQL local job board).';
  }

  return `I'm Brendon's portfolio assistant! Ask me about his tech stack (React, TypeScript, Django, Laravel, n8n/Dify), his thesis project Fair, his Cisco CCNA & CTF background, or his work experience at Knack RCM.`;
}

export function PortfolioChat({ open, setOpen }: PortfolioChatProps) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Hi! Ask me anything about Brendon’s projects, tech stack, CCNA/cybersecurity background, or availability.',
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, open]);

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      let replyText = '';

      if (PROFILE.aiChatWebhookUrl) {
        const res = await fetch(PROFILE.aiChatWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmed }),
        });
        const data = await res.json();
        replyText = data.reply || data.output || getLocalPortfolioReply(trimmed);
      } else {
        await new Promise((r) => setTimeout(r, 280));
        replyText = getLocalPortfolioReply(trimmed);
      }

      setMessages((prev) => [
        ...prev,
        { id: `${Date.now()}-bot`, sender: 'assistant', text: replyText },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: `${Date.now()}-err`, sender: 'assistant', text: getLocalPortfolioReply(trimmed) },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <div className="fixed right-5 bottom-5 z-40">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-medium text-neutral-900 shadow-lg transition hover:-translate-y-0.5 hover:border-neutral-500 dark:border-neutral-800 dark:bg-[#141519] dark:text-neutral-100 dark:hover:border-neutral-600"
        >
          <Bot className="h-4 w-4 text-emerald-500" />
          <span>Ask AI</span>
          <kbd className="rounded border border-neutral-300 bg-neutral-100 px-1.5 py-0.5 font-mono-tech text-[10px] text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
            Alt K
          </kbd>
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex h-115 w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-neutral-300 bg-white shadow-2xl dark:border-neutral-800 dark:bg-[#121317]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-3.5 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
              Ask Anything About Brendon
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close assistant"
            className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-3 overflow-y-auto p-5 text-xs leading-relaxed">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                  m.sender === 'user'
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950'
                    : 'border border-neutral-200 bg-neutral-50 text-neutral-800 dark:border-neutral-800 dark:bg-[#181920] dark:text-neutral-200'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="font-mono-tech text-[11px] text-neutral-400">Thinking...</div>
          )}

          {messages.length <= 2 && (
            <div className="pt-2">
              <div className="mb-2 text-[11px] text-neutral-400">Suggested questions:</div>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="rounded-full border border-neutral-300 px-3 py-1 text-left text-[11px] text-neutral-700 transition hover:border-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-400"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex items-center border-t border-neutral-200 px-4 py-2.5 dark:border-neutral-800"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Fair, React Native, CCNA, Knack RCM..."
            className="flex-1 bg-transparent text-xs text-neutral-900 outline-none dark:text-neutral-100"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="rounded-full p-2 text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}