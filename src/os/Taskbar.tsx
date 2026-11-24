import { useEffect, useState } from "react";
import { projectBySlug } from "@/lib/site";
import { useLocale, useT } from "@/i18n/locale";
import { s } from "@/i18n/strings";
import { sfx, useSound } from "@/sound/sfx";
import { Icon } from "./Icon";
import { appMeta } from "./registry";
import { StartMenu } from "./StartMenu";
import { activeWindowId, useWindows, type Win } from "./windowStore";

export function useWindowTitle() {
  const { t } = useT();
  return (w: Win) => {
    if (w.app === "project" && w.param) {
      const p = projectBySlug(w.param);
      if (p) return t(p.name);
    }
    return t(appMeta[w.app].title);
  };
}

function Clock() {
  const { locale } = useT();
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <time className="tray-clock" dateTime={now.toISOString()}>
      {now.toLocaleTimeString(locale === "ar" ? "ar" : "en-US", { hour: "numeric", minute: "2-digit" })}
    </time>
  );
}

export function Taskbar({ embedded }: { embedded: boolean }) {
  const { t } = useT();
  const toggleLocale = useLocale((st) => st.toggle);
  const { muted, toggle: toggleSound } = useSound();
  const wins = useWindows((st) => st.wins);
  const activeId = activeWindowId(wins);
  const { focus, minimize } = useWindows.getState();
  const titleOf = useWindowTitle();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {menuOpen && <StartMenu embedded={embedded} onClose={() => setMenuOpen(false)} />}
      <footer className="taskbar">
        <button
          className={`start-btn${menuOpen ? " is-pressed" : ""}`}
          aria-expanded={menuOpen}
          onClick={() => {
            sfx.click();
            setMenuOpen((v) => !v);
          }}
        >
          <Icon name="logo" size={18} />
          <span>{t(s.start)}</span>
        </button>
        <div className="task-divider" />
        <div className="task-list">
          {wins.map((w) => (
            <button
              key={w.id}
              className={`task-btn${w.id === activeId ? " is-pressed" : ""}`}
              title={titleOf(w)}
              onClick={() => {
                sfx.click();
                if (w.id === activeId) minimize(w.id);
                else focus(w.id);
              }}
            >
              <Icon name={appMeta[w.app].icon} size={16} />
              <span>{titleOf(w)}</span>
            </button>
          ))}
        </div>
        <div className="tray">
          <button className="tray-btn tray-lang" onClick={toggleLocale} title={t(s.switchLangLabel)} aria-label={t(s.switchLangLabel)}>
            {t(s.switchLang)}
          </button>
          <button className="tray-btn" onClick={toggleSound} title={t(muted ? s.soundOff : s.soundOn)} aria-label={t(muted ? s.soundOff : s.soundOn)}>
            <Icon name={muted ? "soundOff" : "soundOn"} size={16} />
          </button>
          <Clock />
        </div>
      </footer>
    </>
  );
}
