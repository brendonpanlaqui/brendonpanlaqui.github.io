import { useEffect, useRef, useState } from 'react';
import { RotateCcw, X } from 'lucide-react';

const MY_WPM = 120; 

const PROMPTS = [
  'clean code is simple and direct and reads like well written prose',
  'building full stack web and mobile apps from database schema to user interface',
  'secure networks rely on strict access control clean routing and constant monitoring',
  'fast software feels effortless because every unnecessary element has been removed',
];

interface TypingTestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TypingTestModal({ isOpen, onClose }: TypingTestModalProps) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const target = PROMPTS[promptIndex];
  const isFinished = input.length >= target.length;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, promptIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (value: string) => {
    if (isFinished) return;
    if (!startTime && value.length > 0) setStartTime(Date.now());

    const trimmed = value.slice(0, target.length);
    setInput(trimmed);

    if (trimmed.length >= target.length) {
      setEndTime(Date.now());
    }
  };

  const handleRestart = () => {
    setPromptIndex((prev) => (prev + 1) % PROMPTS.length);
    setInput('');
    setStartTime(null);
    setEndTime(null);
    setTimeout(() => inputRef.current?.focus(), 20);
  };

  const correctChars = input
    .split('')
    .filter((char, i) => char === target[i]).length;

  const accuracy =
    input.length > 0 ? Math.round((correctChars / input.length) * 100) : 100;

  const elapsedMinutes = startTime
    ? ((endTime ?? Date.now()) - startTime) / 60000
    : 0;

  const wpm =
    elapsedMinutes > 0.005 ? Math.round(correctChars / 5 / elapsedMinutes) : 0;

  const beatMe = wpm > MY_WPM;
  const tiedMe = wpm === MY_WPM;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-[#111216]"
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold tracking-tight text-neutral-950 dark:text-white">
              Typing test
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Try to beat my {MY_WPM} WPM
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Typing Area */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="font-mono-tech relative cursor-text rounded-xl border border-neutral-200/80 bg-neutral-50/70 p-4 text-sm leading-relaxed select-none dark:border-neutral-800 dark:bg-[#0B0C0E]"
        >
          {target.split('').map((char, idx) => {
            let colorClass = 'text-neutral-400 dark:text-neutral-600';
            if (idx < input.length) {
              colorClass =
                input[idx] === char
                  ? 'text-neutral-950 dark:text-white'
                  : 'bg-red-500/20 text-red-600 dark:text-red-400';
            } else if (idx === input.length) {
              colorClass =
                'border-b-2 border-neutral-950 text-neutral-600 dark:border-white dark:text-neutral-300';
            }
            return (
              <span key={idx} className={colorClass}>
                {char}
              </span>
            );
          })}

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-text opacity-0"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </div>

        {/* Result Banner (only shows after finishing) */}
        {isFinished && (
          <div className="mt-4 rounded-xl border border-neutral-200/80 bg-neutral-50/80 px-4 py-3 text-xs dark:border-neutral-800 dark:bg-[#181920]">
            <p className="font-semibold text-neutral-950 dark:text-white">
              {beatMe
                ? `You beat me! (${wpm} vs my ${MY_WPM} WPM)`
                : tiedMe
                ? `Tie! You matched my ${MY_WPM} WPM.`
                : `Not quite — my record is ${MY_WPM} WPM.`}
            </p>
            <p className="mt-0.5 text-neutral-500 dark:text-neutral-400">
              Final speed: {wpm} WPM · Accuracy: {accuracy}%
            </p>
          </div>
        )}

        {/* Footer: Live Stats + Restart */}
        <div className="mt-4 flex items-center justify-between">
          <div className="font-mono-tech flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
            <span>
              <strong className="text-neutral-950 dark:text-white">{wpm}</strong> WPM
            </span>
            <span>
              <strong className="text-neutral-950 dark:text-white">{accuracy}%</strong> acc
            </span>
          </div>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3.5 py-1.5 text-xs font-medium text-neutral-700 transition hover:border-neutral-400 hover:text-neutral-950 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-white"
          >
            <RotateCcw className="h-3 w-3" />
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}