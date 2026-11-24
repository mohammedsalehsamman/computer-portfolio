import { useEffect, useState } from "react";

export type Phase = "night" | "dawn" | "day" | "dusk";

/** Visitor's local hour → time of day outside the window. */
export function phaseAt(hour: number): Phase {
  if (hour >= 5 && hour < 8) return "dawn";
  if (hour >= 8 && hour < 17) return "day";
  if (hour >= 17 && hour < 20) return "dusk";
  return "night";
}

type Lighting = {
  /** Light coming through the window (moon or sun). */
  dir: { color: string; intensity: number };
  hemi: { sky: string; ground: string; intensity: number };
  ambient: { color: string; intensity: number };
};

export const PHASES: Record<Phase, Lighting> = {
  night: {
    dir: { color: "#a9b8ff", intensity: 0.5 },
    hemi: { sky: "#9aa6ff", ground: "#2a1d14", intensity: 0.45 },
    ambient: { color: "#7d7fb0", intensity: 0.35 },
  },
  dawn: {
    dir: { color: "#ffc49a", intensity: 0.95 },
    hemi: { sky: "#ffd2b0", ground: "#3a2a20", intensity: 0.55 },
    ambient: { color: "#a08a9a", intensity: 0.45 },
  },
  day: {
    dir: { color: "#fff4e0", intensity: 1.7 },
    hemi: { sky: "#cfe6ff", ground: "#4a3a2c", intensity: 0.85 },
    ambient: { color: "#b8bcd0", intensity: 0.6 },
  },
  dusk: {
    dir: { color: "#ff9a5a", intensity: 1.05 },
    hemi: { sky: "#e8a0b0", ground: "#33221c", intensity: 0.5 },
    ambient: { color: "#8a6f8f", intensity: 0.42 },
  },
};

/** Current phase, rechecked every five minutes. */
export function usePhase(): Phase {
  const [phase, setPhase] = useState(() => phaseAt(new Date().getHours()));
  useEffect(() => {
    const id = window.setInterval(() => setPhase(phaseAt(new Date().getHours())), 5 * 60_000);
    return () => window.clearInterval(id);
  }, []);
  return phase;
}
