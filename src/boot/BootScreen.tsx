import { useEffect, useState } from "react";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { sfx, unlockAudio } from "@/sound/sfx";
import { useScene } from "@/state/scene";

/** An original BIOS-style power-on screen. Text stays Latin/monospace in both languages. */
const LINES = [
  "SAMMAN SYSTEMS  BIOS v26.08  (C) 2026",
  "",
  "CPU   : Neural Core @ 3.20 GHz",
  "MEMORY: @MEM",
  "",
  "Detecting drives...",
  `  Primary   : PROJECTS.VHD    ${projects.length} entries`,
  `  Secondary : EXPERIENCE.VHD  ${experience.length} entries`,
  "  CD-ROM    : RESUME.PDF",
  "",
  `Owner     : ${profile.name.en}`,
  `Role      : ${profile.role.en}`,
  `Location  : ${profile.location.en}`,
  "",
  "Loading SAMMAN OS ...",
];

const MEM_TARGET = 65536;

export function BootScreen() {
  const ready = useScene((st) => st.ready);
  const booted = useScene((st) => st.booted);
  const [shown, setShown] = useState(0);
  const [mem, setMem] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const done = shown >= LINES.length && ready;

  useEffect(() => {
    if (shown >= LINES.length) return;
    const id = window.setTimeout(() => setShown((n) => n + 1), LINES[shown] === "" ? 60 : 140);
    return () => window.clearTimeout(id);
  }, [shown]);

  useEffect(() => {
    if (shown < 4 || mem >= MEM_TARGET) return;
    const id = window.requestAnimationFrame(() => setMem((m) => Math.min(MEM_TARGET, m + 2731)));
    return () => window.cancelAnimationFrame(id);
  }, [shown, mem]);

  useEffect(() => {
    if (!done || booted) return;
    const start = (e: Event) => {
      if (e instanceof KeyboardEvent && (e.metaKey || e.ctrlKey || e.altKey)) return;
      unlockAudio();
      sfx.beep();
      setLeaving(true);
      useScene.getState().boot();
      window.setTimeout(() => setGone(true), 700);
    };
    window.addEventListener("pointerdown", start, { once: true });
    window.addEventListener("keydown", start, { once: true });
    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
  }, [done, booted]);

  if (gone) return null;

  return (
    <div className={`boot${leaving ? " is-leaving" : ""}`} role="status" aria-live="polite">
      <div className="boot-inner">
        {LINES.slice(0, shown).map((l, i) => (
          <div key={i} className="boot-line">
            {l === "MEMORY: @MEM" ? `MEMORY: ${mem}K ${mem >= MEM_TARGET ? "OK" : ""}` : l || " "}
          </div>
        ))}
        {shown >= LINES.length && !ready && <div className="boot-line">Warming up the tube...</div>}
        {done && (
          <div className="boot-prompt">
            <span className="boot-blink">▶</span> Click anywhere or press any key to start
            <div className="boot-prompt-ar" dir="rtl" lang="ar">
              انقر في أي مكان أو اضغط أي زر للبدء
            </div>
          </div>
        )}
      </div>
      <div className="boot-scan" aria-hidden="true" />
    </div>
  );
}
