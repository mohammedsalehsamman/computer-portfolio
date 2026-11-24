import { useEffect, useRef } from "react";
import { profile } from "@/content/profile";
import { useT } from "@/i18n/locale";

/**
 * Original Samman OS screensaver: the four logo tiles drift and bounce, leaving fading trails,
 * while the owner's name and a clock wander slowly. Any input dismisses it.
 */
const TILES = ["#e0783f", "#6b4ea8", "#3e8e6a", "#f2c14e"];
const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Screensaver({ onExit, closing = false }: { onExit: () => void; closing?: boolean }) {
  const { t, locale } = useT();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const w = (canvas.width = canvas.offsetWidth);
    const h = (canvas.height = canvas.offsetHeight);
    const tiles = TILES.map((color, i) => ({
      color,
      x: 80 + ((i * 197) % Math.max(1, w - 160)),
      y: 60 + ((i * 131) % Math.max(1, h - 120)),
      vx: (i % 2 ? -1 : 1) * (1.1 + i * 0.25),
      vy: (i < 2 ? 1 : -1) * (0.9 + i * 0.2),
      size: 34 + i * 6,
      spin: i * 0.7,
    }));
    const label = { x: w * 0.2, y: h * 0.4, vx: 0.35, vy: 0.25 };

    ctx.fillStyle = "#07090d";
    ctx.fillRect(0, 0, w, h);
    let raf = 0;

    const tickClock = () => {
      if (clockRef.current)
        clockRef.current.textContent = new Date().toLocaleTimeString(locale === "ar" ? "ar" : "en-US", { hour: "numeric", minute: "2-digit" });
    };
    tickClock();
    const clockId = window.setInterval(tickClock, 10_000);

    // Trails are drawn from each tile's recent positions, and the canvas is cleared every
    // frame. (Fading with a translucent fill leaves grey residue that never fully clears.)
    const TRAIL = 14;
    const history = tiles.map(() => [] as { x: number; y: number; a: number }[]);
    const drawTile = (color: string, x: number, y: number, size: number, angle: number, alpha: number, outline: boolean) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(x + size / 2, y + size / 2);
      ctx.rotate(angle);
      ctx.fillStyle = color;
      ctx.fillRect(-size / 2, -size / 2, size, size);
      if (outline) {
        ctx.strokeStyle = "#1b1a17";
        ctx.lineWidth = 3;
        ctx.strokeRect(-size / 2, -size / 2, size, size);
      }
      ctx.restore();
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (document.hidden) return;
      ctx.fillStyle = "#07090d";
      ctx.fillRect(0, 0, w, h);
      tiles.forEach((tile, i) => {
        tile.x += tile.vx;
        tile.y += tile.vy;
        tile.spin += 0.01;
        if (tile.x < 0 || tile.x > w - tile.size) tile.vx *= -1;
        if (tile.y < 0 || tile.y > h - tile.size) tile.vy *= -1;
        const angle = Math.sin(tile.spin) * 0.4;
        const trail = history[i];
        trail.push({ x: tile.x, y: tile.y, a: angle });
        if (trail.length > TRAIL) trail.shift();
        trail.forEach((p, k) => {
          const t = (k + 1) / trail.length;
          drawTile(tile.color, p.x, p.y, tile.size * (0.55 + 0.45 * t), p.a, 0.18 * t, false);
        });
        drawTile(tile.color, tile.x, tile.y, tile.size, angle, 1, true);
      });
      const el = labelRef.current;
      if (el) {
        const lw = el.offsetWidth;
        const lh = el.offsetHeight;
        label.x += label.vx;
        label.y += label.vy;
        if (label.x < 10 || label.x > w - lw - 10) label.vx *= -1;
        if (label.y < 10 || label.y > h - lh - 10) label.vy *= -1;
        el.style.transform = `translate(${label.x}px, ${label.y}px)`;
      }
    };

    if (reduced) {
      tiles.forEach((tile, i) => {
        ctx.fillStyle = tile.color;
        ctx.fillRect(w / 2 - 44 + (i % 2) * 46, h / 2 - 120 + Math.floor(i / 2) * 46, 42, 42);
      });
      if (labelRef.current) labelRef.current.style.transform = `translate(${w / 2 - labelRef.current.offsetWidth / 2}px, ${h / 2}px)`;
    } else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(clockId);
    };
  }, [locale]);

  // Input only wakes the screen. While it fades out it keeps swallowing events,
  // so the rest of a double-click never reaches the desktop underneath.
  const swallow = (e: { preventDefault: () => void; stopPropagation: () => void }) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const stop = (e: { preventDefault: () => void; stopPropagation: () => void }) => {
    swallow(e);
    if (!closing) onExit();
  };

  return (
    <div
      className={`screensaver${closing ? " is-closing" : ""}`}
      role="presentation"
      tabIndex={-1}
      onPointerDownCapture={stop}
      onPointerUpCapture={swallow}
      onClickCapture={swallow}
      onDoubleClickCapture={swallow}
      onWheelCapture={stop}
    >
      <canvas ref={canvasRef} />
      <div ref={labelRef} className="ss-label">
        <strong>{t(profile.name)}</strong>
        <span>{t(profile.role)}</span>
        <span ref={clockRef} className="ss-clock" />
      </div>
    </div>
  );
}
