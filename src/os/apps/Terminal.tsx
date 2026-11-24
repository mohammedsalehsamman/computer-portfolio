import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { experience } from "@/content/experience";
import { profile, skills } from "@/content/profile";
import { projects } from "@/content/projects";
import { useLocale, useT } from "@/i18n/locale";
import { sfx } from "@/sound/sfx";
import { useWindows } from "../windowStore";

type Line = { kind: "in" | "out" | "err"; text: string };

const PROMPT = "guest@samman:~$";

export default function Terminal() {
  const { t } = useT();
  const toggleLocale = useLocale((st) => st.toggle);
  const open = useWindows((st) => st.open);
  const [lines, setLines] = useState<Line[]>(() => [
    { kind: "out", text: `Samman OS shell — ${t(profile.name)}` },
    { kind: "out", text: "Type 'help' to see what I can do." },
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Braces matter: scrollIntoView() returns a Promise in newer Chromium, and an effect must not return one.
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const run = (raw: string): Line[] => {
    const [cmd, ...args] = raw.trim().split(/\s+/);
    const out = (...text: string[]): Line[] => text.map((x) => ({ kind: "out", text: x }));
    switch ((cmd ?? "").toLowerCase()) {
      case "":
        return [];
      case "help":
        return out(
          "whoami        who built this machine",
          "about         open About Me",
          "projects      list projects   (open <slug> to view one)",
          "experience    list work experience",
          "skills        list skills",
          "contact       how to reach me",
          "resume        open the CV",
          "mail          send me a message",
          "solitaire     take a break and play a round",
          "lang          switch English / العربية",
          "date          current date and time",
          "clear         clear the screen",
        );
      case "whoami":
        return out(`${t(profile.name)} — ${t(profile.role)}`, t(profile.location));
      case "about":
        open("about");
        return out("Opening About Me…");
      case "projects":
        return out(...projects.map((p) => `${p.slug.padEnd(24)} ${t(p.tagline)}`), "", "Try: open belle-biens");
      case "open": {
        const slug = args[0];
        if (slug && projects.some((p) => p.slug === slug)) {
          open("project", slug);
          return out(`Opening ${slug}…`);
        }
        return [{ kind: "err", text: `open: no such project '${slug ?? ""}'. Run 'projects' for the list.` }];
      }
      case "experience":
        return out(...experience.map((e) => `${t(e.period).padEnd(16)} ${t(e.role)} — ${t(e.org)}`));
      case "skills":
        return out(...skills.map((g) => `${t(g.title)}: ${g.items.join(", ")}`));
      case "contact":
        return out(`email     ${profile.email}`, `phone     ${profile.phone}`, `github    ${profile.links.github}`, `linkedin  ${profile.links.linkedin}`);
      case "resume":
      case "cv":
        open("resume");
        return out("Opening resume…");
      case "mail":
        open("mail");
        return out("Opening Mail…");
      case "solitaire":
        open("solitaire");
        return out("Dealing cards…");
      case "lang":
        toggleLocale();
        return out("Language switched.");
      case "date":
        return out(new Date().toString());
      case "sudo":
        return [{ kind: "err", text: "Permission denied. Nice try though — hire me and I'll give you root." }];
      case "clear":
        setLines([]);
        return [];
      default:
        return [{ kind: "err", text: `${cmd}: command not found. Type 'help'.` }];
    }
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sfx.click();
      const result = run(value);
      if (value.trim().toLowerCase() !== "clear") setLines((l) => [...l, { kind: "in", text: value }, ...result]);
      if (value.trim()) setHistory((h) => [value, ...h].slice(0, 50));
      setValue("");
      setHIdx(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(hIdx + 1, history.length - 1);
      if (history[i] !== undefined) {
        setHIdx(i);
        setValue(history[i]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = hIdx - 1;
      setHIdx(Math.max(i, -1));
      setValue(i >= 0 ? history[i] : "");
    }
  };

  return (
    <div className="term" dir="ltr" onClick={() => inputRef.current?.focus()}>
      {lines.map((l, i) => (
        <div key={i} className={`term-line term-${l.kind}`}>
          {l.kind === "in" && <span className="term-prompt">{PROMPT} </span>}
          {l.text}
        </div>
      ))}
      <div className="term-line term-input-row">
        <span className="term-prompt">{PROMPT}&nbsp;</span>
        <input
          ref={inputRef}
          className="term-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKey}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          aria-label="Terminal input"
          autoFocus
        />
      </div>
      <div ref={endRef} />
    </div>
  );
}
