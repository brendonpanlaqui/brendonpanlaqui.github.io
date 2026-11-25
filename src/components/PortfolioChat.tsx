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
];

function getBrowserName() {
  const ua = navigator.userAgent;
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari')) return 'Safari';
  return 'Browser';
}

function getLocalPortfolioReply(question: string): string {
  const q = question.toLowerCase();

  if (q.includes('fair') || q.includes('thesis') || q.includes('tricycle') || q.includes('geofenc')) {
    return 'Fair is Brendon’s capstone thesis built for Angeles City commuters, drivers, and the PTRO. He led a 5-person team to build the Passenger & Driver apps (React Native + TypeScript) and the Django REST + PostgreSQL backend & web admin dashboard, using Google Maps Directions API and Haversine geofencing.';
  }

  if (q.includes('stack') || q.includes('tech') || q.includes('language') || q.includes('framework')) {
    return 'Brendon’s core stack is React, React Native (Expo), and TypeScript on the frontend, paired with Python (Django REST, FastAPI) or PHP (Laravel) and PostgreSQL, MySQL, or Firebase/Firestore on the backend. He also builds AI workflows using n8n and Dify.';
  }

  if (q.includes('security') || q.includes('ccna') || q.includes('ctf') || q.includes('cyber') || q.includes('network')) {
    return 'Brendon holds three Cisco CCNAv7 certifications (ENSA, SRWE, ITN), Cybersecurity Essentials (LFC108), and is currently taking Cyber Threat Monitoring Level 1. He is a 2x CCA CTF Champion, placed 4th at the Cisco Regional CCNA CTF, and competed in Hack4Gov Region 3.';
  }

  if (q.includes('availab') || q.includes('intern') || q.includes('ojt') || q.includes('hire') || q.includes('role')) {
    return 'Yes! Brendon is currently open to OJT/internship placements as well as full-stack, mobile, AI automation, and cybersecurity roles. You can reach him directly via the contact form or by copying his email in the hero section.';
  }

  if (q.includes('experience') || q.includes('knack') || q.includes('work') || q.includes('job')) {
    return 'Brendon worked as a Process Associate at Knack RCM (Jul–Dec 2026), handling high-volume healthcare billing workflows under strict HIPAA privacy and SLA deadlines, alongside freelance web and mobile development.';
  }

  if (q.includes('egnosis') || q.includes('library') || q.includes('horasko') || q.includes('quest')) {
    return 'Besides Fair, Brendon built the backend (Firebase Auth + Cloud Firestore + QR borrowing logic) for the eGnosis Library System, HorasKo (React + Laravel work hours & pay cut-off tracker), and Quest Hunt (PHP + MySQL local job board).';
  }

  return 'Ask me anything about Brendon’s tech stack (React, TypeScript, Django, Laravel, n8n/Dify), his thesis project Fair, his Cisco CCNA & CTF background, or his availability.';
}

export function PortfolioChat({ open, setOpen }: PortfolioChatProps) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [visitorInfo, setVisitorInfo] = useState('');
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

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, setOpen]);

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: trimmed };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    const botId = `${Date.now()}-bot`;

    try {
      if (!PROFILE.aiChatWebhookUrl) {
        await new Promise((r) => setTimeout(r, 200));
        setMessages((prev) => [
          ...prev,
          { id: botId, sender: 'assistant', text: getLocalPortfolioReply(trimmed) },
        ]);
        return;
      }

      const res = await fetch(PROFILE.aiChatWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          messages: updatedMessages.filter((m) => m.id !== 'welcome').slice(-4),
        }),
      });

      // Read visitor location from stream headers
      const city = res.headers.get('X-Visitor-City');
      const country = res.headers.get('X-Visitor-Country');
      if (city) {
        const location = [city, country].filter(Boolean).join(', ');
        setVisitorInfo(`${location} · ${getBrowserName()}`);
      }

      // Handle non-streaming JSON responses (e.g., 429 rate limit or 400 length cap)
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('text/event-stream')) {
        const data = await res.json().catch(() => ({}));
        const replyText = data.reply || getLocalPortfolioReply(trimmed);
        setMessages((prev) => [...prev, { id: botId, sender: 'assistant', text: replyText }]);
        return;
      }

      if (!res.ok || !res.body) throw new Error('Stream failed');

      // Create an empty assistant bubble and stream chunks into it
      setMessages((prev) => [...prev, { id: botId, sender: 'assistant', text: '' }]);
      setLoading(false);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const jsonStr = line.slice(6).trim();
          if (!jsonStr || jsonStr === '[DONE]') continue;

          try {
            const parsed = JSON.parse(jsonStr);
            const chunk = parsed?.candidates?.[0]?.content?.parts?.[0]?.text || '';
            if (chunk) {
              fullText += chunk;
              setMessages((prev) =>
                prev.map((m) => (m.id === botId ? { ...m, text: fullText } : m))
              );
            }
          } catch {
            // Ignore incomplete JSON frames
          }
        }
      }

      if (!fullText.trim()) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botId ? { ...m, text: getLocalPortfolioReply(trimmed) } : m
          )
        );
      }
    } catch {
      setMessages((prev) => {
        const exists = prev.some((m) => m.id === botId);
        if (exists) {
          return prev.map((m) =>
            m.id === botId ? { ...m, text: getLocalPortfolioReply(trimmed) } : m
          );
        }
        return [...prev, { id: botId, sender: 'assistant', text: getLocalPortfolioReply(trimmed) }];
      });
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <div className="fixed right-5 bottom-5 z-40">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-medium text-neutral-900 shadow-lg transition hover:-translate-y-0.5 hover:border-neutral-500 dark:border-neutral-800 dark:bg-[#111216] dark:text-neutral-100 dark:hover:border-neutral-600"
        >
          <Bot className="h-4 w-4 text-emerald-500" />
          <span>Ask AI</span>
          <kbd className="hidden rounded border border-neutral-300 bg-neutral-100 px-1.5 py-0.5 font-mono-tech text-[10px] text-neutral-500 sm:inline-block dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
            Alt K
          </kbd>
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm dark:bg-black/70"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex h-115 w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-xl dark:border-neutral-800 dark:bg-[#111216]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200/80 px-5 py-3.5 dark:border-neutral-800/80">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <span className="text-xs font-semibold text-neutral-950 dark:text-white">
              Ask Anything About Brendon
            </span>
            {visitorInfo && (
              <span className="hidden font-mono-tech text-[10px] text-neutral-400 sm:inline">
                · {visitorInfo}
              </span>
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close assistant"
            className="rounded-full p-1.5 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-white"
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
                    ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950'
                    : 'border border-neutral-200/90 bg-neutral-50/70 text-neutral-800 dark:border-neutral-800 dark:bg-[#181920] dark:text-neutral-200'
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
                    className="rounded-full border border-neutral-200/90 px-3 py-1 text-left text-[11px] text-neutral-700 transition hover:border-neutral-900 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-500"
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
          className="flex items-center gap-2 border-t border-neutral-200/80 px-4 py-2.5 dark:border-neutral-800/80"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Fair, React Native, CCNA, Knack RCM..."
            className="flex-1 bg-transparent text-xs text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-neutral-100 dark:placeholder:text-neutral-500"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="rounded-full p-2 text-neutral-600 transition hover:text-neutral-950 disabled:opacity-40 dark:text-neutral-400 dark:hover:text-white"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}