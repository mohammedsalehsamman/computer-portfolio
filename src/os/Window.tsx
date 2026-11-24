import { useRef, type PointerEvent as RPointerEvent, type ReactNode } from "react";
import { useT } from "@/i18n/locale";
import { s } from "@/i18n/strings";
import { sfx } from "@/sound/sfx";
import { Icon, type IconName } from "./Icon";
import { scaleOf } from "./scale";
import { activeWindowId, useWindows, type Win } from "./windowStore";

type Drag = { mode: "move" | "resize"; px: number; py: number; x: number; y: number; w: number; h: number; scale: number };


export function Window({ win, title, icon, children }: { win: Win; title: string; icon: IconName; children: ReactNode }) {
  const { t } = useT();
  const active = useWindows((st) => activeWindowId(st.wins) === win.id);
  const desk = useWindows((st) => st.desk);
  const compact = useWindows((st) => st.compact);
  const { focus, close, minimize, toggleMax, move, resize } = useWindows.getState();
  const drag = useRef<Drag | null>(null);

  const begin = (mode: Drag["mode"]) => (e: RPointerEvent<HTMLElement>) => {
    if (e.button !== 0 || win.maximized) return;
    if ((e.target as HTMLElement).closest("button")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { mode, px: e.clientX, py: e.clientY, x: win.x, y: win.y, w: win.w, h: win.h, scale: scaleOf(e.currentTarget) };
  };
  const onMove = (e: RPointerEvent<HTMLElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = (e.clientX - d.px) / d.scale;
    const dy = (e.clientY - d.py) / d.scale;
    if (d.mode === "move") {
      const x = Math.min(Math.max(d.x + dx, 64 - d.w), desk.w - 64);
      const y = Math.min(Math.max(d.y + dy, 0), desk.h - 28);
      move(win.id, Math.round(x), Math.round(y));
    } else {
      const w = Math.min(Math.max(d.w + dx, 280), desk.w - d.x);
      const h = Math.min(Math.max(d.h + dy, 180), desk.h - d.y);
      resize(win.id, Math.round(w), Math.round(h));
    }
  };
  const end = () => {
    drag.current = null;
  };

  const style = win.maximized
    ? { left: 0, top: 0, width: desk.w, height: desk.h, zIndex: win.z }
    : { left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z };

  return (
    <section
      className={`win${active ? " is-active" : ""}${win.maximized ? " is-max" : ""}`}
      style={{ ...style, display: win.minimized ? "none" : undefined }}
      role="dialog"
      aria-label={title}
      onPointerDown={() => focus(win.id)}
    >
      <header
        className="win-title"
        onPointerDown={begin("move")}
        onPointerMove={onMove}
        onPointerUp={end}
        onPointerCancel={end}
        onDoubleClick={() => toggleMax(win.id)}
      >
        <Icon name={icon} size={16} />
        <span className="win-title-text">{title}</span>
        <div className="win-btns">
          <button
            className="win-btn"
            aria-label={t(s.minimize)}
            title={t(s.minimize)}
            onClick={() => {
              sfx.click();
              minimize(win.id);
            }}
          >
            <span className="glyph-min" />
          </button>
          {!compact && (
            <button
              className="win-btn"
              aria-label={t(win.maximized ? s.restore : s.maximize)}
              title={t(win.maximized ? s.restore : s.maximize)}
              onClick={() => {
                sfx.click();
                toggleMax(win.id);
              }}
            >
              <span className={win.maximized ? "glyph-restore" : "glyph-max"} />
            </button>
          )}
          <button
            className="win-btn win-btn-close"
            aria-label={t(s.close)}
            title={t(s.close)}
            onClick={() => {
              sfx.close();
              close(win.id);
            }}
          >
            <span className="glyph-close" />
          </button>
        </div>
      </header>
      <div className="win-body">{children}</div>
      {!win.maximized && (
        <div className="win-resize" onPointerDown={begin("resize")} onPointerMove={onMove} onPointerUp={end} onPointerCancel={end} />
      )}
    </section>
  );
}
