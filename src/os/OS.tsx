import { Component, lazy, Suspense, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useT } from "@/i18n/locale";
import { s } from "@/i18n/strings";
import { sfx } from "@/sound/sfx";
import { useScene } from "@/state/scene";
import { Desktop } from "./Desktop";
import { Icon } from "./Icon";
import { appMeta, type AppId } from "./registry";
import { Screensaver } from "./Screensaver";
import { useWindowTitle, Taskbar } from "./Taskbar";
import { Window } from "./Window";
import { useWindows, type Win } from "./windowStore";

const apps: Record<AppId, React.LazyExoticComponent<(p: { param?: string }) => React.JSX.Element>> = {
  about: lazy(() => import("./apps/About")),
  experience: lazy(() => import("./apps/Experience")),
  projects: lazy(() => import("./apps/Projects")),
  project: lazy(() => import("./apps/ProjectDetail")),
  skills: lazy(() => import("./apps/Skills")),
  contact: lazy(() => import("./apps/Contact")),
  resume: lazy(() => import("./apps/Resume")),
  terminal: lazy(() => import("./apps/Terminal")),
  solitaire: lazy(() => import("./apps/solitaire/Solitaire")),
  mail: lazy(() => import("./apps/Mail")),
};

export const SCREEN_W = 1024;
export const SCREEN_H = 768;
const IDLE_MS = 60_000;

function Splash() {
  const { t } = useT();
  return (
    <div className="os-splash">
      <Icon name="logo" size={72} />
      <div className="splash-name">{t(s.osName)}</div>
      <div className="splash-bar" aria-label={t(s.booting)}>
        <span />
      </div>
      <div className="splash-sub">{t(s.booting)}</div>
    </div>
  );
}

/** Keeps a crashing app inside its own window instead of blanking the whole desktop. */
class AppBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.error(error);
  }
  render() {
    return this.state.failed ? <div className="app-loading">This program has stopped working. Close the window and try again.</div> : this.props.children;
  }
}

function AppWindow({ win }: { win: Win }) {
  const titleOf = useWindowTitle();
  const App = apps[win.app];
  const { t } = useT();
  return (
    <Window win={win} title={titleOf(win)} icon={appMeta[win.app].icon}>
      <AppBoundary>
        <Suspense fallback={<div className="app-loading">{t(s.loading)}</div>}>
          <App param={win.param} />
        </Suspense>
      </AppBoundary>
    </Window>
  );
}

export function OS({ mode }: { mode: "embedded" | "fullscreen" }) {
  const { locale, dir, t } = useT();
  const embedded = mode === "embedded";
  const booted = useScene((st) => st.booted);
  const view = useScene((st) => st.view);
  const session = useScene((st) => st.osSession);
  const wins = useWindows((st) => st.wins);
  const saver = useScene((st) => st.saver);
  const deskRef = useRef<HTMLDivElement>(null);
  const lastActivity = useRef(Date.now());
  const [phase, setPhase] = useState<"off" | "splash" | "on">("off");

  // Screensaver after a minute without input on the OS (also while viewed from across the room).
  useEffect(() => {
    if (phase !== "on") return;
    lastActivity.current = Date.now();
    const id = window.setInterval(() => {
      const st = useScene.getState();
      if (!st.saver && Date.now() - lastActivity.current > IDLE_MS) st.setSaver(true);
    }, 2000);
    return () => window.clearInterval(id);
  }, [phase]);

  // Keep the screensaver mounted briefly after waking so it can absorb the rest of the gesture.
  const [saverShown, setSaverShown] = useState(false);
  useEffect(() => {
    if (saver) {
      setSaverShown(true);
      return;
    }
    const id = window.setTimeout(() => setSaverShown(false), 450);
    return () => window.clearTimeout(id);
  }, [saver]);

  useEffect(() => {
    if (!saver) {
      lastActivity.current = Date.now();
      return;
    }
    const wake = (e: KeyboardEvent) => {
      e.preventDefault();
      useScene.getState().setSaver(false);
    };
    window.addEventListener("keydown", wake, { capture: true, once: true });
    return () => window.removeEventListener("keydown", wake, { capture: true });
  }, [saver]);

  const touch = () => {
    lastActivity.current = Date.now();
  };

  // Layout facts the window manager needs.
  useEffect(() => {
    useWindows.getState().setLayout(!embedded && window.matchMedia("(max-width: 767px)").matches, dir === "rtl");
  }, [embedded, dir]);

  useLayoutEffect(() => {
    const el = deskRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => useWindows.getState().setDesk(el.offsetWidth, el.offsetHeight));
    ro.observe(el);
    useWindows.getState().setDesk(el.offsetWidth, el.offsetHeight);
    return () => ro.disconnect();
  }, [phase]);

  // Power on after the boot screen, and again on "Restart".
  useEffect(() => {
    if (!booted) return;
    setPhase("splash");
    const id = window.setTimeout(() => {
      setPhase("on");
      sfx.chime();
      // Welcome window, unless the visitor already opened something from the room.
      window.setTimeout(() => {
        if (!useWindows.getState().wins.length) useWindows.getState().open("about");
      }, 350);
    }, 2000);
    return () => window.clearTimeout(id);
  }, [booted, session]);

  return (
    <div
      className={`os-root os-${mode}`}
      dir={dir}
      lang={locale}
      style={embedded ? { width: SCREEN_W, height: SCREEN_H } : undefined}
      onPointerMove={touch}
      onPointerDown={touch}
      onKeyDown={touch}
      onWheel={touch}
    >
      {phase === "off" && (
        <div className="os-off">
          <span className="cursor-blink">_</span>
        </div>
      )}
      {phase === "splash" && <Splash />}
      {phase === "on" && (
        <>
          <div className="os-desktop" ref={deskRef}>
            <Desktop />
            {wins.map((w) => (
              <AppWindow key={w.id} win={w} />
            ))}
          </div>
          <Taskbar embedded={embedded} />
          {saverShown && <Screensaver closing={!saver} onExit={() => useScene.getState().setSaver(false)} />}
        </>
      )}
      {embedded && <div className="crt-overlay" aria-hidden="true" />}
      {embedded && view !== "screen" && (
        <button
          className="os-catcher"
          aria-label={t(s.clickComputer)}
          onClick={() => booted && useScene.getState().setView("screen")}
        />
      )}
    </div>
  );
}
