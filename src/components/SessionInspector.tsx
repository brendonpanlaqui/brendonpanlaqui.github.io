import { useCallback, useEffect, useMemo, useState } from 'react';
import { RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { PROFILE } from '../data/portfolio';

interface SessionInspectorProps {
  open: boolean;
  onClose: () => void;
}

type Tone = 'muted' | 'normal' | 'danger' | 'warn' | 'safe';

interface Segment {
  text: string;
  tone?: Tone;
}

type ScriptLine = Segment[];

const TONE_CLASS: Record<Tone, string> = {
  muted: 'text-neutral-500',
  normal: 'text-neutral-100',
  danger: 'text-red-400',
  warn: 'text-amber-400',
  safe: 'text-emerald-400',
};

function normalizeIsp(raw: string): string {
  const lower = raw.toLowerCase().trim();
  if (!lower || lower === 'unknown isp') return '';

  if (lower.includes('converge')) return 'converge ict';
  if (lower.includes('comclark')) return 'comclark';
  if (lower.includes('pldt')) return 'pldt';
  if (lower.includes('globe')) return 'globe';
  if (lower.includes('smart')) return 'smart';
  if (lower.includes('dito')) return 'dito';
  if (lower.includes('starlink')) return 'starlink';

  return lower
    .replace(
      /\b(fttx|fiber|customer|solutions|network|technology|telecoms?|communications|broadband|inc\.?|corp\.?|corporation|llc|ltd\.?|co\.?)\b/g,
      ''
    )
    .replace(/[&,]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatCoords(lat?: string, lon?: string): string {
  const latNum = Number(lat);
  const lonNum = Number(lon);
  if (!Number.isFinite(latNum) || !Number.isFinite(lonNum)) return '';
  const latDir = latNum >= 0 ? 'n' : 's';
  const lonDir = lonNum >= 0 ? 'e' : 'w';
  return `${Math.abs(latNum).toFixed(2)}° ${latDir}, ${Math.abs(lonNum).toFixed(2)}° ${lonDir}`;
}

function getCleanGpu(): string {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return '';
    const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return '';
    const raw = String(
      (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || ''
    );
    const cleaned = raw.replace(/ANGLE \((?:[^,]+,\s*)?([^,(]+).*\)/, '$1').trim().toLowerCase();

    if (/basic render driver|swiftshader|llvmpipe|software|unknown/i.test(cleaned)) {
      return '';
    }
    return cleaned;
  } catch {
    return '';
  }
}

function getBrowserAndOs(): { browser: string; os: string } {
  const ua = navigator.userAgent;
  const browser = ua.includes('Edg')
    ? 'edge'
    : ua.includes('Chrome')
      ? 'chrome'
      : ua.includes('Firefox')
        ? 'firefox'
        : ua.includes('Safari')
          ? 'safari'
          : 'your browser';

  const os = ua.includes('Windows')
    ? 'windows'
    : ua.includes('Mac OS')
      ? 'macos'
      : ua.includes('Android')
        ? 'android'
        : ua.includes('iPhone') || ua.includes('iPad')
          ? 'ios'
          : ua.includes('Linux')
            ? 'linux'
            : 'your device';

  return { browser, os };
}

function stopSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

function speakText(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.25;  
    utterance.pitch = 0.82; 
    utterance.volume = 0.95;

  const voices = window.speechSynthesis.getVoices();
  const preferred =
    voices.find((v) => /google uk english male/i.test(v.name)) ||  
    voices.find((v) => /whisper|fred/i.test(v.name)) ||  
    voices.find((v) => /google us english|daniel|samantha|david|mark/i.test(v.name)) ||
    voices.find((v) => /microsoft (george|mark|david)/i.test(v.name)) ||
    voices.find((v) => /daniel|alex/i.test(v.name)) ||
    voices.find((v) => v.lang.startsWith('en'));
  if (preferred) utterance.voice = preferred;

  window.speechSynthesis.speak(utterance);
}

export function SessionInspector({ open, onClose }: SessionInspectorProps) {
  const [lines, setLines] = useState<ScriptLine[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [muted, setMuted] = useState(false);

  // Build the script when opened
  useEffect(() => {
    if (!open) {
      stopSpeech();
      setLines([]);
      setLineIndex(0);
      setCharCount(0);
      return;
    }

    let cancelled = false;

    async function buildScript() {
      const nav = navigator as Navigator & { deviceMemory?: number };

      const script: ScriptLine[] = [
        [
          { text: 'you didn’t grant any permissions. ', tone: 'muted' },
          { text: 'yet your browser already handed me your profile.', tone: 'danger' },
        ],
      ];

      if (PROFILE.aiChatWebhookUrl) {
        try {
          const base = PROFILE.aiChatWebhookUrl.replace(/\/$/, '');
          const res = await fetch(`${base}/inspect`);
          if (res.ok) {
            const net = await res.json();
            const place = [net.city, net.region, net.country]
              .filter((v) => v && v !== 'Unknown')
              .join(', ')
              .toLowerCase();
            const coords = formatCoords(net.latitude, net.longitude);
            const isp = normalizeIsp(net.isp || '');

            if (place) {
              const locLine: ScriptLine = [
                { text: 'signal traced to ', tone: 'muted' },
                { text: place, tone: 'danger' },
              ];
              if (coords) {
                locLine.push({ text: ` (${coords})`, tone: 'warn' });
              }
              locLine.push({ text: '.', tone: 'muted' });
              script.push(locLine);
            }

            if (isp || (net.ip && net.ip !== 'Hidden')) {
              const netLine: ScriptLine = [];
              if (isp) {
                netLine.push({ text: 'routed through ', tone: 'muted' });
                netLine.push({ text: isp, tone: 'danger' });
              }
              if (net.ip && net.ip !== 'Hidden') {
                netLine.push({ text: isp ? ' · ip ' : 'network ip ', tone: 'muted' });
                netLine.push({ text: net.ip, tone: 'warn' });
              }
              netLine.push({ text: '.', tone: 'muted' });
              script.push(netLine);
            }
          }
        } catch {
          // if offline
        }
      }

      const { browser, os } = getBrowserAndOs();
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase();
      script.push([
        { text: 'device identified: ', tone: 'muted' },
        { text: `${browser} on ${os}`, tone: 'normal' },
        { text: ` (${window.screen.width}×${window.screen.height}) · `, tone: 'muted' },
        { text: tz, tone: 'warn' },
        { text: '.', tone: 'muted' },
      ]);

      // 3. Processor, Memory & Real GPU
      const cores = navigator.hardwareConcurrency;
      const ram = nav.deviceMemory;
      const gpu = getCleanGpu();

      if (cores || ram) {
        const hwLine: ScriptLine = [{ text: 'hardware signature: ', tone: 'muted' }];
        if (cores) {
          hwLine.push({ text: `${cores}-thread processor`, tone: 'normal' });
        }
        if (ram) {
          hwLine.push({ text: cores ? ' · ' : '', tone: 'muted' });
          hwLine.push({ text: `~${ram} gb memory`, tone: 'normal' });
        }
        if (gpu) {
          hwLine.push({ text: ' · ', tone: 'muted' });
          hwLine.push({ text: gpu, tone: 'warn' });
        }
        hwLine.push({ text: '.', tone: 'muted' });
        script.push(hwLine);
      }

      // 4. Warning & Reassurance
      script.push([
        { text: 'warning: ', tone: 'danger' },
        {
          text: 'if this were a malicious link, this fingerprint would already be logged without you ever knowing.',
          tone: 'normal',
        },
      ]);

      script.push([
        { text: 'relax. ', tone: 'safe' },
        { text: 'nothing here was saved, tracked, or sent to me. ', tone: 'muted' },
        { text: 'stay sharp online.', tone: 'safe' },
      ]);

      if (!cancelled) {
        setLines(script);
        setLineIndex(0);
        setCharCount(0);
      }
    }

    buildScript();

    return () => {
      cancelled = true;
      stopSpeech();
    };
  }, [open]);

  const currentLine = useMemo(() => lines[lineIndex] || [], [lines, lineIndex]);
  const plainLineText = useMemo(
    () => currentLine.map((seg) => seg.text).join(''),
    [currentLine]
  );
  const totalChars = plainLineText.length;

  const isTypingDone = totalChars > 0 && charCount >= totalChars;
  const isLastLine = lines.length > 0 && lineIndex === lines.length - 1;
  const isFinished = isLastLine && isTypingDone;

  // Speak each new line when it starts (unless muted)
  useEffect(() => {
    if (!open || !plainLineText) return;
    if (muted) {
      stopSpeech();
      return;
    }
    speakText(plainLineText);
  }, [open, lineIndex, plainLineText, muted]);

  const handleClose = useCallback(() => {
    stopSpeech();
    onClose();
  }, [onClose]);

  const handleReplay = useCallback(() => {
    stopSpeech();
    setLineIndex(0);
    setCharCount(0);
  }, []);

  const advanceLine = useCallback(() => {
    if (!lines.length) return;

    if (!isTypingDone) {
      setCharCount(totalChars);
      return;
    }

    if (!isLastLine) {
      stopSpeech();
      setLineIndex((prev) => prev + 1);
      setCharCount(0);
    }
  }, [lines.length, isTypingDone, totalChars, isLastLine]);

  // Typewriter tick + reading pause
  useEffect(() => {
    if (!open || totalChars === 0) return;

    if (charCount < totalChars) {
      const typeTimer = setTimeout(() => {
        setCharCount((prev) => prev + 1);
      }, 28);
      return () => clearTimeout(typeTimer);
    }

    if (!isLastLine) {
      const pauseTimer = setTimeout(() => {
        setLineIndex((prev) => prev + 1);
        setCharCount(0);
      }, muted ? 2100 : 2800);
      return () => clearTimeout(pauseTimer);
    }
  }, [open, charCount, totalChars, isLastLine, muted]);

  // Lock body scroll & keyboard shortcuts
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key.toLowerCase() === 'm') {
        setMuted((prev) => !prev);
      } else if (isFinished && e.key.toLowerCase() === 'r') {
        e.preventDefault();
        handleReplay();
      } else if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') {
        e.preventDefault();
        advanceLine();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, handleClose, advanceLine, isFinished, handleReplay]);

  if (!open) return null;

  let remaining = charCount;
  const renderedSegments = currentLine.map((seg, idx) => {
    if (remaining <= 0) return null;
    const slice = seg.text.slice(0, remaining);
    remaining -= slice.length;
    return (
      <span key={idx} className={TONE_CLASS[seg.tone || 'normal']}>
        {slice}
      </span>
    );
  });

  const stepLabel =
    lines.length > 0
      ? `${String(lineIndex + 1).padStart(2, '0')} / ${String(lines.length).padStart(2, '0')}`
      : '00 / 00';

  return (
    <div
      onClick={advanceLine}
      className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-[#07080A]/96 p-6 select-none backdrop-blur-md"
    >
      {/* Top-left live recon indicator */}
      <div className="fixed top-6 left-6 flex items-center gap-2 font-mono-tech text-[11px] text-neutral-500">
        <span
          className={`h-2 w-2 rounded-full ${
            isLastLine ? 'bg-emerald-400' : 'animate-pulse bg-red-500'
          }`}
        />
        <span>{isLastLine ? 'session clear' : 'passive recon'}</span>
        <span className="text-neutral-700">·</span>
        <span>{stepLabel}</span>
      </div>

      {/* Top-right Mute & ESC controls */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed top-5 right-6 flex items-center gap-2"
      >
        <button
          onClick={() => setMuted((prev) => !prev)}
          aria-label={muted ? 'Unmute voice' : 'Mute voice'}
          title={muted ? 'Unmute (M)' : 'Mute (M)'}
          className="rounded-full border border-neutral-800 p-1.5 text-neutral-400 transition hover:border-neutral-600 hover:text-white"
        >
          {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
        </button>
        <button
          onClick={handleClose}
          className="rounded-full border border-neutral-800 px-3.5 py-1 font-mono-tech text-[11px] text-neutral-400 transition hover:border-neutral-600 hover:text-white"
        >
          esc
        </button>
      </div>

      {/* Centered single-line colored typewriter */}
      <div className="w-full max-w-xl px-4 text-left font-mono-tech">
        <p className="min-h-16 text-base leading-relaxed sm:text-lg">
          {renderedSegments}
          <span
            className={`ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-pulse ${
              isLastLine ? 'bg-emerald-400' : 'bg-red-400'
            }`}
          />
        </p>

        {/* Replay & Close actions at the end */}
        {isFinished && (
          <div onClick={(e) => e.stopPropagation()} className="mt-6 flex items-center gap-3">
            <button
              onClick={handleReplay}
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900/80 px-4 py-1.5 text-xs text-neutral-200 transition hover:border-emerald-500/60 hover:text-emerald-400"
            >
              <RotateCcw className="h-3 w-3" />
              <span>try again</span>
            </button>
            <button
              onClick={handleClose}
              className="rounded-full border border-neutral-800 px-4 py-1.5 text-xs text-neutral-400 transition hover:border-neutral-600 hover:text-white"
            >
              close
            </button>
          </div>
        )}
      </div>

      {/* Bottom reassurance bar */}
      <div className="fixed right-0 bottom-5 left-0 px-4 text-center font-mono-tech text-[10px] text-neutral-500">
        local preview only · nothing is logged or sent ·{' '}
        {isFinished ? 'press r to replay · m to mute' : 'tap to skip · m to mute'}
      </div>
    </div>
  );
}