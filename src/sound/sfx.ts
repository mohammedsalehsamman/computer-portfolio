import { create } from "zustand";

/** Every sound is synthesized with WebAudio, so there are no audio files. Muted by default. */
let ctx: AudioContext | null = null;
const KEY = "mss-muted";

const initialMuted = () => {
  try {
    return localStorage.getItem(KEY) !== "0";
  } catch {
    return true;
  }
};

export function unlockAudio() {
  if (!ctx) {
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
  }
  void ctx.resume();
}

export const useSound = create<{ muted: boolean; toggle: () => void }>((set, get) => ({
  muted: initialMuted(),
  toggle: () => {
    const muted = !get().muted;
    try {
      localStorage.setItem(KEY, muted ? "1" : "0");
    } catch {
      /* storage blocked */
    }
    set({ muted });
    if (!muted) {
      unlockAudio();
      sfx.beep();
    }
  },
}));

function tone(freq: number, dur: number, type: OscillatorType = "square", gain = 0.03, delay = 0) {
  if (!ctx || useSound.getState().muted) return;
  const t0 = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

export const sfx = {
  click: () => tone(1800, 0.03, "square", 0.012),
  open: () => {
    tone(520, 0.06, "triangle", 0.04);
    tone(780, 0.08, "triangle", 0.035, 0.05);
  },
  close: () => {
    tone(700, 0.05, "triangle", 0.035);
    tone(440, 0.07, "triangle", 0.03, 0.04);
  },
  beep: () => tone(980, 0.12, "square", 0.02),
  chime: () => {
    [392, 523.25, 659.25, 783.99].forEach((f, i) => tone(f, 0.5, "sine", 0.05, i * 0.11));
  },
};
